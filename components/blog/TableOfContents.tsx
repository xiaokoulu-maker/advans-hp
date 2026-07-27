import type { PostHeading } from '@/lib/blog/types';
import styles from './TableOfContents.module.css';

/** 記事の目次。id は本文見出し（rehype-slug 付与）と一致する */
export default function TableOfContents({ headings }: { headings: PostHeading[] }) {
  if (headings.length === 0) return null;

  return (
    <nav className={styles.toc} aria-label="目次">
      <span className={`${styles.label} font-en`}>CONTENTS</span>
      <ul className={styles.list}>
        {headings.map((h) => (
          <li
            key={h.id}
            className={`${styles.item} ${h.level === 3 ? styles.sub : ''}`}
          >
            <a href={`#${h.id}`} className={styles.link}>
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
