import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { site } from '../config/site';

const STORAGE_KEY = 'portfolio_messages';

function readMessages(): Array<Record<string, string>> {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function ContactForm() {
  const [form, setForm] = useState({
    name: '',
    contactMethod: '',
    contactValue: '',
    message: '',
  });
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((current) => ({
      ...current,
      [name]: value,
      ...(name === 'contactMethod' ? { contactValue: '' } : {}),
    }));
    setError('');
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const name = form.name.trim();
    const message = form.message.trim();
    const contactValue = form.contactValue.trim();

    if (!name || !message || !form.contactMethod || !contactValue) {
      setError('Please complete all fields before submitting the form.');
      return;
    }

    if (form.contactMethod === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactValue)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (form.contactMethod === 'phone' && !/^\d{10}$/.test(contactValue)) {
      setError('Please enter a valid 10-digit phone number.');
      return;
    }

    try {
      const current = readMessages();
      const next = [
        ...current,
        {
          name,
          email: form.contactMethod === 'email' ? contactValue : '',
          phone: form.contactMethod === 'phone' ? contactValue : '',
          message,
          date: new Date().toLocaleString(),
        },
      ];
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      setError('Message submit nahi ho paya. Please try again.');
      return;
    }

    setError('');
    setSent(true);
    window.setTimeout(() => setSent(false), 4000);
    setForm({ name: '', contactMethod: '', contactValue: '', message: '' });
  };

  return (
    <div className="contact-card">
      <form className="cform" onSubmit={handleFormSubmit}>
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
        <fieldset className="contact-choice">
          <legend>Choose one way for me to contact you</legend>
          <label>
            <input
              type="radio"
              name="contactMethod"
              value="email"
              checked={form.contactMethod === 'email'}
              onChange={handleFormChange}
              required
            />
            <span>Email</span>
          </label>
          <label>
            <input
              type="radio"
              name="contactMethod"
              value="phone"
              checked={form.contactMethod === 'phone'}
              onChange={handleFormChange}
            />
            <span>Phone number</span>
          </label>
        </fieldset>
        {form.contactMethod === 'email' && (
          <label className="ffield">
            <span>Your email</span>
            <input
              type="email"
              name="contactValue"
              id="cf-email"
              autoComplete="email"
              placeholder="you@example.com"
              value={form.contactValue}
              onChange={handleFormChange}
              maxLength={254}
              required
            />
          </label>
        )}
        {form.contactMethod === 'phone' && (
          <label className="ffield">
            <span>Your 10-digit phone number</span>
            <input
              type="tel"
              name="contactValue"
              id="cf-phone"
              autoComplete="tel-national"
              inputMode="numeric"
              placeholder="9876543210"
              value={form.contactValue}
              onChange={handleFormChange}
              pattern="[0-9]{10}"
              maxLength={10}
              title="Enter exactly 10 digits."
              required
            />
          </label>
        )}
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
            <Send size={16} /> Submit
          </button>
          {sent && (
            <span className="fsent" role="status">
              Message submitted successfully.
            </span>
          )}
        </div>
        {error && <p className="ferror" role="alert">{error}</p>}
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