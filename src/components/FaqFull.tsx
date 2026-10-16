import { FAQS } from './Seo';

export function FaqFull() {
  return (
    <div className="faq">
      {FAQS.map((f, i) => (
        <details key={f.q} open={i === 0}>
          <summary>{f.q}</summary>
          <div className="ans">{f.a}</div>
        </details>
      ))}
    </div>
  );
}