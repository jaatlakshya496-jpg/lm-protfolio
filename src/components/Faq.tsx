import { FAQS } from './Seo';

export function Faq({ limit }: { limit?: number }) {
  const items = limit ? FAQS.slice(0, limit) : FAQS;
  return (
    <div className="faq">
      {items.map((f, i) => (
        <details key={f.q} open={i === 0 && !limit}>
          <summary>{f.q}</summary>
          <div className="ans">{f.a}</div>
        </details>
      ))}
    </div>
  );
}