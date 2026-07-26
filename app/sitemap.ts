import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/site';
import { serviceDetails } from '@/lib/data';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const paths = [
    '',
    '/services',
    ...serviceDetails.map((s) => `/services/${s.slug}`),
    '/company',
    '/contact',
  ];

  return paths.map((path) => ({
    url: `${SITE.url}${path}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: path === '' ? 1 : 0.7,
  }));
}
