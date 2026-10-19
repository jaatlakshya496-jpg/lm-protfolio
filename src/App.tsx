import { useEffect, useState } from 'react';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import { AdminLogin } from './components/AdminLogin';
import { AdminDashboard } from './components/AdminDashboard';
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
  const [showAdmin, setShowAdmin] = useState(false);

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
    return () => io.disconnect();
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
    setShowAdmin(false);
  };

  const handleLogout = () => {
    setAdminLoggedIn(false);
    localStorage.removeItem('adminLoggedIn');
    setShowAdmin(false);
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
      position: fixed; bottom: 20px; right: 20px; z-index: 1000;
      width: 44px; height: 44px; border-radius: 50%;
      background: var(--accent); cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      font-size: 20px; color: #04241a; font-weight: bold;
    `;
    adminArea.setAttribute('aria-label', 'Admin panel toggle');
    adminArea.textContent = '⚙';
    adminArea.addEventListener('click', () => setShowAdmin(true));
    document.body.appendChild(adminArea);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.removeChild(adminArea);
      return undefined;
    };
  }, []);

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

      {/* Admin Panel */}
      {showAdmin && (
        <div className="fixed inset-0 z-[1001] bg-black/80 overflow-auto p-4">
          <div className="max-w-3xl mx-auto">
            <button
              onClick={() => setShowAdmin(false)}
              className="mb-4 bg-[dc2625] text-white px-4 py-2 rounded"
            >
              Close
            </button>
            {adminLoggedIn ? <AdminDashboard /> : <AdminLogin onLogin={handleLogin} />}
          </div>
        </div>
      )}

      {/* Skip link for accessibility */}
      <a href="#top" className="skip-link">
        Skip to content
      </a>
    </>
  );
}