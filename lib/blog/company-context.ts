import { SITE } from '@/lib/site';
import { services, serviceDetails, reasons, flow } from '@/lib/data';

// ─────────────────────────────────────────────────────────────
// REVANS「根拠データ」——AIブログ生成で唯一の事実の情報源。
//
// 情報源は revans-hp 内の既存コンテンツのみ:
//   - lib/site.ts（SITE）
//   - lib/data.ts（services / serviceDetails / reasons / flow）
//   - app/company/page.tsx（POLICIES / OVERVIEW の一部を下に転記）
//
// 【重要】ここに書かれていない事実（具体的な料金額・実績件数・顧客数など）は
// 絶対に含めない。lib/data.ts の stats / works は「仮値」「近日公開」を含むため
// 意図的に取り込まない（statsNote 参照）。
// ─────────────────────────────────────────────────────────────

/**
 * app/company/page.tsx の POLICIES を転記（同ファイルではローカル定数で export されていないため）。
 * 文言を変えず、根拠データとして再利用する。
 */
const POLICIES: { title: string; body: string }[] = [
  {
    title: '実測主義',
    body: '提案も報告も、検索順位・表示回数・クリックなどの実測データが根拠。感覚では動きません。',
  },
  {
    title: '誇大表現をしない',
    body: '効果の保証はしません。できること・できないこと・時間がかかることを、契約前に率直にお伝えします。',
  },
  {
    title: '資産を残す',
    body: '広告のように止めたら消える施策だけでなく、サイト・検索順位・口コミといった「貴社に残る資産」を育てます。',
  },
];

/**
 * サイト内に明記された事実だけを集めた「よくある前提」。
 * 具体的な金額は出さず、「個別見積り」「目安」の範囲にとどめる（page 由来の note を根拠にする）。
 */
const FACTS: string[] = [
  '対応範囲は全国オンライン対応。所在地は東京都世田谷区。',
  '無料相談はオンライン30分から。現状と課題をヒアリングするところから始める。',
  'お問い合わせは24時間受付。返信は1〜2営業日以内にメールで行う。',
  '料金の固定表は公開していない。広告費や運用手数料は内容・ご予算に応じて設計し、個別にお見積りする。',
  '上位表示・成果・効果は保証しない。やること／やらないことを事前に明文化して提示する。',
  'LP（ランディングページ）はボリュームにより異なるが最短2週間程度から対応する。',
  'AIブログ（検索流入）は積み上げ型のため、効果の実感まで通常3〜6ヶ月を見込む。短期の成果が必要な場合は広告運用との併用を提案する。',
  'MEOは順位や件数を保証する施策ではない。進捗はすべて実測の数字で開示する。',
]

/**
 * 記事生成でAIが「事実」として使ってよい唯一の情報源をテキストにまとめる。
 * lib/blog/generate-prompt.ts の buildGeneratePrompt から呼ばれる。
 */
export function buildCompanyContext(): string {
  const serviceLines = services.map((s) => `・${s.title}：${s.body}`);

  const detailBlocks = serviceDetails.map((d) => {
    const features = d.features.map((f) => `${f.title}（${f.body}）`).join(' / ');
    return [
      `■ ${d.title}`,
      `　概要：${d.description}`,
      `　できること：${features}`,
      `　補足：${d.note}`,
    ].join('\n');
  });

  const sections = [
    `【屋号】${SITE.name}（${SITE.nameJa}）`,
    `【コンセプト】${SITE.concept}（Revolution＝革命 × Advance＝前進）`,
    `【事業概要】${SITE.tagline}`,
    `【所在地】${SITE.location}（${SITE.area}）`,
    `【連絡先】メール ${SITE.email}`,
    `【受付・対応時間】${SITE.hours}`,
    '',
    '【提供サービス（6領域）】',
    serviceLines.join('\n'),
    '',
    '【各サービスの詳細】',
    detailBlocks.join('\n\n'),
    '',
    `【REVANSの考え方（Why REVANS）】${reasons.map((r) => `${r.title}：${r.body}`).join(' / ')}`,
    `【行動指針（Policy）】${POLICIES.map((p) => `${p.title}：${p.body}`).join(' / ')}`,
    `【ご依頼の流れ】${flow.map((f) => `${f.no}. ${f.title}（${f.body}）`).join(' / ')}`,
    '',
    '【方針・よくある前提（記事の事実はこの範囲で）】',
    FACTS.map((f) => `・${f}`).join('\n'),
  ];

  return sections.join('\n');
}
