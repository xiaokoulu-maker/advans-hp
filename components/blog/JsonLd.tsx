/**
 * 構造化データ（JSON-LD）出力ヘルパ。
 * data はプレーンな JSON-LD オブジェクト（"@context"/"@type" を含む）。
 * XSS 対策として "<" をエスケープしてから埋め込む（値に < が入っても安全）。
 */
export default function JsonLd({ data }: { data: Record<string, unknown> }) {
  const json = JSON.stringify(data).replace(/</g, '\\u003c');
  return (
    <script
      type="application/ld+json"
      // 構造化データは innerHTML で埋め込むのが Next.js の標準手法
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
