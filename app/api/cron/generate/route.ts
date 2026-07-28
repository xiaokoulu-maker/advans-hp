import { NextRequest, NextResponse } from 'next/server';
import { generateArticle } from '@/lib/blog/generate-article';
import { composeArticleBody } from '@/lib/blog/generate-prompt';
import { pickTopic, toGenerateInputFromTopic } from '@/lib/blog/topic-queue';
import {
  listAllSlugs,
  getBlogSettings,
  createDraftPost,
  updatePostStatus,
} from '@/lib/blog/supabase';

/**
 * AIブログの手動実行／定期実行エンドポイント。
 *
 * フロー: 認証 → 既存slug取得 → テーマ決定 → 生成 → 必ずdraftで保存 →
 *   settings.auto_publish && !needs_review のときのみ published に更新。
 *
 * 認証: Authorization: Bearer <CRON_SECRET> を検証。CRON_SECRET 未設定の環境では
 * 常に 401 を返し、誰でも生成を走らせられる状態を作らない。
 * （Vercel Cron 登録は 3-4 で別途行う。vercel.json はまだ変更しない。）
 *
 * 保存先は service_role の Supabase。ANTHROPIC_API_KEY 未設定時はスタブ記事＋
 * needsReview:true になり、公開されず下書きに留まる。
 */

// 毎回その時点の設定・記事一覧を読むため、静的化させない。
export const dynamic = 'force-dynamic';

function isAuthorized(request: NextRequest): boolean {
  const secret = process.env.CRON_SECRET;
  if (!secret) return false;
  return request.headers.get('authorization') === `Bearer ${secret}`;
}

/** slugBase が既存slugと衝突する場合に -2, -3... を付けて一意化する */
function ensureUniqueSlug(base: string, existing: string[]): string {
  const set = new Set(existing);
  const safeBase = base || `ai-draft-${Date.now()}`;
  if (!set.has(safeBase)) return safeBase;
  for (let n = 2; n < 1000; n += 1) {
    const candidate = `${safeBase}-${n}`;
    if (!set.has(candidate)) return candidate;
  }
  return `${safeBase}-${Date.now()}`;
}

export async function GET(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: '認証に失敗しました。' }, { status: 401 });
  }

  // a. 既存slugを取得し、テーマ決定と slug 一意化に使う
  const existingSlugs = await listAllSlugs();

  // b. 次のテーマを決定
  const topic = pickTopic(existingSlugs);
  const input = toGenerateInputFromTopic(topic);

  // c. 記事生成（APIキーが無ければスタブ記事＋needsReview:true）
  const result = await generateArticle(input);
  if (!result.article) {
    return NextResponse.json({
      ok: false,
      theme: topic.theme,
      error: result.error ?? '記事を生成できませんでした。',
    });
  }

  const article = result.article;
  const needsReview = result.needsReview ?? true;
  const body = composeArticleBody(article);
  const excerpt = (article.metaDescription || article.intro || '').trim();
  const slug = ensureUniqueSlug(topic.slugBase, existingSlugs);

  // d. まず必ず draft として保存する（AI生成をいきなり公開状態で作らない）
  let created;
  try {
    created = await createDraftPost({
      slug,
      title: article.title,
      body,
      excerpt,
      seoTitle: article.seoTitle,
      metaDescription: article.metaDescription,
      targetKeywords: result.targetKeywords ?? [],
      faq: article.faq,
      summary: article.summary,
      ctaText: article.ctaText,
      needsReview,
    });
  } catch (error) {
    return NextResponse.json(
      { ok: false, theme: topic.theme, slug, error: (error as Error).message },
      { status: 500 },
    );
  }

  // e. 自動公開判定: auto_publish が ON かつ安全チェックを通過した場合のみ公開
  const settings = await getBlogSettings();
  const shouldPublish = settings.autoPublish && !needsReview;

  let published = false;
  let reason: string;

  if (shouldPublish) {
    published = await updatePostStatus(created.id, 'published', new Date().toISOString());
    reason = published
      ? '自動公開設定がONで、安全チェックも通過したため公開しました。'
      : '公開への更新に失敗したため下書きのままです。';
  } else if (!settings.autoPublish) {
    reason = '自動公開設定がOFFのため、下書きとして保存しました。';
  } else {
    reason = `安全チェックで確認が必要と判定されたため、下書きのままにしました（${(result.reasons ?? []).join(' / ') || '理由不明'}）。`;
  }

  return NextResponse.json({
    ok: true,
    stub: result.stub,
    theme: topic.theme,
    postId: created.id,
    title: created.title,
    slug: created.slug,
    charCount: body.length,
    status: published ? 'published' : 'draft',
    published,
    needsReview,
    reason,
    reasons: result.reasons ?? [],
  });
}
