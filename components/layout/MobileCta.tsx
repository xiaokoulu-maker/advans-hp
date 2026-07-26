import Link from 'next/link';
import styles from './MobileCta.module.css';

/**
 * モバイル（<768px）でのみ画面下部に固定表示する「無料相談する」ボタン。
 * README「レスポンシブ」節：問い合わせを取りやすくするための常時導線。
 */
export default function MobileCta() {
  return (
    <div className={styles.bar} aria-hidden={false}>
      <Link href="/contact" className={styles.button}>
        無料相談する
      </Link>
    </div>
  );
}
