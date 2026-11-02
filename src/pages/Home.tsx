import { motion } from 'motion/react';
import { Seo, personLd, websiteLd, professionalServiceLd, faqLd, FAQS } from '../components/Seo';
import { Hero, Marquee, SummaryCard, Journey } from '../components/Hero';
import { ProjectGrid } from '../components/ProjectGrid';
import { Faq } from '../components/Faq';
import { ContactForm, SocialButtons } from '../components/ContactForm';
import { site } from '../config/site';

export default function Home() {
  return (
    <>
      <Seo
        title="Lakshya Malik — Digital Marketer, Graphic Designer & AI Web Developer in Kaithal, Haryana"
        description="Lakshya Malik is a freelance digital marketer, graphic designer and AI web developer from Barta, Kaithal, Haryana. I grow local businesses with SEO, social media, Meta ads, branding and fast AI-built websites."
        path="/"
        jsonLd={[
          personLd,
          websiteLd,
          professionalServiceLd,
          faqLd(FAQS),
          {
            '@type': 'WebPage',
            '@id': `${site.url}/#webpage`,
            url: `${site.url}/`,
            name: 'Lakshya Malik — Digital Marketer, Graphic Designer & AI Web Developer',
            isPartOf: { '@id': `${site.url}/#website` },
            about: { '@id': `${site.url}/#person` },
            inLanguage: site.lang,
          },
        ]}
      />

      <Hero />
      <Marquee />

      <motion.section
        id="about"
        className="about rv"
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7 }}
      >
        <h2 className="t">About</h2>
        <SummaryCard />
        <Journey />
        <p style={{ marginTop: 26 }}>
          <a className="btn magnetic" href="/about">
            Read my full story
          </a>
        </p>
      </motion.section>

      <section id="projects" className="rv">
        <h2 className="t">Projects</h2>
        <p className="sec-sub">
          Har project live hai — hover karo, 3D tilt + shine dekho. Click karke kholo.
        </p>
        <ProjectGrid />
        <p style={{ marginTop: 24 }}>
          <a className="btn magnetic" href="/projects">
            See all work
          </a>
        </p>
      </section>

      <section id="faq" className="rv">
        <h2 className="t">FAQ</h2>
        <Faq limit={6} />
        <p style={{ marginTop: 22 }}>
          <a href="/about#faq">See all questions</a>
        </p>
      </section>

      <section id="contact" className="contact rv">
        <h2 className="t">Contact</h2>
        <p>Get in touch for your project.</p>
        <div className="contact-grid">
          <ContactForm />
          <aside className="cinfo" aria-label="Contact details">
            <div className="s-item">
              <div>
                <b>Email</b>
                <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
              </div>
            </div>
            <div className="s-item">
              <div>
                <b>Phone</b>
                <a href={`tel:${site.contact.phone}`}>{site.contact.phone}</a>
              </div>
            </div>
            <div className="s-item">
              <div>
                <b>Based in</b>
                <span>{site.location.address}</span>
              </div>
            </div>
            <div className="s-item">
              <span className="live-dot" />
              <div>
                <b>Availability</b>
                <span>Available for freelance projects</span>
              </div>
            </div>
          </aside>
        </div>
        <SocialButtons />
      </section>
    </>
  );
}