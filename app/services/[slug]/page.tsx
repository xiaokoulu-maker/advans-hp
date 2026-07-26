import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Reveal from '@/components/Reveal';
import SectionLabel from '@/components/ui/SectionLabel';
import PageHero from '@/components/layout/PageHero';
import CtaBand from '@/components/CtaBand';
import ServiceCard from '@/components/service/ServiceCard';
import { serviceDetails, getServiceDetail, getServiceSummary } from '@/lib/data';
import styles from './page.module.css';

// 6件を静的生成
export function generateStaticParams() {
  return serviceDetails.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const d = getServiceDetail(slug);
  if (!d) return {};
  const title = `${d.title}`;
  const url = `/services/${d.slug}`;
  return {
    title,
    description: d.description,
    alternates: { canonical: url },
    openGraph: { url, title: `${title}｜REVANS`, description: d.description },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const d = getServiceDetail(slug);
  if (!d) notFound();

  const related = d.related.map((slug) => getServiceSummary(slug));

  return (
    <>
      <PageHero
        crumbs={[
          { label: 'ホーム', href: '/' },
          { label: '事業内容', href: '/services' },
          { label: d.title },
        ]}
        en={d.en}
        title={d.title}
        lead={d.description}
      />

      {/* ISSUES */}
      <section className={`${styles.sec} ${styles.alt}`}>
        <div className={styles.inner}>
          <Reveal>
            <SectionLabel en="ISSUES" title="こんなお悩みはありませんか？" />
          </Reveal>
          <div className={styles.g3}>
            {d.issues.map((it, i) => (
              <Reveal key={it.title} index={i} className={styles.issue}>
                <strong className={styles.issueTitle}>{it.title}</strong>
                <span className={styles.issueBody}>{it.body}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT WE DO */}
      <section className={styles.sec}>
        <div className={styles.inner}>
          <Reveal>
            <SectionLabel en="WHAT WE DO" title="REVANSが提供すること" />
          </Reveal>
          <div className={styles.g2}>
            {d.features.map((f, i) => (
              <Reveal key={f.no} index={i} className={styles.feature}>
                <span className={`${styles.num} font-en`}>{f.no}</span>
                <div>
                  <h3 className={styles.featTitle}>{f.title}</h3>
                  <p className={styles.featBody}>{f.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FLOW */}
      <section className={`${styles.sec} ${styles.alt}`}>
        <div className={styles.inner}>
          <Reveal>
            <SectionLabel en="FLOW" title="進め方" />
          </Reveal>
          <div className={styles.steps}>
            {d.flow.map((s, i) => (
              <Reveal key={s.title} index={i} className={styles.step}>
                <span className={`${styles.stepNo} font-en`}>{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <strong className={styles.stepTitle}>{s.title}</strong>
                  <span className={styles.stepBody}>{s.body}</span>
                </div>
              </Reveal>
            ))}
          </div>
          <p className={styles.note}>{d.note}</p>
        </div>
      </section>

      <CtaBand />

      {/* OTHER SERVICES */}
      <section className={styles.sec}>
        <div className={styles.inner}>
          <Reveal>
            <SectionLabel en="OTHER SERVICES" title="あわせて検討されるサービス" />
          </Reveal>
          <div className={styles.g3}>
            {related.map((r, i) => (
              <Reveal key={r.slug} index={i}>
                <ServiceCard item={r} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
