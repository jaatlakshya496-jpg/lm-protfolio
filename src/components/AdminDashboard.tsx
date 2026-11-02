import { useState, useEffect } from 'react';

const MSG_KEY = 'portfolio_messages';
const FAQ_KEY = 'portfolio_faqs';
const PROJ_KEY = 'portfolio_projects';
const SITE_CONFIG_KEY = 'portfolio_site_config';

function readJsonArray<T>(key: string, fallback: T[]) {
  try {
    const raw = window.localStorage.getItem(key);
    const parsed = raw ? JSON.parse(raw) : fallback;
    return Array.isArray(parsed) ? parsed : fallback;
  } catch {
    return fallback;
  }
}

function saveJsonArray(key: string, data: any[]) {
  try {
    window.localStorage.setItem(key, JSON.stringify(data));
  } catch {
    // Ignore localStorage errors (private browsing, etc.)
  }
}

// Initial FAQs from Seo config (fallback data)
const DEFAULT_FAQS = [
  { q: 'How can I hire you for a project?', a: 'You can contact me through the contact form or email at jaatlakshya496@gmail.com' },
  { q: 'What technologies do you work with?', a: 'I work with React, Vue, Node.js, Python, AI APIs, and modern web technologies.' },
  { q: 'Do you provide SEO services?', a: 'Yes, I provide comprehensive SEO services including on-page, technical SEO, and content strategy.' },
];

