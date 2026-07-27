import Link from 'next/link';
import Logo from '@/components/Logo';
import { SITE } from '@/lib/site';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <div className={styles.brandCol}>
          <Logo size={21} />
          <p className={styles.desc}>
            {SITE.concept}
            <br />
            {SITE.tagline}
          </p>
        </div>

        <div className={styles.links}>
          <div className={styles.group}>
            <span className={`${styles.head} font-en`}>SITEMAP</span>
            <Link href="/company" className={styles.link}>
              REVANSについて
            </Link>
            <Link href="/#services" className={styles.link}>
              事業内容
            </Link>
            <Link href="/#works" className={styles.link}>
              制作事例
            </Link>
            <Link href="/blog" className={styles.link}>
              コラム
            </Link>
          </div>
          <div className={styles.group}>
            <span className={`${styles.head} font-en`}>CONTACT</span>
            <Link href="/contact" className={styles.link}>
              無料相談フォーム
            </Link>
            <span className={styles.muted}>{SITE.hours}</span>
          </div>
        </div>
      </div>

      <div className={styles.base}>
        <span>© REVANS</span>
        <span>
          {SITE.location} / {SITE.area}
        </span>
      </div>
    </footer>
  );
}
