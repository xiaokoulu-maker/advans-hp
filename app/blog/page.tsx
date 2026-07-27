import type { Metadata } from 'next';
import Reveal from '@/components/Reveal';
import PageHero from '@/components/layout/PageHero';
import CtaBand from '@/components/CtaBand';
import BlogCard from '@/components/blog/BlogCard';
import Pagination from '@/components/blog/Pagination';
import JsonLd from '@/components/blog/JsonLd';
import { getPosts } from '@/lib/blog';
import { SITE } from '@/lib/site';
import styles from './list.module.css';

const DESC =
  'REVANS（レバンス）のコラム。中小企業の集客・採用に役立つWeb制作・MEO・AI活用・広告・採用支援の実践的なノウハウを発信します。';

/** ?page=N を反映した canonical / title を返す */
export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}): Promise<Metadata> {
  const { page } = await searchParams;
  const p = Math.max(1, Number(page) || 1);
  const canonical = p > 1 ? `/blog?page=${p}` : '/blog';
  const title = p > 1 ? `コラム（${p}ページ目）` : 'コラム';
  return {
    title,
    description: DESC,
    alternates: { canonical },
    openGraph: { url: canonical, title: `${title}｜${SITE.name}`, description: DESC, type: 'website' },
  };
}

export default async function BlogIndexPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page } = await searchParams;
  const { posts, page: current, totalPages } = await getPosts(Number(page) || 1);

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'ホーム', item: SITE.url },
      { '@type': 'ListItem', position: 2, name: 'コラム', item: `${SITE.url}/blog` },
    ],
  };

  return (
    <>
      <JsonLd data={breadcrumbLd} />
      <PageHero
        crumbs={[{ label: 'ホーム', href: '/' }, { label: 'コラム' }]}
        en="COLUMN"
        title="コラム"
        lead="中小企業の集客と採用に役立つ、Web・MEO・AI・広告・採用支援の実践的なノウハウをお届けします。"
      />

      <section className={styles.sec}>
        <div className={styles.inner}>
          {posts.length > 0 ? (
            <div className={styles.grid}>
              {posts.map((post, i) => (
                <Reveal key={post.slug} index={i}>
                  <BlogCard post={post} />
                </Reveal>
              ))}
            </div>
          ) : (
            <p className={styles.empty}>記事は準備中です。近日公開いたします。</p>
          )}

          <Pagination page={current} totalPages={totalPages} />
        </div>
      </section>

      <CtaBand />
    </>
  );
}
