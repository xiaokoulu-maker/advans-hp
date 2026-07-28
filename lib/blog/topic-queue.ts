import { services } from '@/lib/data';
import type { GenerateArticleInput } from '@/lib/blog/generate-prompt';

// ─────────────────────────────────────────────────────────────
// 自動生成で「次にどの記事を書くか」を決めるテーマのローテーション。
// REVANSのサービス（6領域）× 切り口 で候補を組み立てる。
//
// slugBase を各候補に持たせ、DB内の既存slug一覧を参照して
// 「すでに書いたテーマ」をスキップする（重複回避）。
// 保存時の実slugは route 側で ensureUniqueSlug(slugBase, existing) により確定させる。
// ─────────────────────────────────────────────────────────────

export interface BlogTopic {
  /** 記事テーマ（1テーマ＝1検索意図） */
  theme: string;
  /** 対策キーワード（カンマ区切り） */
  keywords: string;
  /** 想定読者 */
  audience: string;
  /** 記事の目的 */
  purpose: string;
  /** 扱うサービス領域 */
  service: string;
  /** URLスラッグの土台（`${serviceSlug}-${angleKey}`）。既存slugとの重複回避の突合キー。 */
  slugBase: string;
}

/** 記事の切り口。key はASCIIでスラッグに使う。読者は全て「中小企業の経営者」想定。 */
const ANGLES: { key: string; label: string; purpose: string }[] = [
  { key: 'nyumon', label: '入門｜基礎と始め方', purpose: 'はじめて検討する経営者に全体像と最初の一歩を伝える' },
  { key: 'hikaku', label: '比較｜手段の選び方', purpose: '他の手段・進め方と比較し、自社に合う選び方の基準を伝える' },
  { key: 'hiyou', label: '費用の考え方', purpose: '費用が何で決まるかの考え方を示し、相談につなげる（具体的な金額は断定しない）' },
  { key: 'shippai', label: 'よくある失敗と回避法', purpose: '失敗を避けたい層の検索意図に応える' },
  { key: 'jirei', label: '成果につながる進め方の型', purpose: '実際の進め方のイメージを具体化して相談を後押しする' },
  { key: 'checklist', label: '依頼前のチェックリスト', purpose: '依頼前に確認すべき点を整理し、意思決定を助ける' },
];

const AUDIENCE = '中小企業の経営者';

/** サービス（lib/data.ts）× 切り口 でテーマ候補を組み立てる */
export function buildTopicCandidates(): BlogTopic[] {
  const topics: BlogTopic[] = [];

  // 切り口を外側に回し、同じサービスの記事が連続しないようにする。
  ANGLES.forEach((angle) => {
    services.forEach((service) => {
      topics.push({
        theme: `${service.title}｜${angle.label}`,
        keywords: [service.title, `${service.title} 中小企業`, `${service.title} ${angle.label}`].join(', '),
        audience: AUDIENCE,
        purpose: angle.purpose,
        service: service.title,
        slugBase: `${service.slug}-${angle.key}`,
      });
    });
  });

  return topics;
}

/** 1970-01-01 からの経過週数。週1回のCronで1つずつテーマが進むための指標。 */
function weekIndex(now: Date): number {
  const msPerWeek = 7 * 24 * 60 * 60 * 1000;
  return Math.floor(now.getTime() / msPerWeek);
}

/**
 * 次に生成すべきテーマを1つ返す。
 * weekIndex を起点に候補を巡回し、slugBase が既存slugに含まれるものはスキップする。
 * 全て生成済みなら weekIndex 位置の候補にフォールバックする。
 */
export function pickTopic(existingSlugs: string[] = [], now: Date = new Date()): BlogTopic {
  const topics = buildTopicCandidates();
  const existing = new Set(existingSlugs);
  const start = weekIndex(now) % topics.length;

  for (let i = 0; i < topics.length; i += 1) {
    const candidate = topics[(start + i) % topics.length];
    if (!existing.has(candidate.slugBase)) {
      return candidate;
    }
  }

  // 全テーマ生成済み。起点の候補を返す（route 側で slug は一意化される）。
  return topics[start];
}

/** テーマから、そのまま generateArticle() に渡せる生成入力を組み立てる */
export function toGenerateInputFromTopic(topic: BlogTopic, length = '3,000〜5,000'): GenerateArticleInput {
  return {
    theme: topic.theme,
    keywords: topic.keywords,
    audience: topic.audience,
    purpose: topic.purpose,
    length,
    service: topic.service,
  };
}
