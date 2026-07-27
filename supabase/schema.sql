-- ============================================================================
-- advans-hp ブログ機能スキーマ
-- Supabase の SQL Editor にこのまま貼り付けて実行できる CREATE TABLE 一式。
--
-- テーブル定義は ../advans-ai-lp/supabase/migrations/0001_blog.sql に準拠。
--   blog_posts    : 記事本体（手動投稿・AI生成の両方を格納）
--   blog_settings : ブログ全体の設定（単一行想定）
--
-- 追加要件（advans-hp 側）:
--   - RLS を有効化
--   - anon は status = 'published' の行のみ SELECT 可
--   - 書き込み系ポリシーは作らない（更新は service_role のみが行う前提。
--     service_role は RLS をバイパスするためポリシー不要）
-- ============================================================================

-- gen_random_uuid() を使うため
create extension if not exists "pgcrypto";

-- ----------------------------------------------------------------------------
-- blog_posts
-- ----------------------------------------------------------------------------
create table if not exists blog_posts (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  body text not null default '',
  excerpt text not null default '',
  eyecatch_url text,
  status text not null default 'draft' check (status in ('draft', 'published', 'private')),
  published_at timestamptz,
  seo_title text not null default '',
  meta_description text not null default '',
  target_keywords text[] not null default '{}',
  headings jsonb not null default '[]',
  faq jsonb not null default '[]',
  summary text not null default '',
  cta_text text not null default '',
  source text not null default 'manual' check (source in ('manual', 'ai')),
  needs_review boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- slug の unique index は上の unique 制約が自動生成するため、別途作成しない
create index if not exists blog_posts_status_idx on blog_posts (status);
create index if not exists blog_posts_published_at_idx on blog_posts (published_at desc);

-- updated_at を更新時に自動でセットする
create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists blog_posts_set_updated_at on blog_posts;
create trigger blog_posts_set_updated_at
  before update on blog_posts
  for each row
  execute function set_updated_at();

-- ----------------------------------------------------------------------------
-- blog_settings（単一行想定）
-- ----------------------------------------------------------------------------
create table if not exists blog_settings (
  id uuid primary key default gen_random_uuid(),
  auto_publish boolean not null default false,
  default_author text not null default '',
  posts_per_page int not null default 9,
  updated_at timestamptz not null default now()
);

drop trigger if exists blog_settings_set_updated_at on blog_settings;
create trigger blog_settings_set_updated_at
  before update on blog_settings
  for each row
  execute function set_updated_at();

-- 単一行想定のため、未作成のときだけデフォルト行を入れる
insert into blog_settings (auto_publish, default_author, posts_per_page)
select false, '', 9
where not exists (select 1 from blog_settings);

-- ============================================================================
-- RLS（Row Level Security）
-- ============================================================================

-- --- blog_posts ---
alter table blog_posts enable row level security;

-- anon（公開サイトの匿名アクセス）は published の行のみ閲覧可
drop policy if exists "blog_posts_anon_select_published" on blog_posts;
create policy "blog_posts_anon_select_published"
  on blog_posts
  for select
  to anon
  using (status = 'published');

-- 認証済みユーザー（管理画面ログイン等）も published のみ閲覧可にしておく。
-- 下書き/非公開の閲覧・編集は service_role 経由に限定する（下記ポリシーは付けない）。
drop policy if exists "blog_posts_authenticated_select_published" on blog_posts;
create policy "blog_posts_authenticated_select_published"
  on blog_posts
  for select
  to authenticated
  using (status = 'published');

-- INSERT / UPDATE / DELETE のポリシーは意図的に作成しない。
-- → anon / authenticated からの書き込みは全て拒否される。
-- → service_role キーは RLS をバイパスするため、サーバー側の投稿・更新はそのまま可能。

-- --- blog_settings ---
alter table blog_settings enable row level security;

-- 設定値（posts_per_page 等）は公開サイトの表示に使うため anon にも読取のみ許可
drop policy if exists "blog_settings_anon_select" on blog_settings;
create policy "blog_settings_anon_select"
  on blog_settings
  for select
  to anon
  using (true);

drop policy if exists "blog_settings_authenticated_select" on blog_settings;
create policy "blog_settings_authenticated_select"
  on blog_settings
  for select
  to authenticated
  using (true);

-- blog_settings も書き込みポリシーは作らない（service_role のみ更新）。
