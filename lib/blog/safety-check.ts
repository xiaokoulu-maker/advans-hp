import { REVIEW_MARKER, type GeneratedArticle } from '@/lib/blog/generate-prompt';

// ─────────────────────────────────────────────────────────────
// 生成記事の簡易安全チェック。人の確認が必要な記述を検出して needsReview を返す。
// REVANSは全国オンライン対応のため、エリア（地名）チェックは行わない。
// 厳密さより網羅性を優先し、拾い漏れより拾い過ぎ側に倒す。
// ─────────────────────────────────────────────────────────────

export interface SafetyCheckResult {
  /** true の場合、公開前に人の確認が必要（blog_posts.needs_review に入れる） */
  needsReview: boolean;
  /** 検出理由（ログ・レスポンス表示用） */
  reasons: string[];
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
 * 生成記事に、人の確認が必要な記述が含まれていないかを簡易チェックする。
 */
export function checkArticleSafety(article: Partial<GeneratedArticle>): SafetyCheckResult {
  const text = collectText(article);
  const reasons: string[] = [];

  if (text.includes(REVIEW_MARKER)) {
    reasons.push(`${REVIEW_MARKER} マーカーが含まれています`);
  }

  if (PRICE_PATTERN.test(text)) {
    reasons.push('金額表現（円・万円）が含まれています');
  }

  if (HYPE_PATTERNS.some((pattern) => pattern.test(text))) {
    reasons.push('誇大表現・優良誤認になりうる断定が含まれています');
  }

  if (CLAIM_PATTERNS.some((pattern) => pattern.test(text))) {
    reasons.push('根拠データに無い実績・成果の断定の可能性がある表現が含まれています');
  }

  return {
    needsReview: reasons.length > 0,
    reasons,
  };
}
