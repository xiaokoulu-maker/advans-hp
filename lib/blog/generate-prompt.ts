import { buildCompanyContext } from '@/lib/blog/company-context';

// ─────────────────────────────────────────────────────────────
// AIブログ生成のプロンプト・型・本文結合ユーティリティ。
// Anthropic SDK を import しないこのファイルに置き、サーバー（Cron）と
// 生成コアの双方から安全に読めるようにする（../advans-ai-lp の構成を踏襲）。
// ─────────────────────────────────────────────────────────────

/** テーマ選定・手動実行から受け取る生成入力 */
export interface GenerateArticleInput {
  /** 記事テーマ（1テーマ＝1検索意図） */
  theme: string;
  /** 対策キーワード（カンマ区切り文字列） */
  keywords: string;
  /** 想定読者（既定: 中小企業の経営者） */
  audience: string;
  /** 記事の目的 */
  purpose: string;
  /** 想定文字数（既定: 3000〜5000） */
  length: string;
  /** 記事内で扱うサービス領域 */
  service: string;
}

/** AIに生成させる記事オブジェクト（lib/blog/types.ts の BlogPost と対応） */
export interface GeneratedArticle {
  title: string;
  slug: string;
  seoTitle: string;
  metaDescription: string;
  /** 導入文 */
  intro: string;
  /** 見出し構成 */
  headings: Array<{ level: number; text: string }>;
  /** 本文Markdown（まとめは含めない。summary が別枠） */
  body: string;
  faq: Array<{ question: string; answer: string }>;
  /** まとめ／リード（PageHero の lead にも使う） */
  summary: string;
  /** CTA帯の文言 */
  ctaText: string;
}

/** 根拠データに無い事項へ付けさせるマーカー。safety-check.ts と共有する。 */
export const REVIEW_MARKER = '[要確認]';

/**
 * 導入文・本文・まとめを1本のMarkdownに結合する（blog_posts.body 用）。
 * まとめは本文に含めさせず summary に分離させているため、ここで "## まとめ" として付ける。
 */
export function composeArticleBody(article: GeneratedArticle): string {
  return [article.intro, article.body, article.summary ? `## まとめ\n\n${article.summary}` : '']
    .map((part) => (part ?? '').trim())
    .filter(Boolean)
    .join('\n\n');
}

export function parseKeywords(keywords: string): string[] {
  return keywords
    .split(',')
    .map((keyword) => keyword.trim())
    .filter(Boolean);
}

/**
 * 記事生成用システムプロンプトを組み立てる。
 * 会社情報（company-context）を「根拠データ」として埋め込み、事実の捏造を防ぐ安全ルールを明文で入れる。
 */
export function buildGeneratePrompt(input: GenerateArticleInput): string {
  const keywords = parseKeywords(input.keywords);

  const sections = [
    'あなたは、中小企業向けにWeb集客・広告・AI活用・採用支援を提供する会社「REVANS」のオウンドメディアを担当する、日本語のSEOライターです。',
    '以下の「根拠データ」だけを事実の裏付けとして使い、中小企業の経営者にとって実用的な記事を1本書いてください。',
    '',
    '━━━ 根拠データ（これが唯一の事実の情報源） ━━━',
    buildCompanyContext(),
    '',
    '━━━ 安全ルール（最重要・必ず守る） ━━━',
    '1. 料金・実績・提供サービス・効果の見込みに関する事実は、根拠データにある内容だけを使うこと。根拠データに無い数値・料金額・実績件数・顧客数・社名を新たに作らないこと。',
    `2. 根拠データに無い事項は断定しないこと。一般論にとどめるか、該当箇所に ${REVIEW_MARKER} というマーカーを文中にそのまま挿入すること（例: 具体的な費用に触れる必要がある場合など）。`,
    '3. 誇大表現・優良誤認になる断定（「必ず」「最安」「No.1」「日本一」「業界最〇〇」「絶対」「100%」「保証します」など）を使わないこと。REVANSは成果・上位表示を保証しない方針である。',
    '4. 料金に触れる場合は、固定の料金表は公開しておらず内容に応じた個別見積りである旨を明記すること。具体的な金額は断定しないこと。',
    '5. 検索流入・SEOの効果は積み上げ型で時間がかかる点を、誇張せず正直に書くこと。',
    '',
    '━━━ 記事の条件 ━━━',
    `・記事テーマ: ${input.theme || '（未指定）'}`,
    '・1テーマ＝1検索意図。テーマから外れる話題に広げず、1つの検索意図に集中して深く書くこと。',
    `・対策キーワード: ${keywords.length ? keywords.join('、') : '（未指定）'}`,
    `・想定読者: ${input.audience || '中小企業の経営者'}`,
    `・記事の目的: ${input.purpose || '（未指定）'}`,
    `・扱うサービス領域: ${input.service || '（未指定）'}`,
    `・想定文字数: 本文（intro＋body＋summary）で ${input.length || '3,000〜5,000'} 文字程度。内容が薄くならないよう具体的に書くこと。`,
    '・文体は敬体（です・ます調）。読者を「経営者の方」として想定し、専門用語には簡単な補足を添えること。',
    '・本文は日本語のMarkdown。見出しは ## / ### を使う。まとめは body に書かず summary に分けること。',
    '・対策キーワードは不自然にならない範囲で本文・見出しに含めること。',
    '・可能なら関連する自社サービスページ（例: /services/web, /services/meo, /services/aiblog, /services/ads, /services/ai, /services/recruit）への内部リンクを本文に自然に含めること。',
    '',
    '━━━ 出力形式（厳守） ━━━',
    '次のJSONオブジェクトのみを出力すること。前置き・後書き・Markdownコードフェンス（```）は一切付けない。',
    '{',
    '  "title": "記事タイトル",',
    '  "slug": "半角英数字とハイフンのみのURLスラッグ",',
    '  "seoTitle": "検索結果用タイトル（32文字前後）",',
    '  "metaDescription": "検索結果用の説明文（120文字前後）",',
    '  "intro": "導入文",',
    '  "headings": [{ "level": 2, "text": "見出し" }],',
    '  "body": "本文Markdown（まとめは含めない）",',
    '  "faq": [{ "question": "質問", "answer": "回答" }],',
    '  "summary": "まとめ（記事全体の要約リード）",',
    '  "ctaText": "問い合わせ誘導文"',
    '}',
  ];

  return sections.join('\n');
}
