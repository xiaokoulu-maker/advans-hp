import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import type { Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import styles from './ArticleBody.module.css';

/**
 * 記事本文（Markdown）レンダラ。Server Component。
 *
 * - react-markdown は Markdown を React 要素へ変換する（dangerouslySetInnerHTML 不使用）。
 *   生 HTML はデフォルト無効のため、本文由来の XSS が構造的に発生しない。
 * - remark-gfm: 表・打ち消し線・自動リンク等の GFM 記法。
 * - rehype-slug: 見出しへ id を自動付与（目次アンカーのジャンプ先）。
 * - 装飾は .prose 配下の子孫セレクタ（ArticleBody.module.css）で当てる。
 *   リンクのみ内部/外部で出し分けたいので components で上書きする。
 */
const components: Components = {
  a({ href, children }) {
    const url = href ?? '';
    const isInternal = url.startsWith('/') || url.startsWith('#');
    if (isInternal) {
      return (
        <Link href={url} className={styles.link}>
          {children}
        </Link>
      );
    }
    return (
      <a href={url} className={styles.link} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  },
};

export default function ArticleBody({ body }: { body: string }) {
  return (
    <div className={styles.prose}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeSlug]}
        components={components}
      >
        {body}
      </ReactMarkdown>
    </div>
  );
}
