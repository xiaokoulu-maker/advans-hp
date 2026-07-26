import Reveal from '@/components/Reveal';
import SectionLabel from '@/components/ui/SectionLabel';
import { works } from '@/lib/data';
import type { Work } from '@/lib/types';
import styles from './Works.module.css';

function CardInner({ w }: { w: Work }) {
  return (
    <>
      <div className={`${styles.thumb} ${w.comingSoon ? styles.soon : ''}`}>
        <span className={`${styles.slot} font-en`}>{w.slot}</span>
      </div>
      <div className={styles.text}>
        <span className={`${styles.tag} font-en`}>{w.tag}</span>
        <span className={styles.title}>{w.title}</span>
        <span className={styles.body}>{w.body}</span>
      </div>
    </>
  );
}

export default function Works() {
  return (
    <section id="works" className={styles.section}>
      <div className={styles.inner}>
        <Reveal className={styles.head}>
          <SectionLabel en="WORKS" title="制作事例" />
        </Reveal>

        <div className={styles.grid}>
          {works.map((w, i) => (
            <Reveal key={w.title} index={i} as="article" className={styles.card}>
              {w.url && !w.comingSoon ? (
                <a
                  href={w.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.link}
                >
                  <CardInner w={w} />
                </a>
              ) : (
                <div className={styles.link}>
                  <CardInner w={w} />
                </div>
              )}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
