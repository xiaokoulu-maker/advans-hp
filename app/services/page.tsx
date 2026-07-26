import type { Metadata } from 'next';
import Reveal from '@/components/Reveal';
import PageHero from '@/components/layout/PageHero';
import CtaBand from '@/components/CtaBand';
import ServiceCard from '@/components/service/ServiceCard';
import { services, getServiceSummary } from '@/lib/data';
import styles from './list.module.css';

const DESC =
  'REVANSの事業内容。LP・ホームページ制作、MEO対策、AIブログ、広告運用・動画、AI接客・業務改善、採用・求人支援を、集客と採用の両輪で組み合わせて支援します。';

export const metadata: Metadata = {
  title: '事業内容',
  description: DESC,
  alternates: { canonical: '/services' },
  openGraph: { url: '/services', title: '事業内容｜REVANS', description: DESC },
};

export default function ServicesIndexPage() {
  const items = services.map((s) => getServiceSummary(s.slug));

  return (
    <>
      <PageHero
        crumbs={[{ label: 'ホーム', href: '/' }, { label: '事業内容' }]}
        en="SERVICE"
        title="事業内容"
        lead="お客様を集める集客も、働く仲間を集める採用も。課題から逆算して、必要な打ち手を必要な順番で組み立てます。"
      />
      <section className={styles.sec}>
        <div className={styles.inner}>
          <div className={styles.grid}>
            {items.map((item, i) => (
              <Reveal key={item.slug} index={i}>
                <ServiceCard item={item} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
