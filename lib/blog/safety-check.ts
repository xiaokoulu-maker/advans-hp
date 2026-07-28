import { REVIEW_MARKER, type GeneratedArticle } from '@/lib/blog/generate-prompt';

// ─────────────────────────────────────────────────────────────
// 生成記事の簡易安全チェック。
//
// 完全自動運用（auto_publish=true）を前提に、needsReview の対象は
//   (1) [要確認] マーカーの有無
//   (2) 具体的な金額表現（○円／○万円）
// の2つだけに絞る。この2つは「人が確認しないと公開できない」度合いが高い。
//
// 誇大表現（必ず／保証／No.1 等）や実績断定の語句マッチは、疑問文・注意喚起文
// （「〜と断定する業者に注意」等）での誤検出が多く、needsReview に含めると
// 完全自動運用では draft が永久に塩漬けになる。そのため needsReview からは外し、
// 検出しても notes に積んでログ出力するだけに留める（公開はブロックしない）。
//
// REVANSは全国オンライン対応のため、エリア（地名）チェックは行わない。
// ─────────────────────────────────────────────────────────────

export interface SafetyCheckResult {
  /** true の場合、公開前に人の確認が必要（blog_posts.needs_review に入れる） */
  needsReview: boolean;
  /** needsReview の理由（[要確認]／金額表現）。ログ・レスポンス表示用 */
  reasons: string[];
  /** 公開はブロックしないが参考ログに残す検出（誇大表現・実績断定など） */
  notes: string[];
}

/** 金額に踏み込んだ記述（円・万円） */
const PRICE_PATTERN = /(\d|[０-９])+\s*(円|万円)/;

/** 誇大表現・優良誤認になりうる断定 */
const HYPE_PATTERNS: RegExp[] = [
  /No\.?\s*1/i,
  /ナンバーワン/,
  /日本一/,
  /業界(最安|最速|最大|最高|トップ|No)/i,
  /必ず/,
  /絶対に?/,
  /100\s*(%|％)/,
  /最安/,
  /保証(します|いたします|できます|付き)/,
];

/** 根拠データに無い実績を断定する表現（件数・社数・顧客数の断定） */
const CLAIM_PATTERNS: RegExp[] = [
  /(導入|支援|制作|実績|導入社数|顧客数)[^。]{0,12}(\d|[０-９]){1,6}\s*(社|件|店|名|人|棟|社以上)/,
  /(\d|[０-９]){1,6}\s*(社|件|名)[^。]{0,6}(突破|達成|実績)/,
  /満足度\s*(\d|[０-９]){1,3}\s*(%|％)/,
  /(上位表示|1位|第1位)[^。]{0,10}(保証|確約|必ず)/,
];

function collectText(article: Partial<GeneratedArticle>): string {
  return [
    article.title ?? '',
    article.intro ?? '',
    article.body ?? '',
    article.summary ?? '',
    article.ctaText ?? '',
    ...(article.headings ?? []).map((heading) => heading.text),
    ...(article.faq ?? []).flatMap((item) => [item.question, item.answer]),
  ].join('\n');
}

/**
 * 生成記事をチェックする。
 * ・reasons（＝needsReview の対象）は [要確認] マーカーと金額表現の2つだけ。
 * ・誇大表現・実績断定は notes に積んでログ出力するのみ（公開はブロックしない）。
 */
export function checkArticleSafety(article: Partial<GeneratedArticle>): SafetyCheckResult {
  const text = collectText(article);
  const reasons: string[] = [];
  const notes: string[] = [];

  // ── needsReview の対象（公開をブロックする） ──
  if (text.includes(REVIEW_MARKER)) {
    reasons.push(`${REVIEW_MARKER} マーカーが含まれています`);
  }

  if (PRICE_PATTERN.test(text)) {
    reasons.push('金額表現（円・万円）が含まれています');
  }

  // ── ログのみ（needsReview には含めない） ──
  if (HYPE_PATTERNS.some((pattern) => pattern.test(text))) {
    notes.push('誇大表現・優良誤認になりうる断定の可能性がある表現を検出しました');
  }

  if (CLAIM_PATTERNS.some((pattern) => pattern.test(text))) {
    notes.push('根拠データに無い実績・成果の断定の可能性がある表現を検出しました');
  }

  if (notes.length > 0) {
    console.info(`[blog] safety notes (公開はブロックしません): ${notes.join(' / ')}`);
  }

  return {
    needsReview: reasons.length > 0,
    reasons,
    notes,
  };
}
