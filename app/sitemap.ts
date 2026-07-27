import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/site';
import { serviceDetails } from '@/lib/data';
import { getSitemapEntries } from '@/lib/blog';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  // 固定・サービスページ
  const staticPaths = [
    '',
    '/services',
    ...serviceDetails.map((s) => `/services/${s.slug}`),
    '/blog',
    '/company',
    '/contact',
  ];

  const staticEntries: MetadataRoute.Sitemap = staticPaths.map((path) => ({
    url: `${SITE.url}${path}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: path === '' ? 1 : 0.7,
  }));

  // ブログ記事（公開分のみ。lastModified は更新日/公開日）
  const posts = await getSitemapEntries();
  const postEntries: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${SITE.url}/blog/${p.slug}`,
    lastModified: new Date(p.lastModified),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  return [...staticEntries, ...postEntries];
}
