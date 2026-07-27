'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Logo from '@/components/Logo';
import styles from './Header.module.css';

// ナビは全ページ共通。トップの各セクションへはルート相対アンカーで戻す。
const NAV = [
  { href: '/#concept', label: 'REVANSについて' },
  { href: '/#services', label: '事業内容' },
  { href: '/#why', label: '選ばれる理由' },
  { href: '/#flow', label: 'ご依頼の流れ' },
  { href: '/#works', label: '制作事例' },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  // ドロワー展開中は背面スクロールをロック
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href="/" className={styles.brand} aria-label="REVANS トップへ" onClick={close}>
          <Logo size={23} />
        </Link>

        <button
          type="button"
          className={styles.toggle}
          aria-label="メニューを開閉"
          aria-expanded={open}
          aria-controls="global-nav"
          onClick={() => setOpen((v) => !v)}
        >
          <span className={`${styles.bar} ${open ? styles.barOpen1 : ''}`} />
          <span className={`${styles.bar} ${open ? styles.barOpen2 : ''}`} />
          <span className={`${styles.bar} ${open ? styles.barOpen3 : ''}`} />
        </button>

        {/* モバイル用オーバーレイ：開いている時だけDOMに存在させる。
            閉じている間は要素自体が無いので、iOS等でのヒットテスト奪取が起きない。 */}
        {open && <div className={styles.overlay} onClick={close} aria-hidden />}

        <nav
          id="global-nav"
          className={`${styles.nav} ${open ? styles.navOpen : ''}`}
          aria-label="グローバルナビゲーション"
        >
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} className={styles.link} onClick={close}>
              {item.label}
            </Link>
          ))}
          <Link href="/contact" className={styles.cta} onClick={close}>
            無料相談する
          </Link>
        </nav>
      </div>
    </header>
  );
}
