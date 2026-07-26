import Reveal from '@/components/Reveal';
import SectionLabel from '@/components/ui/SectionLabel';
import styles from './Concept.module.css';

export default function Concept() {
  return (
    <section id="concept" className={styles.section}>
      <div className={styles.inner}>
        <Reveal>
          <SectionLabel en="CONCEPT" title="REVANSという名前" titleSize={27} />
        </Reveal>

        <div className={styles.right}>
          <Reveal className={`${styles.formula} font-en`} index={0}>
            <span className={styles.rev}>Revolution</span>
            <span className={styles.cross}>×</span>
            <span className={styles.adv}>Advance</span>
          </Reveal>

          <Reveal as="p" className={`${styles.body} pretty`} index={1}>
            革命と前進。REVANSは、制作だけを請け負う会社ではありません。集客の入口づくりから、広告・AI活用・営業の現場、そして採用まで。中小企業が本当に前へ進むために必要なものを、必要な順番で組み立てます。
          </Reveal>

          <Reveal className={styles.divider} index={2} />
        </div>
      </div>
    </section>
  );
}
