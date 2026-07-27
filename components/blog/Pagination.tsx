import Link from 'next/link';
import styles from './Pagination.module.css';

type Props = {
  page: number;
  totalPages: number;
  /** リンク先の基底パス（既定 /blog）。?page=N を付与する */
  basePath?: string;
};

/** ページャ。page=1 は ?page を付けず正規URLへ寄せる */
function href(basePath: string, p: number) {
  return p <= 1 ? basePath : `${basePath}?page=${p}`;
}

/** 記事一覧のページネーション。totalPages<=1 のときは何も出さない */
export default function Pagination({ page, totalPages, basePath = '/blog' }: Props) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav className={styles.pager} aria-label="ページ送り">
      {page > 1 ? (
        <Link href={href(basePath, page - 1)} className={styles.arrow} aria-label="前のページ">
          ← 前へ
        </Link>
      ) : (
        <span className={`${styles.arrow} ${styles.disabled}`} aria-hidden>
          ← 前へ
        </span>
      )}

      <ul className={styles.nums}>
        {pages.map((p) => (
          <li key={p}>
            {p === page ? (
              <span className={`${styles.num} ${styles.current} font-en`} aria-current="page">
                {p}
              </span>
            ) : (
              <Link href={href(basePath, p)} className={`${styles.num} font-en`}>
                {p}
              </Link>
            )}
          </li>
        ))}
      </ul>

      {page < totalPages ? (
        <Link href={href(basePath, page + 1)} className={styles.arrow} aria-label="次のページ">
          次へ →
        </Link>
      ) : (
        <span className={`${styles.arrow} ${styles.disabled}`} aria-hidden>
          次へ →
        </span>
      )}
    </nav>
  );
}
