import { useState, useEffect } from 'react';
import { FAQS } from './Seo';

const FAQ_KEY = 'portfolio_faqs';

function loadFaqs() {
  try {
    const stored = localStorage.getItem(FAQ_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length) return parsed;
    }
  } catch {}
  return FAQS;
}

export function FaqFull() {
  const [items, setItems] = useState(loadFaqs());

  useEffect(() => {
    const onStorage = () => setItems(loadFaqs());
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  return (
    <div className="faq">
      {items.map((f: any, i: number) => (
        <details key={f.q + i} open={i === 0}>
          <summary>{f.q}</summary>
          <div className="ans">{f.a}</div>
        </details>
      ))}
    </div>
  );
}