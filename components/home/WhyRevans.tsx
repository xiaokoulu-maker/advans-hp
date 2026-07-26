import Reveal from '@/components/Reveal';
import CountUp from '@/components/CountUp';
import SectionLabel from '@/components/ui/SectionLabel';
import { reasons, stats, statsNote } from '@/lib/data';
import styles from './WhyRevans.module.css';

export default function WhyRevans() {
  return (
    <section id="why" className={styles.section}>
      <div className={styles.inner}>
        <Reveal className={styles.head}>
          <SectionLabel en="WHY REVANS" title="選ばれる理由" />
        </Reveal>

        <div className={styles.grid}>
          {reasons.map((r, i) => (
            <Reveal key={r.title} index={i} className={styles.card}>
              <span className={styles.bar} aria-hidden />
              <span className={styles.title}>{r.title}</span>
              <span className={styles.body}>{r.body}</span>
            </Reveal>
          ))}
        </div>

        {/* 数値バー（カウントアップ）。数値はすべて仮値 */}
        <Reveal className={styles.stats}>
          {stats.map((st) => (
            <div key={st.label} className={styles.stat}>
              <span className={`${styles.value} font-en`}>
                <CountUp value={st.value} suffix={st.suffix} />
              </span>
              <span className={styles.statLabel}>{st.label}</span>
            </div>
          ))}
        </Reveal>
        <div className={styles.statsNote}>{statsNote}</div>
      </div>
    </section>
  );
}
