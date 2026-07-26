import type { Metadata, Viewport } from 'next';
import { Noto_Sans_JP, Space_Grotesk } from 'next/font/google';
import { SITE } from '@/lib/site';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import MobileCta from '@/components/layout/MobileCta';
import './globals.css';

const noto = Noto_Sans_JP({
  subsets: ['latin'],
  weight: ['400', '500', '700', '900'],
  variable: '--font-noto',
  display: 'swap',
  preload: false, // 和文は字数が多く preload に不向き
});

const grotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-grotesk',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name}｜${SITE.concept}`,
    template: `%s｜${SITE.name}`,
  },
  description:
    'REVANS（レバンス）は、Web制作・広告・AI・営業支援・採用支援を組み合わせて中小企業の集客と採用を支援します。中小企業に、前進する革命を。',
  applicationName: SITE.name,
  openGraph: {
    type: 'website',
    siteName: SITE.name,
    locale: 'ja_JP',
    url: SITE.url,
    images: [{ url: SITE.ogImage, width: 1200, height: 630, alt: SITE.name }],
  },
  twitter: {
    card: 'summary_large_image',
  },
};

export const viewport: Viewport = {
  themeColor: '#0A1220',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" className={`${noto.variable} ${grotesk.variable}`}>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        <MobileCta />
      </body>
    </html>
  );
}
