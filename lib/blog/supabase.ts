import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import type { BlogPost, FaqItem, PostStatus } from './types';

// ─────────────────────────────────────────────────────────────
// Supabase クライアント（読み取り専用・匿名キー）。
// 接続情報は環境変数からのみ取得し、コードに直書きしない。
//   NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY
// 未設定なら null を返し、呼び出し側はフォールバック（空配列/undefined）する。
// ─────────────────────────────────────────────────────────────

let cached: SupabaseClient | null | undefined;

export function getSupabase(): SupabaseClient | null {
  if (cached !== undefined) return cached;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    // 環境変数が無ければ接続しない（ビルド/実行を落とさない）
    cached = null;
    return null;
  }

  cached = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return cached;
}

/** blog_posts の1行（Supabase 返却カラム。snake_case） */
export interface BlogPostRow {
  slug: string;
  title: string;
  body: string | null;
  excerpt: string | null;
  eyecatch_url: string | null;
  status: string;
  published_at: string | null;
  seo_title: string | null;
  meta_description: string | null;
  target_keywords: string[] | null;
  headings: unknown;
  faq: unknown;
  summary: string | null;
  cta_text: string | null;
  created_at: string;
  updated_at: string | null;
}

/** 取得に使うカラム列（select 指定を1箇所に集約） */
export const POST_COLUMNS =
  'slug, title, body, excerpt, eyecatch_url, status, published_at, seo_title, meta_description, target_keywords, faq, summary, cta_text, created_at, updated_at';

const emptyToUndef = (v: string | null | undefined): string | undefined =>
  v && v.trim() !== '' ? v : undefined;

/** jsonb の faq を FaqItem[] へ（不正な要素は除外）。空なら undefined */
function mapFaq(raw: unknown): FaqItem[] | undefined {
  if (!Array.isArray(raw)) return undefined;
  const items = raw
    .map((it) => {
      const e = (it ?? {}) as { question?: unknown; answer?: unknown };
      return { question: String(e.question ?? '').trim(), answer: String(e.answer ?? '').trim() };
    })
    .filter((e) => e.question && e.answer);
  return items.length > 0 ? items : undefined;
}

/**
 * DB 行 → BlogPost（camelCase）へマッピング。
 *
 * ・headings は DB 側の形（{level,text}／未整備）を使わず undefined にする。
 *   目次アンカーは本文 Markdown から rehype-slug と同一ロジックで導出するため
 *   （lib/blog/index.ts の getHeadings）、本文由来のみで id 整合を保つ。
 * ・category / author / relatedSlugs は ../advans-ai-lp スキーマに無いので undefined。
 *   UI 側はフォールバック（en='COLUMN'、著者=SITE名、関連=新着）で動作する。
 */
export function mapRow(row: BlogPostRow): BlogPost {
  return {
    slug: row.slug,
    title: row.title,
    body: row.body ?? '',
    excerpt: row.excerpt ?? '',
    status: (row.status as PostStatus) ?? 'published',
    publishedAt: row.published_at ?? row.created_at,
    updatedAt: row.updated_at ?? undefined,
    seoTitle: emptyToUndef(row.seo_title),
    metaDescription: emptyToUndef(row.meta_description),
    targetKeywords:
      row.target_keywords && row.target_keywords.length > 0 ? row.target_keywords : undefined,
    headings: undefined,
    faq: mapFaq(row.faq),
    summary: emptyToUndef(row.summary),
    ctaText: emptyToUndef(row.cta_text),
    coverImage: row.eyecatch_url ?? undefined,
    category: undefined,
    author: undefined,
    relatedSlugs: undefined,
  };
}
