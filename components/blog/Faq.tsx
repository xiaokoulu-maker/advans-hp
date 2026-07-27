import type { FaqItem } from '@/lib/blog/types';
import styles from './Faq.module.css';

/**
 * 記事末尾の FAQ。ネイティブ <details>/<summary> で開閉（クライアント JS 不要）。
 * 構造化データ（FAQPage）は記事ページ側の JSON-LD で別途出力する。
 */
export default function Faq({ items }: { items: FaqItem[] }) {
  if (items.length === 0) return null;

  return (
    <div className={styles.faq}>
      {items.map((item) => (
        <details key={item.question} className={styles.item}>
          <summary className={styles.q}>
            <span className={`${styles.mark} font-en`}>Q</span>
            <span className={styles.qText}>{item.question}</span>
            <span className={styles.chevron} aria-hidden />
          </summary>
          <div className={styles.a}>
            <span className={`${styles.mark} ${styles.markA} font-en`}>A</span>
            <p className={styles.aText}>{item.answer}</p>
          </div>
        </details>
      ))}
    </div>
  );
}
