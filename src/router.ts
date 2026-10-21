import { useCallback, useEffect, useState } from 'react';

/**
 * Minimal History-API router.
 * No dependency, real clean URLs (/about, /projects, /contact) — good for SEO.
 * Static hosts must rewrite all paths to index.html (see vercel.json).
 */

export type Route =
  | { name: 'home' }
  | { name: 'about' }
  | { name: 'projects' }
  | { name: 'contact' }
  | { name: 'admin' }
  | { name: 'notfound' };

const ROUTES: Record<string, Route['name']> = {
  '/': 'home',
  '/about': 'about',
  '/projects': 'projects',
  '/contact': 'contact',
  '/admin': 'admin',
};

export function normalizePath(pathname: string): Route {
  const clean = (pathname.split('?')[0] || '/').replace(/\/+$/, '') || '/';
  const name = ROUTES[clean.toLowerCase()];
  return { name: name ?? 'notfound' } as Route;
}

export function hrefFor(name: Route['name']): string {
  const found = Object.keys(ROUTES).find((k) => ROUTES[k] === name);
  return found ?? '/';
}

export function isKnownRoute(name: Route['name']): boolean {
  return name !== 'notfound';
}

export function useRoute() {
  const [route, setRoute] = useState<Route>(() =>
    normalizePath(window.location.pathname)
  );

  useEffect(() => {
    const onPop = () => {
      setRoute(normalizePath(window.location.pathname));
      window.scrollTo({ top: 0, behavior: 'auto' });
    };
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const navigate = useCallback((to: string) => {
    const url =
      to.startsWith('http') || to.startsWith('#')
        ? to
        : `${window.location.origin}${to}`;
    window.history.pushState({}, '', url);
    setRoute(normalizePath(new URL(url, window.location.origin).pathname));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return { route, navigate };
}

/** Global click handler that turns internal <a href="/x"> into SPA navigation. */
export function useLinkInterception(navigate: (to: string) => void) {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as HTMLElement)?.closest?.('a');
      if (!a) return;
      const href = a.getAttribute('href');
      if (!href || a.target === '_blank' || a.hasAttribute('download')) return;
      if (href.startsWith('#') || /^(mailto:|tel:|https?:\/\/(wa\.me|www\.)?)/i.test(href)) {
        if (href.startsWith('#')) return; // let in-page anchors work natively
      }
      if (!href.startsWith('/') || href.startsWith('//')) return;
      if (!isKnownRoute(normalizePath(href).name)) return; // let 404 links fall through
      e.preventDefault();
      navigate(href);
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, [navigate]);
}

/** Updates hrefs of in-page anchor links so they keep working across routes. */
export function useAnchorSync(current: Route['name']) {
  useEffect(() => {
    document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((a) => {
      if (!a.dataset.baseHref) a.dataset.baseHref = a.getAttribute('href') ?? '';
    });
  }, [current]);
}