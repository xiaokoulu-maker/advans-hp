import Link from 'next/link';
import type { ServiceSummary } from '@/lib/data';
import styles from './ServiceCard.module.css';

/** サービスカード（一覧・OTHER SERVICES で使用）。カード全体が詳細ページへのリンク */
export default function ServiceCard({ item }: { item: ServiceSummary }) {
  return (
    <Link href={`/services/${item.slug}`} className={styles.card}>
      <span className={`${styles.tag} font-en`}>{item.en}</span>
      <h3 className={styles.title}>{item.title}</h3>
      <p className={styles.body}>{item.body}</p>
      <span className={styles.more}>詳しく見る →</span>
      <span className={styles.bar} aria-hidden />
    </Link>
  );
}
