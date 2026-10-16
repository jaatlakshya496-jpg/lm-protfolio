import { useEffect, useRef, useState } from 'react';

/** Fixed animated background: blurred lights, spotlight, stars, shooting stars. */
export function Background() {
  const starsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const st = starsRef.current;
    if (!st || st.children.length > 0) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const count = reduce ? 24 : 90;

    for (let q = 0; q < count; q++) {
      const u = document.createElement('u');
      const z = Math.random() * 2.4 + 1;
      u.style.cssText = `left:${Math.random() * 100}%;top:${Math.random() * 100}%;width:${z}px;height:${z}px;--t:${2.5 + Math.random() * 4}s;--dl:-${Math.random() * 6}s;`;
      st.appendChild(u);
    }

    if (reduce) return;
    for (let r = 0; r < 3; r++) {
      const d = document.createElement('div');
      d.className = 'shoot';
      d.style.cssText = `left:${5 + r * 28}%;top:${4 + r * 10}%;animation-delay:${r * 2.6 + 1}s;animation-duration:${8 + r * 3}s;`;
      st.appendChild(d);
    }
  }, []);

  return (
    <>
      <div className="lights" aria-hidden="true">
        <i />
        <i />
        <i />
        <i />
        <i />
        <b />
        <b />
        <b />
        <s style={{ left: '8%', top: '22%' }} />
        <s style={{ left: '18%', top: '70%', animationDelay: '-1s' }} />
        <s style={{ left: '27%', top: '38%', animationDelay: '-2s' }} />
        <s style={{ left: '36%', top: '84%', animationDelay: '-.5s' }} />
        <s style={{ left: '45%', top: '14%', animationDelay: '-3s' }} />
        <s style={{ left: '54%', top: '58%', animationDelay: '-1.5s' }} />
        <s style={{ left: '63%', top: '30%', animationDelay: '-2.5s' }} />
        <s style={{ left: '72%', top: '78%', animationDelay: '-.8s' }} />
        <s style={{ left: '81%', top: '18%', animationDelay: '-2.2s' }} />
        <s style={{ left: '90%', top: '52%', animationDelay: '-1.2s' }} />
        <s style={{ left: '95%', top: '86%', animationDelay: '-3.2s' }} />
        <s style={{ left: '3%', top: '55%', animationDelay: '-2.8s' }} />
      </div>
      <div className="spot" aria-hidden="true" />
      <div className="stars" id="stars" ref={starsRef} aria-hidden="true" />
    </>
  );
}

/** Scroll progress bar. */
export function ScrollBar() {
  const barRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const onScroll = () => {
      const bar = barRef.current;
      if (!bar) return;
      const h = document.documentElement;
      const progress = (h.scrollTop / (h.scrollHeight - h.clientHeight || 1)) * 100;
      bar.style.width = `${progress}%`;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return <div id="bar" ref={barRef} />;
}