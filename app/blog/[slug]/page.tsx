import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Reveal from '@/components/Reveal';
import SectionLabel from '@/components/ui/SectionLabel';
import PageHero from '@/components/layout/PageHero';
import CtaBand from '@/components/CtaBand';
import ArticleBody from '@/components/blog/ArticleBody';
import TableOfContents from '@/components/blog/TableOfContents';
import Faq from '@/components/blog/Faq';
import BlogCard from '@/components/blog/BlogCard';
import JsonLd from '@/components/blog/JsonLd';
import {
  getPostBySlug,
  getAllPublishedSlugs,
  getRelatedPosts,
  getHeadings,
  formatPostDate,
} from '@/lib/blog';
import { SITE } from '@/lib/site';
import styles from './page.module.css';

/** 公開記事を静的生成 */
export async function generateStaticParams() {
  const slugs = await getAllPublishedSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};

  const title = post.seoTitle ?? post.title;
  const description = post.metaDescription ?? post.excerpt;
  const url = `/blog/${post.slug}`;
  const image = post.coverImage ?? SITE.ogImage;

  return {
    title,
    description,
    keywords: post.targetKeywords,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      url,
      title: `${title}｜${SITE.name}`,
      description,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt ?? post.publishedAt,
      authors: [post.author ?? SITE.name],
      tags: post.targetKeywords,
      images: [{ url: image, width: 1200, height: 630, alt: post.title }],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const headings = getHeadings(post);
  const related = await getRelatedPosts(post);
  const url = `${SITE.url}/blog/${post.slug}`;
  const image = `${SITE.url}${post.coverImage ?? SITE.ogImage}`;

  // ── 構造化データ ──
  const articleLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    headline: post.title,
    description: post.metaDescription ?? post.excerpt,
    image,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    author: { '@type': 'Organization', name: post.author ?? SITE.name },
    publisher: {
      '@type': 'Organization',
      name: SITE.name,
      logo: { '@type': 'ImageObject', url: `${SITE.url}${SITE.ogImage}` },
    },
    ...(post.targetKeywords ? { keywords: post.targetKeywords.join(', ') } : {}),
  };

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'ホーム', item: SITE.url },
      { '@type': 'ListItem', position: 2, name: 'コラム', item: `${SITE.url}/blog` },
      { '@type': 'ListItem', position: 3, name: post.title, item: url },
    ],
  };

  const faqLd =
    post.faq && post.faq.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: post.faq.map((f) => ({
            '@type': 'Question',
            name: f.question,
            acceptedAnswer: { '@type': 'Answer', text: f.answer },
          })),
        }
      : null;

  return (
    <>
      <JsonLd data={articleLd} />
      <JsonLd data={breadcrumbLd} />
      {faqLd && <JsonLd data={faqLd} />}

      <PageHero
        crumbs={[
          { label: 'ホーム', href: '/' },
          { label: 'コラム', href: '/blog' },
          { label: post.title },
        ]}
        en={post.category ?? 'COLUMN'}
        title={post.title}
        lead={post.summary ?? post.excerpt}
      />

      <section className={styles.sec}>
        <div className={styles.layout}>
          {/* サイドバー（目次）。モバイルでは本文の上に来る */}
          {headings.length > 0 && (
            <aside className={styles.aside}>
              <div className={styles.stickyToc}>
                <TableOfContents headings={headings} />
              </div>
            </aside>
          )}

          <article className={styles.article}>
            <div className={styles.metaRow}>
              <time className={`${styles.date} font-en`} dateTime={post.publishedAt}>
                {formatPostDate(post.publishedAt)}
              </time>
              {post.category && <span className={`${styles.cat} font-en`}>{post.category}</span>}
            </div>

            <ArticleBody body={post.body} />

            {post.faq && post.faq.length > 0 && (
              <div className={styles.faqBlock}>
                <SectionLabel en="FAQ" title="よくある質問" titleSize={26} />
                <div className={styles.faqInner}>
                  <Faq items={post.faq} />
                </div>
              </div>
            )}
          </article>
        </div>
      </section>

      <CtaBand body={post.ctaText} />

      {related.length > 0 && (
        <section className={styles.related}>
          <div className={styles.relatedInner}>
            <Reveal>
              <SectionLabel en="RELATED" title="関連記事" />
            </Reveal>
            <div className={styles.relatedGrid}>
              {related.map((r, i) => (
                <Reveal key={r.slug} index={i}>
                  <BlogCard post={r} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
