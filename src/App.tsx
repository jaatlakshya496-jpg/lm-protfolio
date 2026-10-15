/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import {
  MapPin,
  GraduationCap,
  Sparkles,
  Briefcase,
  ExternalLink,
  Gamepad2,
  Globe,
  ArrowUpRight,
  Send,
} from 'lucide-react';

const WHATSAPP_NUMBER = '919671772205';

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.2, 0.8, 0.2, 1] as const },
  }),
};

const staggerParent = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 40, scale: 0.97 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.65, ease: [0.2, 0.8, 0.2, 1] as const },
  },
};

function CountUp({ to, suffix = '' }: { to: number; suffix?: string }) {
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
          const eased = 1 - Math.pow(1 - p, 3);
          setVal(Math.round(eased * to));
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

export default function App() {
  const [roleText, setRoleText] = useState('Digital Marketer');
  const roleIndexRef = useRef(0);
  const charIndexRef = useRef('Digital Marketer'.length);
  const deletingRef = useRef(false);
  const wheelIndexRef = useRef(0);
  const [wheelIndex, setWheelIndex] = useState(0);
  const starsContainerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<HTMLOListElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Contact form state
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const lines = [
      `Hi Lakshya! I found your portfolio.`,
      ``,
      `Name: ${form.name.trim()}`,
      form.email.trim() ? `Email: ${form.email.trim()}` : null,
      ``,
      `Message:`,
      form.message.trim(),
    ].filter((l): l is string => l !== null);

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      lines.join('\n')
    )}`;

    // Open WhatsApp (desktop app ya web) — message user ke saath pehle se likha hua
    window.open(url, '_blank', 'noopener,noreferrer');

    setSent(true);
    window.setTimeout(() => setSent(false), 4000);
    setForm({ name: '', email: '', message: '' });
  };

  // Typewriter effect
  useEffect(() => {
    const roles = ['Digital Marketer', 'Graphic Designer', 'AI Web Developer'];
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion:reduce)').matches;
    if (prefersReducedMotion) return;

    let timeoutId: number;

    const tick = () => {
      const currentRole = roles[roleIndexRef.current];
      if (!deletingRef.current) {
        charIndexRef.current++;
        if (charIndexRef.current >= currentRole.length) {
          deletingRef.current = true;
          setRoleText(currentRole);
          timeoutId = window.setTimeout(tick, 1800);
          return;
        }
      } else {
        charIndexRef.current--;
        if (charIndexRef.current <= 0) {
          deletingRef.current = false;
          roleIndexRef.current = (roleIndexRef.current + 1) % roles.length;
          charIndexRef.current = 0;
        }
      }

      setRoleText(roles[roleIndexRef.current].slice(0, charIndexRef.current) || ' ');
      timeoutId = window.setTimeout(tick, deletingRef.current ? 45 : 85);
    };

    timeoutId = window.setTimeout(tick, 2000);
    return () => clearTimeout(timeoutId);
  }, []);

  // Wheel animation
  useEffect(() => {
    const totalItems = 8;
    const interval = window.setInterval(() => {
      setWheelIndex((prev) => {
        const next = prev + 1;
        wheelIndexRef.current = next;
        if (next === totalItems) {
          setTimeout(() => {
            setWheelIndex(0);
            wheelIndexRef.current = 0;
          }, 650);
        }
        return next;
      });
    }, 1800);

    return () => clearInterval(interval);
  }, []);

  // Stars and shooting stars generator
  useEffect(() => {
    const st = starsContainerRef.current;
    if (!st || st.children.length > 0) return;

    for (let q = 0; q < 90; q++) {
      const u = document.createElement('u');
      const z = Math.random() * 2.4 + 1;
      u.style.cssText = `left:${Math.random() * 100}%;top:${Math.random() * 100}%;width:${z}px;height:${z}px;--t:${2.5 + Math.random() * 4}s;--dl:-${Math.random() * 6}s;`;
      st.appendChild(u);
    }

    for (let r = 0; r < 3; r++) {
      const d = document.createElement('div');
      d.className = 'shoot';
      d.style.cssText = `left:${5 + r * 28}%;top:${4 + r * 10}%;animation-delay:${r * 2.6 + 1}s;animation-duration:${8 + r * 3}s;`;
      st.appendChild(d);
    }
  }, []);

  // IntersectionObserver for reveal elements & scroll progress bar & pointer move
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    document.querySelectorAll('.rv, #path').forEach((n) => io.observe(n));

    const bar = document.getElementById('bar');
    const handleScroll = () => {
      if (!bar) return;
      const h = document.documentElement;
      const progress = (h.scrollTop / (h.scrollHeight - h.clientHeight || 1)) * 100;
      bar.style.width = `${progress}%`;
    };

    const handlePointerMove = (e: PointerEvent) => {
      document.documentElement.style.setProperty('--sx', `${e.clientX}px`);
      document.documentElement.style.setProperty('--sy', `${e.clientY}px`);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('pointermove', handlePointerMove, { passive: true });

    const cards = document.querySelectorAll('.card');
    const handleCardPointer = (c: Element) => (e: Event) => {
      const pe = e as PointerEvent;
      const r = c.getBoundingClientRect();
      (c as HTMLElement).style.setProperty('--mx', `${pe.clientX - r.left}px`);
      (c as HTMLElement).style.setProperty('--my', `${pe.clientY - r.top}px`);
      // 3D tilt
      const rx = ((pe.clientY - r.top) / r.height - 0.5) * -8;
      const ry = ((pe.clientX - r.left) / r.width - 0.5) * 10;
      (c as HTMLElement).style.setProperty('--rx', `${rx}deg`);
      (c as HTMLElement).style.setProperty('--ry', `${ry}deg`);
    };
    const resetTilt = (c: Element) => () => {
      (c as HTMLElement).style.setProperty('--rx', `0deg`);
      (c as HTMLElement).style.setProperty('--ry', `0deg`);
    };

    const cardCleanups: Array<() => void> = [];
    cards.forEach((c) => {
      const handler = handleCardPointer(c);
      const leave = resetTilt(c);
      c.addEventListener('pointermove', handler);
      c.addEventListener('pointerleave', leave);
      cardCleanups.push(() => {
        c.removeEventListener('pointermove', handler);
        c.removeEventListener('pointerleave', leave);
      });
    });

    return () => {
      io.disconnect();
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('pointermove', handlePointerMove);
      cardCleanups.forEach((cleanup) => cleanup());
    };
  }, []);

  // Header shrink state + auto-close mobile menu on resize
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    const mq = window.matchMedia('(min-width:721px)');
    const onResize = () => {
      if (mq.matches) setMenuOpen(false);
    };
    mq.addEventListener('change', onResize);

    return () => {
      window.removeEventListener('scroll', onScroll);
      mq.removeEventListener('change', onResize);
    };
  }, []);

  const wheelItems = [
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

  const marquee = [
    'SEO',
    'Social Media',
    'Meta Ads',
    'Branding',
    'Canva Design',
    'AI Websites',
    'Content Writing',
    'Prompt Engineering',
  ];

  return (
    <>
      <div id="bar"></div>
      <div className="lights" aria-hidden="true">
        <i></i><i></i><i></i><i></i><i></i>
        <b></b><b></b><b></b>
        <s style={{ left: '8%', top: '22%' }}></s>
        <s style={{ left: '18%', top: '70%', animationDelay: '-1s' }}></s>
        <s style={{ left: '27%', top: '38%', animationDelay: '-2s' }}></s>
        <s style={{ left: '36%', top: '84%', animationDelay: '-.5s' }}></s>
        <s style={{ left: '45%', top: '14%', animationDelay: '-3s' }}></s>
        <s style={{ left: '54%', top: '58%', animationDelay: '-1.5s' }}></s>
        <s style={{ left: '63%', top: '30%', animationDelay: '-2.5s' }}></s>
        <s style={{ left: '72%', top: '78%', animationDelay: '-.8s' }}></s>
        <s style={{ left: '81%', top: '18%', animationDelay: '-2.2s' }}></s>
        <s style={{ left: '90%', top: '52%', animationDelay: '-1.2s' }}></s>
        <s style={{ left: '95%', top: '86%', animationDelay: '-3.2s' }}></s>
        <s style={{ left: '3%', top: '55%', animationDelay: '-2.8s' }}></s>
      </div>
      <div className="spot" aria-hidden="true"></div>
      <div className="stars" id="stars" ref={starsContainerRef} aria-hidden="true"></div>

      <div className="wrap">
        <header className={scrolled ? 'scrolled' : ''}>
          <a className="logo" href="#top">
            Lakshya<i>.</i>
          </a>
          <button
            type="button"
            className="menu-btn"
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span></span>
            <span></span>
          </button>
          <nav
            className={menuOpen ? 'open' : ''}
            aria-label="Main"
            onClick={() => setMenuOpen(false)}
          >
            <a href="#about">About</a>
            <a href="#projects">Projects</a>
            <a href="#faq">FAQ</a>
            <a href="#contact">Contact</a>
          </nav>
        </header>

        <div className="layout">
          <main id="top">
            <div className="hero">
              <div className="ghost" aria-hidden="true">AI</div>
              <div>
                <motion.div
                  className="pill"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  <span className="dot"></span>Available for freelance projects &amp; collaborations
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
                  <span className="cur"></span>
                  <br />
                  from Kaithal, Haryana.
                </motion.p>
                <motion.div
                  className="btns"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.44 }}
                >
                  <a className="btn primary magnetic" href="#projects">
                    View My Work
                  </a>
                  <a className="btn magnetic" href="#contact">
                    Let's Talk
                  </a>
                </motion.div>

                {/* Mini counters */}
                <motion.div
                  className="mini-counts"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  <div><b><CountUp to={3} suffix="+" /></b><span>Skills — Marketing, Design, AI Web</span></div>
                  <div><b><CountUp to={2} /></b><span>Live Projects</span></div>
                  <div><b><CountUp to={100} suffix="%" /></b><span>Freelance Ready</span></div>
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
                    <div className="avatar" role="img" aria-label="Lakshya">
                      L
                    </div>
                  </div>
                  <div className="wheel" aria-label="Skills">
                    <ul
                      id="wl"
                      style={{
                        transform: `translateY(${44 - wheelIndex * 44}px)`,
                        transition: wheelIndex === 0 ? 'none' : 'transform .6s cubic-bezier(.2,.8,.2,1)',
                      }}
                    >
                      {wheelItems.map((item, idx) => (
                        <li key={idx} className={idx === wheelIndex ? 'on' : ''}>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
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

            {/* Marquee strip */}
            <div className="marquee" aria-hidden="true">
              <div className="marquee-track">
                {[...marquee, ...marquee].map((m, i) => (
                  <span key={i} className="mq-item">
                    <Sparkles size={15} /> {m}
                  </span>
                ))}
              </div>
            </div>

            <motion.section
              id="about"
              className="about rv"
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-80px' }}
              custom={0}
            >
              <h2 className="t">About</h2>

              {/* Brief Summary card */}
              <motion.div
                className="summary-card"
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-60px' }}
                custom={1}
              >
                <div className="summary-head">
                  <span className="summary-badge"><Sparkles size={14} /> Brief Summary</span>
                  <h3>Marketing that grows business — powered by AI.</h3>
                </div>
                <p className="big">
                  I'm <b>Lakshya</b> from Barta, Kaithal (Haryana) — a Digital Marketer, Graphic Designer &amp; AI Web Developer. I help local businesses and startups get more customers through SEO, social media, ads, branding and fast, modern websites built with AI tools.
                </p>
                <p>
                  Currently training at <b>Zedking Institute, Kaithal</b> and open for freelance work. My style is simple: clear design, honest marketing, and quick delivery. I also love game design — I built a browser snake game just for fun.
                </p>
                <div className="summary-grid">
                  <div className="s-item">
                    <MapPin size={17} />
                    <div><b>Based in</b><span>Barta, Kaithal, Haryana</span></div>
                  </div>
                  <div className="s-item">
                    <GraduationCap size={17} />
                    <div><b>Training</b><span>Zedking Institute — Digital Marketing</span></div>
                  </div>
                  <div className="s-item">
                    <Briefcase size={17} />
                    <div><b>Services</b><span>Marketing • Design • AI Websites • Content</span></div>
                  </div>
                  <div className="s-item">
                    <span className="live-dot"></span>
                    <div><b>Status</b><span>Available for freelance</span></div>
                  </div>
                </div>
              </motion.div>

              <ol className="path" id="path" ref={pathRef}>
                <li>
                  <b>After 12th</b>Joined Zedking Institute, Kaithal.
                </li>
                <li>
                  <b>Digital marketing</b>Learning and doing real marketing work.
                </li>
                <li>
                  <b>Graphic design &amp; AI web development</b>Building designs and websites with AI tools.
                </li>
              </ol>
            </motion.section>

            <motion.section
              id="projects"
              className="rv"
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-80px' }}
              custom={0}
            >
              <h2 className="t">Projects</h2>
              <p className="sec-sub">Har project live hai — hover karo, 3D tilt + shine dekho. Click karke kholo.</p>
              <motion.div
                className="grid"
                variants={staggerParent}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-60px' }}
              >
                {/* Project 1 */}
                <motion.a
                  className="card flag project-card"
                  variants={cardVariant}
                  whileHover={{ y: -8, scale: 1.015 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                  href="https://bvps-school.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="preview browser">
                    <div className="browser-bar"><i></i><i></i><i></i><span>bvps-school.vercel.app</span></div>
                    <div className="browser-body">
                      <div className="mock-nav"></div>
                      <div className="mock-hero"><span>Bal Vikas Public School</span><em>Admissions Open</em></div>
                      <div className="mock-row"><i></i><i></i><i></i></div>
                    </div>
                    <span className="float-badge"><Globe size={13} /> Live</span>
                  </div>
                  <span className="tag"><span className="pulse-dot"></span>Live website</span>
                  <h3>Bal Vikas Public School <ArrowUpRight size={18} className="arrow" /></h3>
                  <p>A complete school website with information for parents and students, live on the web.</p>
                  <div className="chips"><span>Website</span><span>Education</span><span>Vercel</span></div>
                  <span className="go">Visit site <ExternalLink size={14} /></span>
                </motion.a>

                {/* Project 2 */}
                <motion.div
                  className="card project-card"
                  variants={cardVariant}
                  whileHover={{ y: -8, scale: 1.015 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                >
                  <div className="preview game">
                    <div className="snake-board">
                      <div className="snake"></div>
                      <div className="food"></div>
                      <div className="food f2"></div>
                    </div>
                    <span className="float-badge"><Gamepad2 size={13} /> Playable</span>
                  </div>
                  <span className="tag">Game</span>
                  <h3>Snake Adventure <Gamepad2 size={18} className="arrow" /></h3>
                  <p>A browser snake game built as a single HTML file from a design spec.</p>
                  <div className="chips"><span>HTML</span><span>Game Design</span><span>Fun Build</span></div>
                  <span className="go soon">Coming live soon</span>
                </motion.div>
              </motion.div>
            </motion.section>

            <section id="faq" className="rv">
              <h2 className="t">FAQ</h2>
              <div className="faq">
                <details open>
                  <summary>What services do you offer?</summary>
                  <div className="ans">
                    I do digital marketing, graphic design, AI web development and content creation, using AI tools to work faster and better.
                  </div>
                </details>
                <details>
                  <summary>Do you take freelance projects?</summary>
                  <div className="ans">
                    Yes. I'm available for freelance projects and collaborations. Message me with what you need and we can take it from there.
                  </div>
                </details>
                <details>
                  <summary>How can I contact you?</summary>
                  <div className="ans">
                    The fastest way is WhatsApp on{' '}
                    <a href="https://wa.me/919671772205" target="_blank" rel="noopener noreferrer">
                      +91 96717 72205
                    </a>
                    . You can also email{' '}
                    <a href="mailto:jaatlakshya496@gmail.com">jaatlakshya496@gmail.com</a> or message me on LinkedIn or Instagram.
                  </div>
                </details>
                <details>
                  <summary>What is digital marketing?</summary>
                  <div className="ans">
                    Digital marketing means promoting a business online through social media, search engines, ads, email and content, so it can reach more customers and grow.
                  </div>
                </details>
                <details>
                  <summary>What is Zedking Institute?</summary>
                  <div className="ans">
                    Zedking Institute is a training institute in Kaithal, Haryana. I joined it after my 12th, and it is where I'm doing my digital marketing training.
                  </div>
                </details>
                <details>
                  <summary>What are you learning at Zedking Institute?</summary>
                  <div className="ans">
                    I'm doing digital marketing training there. Alongside it, I work on graphic design and AI web development, and I use AI tools to make my work faster.
                  </div>
                </details>
                <details>
                  <summary>How much will it cost and how long will it take?</summary>
                  <div className="ans">
                    It depends on the project. Send me your requirements on WhatsApp and I'll share the time and budget after understanding the work.
                  </div>
                </details>
                <details>
                  <summary>Why did you join Zedking Institute?</summary>
                  <div className="ans">
                    After my 12th, I joined Zedking Institute in Kaithal to start my journey in digital marketing and learn it with real, hands-on work.
                  </div>
                </details>
              </div>
            </section>

            <motion.section
              id="contact"
              className="contact rv"
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              <h2 className="t">Let's talk</h2>
              <p>
                Got a marketing project, a design or a website to build? Neeche form
                bharo — submit karte hi aapka message seedha WhatsApp par pahunch
                jayega. You can also email, or check my code on{' '}
                <a href="https://github.com/jaatlakshya496-jpg" target="_blank" rel="noopener noreferrer">
                  GitHub
                </a>
                .
              </p>
              <div className="contact-card">
                <form className="cform" onSubmit={handleFormSubmit}>
                  <div className="frow">
                    <label className="ffield">
                      <span>Your name</span>
                      <input
                        type="text"
                        name="name"
                        placeholder="e.g. Ravi Kumar"
                        value={form.name}
                        onChange={handleFormChange}
                        required
                      />
                    </label>
                    <label className="ffield">
                      <span>Email (optional)</span>
                      <input
                        type="email"
                        name="email"
                        placeholder="you@example.com"
                        value={form.email}
                        onChange={handleFormChange}
                      />
                    </label>
                  </div>
                  <label className="ffield">
                    <span>Your message</span>
                    <textarea
                      name="message"
                      rows={5}
                      placeholder="Tell me about your project, budget and timeline..."
                      value={form.message}
                      onChange={handleFormChange}
                      required
                    ></textarea>
                  </label>
                  <div className="factions">
                    <button type="submit" className="btn primary magnetic">
                      <Send size={16} /> Send on WhatsApp
                    </button>
                    {sent && (
                      <span className="fsent" role="status">
                        Opening WhatsApp with your message...
                      </span>
                    )}
                  </div>
                  <p className="fnote">
                    Submit karte hi aapka message WhatsApp par ban kar khul jayega —
                    bas Send dabana hai.
                  </p>
                </form>
              </div>

              <div className="btns">
                <a className="btn magnetic" href="mailto:jaatlakshya496@gmail.com">
                  Email
                </a>
                <a className="btn magnetic" href="https://www.linkedin.com/in/lakshya-barta-a92b1941a" target="_blank" rel="noopener noreferrer">
                  LinkedIn
                </a>
                <a className="btn magnetic" href="https://github.com/jaatlakshya496-jpg" target="_blank" rel="noopener noreferrer">
                  GitHub
                </a>
                <a className="btn magnetic" href="https://www.instagram.com/lakshya____malik" target="_blank" rel="noopener noreferrer">
                  Instagram
                </a>
              </div>
            </motion.section>
          </main>
        </div>
        <footer>© Lakshya. Barta, Kaithal, Haryana.</footer>
      </div>
      <a
        className={scrolled ? 'totop show' : 'totop'}
        href="#top"
        aria-label="Back to top"
      >
        ↑
      </a>
    </>
  );
}
