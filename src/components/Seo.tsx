import { useEffect } from 'react';
import { SITE_URL, site } from '../config/site';

type Json = Record<string, unknown>;

function setMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

export type SeoProps = {
  title: string;
  description: string;
  /** Absolute or root-relative path, e.g. '/' or '/about' */
  path: string;
  keywords?: readonly string[];
  image?: string;
  /** Extra JSON-LD graph nodes for this page. */
  jsonLd?: Json[];
  noindex?: boolean;
};

/**
 * Per-page <head> manager: title, description, keywords, canonical,
 * Open Graph, Twitter cards and JSON-LD structured data.
 */
export function Seo({
  title,
  description,
  path,
  keywords = site.keywords,
  image,
  jsonLd,
  noindex,
}: SeoProps) {
  useEffect(() => {
    const url = path.startsWith('http') ? path : `${SITE_URL}${path}`;
    const img = image ?? site.ogImage.url;
    const fullTitle =
      title.includes(site.name) || title.includes('Lakshya')
        ? title
        : `${title} | ${site.fullName}`;

    document.title = fullTitle;

    setMeta('name', 'description', description);
    setMeta('name', 'keywords', keywords.join(', '));
    setMeta('name', 'author', site.fullName);
    setMeta('name', 'robots', noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');

    // Canonical
    setLink('canonical', url);

    // Open Graph
    setMeta('property', 'og:type', 'website');
    setMeta('property', 'og:site_name', site.fullName);
    setMeta('property', 'og:locale', site.locale);
    setMeta('property', 'og:title', fullTitle);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:url', url);
    setMeta('property', 'og:image', img);
    setMeta('property', 'og:image:width', String(site.ogImage.width));
    setMeta('property', 'og:image:height', String(site.ogImage.height));
    setMeta('property', 'og:image:alt', site.ogImage.alt);

    // Twitter / X
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', fullTitle);
    setMeta('name', 'twitter:description', description);
    setMeta('name', 'twitter:image', img);
    setMeta('name', 'twitter:creator', '@lakshya____malik');
  }, [title, description, path, image, noindex, keywords]);

  // Structured data
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-seo', 'page');
    script.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': jsonLd ?? [],
    });
    document.head.appendChild(script);
    return () => script.remove();
  }, [jsonLd, title, description, path]);

  return null;
}

/* ------------------------------------------------------------------ */
/*  Structured data builders                                           */
/* ------------------------------------------------------------------ */

export const personLd: Json = {
  '@type': 'Person',
  '@id': `${SITE_URL}/#person`,
  name: site.fullName,
  alternateName: site.name,
  url: SITE_URL,
  image: site.ogImage.url,
  jobTitle: site.role,
  description: site.description,
  email: `mailto:${site.contact.email}`,
  telephone: site.contact.phone,
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Barta',
    addressLocality: 'Kaithal',
    addressRegion: 'Haryana',
    postalCode: site.location.postalCode,
    addressCountry: site.location.addressCountry,
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: site.location.geoLat,
    longitude: site.location.geoLng,
  },
  sameAs: [site.social.linkedin, site.social.github, site.social.instagram],
  knowsAbout: [
    'Digital Marketing',
    'SEO',
    'Social Media Marketing',
    'Meta Ads',
    'Graphic Design',
    'Branding',
    'AI Web Development',
    'Content Creation',
    'Prompt Engineering',
    'Canva',
  ],
  worksFor: { '@type': 'Organization', name: 'Zedking Institute, Kaithal' },
};

export const websiteLd: Json = {
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  url: SITE_URL,
  name: site.fullName,
  description: site.description,
  inLanguage: site.lang,
  publisher: { '@id': `${SITE_URL}/#person` },
};

