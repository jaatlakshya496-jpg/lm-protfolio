import { useEffect, useState } from 'react';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import { AdminPage } from './components/AdminPage';
import { Background, ScrollBar } from './components/Background';
import { Header, Footer, BackToTop } from './components/Chrome';
import { Seo } from './components/Seo';
import { useRoute, useLinkInterception, hrefFor, normalizePath, isKnownRoute, type Route } from './router';
import { site } from './config/site';

/** section id -> page that renders it */
const SECTION_PAGE: Record<string, Route['name']> = {
  about: 'about',
  projects: 'projects',
  contact: 'contact',
  faq: 'about',
};

function NotFound() {
  return (
    <section style={{ padding: '40px 0' }}>
      <Seo
        title="Page not found"
        description="The page you are looking for does not exist."
        path="/404"
        noindex
      />
      <h1 className="t">404 — page not found</h1>
      <p className="sec-sub" style={{ marginTop: 0 }}>
        That link does not exist. Try one of these:
      </p>
      <nav className="btns" aria-label="Not found">
        <a className="btn primary magnetic" href="/">
          Home
        </a>
        <a className="btn magnetic" href="/about">
          About
        </a>
        <a className="btn magnetic" href="/projects">
          Projects
        </a>
        <a className="btn magnetic" href="/contact">
          Contact
        </a>
      </nav>
    </section>
  );
}

