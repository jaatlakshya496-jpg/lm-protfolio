/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from 'react';

export default function App() {
  const [roleText, setRoleText] = useState('Digital Marketer');
  const roleIndexRef = useRef(0);
  const charIndexRef = useRef('Digital Marketer'.length);
  const deletingRef = useRef(false);
  const wheelIndexRef = useRef(0);
  const [wheelIndex, setWheelIndex] = useState(0);
  const starsContainerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<HTMLOListElement>(null);

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

      setRoleText(roles[roleIndexRef.current].slice(0, charIndexRef.current) || '\u00A0');
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
    };

    const cardCleanups: Array<() => void> = [];
    cards.forEach((c) => {
      const handler = handleCardPointer(c);
      c.addEventListener('pointermove', handler);
      cardCleanups.push(() => c.removeEventListener('pointermove', handler));
    });

    return () => {
      io.disconnect();
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('pointermove', handlePointerMove);
      cardCleanups.forEach((cleanup) => cleanup());
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
        <header>
          <a className="logo" href="#top">
            Lakshya<i>.</i>
          </a>
          <nav aria-label="Main">
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
                <div className="pill" data-s style={{ '--d': 1 } as React.CSSProperties}>
                  <span className="dot"></span>Available for freelance projects &amp; collaborations
                </div>
                <h1 data-s style={{ '--d': 2 } as React.CSSProperties}>I am Lakshya</h1>
                <p className="sub" data-s style={{ '--d': 3 } as React.CSSProperties}>
                  I'm a <b id="role">{roleText}</b>
                  <span className="cur"></span>
                  <br />
                  from Kaithal, Haryana.
                </p>
                <div className="btns" data-s style={{ '--d': 4 } as React.CSSProperties}>
                  <a className="btn primary" href="#projects">
                    View My Work
                  </a>
                  <a className="btn" href="#contact">
                    Let's Talk
                  </a>
                </div>
              </div>

              <div className="visual" data-s style={{ '--d': 3 } as React.CSSProperties}>
                <div className="pic">
                  <div className="ring">
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
              </div>
            </div>

            <section id="about" className="about rv">
              <h2 className="t">About</h2>
              <p className="big">
                I'm Lakshya, from Barta, Kaithal, Haryana. I work in digital marketing and use AI tools to make design, content and websites faster and better.
              </p>
              <p>
                I'm currently doing training at Zedking Institute and taking freelance projects. I also love game design and creative AI, so I build small browser games for fun.
              </p>
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
            </section>

            <section id="projects" className="rv">
              <h2 className="t">Projects</h2>
              <div className="grid">
                <a className="card flag" href="https://bvps-school.vercel.app" target="_blank" rel="noopener noreferrer">
                  <span className="tag">Live website</span>
                  <h3>Bal Vikas Public School</h3>
                  <p>A complete school website with information for parents and students, live on the web.</p>
                  <span className="go">Visit site</span>
                </a>
                <div className="card">
                  <span className="tag">Game</span>
                  <h3>Snake Adventure</h3>
                  <p>A browser snake game built as a single HTML file from a design spec.</p>
                </div>
              </div>
            </section>

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

            <section id="contact" className="contact rv">
              <h2 className="t">Let's talk</h2>
              <p>
                Got a marketing project, a design or a website to build? Message me directly on WhatsApp (+91 96717 72205), send an email, or check my code on{' '}
                <a href="https://github.com/jaatlakshya496-jpg" target="_blank" rel="noopener noreferrer">
                  GitHub
                </a>
                .
              </p>
              <div className="btns">
                <a
                  className="btn primary"
                  href="https://wa.me/919671772205?text=Hi%20Lakshya%2C%20I%20saw%20your%20portfolio."
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp me
                </a>
                <a className="btn" href="mailto:jaatlakshya496@gmail.com">
                  Email
                </a>
                <a className="btn" href="https://www.linkedin.com/in/lakshya-barta-a92b1941a" target="_blank" rel="noopener noreferrer">
                  LinkedIn
                </a>
                <a className="btn" href="https://github.com/jaatlakshya496-jpg" target="_blank" rel="noopener noreferrer">
                  GitHub
                </a>
                <a className="btn" href="https://www.instagram.com/lakshya____malik" target="_blank" rel="noopener noreferrer">
                  Instagram
                </a>
              </div>
            </section>
          </main>
        </div>
        <footer>© Lakshya. Barta, Kaithal, Haryana.</footer>
      </div>
    </>
  );
}
