import { useEffect, useState } from 'react';
import { hrefFor, type Route } from '../router';

const NAV: Array<{ name: Route['name']; label: string }> = [
  { name: 'home', label: 'Home' },
  { name: 'about', label: 'About' },
  { name: 'projects', label: 'Projects' },
  { name: 'contact', label: 'Contact' },
];

export function Header({ current }: { current: Route['name'] }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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

  // Close the mobile menu whenever the route changes.
  useEffect(() => setMenuOpen(false), [current]);

  return (
    <header className={scrolled ? 'scrolled' : ''}>
      <a className="logo" href="/" aria-label="Lakshya Malik — home">
        Lakshya<i>.</i>
      </a>
      <button
        type="button"
        className="menu-btn"
        aria-label="Toggle navigation menu"
        aria-expanded={menuOpen}
        aria-controls="main-nav"
        onClick={() => setMenuOpen((v) => !v)}
      >
        <span />
        <span />
      </button>
      <nav
        id="main-nav"
        className={menuOpen ? 'open' : ''}
        aria-label="Main"
        onClick={() => setMenuOpen(false)}
      >
        {NAV.map((n) => (
          <a
            key={n.name}
            href={hrefFor(n.name)}
            aria-current={current === n.name ? 'page' : undefined}
          >
            {n.label}
          </a>
        ))}
      </nav>
    </header>
  );
}

export function Footer() {
  const isAdmin = typeof window !== 'undefined' && localStorage.getItem('adminMode') === 'true';
  return (
    <footer>
      <div className="foot-grid">
        <div>
          <b>Lakshya Malik</b>
          <span>
            Digital Marketer • Graphic Designer • AI Web Developer
          </span>
        </div>
        <nav aria-label="Footer">
          <a href="/">Home</a>
          <a href="/about">About</a>
          <a href="/projects">Projects</a>
          <a href="/contact">Contact</a>
        </nav>
        <div>
          <span>Barta, Kaithal, Haryana, India</span>
        </div>
      </div>
      <span className="copy">© {new Date().getFullYear()} Lakshya Malik. All rights reserved.</span>
    </footer>
  );
}

export function BackToTop({ visible }: { visible: boolean }) {
  return (
    <a
      className={visible ? 'totop show' : 'totop'}
      href="#top"
      aria-label="Back to top"
    >
      ↑
    </a>
  );
}