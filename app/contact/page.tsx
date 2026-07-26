import type { Metadata } from 'next';
import PageHero from '@/components/layout/PageHero';
import ContactForm from '@/components/contact/ContactForm';
import styles from './page.module.css';

const DESC =
  'REVANSへの無料相談・お見積り依頼はこちら。集客・採用・AI活用の課題をお聞かせください。1〜2営業日以内にメールでご返信します。';

export const metadata: Metadata = {
  title: 'お問い合わせ',
  description: DESC,
  alternates: { canonical: '/contact' },
  openGraph: { url: '/contact', title: 'お問い合わせ｜REVANS', description: DESC },
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: 'ホーム', href: '/' }, { label: 'お問い合わせ' }]}
        en="CONTACT"
        title="お問い合わせ"
        lead="無料相談・お見積りのご依頼はこちらから。1〜2営業日以内にメールでご返信します。"
      />
      <section className={styles.sec}>
        <div className={styles.inner}>
          <ContactForm />
        </div>
      </section>
    </>
  );
}
