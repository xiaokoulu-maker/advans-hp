import Link from 'next/link';
import Reveal from '@/components/Reveal';
import SectionLabel from '@/components/ui/SectionLabel';
import { services } from '@/lib/data';
import styles from './Services.module.css';

export default function Services() {
  return (
    <section id="services" className={styles.section}>
      <div className={styles.inner}>
        <Reveal className={styles.head}>
          <SectionLabel en="SERVICE" title="事業内容" />
          <span className={styles.note}>お客様を集める集客も、働く仲間を集める採用も。</span>
        </Reveal>

        <div className={styles.grid}>
          {services.map((s, i) => (
            <Reveal key={s.slug} index={i} as="article" className={styles.card}>
              <Link href={`/services/${s.slug}`} className={styles.cardLink}>
                <div className={`${styles.no} font-en`}>{s.no}</div>
                <h3 className={styles.title}>{s.title}</h3>
                <p className={styles.body}>{s.body}</p>
                <span className={styles.bar} aria-hidden />
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
