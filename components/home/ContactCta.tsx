import Reveal from '@/components/Reveal';
import Button from '@/components/ui/Button';
import { SITE } from '@/lib/site';
import styles from './ContactCta.module.css';

export default function ContactCta() {
  return (
    <section id="contact" className={styles.section}>
      <div className={styles.gridLayer} aria-hidden />
      <div className={styles.glow} aria-hidden />

      <Reveal className={styles.inner}>
        <span className={`${styles.label} font-en`}>CONTACT</span>
        <h2 className={styles.title}>まず、現状の数字を一緒に見ませんか。</h2>
        <p className={styles.body}>
          相談は無料です。今の集客・採用の状況をお聞きして、やるべき順番だけでもお持ち帰りいただけます。
        </p>
        <div className={styles.actions}>
          <Button href="/contact" variant="orange" size="lg">
            無料で相談する
          </Button>
          <Button href={`mailto:${SITE.email}`} variant="ghost" size="lg">
            メールで相談する
          </Button>
        </div>
      </Reveal>
    </section>
  );
}
