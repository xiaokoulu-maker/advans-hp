import type { Metadata } from 'next';
import Reveal from '@/components/Reveal';
import SectionLabel from '@/components/ui/SectionLabel';
import PageHero from '@/components/layout/PageHero';
import CtaBand from '@/components/CtaBand';
import { SITE } from '@/lib/site';
import styles from './page.module.css';

const DESC =
  'REVANS（レバンス）の理念と概要。Revolution×Advance＝中小企業に、前進する革命を。集客・採用・AI活用を一つの窓口で支援します。';

export const metadata: Metadata = {
  title: 'REVANSについて',
  description: DESC,
  alternates: { canonical: '/company' },
  openGraph: { url: '/company', title: 'REVANSについて｜REVANS', description: DESC },
};

const POLICIES = [
  {
    tag: 'POLICY 01',
    title: '実測主義',
    body: '提案も報告も、検索順位・表示回数・クリックなどの実測データが根拠。感覚では動きません。',
  },
  {
    tag: 'POLICY 02',
    title: '誇大表現をしない',
    body: '効果の保証はしません。できること・できないこと・時間がかかることを、契約前に率直にお伝えします。',
  },
  {
    tag: 'POLICY 03',
    title: '資産を残す',
    body: '広告のように止めたら消える施策だけでなく、サイト・検索順位・口コミといった「貴社に残る資産」を育てます。',
  },
];

const OVERVIEW: { th: string; td: React.ReactNode }[] = [
  { th: '屋号', td: 'REVANS（レバンス）' },
  { th: '所在地', td: `${SITE.location}（${SITE.area}）` },
  {
    th: '事業内容',
    td: 'LP・ホームページ制作 / MEO対策（Googleマップ集客） / AIブログ（SEO記事の自動運用） / 広告運用・動画クリエイティブ / AI接客・AI業務改善 / 採用・求人支援',
  },
  {
    th: '連絡先',
    td: (
      <a className={styles.inlineLink} href={`mailto:${SITE.email}`}>
        {SITE.email}
      </a>
    ),
  },
  { th: '対応時間', td: 'お問い合わせは24時間受付（返信は順次）' },
];

export default function CompanyPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: 'ホーム', href: '/' }, { label: 'REVANSについて' }]}
        en="ABOUT"
        title="REVANSについて"
        lead="REVANS ＝ Revolution（革命）× Advance（前進）。中小企業の現場に、実装ベースの変化を届けます。"
      />

      {/* MISSION */}
      <section className={styles.sec}>
        <div className={styles.inner}>
          <Reveal>
            <SectionLabel en="MISSION" title="中小企業に、前進する革命を。" titleSize={30} />
          </Reveal>
          <Reveal as="p" className={`${styles.mission} pretty`} index={1}>
            大企業には専門部署がある。広告代理店も、制作会社も、AI導入のコンサルも雇える。しかし多くの中小企業では、集客も採用もAI活用も、全部が「本業の合間」に置かれたままです。REVANSは、その全部を一人の窓口で引き受けるために作られました。Webを作る会社でも、広告を回すだけの会社でもなく、課題から逆算して必要な打ち手を組み合わせる。数字で提案し、数字で報告する。それが私たちの言う「前進する革命」です。
          </Reveal>
          <div className={styles.policies}>
            {POLICIES.map((p, i) => (
              <Reveal key={p.tag} index={i} className={styles.policy}>
                <span className={`${styles.policyTag} font-en`}>{p.tag}</span>
                <h3 className={styles.policyTitle}>{p.title}</h3>
                <p className={styles.policyBody}>{p.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* OVERVIEW */}
      <section className={`${styles.sec} ${styles.alt}`}>
        <div className={styles.inner}>
          <Reveal className={styles.ovHead}>
            <SectionLabel en="OVERVIEW" title="概要" />
          </Reveal>
          <Reveal as="dl" className={styles.spec}>
            {OVERVIEW.map((row) => (
              <div key={row.th} className={styles.specRow}>
                <dt className={styles.specTh}>{row.th}</dt>
                <dd className={styles.specTd}>{row.td}</dd>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