export const professionalServiceLd: Json = {
  '@type': 'ProfessionalService',
  '@id': `${SITE_URL}/#service`,
  name: `${site.fullName} — Digital Marketing, Design & AI Web Development`,
  description:
    'Freelance digital marketing, graphic design and AI web development services for local businesses and startups in Kaithal, Haryana and across India.',
  url: SITE_URL,
  image: site.ogImage.url,
  priceRange: '₹₹',
  founder: { '@id': `${SITE_URL}/#person` },
  telephone: site.contact.phone,
  email: site.contact.email,
  areaServed: [
    { '@type': 'City', name: 'Kaithal' },
    { '@type': 'State', name: 'Haryana' },
    { '@type': 'Country', name: 'India' },
  ],
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Barta',
    addressLocality: 'Kaithal',
    addressRegion: 'Haryana',
    postalCode: site.location.postalCode,
    addressCountry: 'IN',
  },
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ],
    opens: '10:00',
    closes: '20:00',
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Services',
    itemListElement: [
      'Digital Marketing (SEO, Social Media, Meta Ads)',
      'Graphic Design & Branding',
      'AI Web Development',
      'Content Creation & Copywriting',
    ].map((n) => ({
      '@type': 'Offer',
      itemOffered: { '@type': 'Service', name: n },
    })),
  },
};

export function breadcrumbLd(path: string, name: string): Json {
  const crumbs: Json[] = [
    { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
  ];
  if (path !== '/') {
    crumbs.push({ '@type': 'ListItem', position: 2, name, item: `${SITE_URL}${path}` });
  }
  return {
    '@type': 'BreadcrumbList',
    '@id': `${SITE_URL}${path}#breadcrumb`,
    itemListElement: crumbs,
  };
}

export function faqLd(
  items: Array<{ q: string; a: string }>
): Json {
  return {
    '@type': 'FAQPage',
    '@id': `${SITE_URL}/#faq`,
    mainEntity: items.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

export function itemListLd(path: string): Json {
  return {
    '@type': 'ItemList',
    '@id': `${SITE_URL}${path}#projects`,
    name: 'Projects by Lakshya Malik',
    itemListElement: site.projects.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'CreativeWork',
        name: p.name,
        description: p.description,
        url: p.url || SITE_URL,
        creator: { '@id': `${SITE_URL}/#person` },
      },
    })),
  };
}

/** Shared FAQ content — used by both the UI and FAQPage JSON-LD. */
export const FAQS = [
  {
    q: 'What services do you offer?',
    a: 'I do digital marketing, graphic design, AI web development and content creation, using AI tools to work faster and better.',
  },
  {
    q: 'Do you take freelance projects?',
    a: "Yes. I'm available for freelance projects and collaborations. Message me with what you need and we can take it from there.",
  },
  {
    q: 'How can I contact you?',
    a: `The fastest way is WhatsApp on ${site.contact.phone}. You can also email ${site.contact.email} or message me on LinkedIn or Instagram.`,
  },
  {
    q: 'What is digital marketing?',
    a: 'Digital marketing means promoting a business online through social media, search engines, ads, email and content, so it can reach more customers and grow.',
  },
  {
    q: 'What is Zedking Institute?',
    a: "Zedking Institute is a training institute in Kaithal, Haryana. I joined it after my 12th, and it is where I'm doing my digital marketing training.",
  },
  {
    q: 'What are you learning at Zedking Institute?',
    a: "I'm doing digital marketing training there. Alongside it, I work on graphic design and AI web development, and I use AI tools to make my work faster.",
  },
  {
    q: 'How much will it cost and how long will it take?',
    a: "It depends on the project. Send me your requirements on WhatsApp and I'll share the time and budget after understanding the work.",
  },
  {
    q: 'Why did you join Zedking Institute?',
    a: 'After my 12th, I joined Zedking Institute in Kaithal to start my journey in digital marketing and learn it with real, hands-on work.',
  },
  {
    q: 'Do you work with clients outside Kaithal?',
    a: 'Yes. I work remotely with clients across Haryana and the rest of India. Marketing, design and website work can all be done online.',
  },
  {
    q: 'Which tools and platforms do you use?',
    a: 'For marketing: Google Analytics, Search Console, Meta Business Suite, Canva and AI tools for content. For design: Canva and Figma. For websites: React, Tailwind CSS and AI-assisted development.',
  },
];