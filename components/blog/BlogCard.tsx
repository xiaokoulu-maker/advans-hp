import Link from 'next/link';
import { formatPostDate } from '@/lib/blog';
import type { BlogPostSummary } from '@/lib/blog/types';
import styles from './BlogCard.module.css';

/** 記事カード（一覧・関連記事で使用）。カード全体が記事ページへのリンク */
export default function BlogCard({ post }: { post: BlogPostSummary }) {
  return (
    <Link href={`/blog/${post.slug}`} className={styles.card}>
      <div className={styles.meta}>
        {post.category && <span className={`${styles.tag} font-en`}>{post.category}</span>}
        <time className={`${styles.date} font-en`} dateTime={post.publishedAt}>
          {formatPostDate(post.publishedAt)}
        </time>
      </div>
      <h3 className={styles.title}>{post.title}</h3>
      <p className={styles.excerpt}>{post.excerpt}</p>
      <span className={styles.more}>続きを読む →</span>
      <span className={styles.bar} aria-hidden />
    </Link>
  );
}
