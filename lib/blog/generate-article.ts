import Anthropic from '@anthropic-ai/sdk';
import {
  buildGeneratePrompt,
  parseKeywords,
  type GenerateArticleInput,
  type GeneratedArticle,
} from '@/lib/blog/generate-prompt';
import { checkArticleSafety } from '@/lib/blog/safety-check';

// ─────────────────────────────────────────────────────────────
// 記事生成の共有コア（サーバー専用）。Anthropic SDK を呼ぶのはこのファイルだけ。
//
// モデル・生成パラメータは下の定数に集約し、あとで差し替えやすくする。
//
// 【Opus 4.8 の注意】claude-opus-4-8 / 4.7 は temperature・top_p・top_k を
// 受け付けず、送ると 400 になる。よって temperature は送らない
// （決定性・トーンはプロンプト側で担保する）。
// また max_tokens は 12000（~16000 未満）なので非ストリーミングで問題ない。
// ─────────────────────────────────────────────────────────────

/** 使用モデル。差し替えはここ1箇所。 */
export const BLOG_MODEL = 'claude-opus-4-8';
/** 出力トークン上限。 */
export const BLOG_MAX_TOKENS = 12000;

export interface GenerateArticleResult {
  /** true=APIキー未設定のためサンプル記事を返した */
  stub: boolean;
  article: GeneratedArticle | null;
  targetKeywords?: string[];
  needsReview?: boolean;
  reasons?: string[];
  /** 生成に失敗した場合の説明（呼び出し側で表示。例外は投げない）。 */
  error?: string;
}

/** APIキーがあるときだけクライアントを作る（未設定でのビルド・起動を壊さないため） */
function createClient(): Anthropic {
  return new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
}

/** 応答テキストから最初のJSONオブジェクトを防御的に抽出する */
function extractJson(text: string): unknown {
  try {
    const match = text.match(/\{[\s\S]*\}/);
    if (!match) return null;
    return JSON.parse(match[0]);
  } catch {
    return null;
  }
}

/** 任意のリクエストボディを生成入力に正規化する */
export function toGenerateInput(body: Record<string, unknown>): GenerateArticleInput {
  return {
    theme: String(body.theme ?? '').trim(),
    keywords: String(body.keywords ?? '').trim(),
    audience: String(body.audience ?? '').trim(),
    purpose: String(body.purpose ?? '').trim(),
    length: String(body.length ?? '3,000〜5,000').trim(),
    service: String(body.service ?? '').trim(),
  };
}

function fallbackSlug(): string {
  return `ai-draft-${Date.now()}`;
}

/** ANTHROPIC_API_KEY 未設定時に返すサンプル記事（入力内容だけを反映） */
function buildStubArticle(input: GenerateArticleInput): GeneratedArticle {
  const theme = input.theme || 'Web集客';
  const audience = input.audience || '中小企業の経営者';

  const body = [
    '※ APIキーが未設定のため、AIによる本文生成は行われていません。これはサンプルの下書きです。',
    '',
    `## ${theme}について`,
    `${audience}に向けて、${theme}の基本的な考え方をご説明します。`,
    '',
    '## この記事の目的',
    input.purpose || '（未入力）',
  ].join('\n');

  return {
    title: `${theme}【AI下書き】`,
    slug: fallbackSlug(),
    seoTitle: `${theme}｜REVANS`,
    metaDescription: `${theme}について、${audience}に向けて解説します。`,
    intro: `${theme}をはじめて検討する方に向けた下書きです。`,
    headings: [
      { level: 2, text: `${theme}について` },
      { level: 2, text: 'この記事の目的' },
    ],
    body,
    faq: [
      {
        question: '相談は無料ですか？',
        answer: 'はい、無料相談はオンライン30分から承っています。',
      },
    ],
    summary: `${theme}のポイントをまとめた下書きです。内容を確認・加筆してから公開してください。`,
    ctaText: 'まずは無料相談から。集客・採用・AI活用の課題をお聞かせください。',
  };
}

/** AI応答をアプリ側の型に正規化する（欠損があっても壊れないように） */
function normalizeArticle(raw: Record<string, unknown>, input: GenerateArticleInput): GeneratedArticle {
  const headings = Array.isArray(raw.headings)
    ? raw.headings
        .map((item: unknown) => {
          const heading = (item ?? {}) as { level?: unknown; text?: unknown };
          return { level: Number(heading.level) || 2, text: String(heading.text ?? '').trim() };
        })
        .filter((heading) => heading.text)
    : [];

  const faq = Array.isArray(raw.faq)
    ? raw.faq
        .map((item: unknown) => {
          const entry = (item ?? {}) as { question?: unknown; answer?: unknown };
          return { question: String(entry.question ?? '').trim(), answer: String(entry.answer ?? '').trim() };
        })
        .filter((entry) => entry.question && entry.answer)
    : [];

  const theme = input.theme || 'Web集客';
  const rawSlug = String(raw.slug ?? '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');

  return {
    title: String(raw.title ?? '').trim() || theme,
    slug: rawSlug || fallbackSlug(),
    seoTitle: String(raw.seoTitle ?? '').trim(),
    metaDescription: String(raw.metaDescription ?? '').trim(),
    intro: String(raw.intro ?? '').trim(),
    headings,
    body: String(raw.body ?? '').trim(),
    faq,
    summary: String(raw.summary ?? '').trim(),
    ctaText: String(raw.ctaText ?? '').trim(),
  };
}

/**
 * 入力から記事を1本生成する。
 * 例外は投げず、失敗時は error を詰めた結果を返す。
 * ANTHROPIC_API_KEY 未設定時はAIを呼ばずスタブ記事＋needsReview:true を返す。
 */
export async function generateArticle(input: GenerateArticleInput): Promise<GenerateArticleResult> {
  const targetKeywords = parseKeywords(input.keywords);

  if (!process.env.ANTHROPIC_API_KEY) {
    return {
      stub: true,
      article: buildStubArticle(input),
      targetKeywords,
      needsReview: true,
      reasons: ['ANTHROPIC_API_KEY が未設定のため、サンプル下書きを返しました。'],
    };
  }

  try {
    const response = await createClient().messages.create({
      model: BLOG_MODEL,
      max_tokens: BLOG_MAX_TOKENS,
      // temperature は Opus 4.8 では送れない（400）。トーンはプロンプトで指示済み。
      system: buildGeneratePrompt(input),
      messages: [
        {
          role: 'user',
          content: '上記の条件と根拠データに従って、記事をJSONのみで出力してください。',
        },
      ],
    });

    const first = response.content[0];
    const rawText = first && first.type === 'text' ? first.text : '';
    const parsed = extractJson(rawText);

    if (!parsed || typeof parsed !== 'object') {
      return {
        stub: false,
        article: null,
        error: 'AIの応答からJSONを取り出せませんでした。もう一度お試しください。',
      };
    }

    const article = normalizeArticle(parsed as Record<string, unknown>, input);
    const safety = checkArticleSafety(article);

    return {
      stub: false,
      article,
      targetKeywords,
      needsReview: safety.needsReview,
      reasons: safety.reasons,
    };
  } catch (error) {
    console.error('[blog] generateArticle failed:', error);
    return {
      stub: false,
      article: null,
      error: `記事の生成に失敗しました: ${(error as Error).message || '不明なエラー'}`,
    };
  }
}
