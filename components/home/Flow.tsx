import Reveal from '@/components/Reveal';
import SectionLabel from '@/components/ui/SectionLabel';
import { flow } from '@/lib/data';
import styles from './Flow.module.css';

export default function Flow() {
  return (
    <section id="flow" className={styles.section}>
      <div className={styles.inner}>
        <Reveal className={styles.head}>
          <SectionLabel en="FLOW" title="ご依頼の流れ" />
        </Reveal>

        <div className={styles.grid}>
          {flow.map((f, i) => (
            <Reveal key={f.no} index={i} className={styles.card}>
              <span className={`${styles.no} font-en`}>{f.no}</span>
              <span className={styles.title}>{f.title}</span>
              <span className={styles.body}>{f.body}</span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
