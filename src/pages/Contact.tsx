import { motion } from 'motion/react';
import { Mail, Phone, MapPin, MessageCircle } from 'lucide-react';
import {
  Seo,
  personLd,
  professionalServiceLd,
  breadcrumbLd,
} from '../components/Seo';
import { ContactForm, SocialButtons } from '../components/ContactForm';
import { site } from '../config/site';

export default function Contact() {
  return (
    <>
      <Seo
        title="Contact Lakshya Malik — Hire a Digital Marketer in Kaithal, Haryana"
        description="Contact Lakshya Malik for digital marketing, SEO, social media, Meta ads, graphic design and AI web development. WhatsApp +91 96717 72205 or email jaatlakshya496@gmail.com."
        path="/contact"
        jsonLd={[
          personLd,
          professionalServiceLd,
          breadcrumbLd('/contact', 'Contact'),
          {
            '@type': 'ContactPage',
            '@id': `${site.url}/contact#webpage`,
            url: `${site.url}/contact`,
            name: 'Contact Lakshya Malik',
            isPartOf: { '@id': `${site.url}/#website` },
            mainEntity: { '@id': `${site.url}/#person` },
            inLanguage: site.lang,
          },
        ]}
      />

      <motion.section
        className="contact rv"
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        style={{ paddingTop: 24 }}
      >
        <h1 className="t">Let's talk</h1>
        <p>
          Got a marketing project, a design or a website to build? Neeche form bharo —
          submit karte hi aapka message seedha WhatsApp par pahunch jayega. You can
          also email, or check my code on{' '}
          <a href={site.social.github} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          .
        </p>

        <div className="contact-grid">
          <ContactForm />

          <aside className="cinfo" aria-label="Contact details">
            <div className="s-item">
              <MessageCircle size={17} />
              <div>
                <b>WhatsApp</b>
                <a href={site.social.whatsapp} target="_blank" rel="noopener noreferrer">
                  {site.contact.phone}
                </a>
              </div>
            </div>
            <div className="s-item">
              <Mail size={17} />
              <div>
                <b>Email</b>
                <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
              </div>
            </div>
            <div className="s-item">
              <Phone size={17} />
              <div>
                <b>Phone</b>
                <a href={`tel:${site.contact.phone}`}>{site.contact.phone}</a>
              </div>
            </div>
            <div className="s-item">
              <MapPin size={17} />
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
      </motion.section>
    </>
  );
}