export default function App() {
  const { route, navigate } = useRoute();
  const [adminLoggedIn, setAdminLoggedIn] = useState(false);

  useEffect(() => {
    // Check if already logged in via localStorage
    const stored = localStorage.getItem('adminLoggedIn');
    if (stored === 'true') {
      setAdminLoggedIn(true);
    }
  }, []);

  useLinkInterception(navigate);

  // In-page anchors (#about, #projects, #faq, #contact) work across routes.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented) return;
      const a = (e.target as HTMLElement | null)?.closest?.('a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute('href')!.slice(1);
      if (!id) return;
      e.preventDefault();
      const page = SECTION_PAGE[id] ?? 'home';
      const go = () => {
        window.setTimeout(() => {
          document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
        }, 60);
      };
      if (route.name === page && !hrefFor(page).includes('#')) {
        go();
      } else {
        navigate(hrefFor(page));
        go();
      }
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, [navigate, route.name]);

  // Re-apply reveal animation observers on every route change.
  useEffect(() => {
    const reveal = (el: Element) => el.classList.add('in');

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            reveal(entry.target);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.01, rootMargin: '300px 0px 0px 0px' }
    );

    const nodes = Array.from(document.querySelectorAll('.rv, #path'));
    nodes.forEach((n) => io.observe(n));

    // Crawlers (Googlebot etc.) do not scroll. Reveal everything for them so
    // no content is ever hidden from search engines.
    const isBot = /bot|crawler|spider|slurp|bingpreview|facebookexternalhit/i.test(
      navigator.userAgent
    );
    if (isBot) {
      nodes.forEach((n) => reveal(n));
      return () => io.disconnect();
    }

    // Safety net: anything already inside the viewport reveals immediately,
    // so content is never stuck invisible (which used to blank the page).
    const inViewport = () =>
      nodes.forEach((n) => {
        const r = n.getBoundingClientRect();
        if (r.top < window.innerHeight && r.bottom > 0) reveal(n);
      });
    inViewport();
    const raf = window.requestAnimationFrame(inViewport);
    const t = window.setTimeout(inViewport, 400);
    // Scroll fallback: if IntersectionObserver misses an element, this reveals
    // it as soon as it enters the viewport. Nothing ever stays invisible.
    const onScroll = () => inViewport();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    return () => {
      io.disconnect();
      window.cancelAnimationFrame(raf);
      window.clearTimeout(t);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [route.name]);

  // Pointer effects (spotlight + 3D card tilt).
  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      document.documentElement.style.setProperty('--sx', `${e.clientX}px`);
      document.documentElement.style.setProperty('--sy', `${e.clientY}px`);
    };
    const cards = document.querySelectorAll('.card');
    const handleCardPointer = (c: Element) => (e: Event) => {
      const pe = e as PointerEvent;
      const r = c.getBoundingClientRect();
      (c as HTMLElement).style.setProperty('--mx', `${pe.clientX - r.left}px`);
      (c as HTMLElement).style.setProperty('--my', `${pe.clientY - r.top}px`);
      const rx = ((pe.clientY - r.top) / r.height - 0.5) * -8;
      const ry = ((pe.clientX - r.left) / r.width - 0.5) * 10;
      (c as HTMLElement).style.setProperty('--rx', `${rx}deg`);
      (c as HTMLElement).style.setProperty('--ry', `${ry}deg`);
    };
    const resetTilt = (c: Element) => () => {
      (c as HTMLElement).style.setProperty('--rx', '0deg');
      (c as HTMLElement).style.setProperty('--ry', '0deg');
    };
    const cleanups: Array<() => void> = [];
    cards.forEach((c) => {
      const h = handleCardPointer(c);
      const leave = resetTilt(c);
      c.addEventListener('pointermove', h);
      c.addEventListener('pointerleave', leave);
      cleanups.push(() => {
        c.removeEventListener('pointermove', h);
        c.removeEventListener('pointerleave', leave);
      });
    });
    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      cleanups.forEach((fn) => fn());
    };
  }, [route.name]);

  // Track back-to-top visibility.
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLogin = () => {
    setAdminLoggedIn(true);
    localStorage.setItem('adminLoggedIn', 'true');
  };

  const handleLogout = () => {
    setAdminLoggedIn(false);
    localStorage.removeItem('adminLoggedIn');
    // Logout ke baad site par wapas bhej do (panel URL-driven hai).
    if (route.name === 'admin') navigate(hrefFor('home'));
  };

  // Admin toggle only for owner (hidden from public visitors)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('admin') === '1') {
      localStorage.setItem('adminMode', 'true');
    }
    // Secret keyboard shortcut for owner: Ctrl+Shift+A enables admin mode
    const onKey = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        localStorage.setItem('adminMode', 'true');
        window.location.reload();
      }
    };
    window.addEventListener('keydown', onKey);

    if (localStorage.getItem('adminMode') !== 'true') {
      return () => window.removeEventListener('keydown', onKey);
    }
    const adminArea = document.createElement('div');
    adminArea.style.cssText = `
      position: fixed; bottom: 20px; left: 20px; z-index: 1000;
      width: 44px; height: 44px; border-radius: 50%;
      background: var(--accent); cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      font-size: 20px; color: #04241a; font-weight: bold;
    `;
    adminArea.setAttribute('aria-label', 'Open admin panel');
    adminArea.textContent = '⚙';
    adminArea.addEventListener('click', () => navigate('/admin'));
    document.body.appendChild(adminArea);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.removeChild(adminArea);
      return undefined;
    };
  }, [navigate]);

  return (
    <>
      <Background />
      <ScrollBar />
      <div className="wrap">
        <Header current={route.name} />
        <main id="top">
          {isKnownRoute(route.name) ? (
            (() => {
              switch (route.name) {
                case 'home':
                  return <Home />;
                case 'about':
                  return <About />;
                case 'projects':
                  return <Projects />;
                case 'contact':
                  return <Contact />;
                case 'admin':
                  return (
                    <AdminPage
                      loggedIn={adminLoggedIn}
                      onLogin={handleLogin}
                      onLogout={handleLogout}
                    />
                  );
                default:
                  return <NotFound />;
              }
            })()
          ) : (
            <NotFound />
          )}
        </main>
        <Footer />
      </div>
      <BackToTop visible={showTop} />

      {/* Skip link for accessibility */}
      <a href="#top" className="skip-link">
        Skip to content
      </a>
    </>
  );
}