import { useState, useEffect } from 'react';
import { FAQS } from './Seo';
import { fetchFaqs } from '../lib/db';
import { firebaseReady } from '../config/firebase';

export function FaqFull() {
  const [items, setItems] = useState<any[]>([...FAQS]);

  // Built-in FAQs first, then the ones added from the admin panel (Firestore).
  useEffect(() => {
    if (!firebaseReady) return;
    let alive = true;
    fetchFaqs()
      .then((extra) => {
        if (alive && extra.length) setItems([...FAQS, ...extra]);
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
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