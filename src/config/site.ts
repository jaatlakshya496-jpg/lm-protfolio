/**
 * Central SEO / site configuration.
 * Change the domain + IDs here and it updates everywhere:
 * sitemap.xml, robots.txt, canonical tags, OG tags, JSON-LD, analytics.
 */

export const SITE_URL = 'https://lm-protfolio.vercel.app';

export const site = {
  url: SITE_URL,
  name: 'lakshya__malik',
  fullName: 'Lakshya Malik',
  role: 'Digital Marketer, Graphic Designer & AI Web Developer',
  tagline: 'AI-powered marketing that grows businesses',
  locale: 'en_IN',
  lang: 'en-IN',
  themeColor: '#0b0f14',
  bg: '#000000',
  accent: '#2be4a8',
  accent2: '#4aa8ff',
  avatarInitial: 'L',

  description:
    'Lakshya Malik is a Digital Marketer, Graphic Designer and AI Web Developer from Barta, Kaithal, Haryana. He helps local businesses and startups grow with SEO, social media, Meta ads, branding and fast AI-built websites.',

  keywords: [
    'Lakshya Malik',
    'Lakshya digital marketer',
    'digital marketer Kaithal',
    'digital marketing Kaithal Haryana',
    'freelance digital marketer Haryana',
    'graphic designer Kaithal',
    'AI web developer Kaithal',
    'SEO services Kaithal',
    'social media marketing Haryana',
    'Meta ads freelancer Haryana',
    'affordable website Kaithal',
    'small business marketing India',
    'Zedking Institute Kaithal',
    'AI website builder India',
    'canva graphic designer Haryana',
    'freelancer Kaithal',
    'hire digital marketer India',
    'content writing Kaithal',
    'branding designer Haryana',
  ],

  location: {
    addressLocality: 'Barta',
    addressRegion: 'Haryana',
    addressCountry: 'IN',
    postalCode: '136034',
    address: 'Barta, Kaithal, Haryana, India',
    geoLat: '29.7989',
    geoLng: '76.3819',
  },

  contact: {
    phone: '+91-96717-72205',
    phoneRaw: '919671772205',
    whatsapp: 'https://wa.me/919671772205',
    email: 'jaatlakshya496@gmail.com',
  },

  social: {
    linkedin: 'https://www.linkedin.com/in/lakshya-barta-a92b1941a',
    github: 'https://github.com/jaatlakshya496-jpg',
    instagram: 'https://www.instagram.com/lakshya____malik',
    whatsapp: 'https://wa.me/919671772205',
  },

  projects: [
    {
      name: 'Bal Vikas Public School',
      url: 'https://bvps-school.vercel.app',
      description:
        'A complete school website built for parents and students, live on the web — admissions, information sections and a clean, fast interface.',
      tags: ['Website', 'Education', 'Vercel'],
    },
    {
      name: 'Snake Adventure',
      url: '',
      description:
        'A browser snake game built as a single HTML file from a design spec — a personal game-design and front-end build.',
      tags: ['HTML', 'Game Design', 'Fun Build'],
    },
  ],

  /** Placeholder IDs — replace with your real ones to activate. */
  analytics: {
    ga4Id: 'G-XXXXXXXXXX', // Google Analytics 4
    gscVerification: 'YOUR_GOOGLE_SEARCH_CONSOLE_VERIFICATION_TOKEN', // google-site-verification
    bingVerification: '', // msvalidate.01
  },

  ogImage: {
    url: `${SITE_URL}/og-image.png`,
    width: 1200,
    height: 630,
    alt: 'Lakshya Malik — Digital Marketer, Graphic Designer & AI Web Developer from Kaithal, Haryana',
  },

  lastModified: new Date().toISOString().slice(0, 10),
} as const;

export type Site = typeof site;