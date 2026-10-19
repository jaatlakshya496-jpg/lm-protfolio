import React, { useState, useEffect } from 'react';
import { Send } from 'lucide-react';
import { site } from '../config/site';

const STORAGE_KEY = 'portfolio_messages';

export function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const lines = [
      'Hi Lakshya! I found your portfolio.',
      '',
      `Name: ${form.name.trim()}`,
      form.email.trim() ? `Email: ${form.email.trim()}` : null,
      '',
      'Message:',
      form.message.trim(),
    ].filter((l): l is string => l !== null);

    setSent(true);
    window.setTimeout(() => setSent(false), 4000);
    setForm({ name: '', email: '', message: '' });
    
    // Save to localStorage for admin panel
    let current: any[] = [];
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      current = stored ? JSON.parse(stored) : [];
      if (!Array.isArray(current)) current = [];
    } catch {
      current = [];
    }
    current.push({
      name: form.name.trim(),
      email: form.email?.trim() || '',
      message: form.message.trim(),
      date: new Date().toLocaleString(),
    });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
  };

  return (
    <div className="contact-card">
      <form className="cform" onSubmit={handleFormSubmit} noValidate={false}>
        <div className="frow">
          <label className="ffield">
            <span>Your name</span>
            <input
              type="text"
              name="name"
              id="cf-name"
              autoComplete="name"
              placeholder="e.g. Ravi Kumar"
              value={form.name}
              onChange={handleFormChange}
              required
            />
          </label>
          <label className="ffield">
            <span>Email (optional)</span>
            <input
              type="email"
              name="email"
              id="cf-email"
              autoComplete="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleFormChange}
            />
          </label>
        </div>
        <label className="ffield">
          <span>Your message</span>
          <textarea
            name="message"
            id="cf-message"
            rows={5}
            placeholder="Tell me about your project, budget and timeline..."
            value={form.message}
            onChange={handleFormChange}
            required
          />
        </label>
        <div className="factions">
          <button type="submit" className="btn primary magnetic">
            <Send size={16} /> Send on WhatsApp
          </button>
          {sent && (
            <span className="fsent" role="status">
              Message save ho gaya. Main jald reply karunga.
            </span>
          )}
        </div>
        <p className="fnote">
          Submit karte hi aapka message WhatsApp par ban kar khul jayega — bas Send
          dabana hai.
        </p>
      </form>
    </div>
  );
}

export function SocialButtons() {
  return (
    <div className="btns">
      <a className="btn magnetic" href={`mailto:${site.contact.email}`}>
        Email
      </a>
      <a className="btn magnetic" href={site.social.linkedin} target="_blank" rel="noopener noreferrer">
        LinkedIn
      </a>
      <a className="btn magnetic" href={site.social.github} target="_blank" rel="noopener noreferrer">
        GitHub
      </a>
      <a className="btn magnetic" href={site.social.instagram} target="_blank" rel="noopener noreferrer">
        Instagram
      </a>
    </div>
  );
}