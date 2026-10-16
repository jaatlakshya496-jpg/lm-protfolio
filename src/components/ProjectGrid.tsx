import { motion } from 'motion/react';
import { ExternalLink, Gamepad2, Globe, ArrowUpRight } from 'lucide-react';
import { site } from '../config/site';

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

export function ProjectGrid() {
  const [school, snake] = site.projects;

  return (
    <motion.div
      className="grid"
      variants={staggerParent}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-60px' }}
    >
      <motion.a
        className="card flag project-card"
        variants={cardVariant}
        whileHover={{ y: -8, scale: 1.015 }}
        transition={{ type: 'spring', stiffness: 300, damping: 22 }}
        href={school.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${school.name} — open project in a new tab`}
      >
        <div className="preview browser">
          <div className="browser-bar">
            <i />
            <i />
            <i />
            <span>bvps-school.vercel.app</span>
          </div>
          <div className="browser-body">
            <div className="mock-nav" />
            <div className="mock-hero">
              <span>Bal Vikas Public School</span>
              <em>Admissions Open</em>
            </div>
            <div className="mock-row">
              <i />
              <i />
              <i />
            </div>
          </div>
          <span className="float-badge">
            <Globe size={13} /> Live
          </span>
        </div>
        <span className="tag">
          <span className="pulse-dot" />
          Live website
        </span>
        <h3>
          Bal Vikas Public School <ArrowUpRight size={18} className="arrow" />
        </h3>
        <p>
          A complete school website with information for parents and students, live
          on the web.
        </p>
        <div className="chips">
          <span>Website</span>
          <span>Education</span>
          <span>Vercel</span>
        </div>
        <span className="go">
          Visit site <ExternalLink size={14} />
        </span>
      </motion.a>

      <motion.a
        className="card project-card"
        variants={cardVariant}
        whileHover={{ y: -8, scale: 1.015 }}
        transition={{ type: 'spring', stiffness: 300, damping: 22 }}
        href="/contact"
        aria-label={`${snake.name} — ask about this project`}
      >
        <div className="preview game">
          <div className="snake-board">
            <div className="snake" />
            <div className="food" />
            <div className="food f2" />
          </div>
          <span className="float-badge">
            <Gamepad2 size={13} /> Playable
          </span>
        </div>
        <span className="tag">Game</span>
        <h3>
          Snake Adventure <Gamepad2 size={18} className="arrow" />
        </h3>
        <p>A browser snake game built as a single HTML file from a design spec.</p>
        <div className="chips">
          <span>HTML</span>
          <span>Game Design</span>
          <span>Fun Build</span>
        </div>
        <span className="go">Ask me about it</span>
      </motion.a>
    </motion.div>
  );
}