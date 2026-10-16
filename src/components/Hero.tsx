import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, MapPin, GraduationCap, Briefcase } from 'lucide-react';
import { site } from '../config/site';

const ROLES = ['Digital Marketer', 'Graphic Designer', 'AI Web Developer'];

const WHEEL_ITEMS = [
  'Digital Marketing',
  'Graphic Design',
  'AI Web Development',
  'Content Creation',
  'AI Tools',
  'Prompt Writing',
  'Game Design',
  'Freelancing',
  'Digital Marketing',
  'Graphic Design',
  'AI Web Development',
];

const MARQUEE = [
  'SEO',
  'Social Media',
  'Meta Ads',
  'Branding',
  'Canva Design',
  'AI Websites',
  'Content Writing',
  'Prompt Engineering',
];

/* ---------------- Typewriter ---------------- */
function useTypewriter(roles: readonly string[]) {
  const [text, setText] = useState(roles[0]);
  const idx = useRef(0);
  const char = useRef(roles[0].length);
  const deleting = useRef(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion:reduce)').matches) {
      setText(roles.join(' • '));
      return;
    }
    let t: number;
    const tick = () => {
      const current = roles[idx.current];
      if (!deleting.current) {
        char.current++;
        if (char.current >= current.length) {
          deleting.current = true;
          setText(current);
          t = window.setTimeout(tick, 1800);
          return;
        }
      } else {
        char.current--;
        if (char.current <= 0) {
          deleting.current = false;
          idx.current = (idx.current + 1) % roles.length;
          char.current = 0;
        }
      }
      setText(roles[idx.current].slice(0, char.current) || ' ');
      t = window.setTimeout(tick, deleting.current ? 45 : 85);
    };
    t = window.setTimeout(tick, 2000);
    return () => clearTimeout(t);
  }, [roles]);

  return text;
}

/* ---------------- Count up ---------------- */
export function CountUp({ to, suffix = '' }: { to: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    let raf = 0;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const dur = 1400;
        const step = (t: number) => {
          const p = Math.min(1, (t - start) / dur);
          setVal(Math.round((1 - Math.pow(1 - p, 3)) * to));
          if (p < 1) raf = requestAnimationFrame(step);
        };
        raf = requestAnimationFrame(step);
      },
      { threshold: 0.4 }
    );
    if (ref.current) io.observe(ref.current);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [to]);
  return (
    <span ref={ref}>
      {val}
      {suffix}
    </span>
  );
}

/* ---------------- Skills wheel ---------------- */
function Wheel() {
  const [wheelIndex, setWheelIndex] = useState(0);
  useEffect(() => {
    const total = 8;
    const id = window.setInterval(() => {
      setWheelIndex((prev) => {
        const next = prev + 1;
        if (next === total) {
          window.setTimeout(() => setWheelIndex(0), 650);
          return total;
        }
        return next;
      });
    }, 1800);
    return () => clearInterval(id);
  }, []);
  const idx = wheelIndex % WHEEL_ITEMS.length;
  return (
    <div className="wheel">
      <ul
        id="wl"
        style={{
          transform: `translateY(${44 - wheelIndex * 44}px)`,
          transition: wheelIndex === 0 ? 'none' : 'transform .6s cubic-bezier(.2,.8,.2,1)',
        }}
      >
        {WHEEL_ITEMS.map((item, i) => (
          <li key={i} className={i === idx && wheelIndex < 8 ? 'on' : ''}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ---------------- Summary card ---------------- */
export function SummaryCard() {
  return (
    <motion.div
      className="summary-card"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7 }}
    >
      <div className="summary-head">
        <span className="summary-badge">
          <Sparkles size={14} /> Brief Summary
        </span>
        <h3>Marketing that grows business — powered by AI.</h3>
      </div>
      <p className="big">
        I'm <b>Lakshya</b> from Barta, Kaithal (Haryana) — a Digital Marketer,
        Graphic Designer &amp; AI Web Developer. I help local businesses and
        startups get more customers through SEO, social media, ads, branding and
        fast, modern websites built with AI tools.
      </p>
      <p>
        Currently training at <b>Zedking Institute, Kaithal</b> and open for
        freelance work. My style is simple: clear design, honest marketing, and
        quick delivery. I also love game design — I built a browser snake game
        just for fun.
      </p>
      <div className="summary-grid">
        <div className="s-item">
          <MapPin size={17} />
          <div>
            <b>Based in</b>
            <span>Barta, Kaithal, Haryana</span>
          </div>
        </div>
        <div className="s-item">
          <GraduationCap size={17} />
          <div>
            <b>Training</b>
            <span>Zedking Institute — Digital Marketing</span>
          </div>
        </div>
        <div className="s-item">
          <Briefcase size={17} />
          <div>
            <b>Services</b>
            <span>Marketing • Design • AI Websites • Content</span>
          </div>
        </div>
        <div className="s-item">
          <span className="live-dot" />
          <div>
            <b>Status</b>
            <span>Available for freelance</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function Journey() {
  return (
    <ol className="path" id="path">
      <li>
        <b>After 12th</b>Joined Zedking Institute, Kaithal.
      </li>
      <li>
        <b>Digital marketing</b>Learning and doing real marketing work.
      </li>
      <li>
        <b>Graphic design &amp; AI web development</b>Building designs and
        websites with AI tools.
      </li>
    </ol>
  );
}

export function Marquee() {
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {[...MARQUEE, ...MARQUEE].map((m, i) => (
          <span key={i} className="mq-item">
            <Sparkles size={15} /> {m}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ---------------- Hero ---------------- */
export function Hero() {
  const roleText = useTypewriter(ROLES);
  return (
    <div className="hero">
      <div className="ghost" aria-hidden="true">
        AI
      </div>
      <div>
        <motion.div
          className="pill"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <span className="dot" />
          Available for freelance projects &amp; collaborations
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          I am Lakshya
        </motion.h1>
        <motion.p
          className="sub"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.32 }}
        >
          I'm a <b id="role">{roleText}</b>
          <span className="cur" />
          <br />
          from Kaithal, Haryana.
        </motion.p>
        <motion.p className="sr-only">
          {site.role} based in {site.location.address}. I help local businesses and
          startups grow with SEO, social media marketing, Meta ads, branding,
          graphic design and AI-built websites.
        </motion.p>
        <motion.div
          className="btns"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.44 }}
        >
          <a className="btn primary magnetic" href="/projects">
            View My Work
          </a>
          <a className="btn magnetic" href="/contact">
            Let's Talk
          </a>
        </motion.div>

        <motion.div
          className="mini-counts"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div>
            <b>
              <CountUp to={3} suffix="+" />
            </b>
            <span>Skills — Marketing, Design, AI Web</span>
          </div>
          <div>
            <b>
              <CountUp to={2} />
            </b>
            <span>Live Projects</span>
          </div>
          <div>
            <b>
              <CountUp to={100} suffix="%" />
            </b>
            <span>Freelance Ready</span>
          </div>
        </motion.div>
      </div>

      <motion.div
        className="visual"
        initial={{ opacity: 0, scale: 0.94, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.35 }}
      >
        <div className="pic">
          <div className="ring float-slow">
            <div className="avatar" role="img" aria-label="Lakshya Malik">
              L
            </div>
          </div>
          <Wheel />
        </div>
        <div className="stats">
          <div className="stat">
            <b>Marketing + AI</b>
            <span>My main focus</span>
          </div>
          <div className="stat">
            <b>2 Projects</b>
            <span>Website &amp; game</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}