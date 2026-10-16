import { motion } from 'motion/react';
import {
  Seo,
  personLd,
  professionalServiceLd,
  breadcrumbLd,
  faqLd,
  FAQS,
} from '../components/Seo';
import { SummaryCard, Journey } from '../components/Hero';
import { Faq } from '../components/Faq';
import { site } from '../config/site';

const SKILLS = [
  {
    title: 'SEO',
    text: 'On-page SEO, keyword research, technical fixes and content that ranks — so customers find you on Google.',
  },
  {
    title: 'Social Media Marketing',
    text: 'Instagram, Facebook and LinkedIn content calendars, reels, stories and community management that build a real audience.',
  },
  {
    title: 'Meta Ads',
    text: 'Facebook and Instagram ad campaigns — targeting, creatives, testing and optimisation focused on actual leads and sales.',
  },
  {
    title: 'Branding & Graphic Design',
    text: 'Logos, social media creatives, posters, brochures and complete brand identity built in Canva and Figma.',
  },
  {
    title: 'AI Web Development',
    text: 'Fast, modern, mobile-friendly websites built with React and Tailwind CSS, accelerated with AI tools.',
  },
  {
    title: 'Content & Prompt Writing',
    text: 'Captions, blog posts, ad copy and prompt engineering so your content sounds like you — only faster.',
  },
];

const TOOLS = [
  'Canva',
  'Figma',
  'React',
  'Tailwind CSS',
  'Google Analytics',
  'Search Console',
  'Meta Business Suite',
  'ChatGPT',
  'Photoshop',
  'CapCut',
];

export default function About() {
  return (
    <>
      <Seo
        title="About Lakshya Malik — Digital Marketer from Kaithal, Haryana"
        description="Meet Lakshya Malik, a digital marketer, graphic designer and AI web developer from Barta, Kaithal. Trained at Zedking Institute, available for freelance marketing, design and website work."
        path="/about"
        jsonLd={[
          personLd,
          professionalServiceLd,
          breadcrumbLd('/about', 'About'),
          faqLd(FAQS),
          {
            '@type': 'AboutPage',
            '@id': `${site.url}/about#webpage`,
            url: `${site.url}/about`,
            name: 'About Lakshya Malik',
            isPartOf: { '@id': `${site.url}/#website` },
            mainEntity: { '@id': `${site.url}/#person` },
            inLanguage: site.lang,
          },
          {
            '@type': 'ItemList',
            '@id': `${site.url}/about#skills`,
            name: 'Skills of Lakshya Malik',
            itemListElement: SKILLS.map((s, i) => ({
              '@type': 'ListItem',
              position: i + 1,
              name: s.title,
              description: s.text,
            })),
          },
        ]}
      />

      <motion.section
        className="rv"
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        style={{ paddingTop: 24 }}
      >
        <h1 className="t">About Me</h1>
        <p className="sec-sub" style={{ marginTop: 0 }}>
          Digital marketer, designer and AI web developer — based in Barta, Kaithal.
        </p>
        <SummaryCard />
        <Journey />
      </motion.section>

      <motion.section
        className="rv"
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7 }}
      >
        <h2 className="t">Skills &amp; Services</h2>
        <p className="sec-sub">
          What I actually do — marketing, design and websites, all in one place.
        </p>
        <div className="grid">
          {SKILLS.map((s) => (
            <article className="card" key={s.title}>
              <span className="tag">{s.title}</span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </article>
          ))}
        </div>
      </motion.section>

      <motion.section
        className="rv"
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7 }}
      >
        <h2 className="t">Tools I Use</h2>
        <div className="chips" style={{ marginTop: 6 }}>
          {TOOLS.map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
      </motion.section>

      <section id="faq" className="rv">
        <h2 className="t">FAQ</h2>
        <Faq />
      </section>
    </>
  );
}