export function AdminDashboard() {
  const [tab, setTab] = useState<'messages' | 'faqs' | 'projects'>('messages');

  // Messages state
  const [messages, setMessages] = useState<any[]>(readJsonArray(MSG_KEY, []));
  // FAQs state
  const [faqs, setFaqs] = useState<any[]>(readJsonArray(FAQ_KEY, DEFAULT_FAQS));
  // Projects state - stores {name, url, desc, imgUrl}
  const [projects, setProjects] = useState<any[]>(readJsonArray(PROJ_KEY, []));
  // Site config state - stores basic site info
  const [siteConfig, setSiteConfig] = useState<any>(() => {
    const stored = window.localStorage.getItem(SITE_CONFIG_KEY);
    return stored ? JSON.parse(stored) : null;
  });

  // Form state
  const [newFaq, setNewFaq] = useState({ q: '', a: '' });
  const [newProj, setNewProj] = useState({ name: '', url: '', desc: '', imgUrl: '' });
  const [newSiteName, setNewSiteName] = useState('');
  const [newSiteRole, setNewSiteRole] = useState('');
  const [newSiteTagline, setNewSiteTagline] = useState('');
  const [newSiteEmail, setNewSiteEmail] = useState('');
  const [newSitePhone, setNewSitePhone] = useState('');
  const [newSiteAddress, setNewSiteAddress] = useState('');

  const reload = () => {
    setMessages(readJsonArray(MSG_KEY, []));
    setFaqs(readJsonArray(FAQ_KEY, DEFAULT_FAQS));
    setProjects(readJsonArray(PROJ_KEY, []));
  };

  useEffect(() => { reload(); }, []);

  // ===== MESSAGES =====
  const deleteMsg = (i: number) => {
    const next = messages.filter((_, idx) => idx !== i);
    saveJsonArray(MSG_KEY, next);
    setMessages(next);
  };

  // ===== FAQS =====
  const addFaq = () => {
    if (!newFaq.q.trim() || !newFaq.a.trim()) return;
    const next = [...faqs, { q: newFaq.q.trim(), a: newFaq.a.trim() }];
    saveJsonArray(FAQ_KEY, next);
    setFaqs(next);
    setNewFaq({ q: '', a: '' });
  };

  const deleteFaq = (i: number) => {
    const next = faqs.filter((_, idx) => idx !== i);
    saveJsonArray(FAQ_KEY, next);
    setFaqs(next);
  };

  // ===== PROJECTS =====
  const addProj = () => {
    if (!newProj.name.trim()) return;
    const next = [...projects, { 
      name: newProj.name.trim(), 
      url: newProj.url.trim() || '#', 
      desc: newProj.desc.trim() || '', 
      imgUrl: newProj.imgUrl.trim() || '' 
    }];
    saveJsonArray(PROJ_KEY, next);
    setProjects(next);
    setNewProj({ name: '', url: '', desc: '', imgUrl: '' });
  };

  const deleteProj = (i: number) => {
    const next = projects.filter((_, idx) => idx !== i);
    saveJsonArray(PROJ_KEY, next);
    setProjects(next);
  };

  // ===== SITE CONFIG =====
  const saveSiteConfig = () => {
    if (!newSiteName.trim()) return;
    const config = {
      name: newSiteName.trim(),
      role: newSiteRole.trim() || '',
      tagline: newSiteTagline.trim() || '',
      email: newSiteEmail.trim() || '',
      phone: newSitePhone.trim() || '',
      address: newSiteAddress.trim() || '',
    };
    saveJsonArray(SITE_CONFIG_KEY, [config]);
    setSiteConfig(config);
  };

  const tabBtn = (t: typeof tab, label: string) => (
    <button
      onClick={() => setTab(t)}
      className={`px-4 py-2 rounded ${tab === t ? 'bg-[2be4a8] text-[04241a]' : 'bg-[0f1420] text-white'}`}
    >
      {label}
    </button>
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-[2be4a8] mb-6">Admin Dashboard</h1>
      
      {/* Site Config Summary */}
      {siteConfig ? (
        <div className="bg-[0f1420] border border-[22305c] rounded p-4 mb-6">
          <h3 className="text-[2be4a8] mb-3">Site Configuration</h3>
          <div className="space-y-2 text-white/70">
            <p><strong>Name:</strong> {siteConfig.name}</p>
            {siteConfig.role && <p><strong>Role:</strong> {siteConfig.role}</p>}
            {siteConfig.tagline && <p><strong>Tagline:</strong> {siteConfig.tagline}</p>}
            {siteConfig.email && <p><strong>Email:</strong> {siteConfig.email}</p>}
            {siteConfig.phone && <p><strong>Phone:</strong> {siteConfig.phone}</p>}
            {siteConfig.address && <p><strong>Address:</strong> {siteConfig.address}</p>}
          </div>
          <div className="mt-4">
            <button onClick={() => setSiteConfig(null)} className="bg-[dc2625] text-white px-3 py- rounded text-sm">Reset Config</button>
          </div>
        </div>
      ) : (
        <div className="bg-[0f1420] border border-[22305c] rounded p-4 mb-6">
          <h3 className="text-[2be4a8] mb-3">Edit Site Configuration</h3>
          <div className="space-y-3">
            <input
              value={newSiteName}
              onChange={(e) => setNewSiteName(e.target.value)}
              className="w-full bg-[070b14] border border-[22305c] rounded px-3 py-2 text-white"
              placeholder="Site name"
              required
            />
            <input
              value={newSiteRole}
              onChange={(e) => setNewSiteRole(e.target.value)}
              className="w-full bg-[070b14] border border-[22305c] rounded px-3 py-2 text-white"
              placeholder="Role/Tagline"
            />
            <input
              value={newSiteTagline}
              onChange={(e) => setNewSiteTagline(e.target.value)}
              className="w-full bg-[070b14] border border-[22305c] rounded px-3 py-2 text-white"
              placeholder="Tagline"
            />
            <input
              type="email"
              value={newSiteEmail}
              onChange={(e) => setNewSiteEmail(e.target.value)}
              className="w-full bg-[070b14] border border-[22305c] rounded px-3 py-2 text-white"
              placeholder="Email (optional)"
            />
            <input
              type="tel"
              value={newSitePhone}
              onChange={(e) => setNewSitePhone(e.target.value)}
              className="w-full bg-[070b14] border border-[22305c] rounded px-3 py-2 text-white"
              placeholder="Phone (optional)"
            />
            <input
              value={newSiteAddress}
              onChange={(e) => setNewSiteAddress(e.target.value)}
              className="w-full bg-[070b14] border border-[22305c] rounded px-3 py-2 text-white"
              placeholder="Address (optional)"
            />
            <button onClick={saveSiteConfig} className="bg-[2be4a8] text-[04241a] px-4 py-2 rounded font-medium w-full">
              Save Configuration
            </button>
          </div>
        </div>
      )}

      <div className="flex gap-2 mb-6 flex-wrap">
        {tabBtn('messages', 'Messages (' + messages.length + ')')}
        {tabBtn('faqs', 'FAQs (' + faqs.length + ')')}
        {tabBtn('projects', 'Projects (' + projects.length + ')')}
      </div>

      {tab === 'messages' && (
        <div className="space-y-4">
          {messages.length === 0 && <p className="text-[8fa0b5] italic">Koi message nahi aaya ab tak.</p>}
          {messages.map((msg, i) => (
            <div key={i} className="bg-[0f1420] border border-[22305c] rounded p-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium text-white">Name: {msg.name}</p>
                  {msg.email && <p className="text-[8fa0b5] small">Email: {msg.email}</p>}
                  {msg.phone && <p className="text-[8fa0b5] small">Phone: {msg.phone}</p>}
                  <p className="text-[8fa0b5] small">Date: {msg.date}</p>
                </div>
                <button onClick={() => deleteMsg(i)} className="text-[dc2625] text-sm hover:opacity-80">Delete</button>
              </div>
              <p className="mt-2 text-[eaf0f7] whitespace-pre-wrap">{msg.message}</p>
            </div>
          ))}
          <p className="text-[8fa0b5] small">Total messages: {messages.length}</p>
        </div>
      )}

      {tab === 'faqs' && (
        <div className="space-y-4">
          <div className="bg-[0f1420] border border-[22305c] rounded p-4 space-y-2">
            <input
              className="w-full bg-[070b14] border border-[22305c] rounded px-3 py-2 text-white"
              placeholder="Question"
              value={newFaq.q}
              onChange={(e) => setNewFaq({ ...newFaq, q: e.target.value })}
            />
            <textarea
              className="w-full bg-[070b14] border border-[22305c] rounded px-3 py-2 text-white"
              placeholder="Answer"
              rows={3}
              value={newFaq.a}
              onChange={(e) => setNewFaq({ ...newFaq, a: e.target.value })}
            />
            <button onClick={addFaq} className="bg-[2be4a8] text-[04241a] px-4 py-2 rounded font-medium">Add FAQ</button>
          </div>
          {faqs.map((f, i) => (
            <div key={i} className="bg-[0f1420] border border-[22305c] rounded p-4 flex justify-between gap-4">
              <div>
                <p className="font-medium text-white">{f.q}</p>
                <p className="text-[8fa0b5] small mt-1">{f.a}</p>
              </div>
              <button onClick={() => deleteFaq(i)} className="text-[dc2625] text-sm hover:opacity-80">Delete</button>
            </div>
          ))}
        </div>
      )}

      {tab === 'projects' && (
        <div className="space-y-4">
          <div className="bg-[0f1420] border border-[22305c] rounded p-4 space-y-2">
            <input
              className="w-full bg-[070b14] border border-[22305c] rounded px-3 py-2 text-white"
              placeholder="Project name"
              value={newProj.name}
              onChange={(e) => setNewProj({ ...newProj, name: e.target.value })}
            />
            <input
              className="w-full bg-[070b14] border border-[22305c] rounded px-3 py-2 text-white"
              placeholder="Project URL (e.g. https://your-project.vercel.app)"
              value={newProj.url}
              onChange={(e) => setNewProj({ ...newProj, url: e.target.value })}
            />
            <textarea
              className="w-full bg-[070b14] border border-[22305c] rounded px-3 py-2 text-white"
              placeholder="Project description"
              rows={2}
              value={newProj.desc}
              onChange={(e) => setNewProj({ ...newProj, desc: e.target.value })}
            />
            <input
              className="w-full bg-[070b14] border border-[22305c] rounded px-3 py-2 text-white"
              placeholder="Project image URL (optional - add screenshot/preview link)"
              value={newProj.imgUrl}
              onChange={(e) => setNewProj({ ...newProj, imgUrl: e.target.value })}
            />
            <button onClick={addProj} className="bg-[2be4a8] text-[04241a] px-4 py-2 rounded font-medium w-full">
              {newProj.name ? 'Update Project' : 'Add Project'}
            </button>
          </div>
          {projects.map((p, i) => (
            <div key={i} className="bg-[0f1420] border border-[22305c] rounded p-4 flex justify-between gap-4">
              <div>
                <p className="font-medium text-white">{p.name}</p>
                {p.url && <p className="text-[8fa0b5] small" target="_blank" rel="noopener noreferrer">Visit: {p.url}</p>}
                {p.imgUrl && <p className="text-[8fa0b5] small mt-1">Image: {p.imgUrl}</p>}
                <p className="text-[8fa0b5] small mt-1">{p.desc}</p>
              </div>
              <button onClick={() => deleteProj(i)} className="text-[dc2625] text-sm hover:opacity-80">Delete</button>
            </div>
          ))}
          <p className="text-[8fa0b5] small">Note: Projects stored in browser localStorage. Add image URLs to display project pictures.</p>
        </div>
      )}
    </div>
  );
}