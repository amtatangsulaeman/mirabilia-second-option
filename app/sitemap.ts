import type { MetadataRoute } from 'next';
import { getPosts } from '@/lib/blog';
import { CENTRES, PROGRAMS, SITE_URL, offerActive } from '@/lib/data';
import { SQUAD_TOPICS } from '@/lib/squad';

const STATIC: [path: string, priority: number, freq: 'weekly' | 'monthly' | 'yearly'][] = [
  ['/', 1, 'weekly'],
  ['/centres', 0.9, 'monthly'],
  ['/book-a-tour', 0.9, 'monthly'],
  ['/enquire-now', 0.8, 'monthly'],
  ['/contact', 0.7, 'yearly'],
  ['/our-story', 0.7, 'yearly'],
  ['/our-philosophy', 0.6, 'yearly'],
  ['/our-curriculum', 0.7, 'yearly'],
  ['/a-day-at-mirabilia', 0.6, 'yearly'],
  ['/our-spaces', 0.6, 'yearly'],
  ['/squad-programs', 0.7, 'monthly'],
  ['/childcare-subsidy', 0.7, 'yearly'],
  ['/inclusive-care', 0.7, 'yearly'],
  ['/family-benefits', 0.6, 'yearly'],
  ['/careers', 0.6, 'monthly'],
  ['/blog', 0.7, 'weekly'],
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    ...(offerActive() ? [{ url: `${SITE_URL}/promotion`, lastModified: now, changeFrequency: 'weekly' as const, priority: 0.8 }] : []),
    ...STATIC.map(([path, priority, changeFrequency]) => ({
      url: path === '/' ? SITE_URL : `${SITE_URL}${path}`, lastModified: now, changeFrequency, priority,
    })),
    ...CENTRES.map((c) => ({
      url: `${SITE_URL}/${c.slug}`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.9,
      images: [`${SITE_URL}/photos/${c.hero[0]}`],
    })),
    ...PROGRAMS.map((p) => ({
      url: `${SITE_URL}/${p.slug}`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.6,
      images: [`${SITE_URL}/photos/${p.photo[0]}`],
    })),
    ...SQUAD_TOPICS.map((t) => ({
      url: `${SITE_URL}/squad-programs/${t.slug}`, lastModified: now, changeFrequency: 'yearly' as const, priority: 0.5,
      images: [`${SITE_URL}/photos/${t.photo[0]}`],
    })),
    ...getPosts().map((p) => ({
      url: `${SITE_URL}/blog/${p.slug}`, lastModified: new Date(p.updated ?? p.date), changeFrequency: 'yearly' as const, priority: 0.6,
      images: [`${SITE_URL}${p.image}`],
    })),
  ];
}
