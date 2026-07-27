import GithubSlugger from 'github-slugger';
import type {
  BlogPost,
  BlogPostSummary,
  PaginatedPosts,
  PostHeading,
} from './types';
import { samplePosts } from './sample-posts';

// ─────────────────────────────────────────────────────────────
// ブログ データ取得層（唯一の“供給元”）。
//
// 現状はサンプル配列（samplePosts）から読む。将来 advans-ai-lp と同じ
// Supabase `blog_posts` へ移行する際は、この 1 ファイル内の関数だけを
// DB クエリに差し替えれば UI 側は無改修で済む（返り値の型を維持すること）。
//
// ※ 関数は async 化してあり、将来の非同期 DB 取得へそのまま移行できる。
// ─────────────────────────────────────────────────────────────

/** 一覧の1ページあたり件数 */
export const POSTS_PER_PAGE = 9;

/** 内部：公開済み記事を公開日の新しい順で取得（DB 移行時はここを置き換える） */
async function loadPublishedPosts(): Promise<BlogPost[]> {
  return samplePosts
    .filter((p) => p.status === 'published')
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

/** 記事 → カード表示用サマリーへ変換 */
function toSummary(p: BlogPost): BlogPostSummary {
  return {
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    publishedAt: p.publishedAt,
    category: p.category,
  };
}

/**
 * 公開記事をページネーションして取得。
 * @param page 1始まり。範囲外は 1..totalPages にクランプ。
 */
export async function getPosts(page = 1, perPage = POSTS_PER_PAGE): Promise<PaginatedPosts> {
  const all = await loadPublishedPosts();
  const total = all.length;
  const totalPages = Math.max(1, Math.ceil(total / perPage));
  const current = Math.min(Math.max(1, Math.floor(page) || 1), totalPages);
  const start = (current - 1) * perPage;
  const posts = all.slice(start, start + perPage).map(toSummary);
  return { posts, total, page: current, perPage, totalPages };
}

/** 公開記事の全 slug（generateStaticParams / sitemap 用） */
export async function getAllPublishedSlugs(): Promise<string[]> {
  const all = await loadPublishedPosts();
  return all.map((p) => p.slug);
}

/** 公開記事のうち sitemap に必要な最小情報（slug と更新日） */
export async function getSitemapEntries(): Promise<{ slug: string; lastModified: string }[]> {
  const all = await loadPublishedPosts();
  return all.map((p) => ({ slug: p.slug, lastModified: p.updatedAt ?? p.publishedAt }));
}

/** slug から公開記事を1件取得（下書き等は返さない） */
export async function getPostBySlug(slug: string): Promise<BlogPost | undefined> {
  const all = await loadPublishedPosts();
  return all.find((p) => p.slug === slug);
}

/**
 * 関連記事を取得。
 * relatedSlugs があればそれを優先し、不足分は同カテゴリ→新着で補完。
 */
export async function getRelatedPosts(post: BlogPost, limit = 3): Promise<BlogPostSummary[]> {
  const all = await loadPublishedPosts();
  const pool = all.filter((p) => p.slug !== post.slug);

  const picked: BlogPost[] = [];
  const pushUnique = (p?: BlogPost) => {
    if (p && !picked.some((x) => x.slug === p.slug)) picked.push(p);
  };

  // 1) 明示指定
  (post.relatedSlugs ?? []).forEach((s) => pushUnique(pool.find((p) => p.slug === s)));
  // 2) 同カテゴリ
  if (picked.length < limit && post.category) {
    pool.filter((p) => p.category === post.category).forEach(pushUnique);
  }
  // 3) 新着で補完
  pool.forEach(pushUnique);

  return picked.slice(0, limit).map(toSummary);
}

/**
 * 目次データの取得。
 * post.headings があればそれを使い、無ければ本文 Markdown の h2/h3 から導出する。
 * 導出時の id は rehype-slug と同じ GithubSlugger で算出し、本文アンカーと一致させる。
 */
export function getHeadings(post: BlogPost): PostHeading[] {
  if (post.headings && post.headings.length > 0) return post.headings;
  return deriveHeadings(post.body);
}

/** Markdown 本文から h2/h3 見出しを抽出して目次を生成 */
export function deriveHeadings(markdown: string): PostHeading[] {
  const slugger = new GithubSlugger();
  const headings: PostHeading[] = [];
  let inCodeBlock = false;

  for (const rawLine of markdown.split('\n')) {
    const line = rawLine.trimEnd();
    // ``` で囲まれたコードブロック内の見出し記号は無視
    if (/^\s*```/.test(line)) {
      inCodeBlock = !inCodeBlock;
      continue;
    }
    if (inCodeBlock) continue;

    const m = /^(#{2,3})\s+(.+?)\s*#*$/.exec(line);
    if (!m) continue;
    const level = m[1].length;
    // 見出しテキストから Markdown 強調記号・インラインコードを除去
    const text = m[2].replace(/[*_`]/g, '').trim();
    headings.push({ level, text, id: slugger.slug(text) });
  }
  return headings;
}

/** 公開日 ISO 文字列を "YYYY.MM.DD" 表示へ整形（表示用） */
export function formatPostDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}.${m}.${day}`;
}

export type { BlogPost, BlogPostSummary, PaginatedPosts, PostHeading } from './types';
