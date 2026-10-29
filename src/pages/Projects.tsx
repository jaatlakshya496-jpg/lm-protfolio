import { motion } from 'motion/react';
import { Globe, Gamepad2 } from 'lucide-react';
import {
  Seo,
  personLd,
  breadcrumbLd,
  itemListLd,
  websiteLd,
} from '../components/Seo';
import { ProjectGrid } from '../components/ProjectGrid';
import { site } from '../config/site';

const STACK = [
  { k: 'Bal Vikas Public School', v: 'Website • React, Tailwind CSS, Vercel' },
  { k: 'Malik Bike Stunt 2D', v: 'Live 2D side-scrolling stunt game' },
  { k: 'Marketing Engine', v: 'SEO • Social Media • Meta Ads' },
  { k: 'Brand Kit', v: 'Logo • Social Creatives • Canva' },
];

export default function Projects() {
  return (
    <>
      <Seo
        title="Projects — Websites, Design & Marketing Work by Lakshya Malik"
        description="Selected work by Lakshya Malik, digital marketer and AI web developer in Kaithal, Haryana: a live school website, Malik Bike Stunt 2D, branding and marketing campaigns."
        path="/projects"
        jsonLd={[
          personLd,
          websiteLd,
          breadcrumbLd('/projects', 'Projects'),
          itemListLd('/projects'),
          {
            '@type': 'CollectionPage',
            '@id': `${site.url}/projects#webpage`,
            url: `${site.url}/projects`,
            name: 'Projects by Lakshya Malik',
            isPartOf: { '@id': `${site.url}/#website` },
            inLanguage: site.lang,
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
        <h1 className="t">Projects</h1>
        <p className="sec-sub" style={{ marginTop: 0 }}>
          Live websites, game builds, branding and marketing work. Hover for the 3D
          tilt, click to open.
        </p>
        <ProjectGrid />
      </motion.section>

      <motion.section
        className="rv"
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7 }}
      >
        <h2 className="t">Project Breakdown</h2>
        <div className="table-wrap">
          <table className="ptable">
            <caption className="sr-only">
              Projects built by Lakshya Malik with the tech used
            </caption>
            <thead>
              <tr>
                <th scope="col">Project</th>
                <th scope="col">Category &amp; Tech</th>
              </tr>
            </thead>
            <tbody>
              {STACK.map((r) => (
                <tr key={r.k}>
                  <th scope="row">{r.k}</th>
                  <td>{r.v}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.section>

      <motion.section
        className="rv"
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7 }}
      >
        <h2 className="t">Want something like this?</h2>
        <p className="sec-sub" style={{ marginTop: 0 }}>
          I take on freelance marketing, design and website projects for local
          businesses and startups.
        </p>
        <div className="btns">
          <a className="btn primary magnetic" href="/contact">
            Start a project
          </a>
          <a className="btn magnetic" href="https://bvps-school.vercel.app" target="_blank" rel="noopener noreferrer">
            <Globe size={16} /> See live site
          </a>
          <a className="btn magnetic" href={site.projects[1].url} target="_blank" rel="noopener noreferrer">
            <Gamepad2 size={16} /> Play live game
          </a>
        </div>
      </motion.section>
    </>
  );
}