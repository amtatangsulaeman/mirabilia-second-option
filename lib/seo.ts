import type { Metadata } from 'next';
import {
  CENTRES, EMAIL, HOURS, PHONE_E164, SITE_NAME, SITE_URL, TEAM,
  type Centre, type Program,
} from './data';

/** Per-page metadata with canonical URL, Open Graph and Twitter cards. */
export function pageMetadata({ title, description, path, image, article }: {
  title: string; description: string; path: string;
  /** A file in /public/photos, or a full path under /public such as /blog/first-day.jpg */
  image?: string;
  article?: { publishedTime: string; modifiedTime?: string; section?: string };
}): Metadata {
  const url = path === '/' ? SITE_URL : `${SITE_URL}${path}`;
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;
  const og = image ? (image.startsWith('/') ? image : `/photos/${image}`) : '/photos/hero-blocks.jpg';
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      ...(article ? { type: 'article', ...article } : { type: 'website' }),
      locale: 'en_AU',
      siteName: SITE_NAME,
      url,
      title: fullTitle,
      description,
      images: [{ url: og, alt: fullTitle }],
    },
    twitter: { card: 'summary_large_image', title: fullTitle, description, images: [og] },
  };
}

/* ------------------------------------------------------------ JSON-LD */

const ORG_ID = `${SITE_URL}/#organization`;

export function organizationLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': ORG_ID,
    name: 'Mirabilia Early Learning Education Centre & Kindergarten',
    alternateName: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    email: EMAIL,
    telephone: PHONE_E164,
    // sameAs: ['https://www.facebook.com/…', 'https://www.instagram.com/…'],  // TODO: add social profiles
    subOrganization: CENTRES.map((c) => ({ '@id': `${SITE_URL}/${c.slug}#childcare` })),
  };
}

export function websiteLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SITE_NAME,
    inLanguage: 'en-AU',
    publisher: { '@id': ORG_ID },
  };
}

export function childCareLd(c: Centre) {
  const director = TEAM[c.director];
  return {
    '@context': 'https://schema.org',
    '@type': 'ChildCare',
    '@id': `${SITE_URL}/${c.slug}#childcare`,
    name: `Mirabilia ${c.name}`,
    description: c.intro,
    url: `${SITE_URL}/${c.slug}`,
    image: [`${SITE_URL}/photos/${c.hero[0]}`, `${SITE_URL}/photos/${c.card[0]}`],
    telephone: PHONE_E164,
    email: EMAIL,
    parentOrganization: { '@id': ORG_ID },
    address: {
      '@type': 'PostalAddress',
      streetAddress: c.street,
      addressLocality: c.locality,
      addressRegion: 'WA',
      postalCode: c.postcode,
      addressCountry: 'AU',
    },
    ...(c.geo && { geo: { '@type': 'GeoCoordinates', latitude: c.geo.lat, longitude: c.geo.lng } }),
    // HOURS = 6:30am to 6:30pm. TODO: confirm weekdays with Mirabilia before launch.
    openingHoursSpecification: [{
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '06:30',
      closes: '18:30',
    }],
    employee: { '@type': 'Person', name: director.name, jobTitle: director.role },
    areaServed: { '@type': 'City', name: 'Perth' },
    hasMap: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${c.street} ${c.suburb}`)}`,
  };
}

export function programLd(p: Program, description: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `${p.name} at Mirabilia`,
    serviceType: 'Early childhood enrichment program',
    description,
    provider: { '@id': ORG_ID },
    areaServed: { '@type': 'City', name: 'Perth' },
    url: `${SITE_URL}/${p.slug}`,
    image: `${SITE_URL}/photos/${p.photo[0]}`,
  };
}

export function faqLd(items: [q: string, a: string][]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(([q, a]) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };
}

export function blogPostingLd(p: { slug: string; title: string; description: string; date: string; updated?: string; image: string; author: string; category: string }) {
  const url = `${SITE_URL}/blog/${p.slug}`;
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${url}#article`,
    headline: p.title,
    description: p.description,
    image: `${SITE_URL}${p.image}`,
    datePublished: p.date,
    dateModified: p.updated ?? p.date,
    articleSection: p.category,
    inLanguage: 'en-AU',
    mainEntityOfPage: url,
    author: p.author === 'The Mirabilia team' ? { '@id': ORG_ID } : { '@type': 'Person', name: p.author },
    publisher: { '@id': ORG_ID },
  };
}

/** One step of a breadcrumb trail, after Home. Shared by the visible trail and the JSON-LD. */
export type Crumb = [name: string, path: string];

export function breadcrumbLd(trail: Crumb[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [['Home', '/'] as [string, string], ...trail].map(([name, path], i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name,
      item: path === '/' ? SITE_URL : `${SITE_URL}${path}`,
    })),
  };
}

export { HOURS };
