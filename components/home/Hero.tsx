import Button from '@/components/ui/Button';
import { chips } from '@/lib/data';
import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section id="top" className={styles.hero}>
      {/* 背景レイヤー（常時アニメ） */}
      <div className={styles.grid} aria-hidden />
      <div className={styles.orb} aria-hidden />
      <div className={styles.orb2} aria-hidden />
      <div className={styles.sweep} aria-hidden />

      {/*
        特大ウォーターマーク「REVANS」。ただし A は文字ではなく実物のロゴマークを
        はめ込み、REV / [実物A] / NS を1行に並べることで字間・位置を自動的に揃える。
        （字間・A の大きさ/縦位置は .wordmark の CSS 変数で微調整可能）
      */}
      <div className={styles.wordmark} aria-hidden>
        <span className={`${styles.wmText} font-en`}>REV</span>
        <span className={styles.aWrap}>
          <span className={styles.symbolGlow} />
          <svg className={styles.symbol} viewBox="0 0 54 80" fill="none">
            <polyline
              className={styles.draw}
              points="6,74 27,22 48,74"
              stroke="#4DA3FF"
              strokeWidth="11"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              strokeDasharray="220"
            />
            <g className={styles.arrow}>
              <line
                x1="13"
                y1="60"
                x2="43"
                y2="46"
                stroke="#FF6A2C"
                strokeWidth="10"
                strokeLinecap="round"
              />
              <polyline
                points="32,42 46,44 44,58"
                stroke="#FF6A2C"
                strokeWidth="9"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          </svg>
        </span>
        <span className={`${styles.wmText} font-en`}>NS</span>
      </div>

      <div className={styles.inner}>
        <div className={styles.left}>
          <div className={`${styles.eyebrow} ${styles.r0}`}>
            <span className={styles.eyeline} />
            <span className={`${styles.eyetext} font-en`}>WEB × AI × SALES SUPPORT</span>
          </div>

          <h1 className={`${styles.h1} ${styles.r1}`}>
            中小企業に、
            <br />
            <span className={styles.grad}>前進する革命</span>を。
          </h1>

          <p className={`${styles.lead} pretty ${styles.r2}`}>
            Web制作・広告・AI・営業支援を組み合わせて、集客と採用の課題を同時に動かします。作って終わりではなく、数字が動くまで一緒に前進する体制です。
          </p>

          <div className={`${styles.actions} ${styles.r3}`}>
            <Button href="/contact" variant="blue">
              無料で相談する
            </Button>
            <Button href="/#services" variant="ghost">
              事業内容を見る
            </Button>
          </div>

          <div className={`${styles.chips} ${styles.r4}`}>
            {chips.map((c) => (
              <span key={c} className={styles.chip}>
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
