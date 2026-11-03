import { motion } from 'motion/react';
import { ExternalLink, Gamepad2, Globe, ArrowUpRight } from 'lucide-react';
import { site } from '../config/site';
import { useEffect, useState } from 'react';

const PROJ_KEY = 'portfolio_projects';

const cardVariant = {
  hidden: { opacity: 0, y: 40, scale: 0.97 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.65, ease: [0.2, 0.8, 0.2, 1] as const },
  },
};

const staggerParent = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

function loadProjects() {
  try {
    const stored = localStorage.getItem(PROJ_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length) return parsed;
    }
  } catch {}
  return site.projects;
}

export function ProjectGrid() {
  const [projects, setProjects] = useState(loadProjects());

  useEffect(() => {
    const onStorage = () => setProjects(loadProjects());
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  if (!projects.length) return null;

  return (
    <motion.div
      className="grid"
      variants={staggerParent}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-60px' }}
    >
      {projects.map((project: any, idx: number) => {
        const hasImage = !!project.imgUrl;
        const isFirst = idx === 0;
        return (
          <motion.a
            key={(project.name || '') + idx}
            className={`card project-card${isFirst && !hasImage ? ' flag' : ''}`}
            variants={cardVariant}
            whileHover={{ y: -8, scale: 1.015 }}
            transition={{ type: 'spring', stiffness: 300, damping: 22 }}
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${project.name} — open project in a new tab`}
          >
            <div className={`preview ${hasImage ? 'browser' : isFirst ? 'browser' : 'bike-game'}`}>
              {hasImage ? (
                <img src={project.imgUrl} alt={project.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : isFirst ? (
                <div className="browser-body">
                  <div className="mock-nav" />
                  <div className="mock-hero">
                    <span>{project.name}</span>
                    <em>Live Project</em>
                  </div>
                  <div className="mock-row">
                    <i />
                    <i />
                    <i />
                  </div>
                </div>
              ) : (
                <div className="bike-scene" aria-hidden="true">
                  <span className="bike-sun" />
                  <span className="bike-ramp" />
                  <div className="bike-rider">
                    <i />
                    <b />
                  </div>
                  <span className="bike-track" />
                  <span className="bike-title">{(project.name || '').toUpperCase()}</span>
                  <span className="bike-subtitle">PROJECT</span>
                </div>
              )}
              <span className="float-badge">
                {hasImage || isFirst ? <Globe size={13} /> : <Gamepad2 size={13} />} Live
              </span>
            </div>
            <span className="tag">
              <span className="pulse-dot" />
              {Array.isArray(project.tags) && project.tags[0] ? project.tags[0] : isFirst ? 'Live website' : 'Project'}
            </span>
            <h3>
              {project.name} <ArrowUpRight size={18} className="arrow" />
            </h3>
            <p>{project.desc || project.description}</p>
            <div className="chips">
              {(Array.isArray(project.tags) && project.tags.length ? project.tags : ['Project']).map((tag: string, i: number) => (
                <span key={tag + i}>{tag}</span>
              ))}
            </div>
            <span className="go">
              {isFirst && !hasImage ? 'Visit site' : 'Visit project'} <ExternalLink size={14} />
            </span>
          </motion.a>
        );
      })}
  );
}