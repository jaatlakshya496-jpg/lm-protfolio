import { motion } from 'motion/react';
import { Mail, Phone, MapPin } from 'lucide-react';
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
        description="Contact Lakshya Malik for digital marketing, SEO, social media, Meta ads, graphic design and AI web development."
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
          Got a marketing project, a design or a website to build? Neeche form bharo
          aur apna email ya phone number select karke submit karo.
        </p>

        <div className="contact-grid">
          <ContactForm />

          <aside className="cinfo" aria-label="Contact details">
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