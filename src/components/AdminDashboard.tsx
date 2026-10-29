import { useState, useEffect } from 'react';
import { FAQS } from './Seo';

const MSG_KEY = 'portfolio_messages';
const FAQ_KEY = 'portfolio_faqs';
const PROJ_KEY = 'portfolio_projects';

export function AdminDashboard() {
  const [tab, setTab] = useState<'messages' | 'faqs' | 'projects'>('messages');
  const [messages, setMessages] = useState<any[]>([]);
  const [faqs, setFaqs] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [newFaq, setNewFaq] = useState({ q: '', a: '' });
  const [newProj, setNewProj] = useState({ name: '', url: '', desc: '' });

  const reload = () => {
    try { setMessages(JSON.parse(localStorage.getItem(MSG_KEY) || '[]')); } catch { setMessages([]); }
    try { setFaqs(JSON.parse(localStorage.getItem(FAQ_KEY) || JSON.stringify(FAQS))); } catch { setFaqs(FAQS); }
    try { setProjects(JSON.parse(localStorage.getItem(PROJ_KEY) || '[]')); } catch { setProjects([]); }
  };

  useEffect(() => { reload(); }, []);

  const deleteMsg = (i: number) => {
    const next = messages.filter((_, idx) => idx !== i);
    localStorage.setItem(MSG_KEY, JSON.stringify(next));
    setMessages(next);
  };

  const addFaq = () => {
    if (!newFaq.q.trim() || !newFaq.a.trim()) return;
    const next = [...faqs, { q: newFaq.q.trim(), a: newFaq.a.trim() }];
    localStorage.setItem(FAQ_KEY, JSON.stringify(next));
    setFaqs(next);
    setNewFaq({ q: '', a: '' });
  };

  const deleteFaq = (i: number) => {
    const next = faqs.filter((_, idx) => idx !== i);
    localStorage.setItem(FAQ_KEY, JSON.stringify(next));
    setFaqs(next);
  };

  const addProj = () => {
    if (!newProj.name.trim()) return;
    const next = [...projects, { name: newProj.name.trim(), url: newProj.url.trim(), desc: newProj.desc.trim() }];
    localStorage.setItem(PROJ_KEY, JSON.stringify(next));
    setProjects(next);
    setNewProj({ name: '', url: '', desc: '' });
  };

  const deleteProj = (i: number) => {
    const next = projects.filter((_, idx) => idx !== i);
    localStorage.setItem(PROJ_KEY, JSON.stringify(next));
    setProjects(next);
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
      <div className="flex gap-2 mb-6 flex-wrap">
        {tabBtn('messages', 'Messages')}
        {tabBtn('faqs', 'FAQs')}
        {tabBtn('projects', 'Projects')}
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
            <input className="w-full bg-[070b14] border border-[22305c] rounded px-3 py-2 text-white" placeholder="Question" value={newFaq.q} onChange={(e) => setNewFaq({ ...newFaq, q: e.target.value })} />
            <textarea className="w-full bg-[070b14] border border-[22305c] rounded px-3 py-2 text-white" placeholder="Answer" rows={3} value={newFaq.a} onChange={(e) => setNewFaq({ ...newFaq, a: e.target.value })} />
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
            <input className="w-full bg-[070b14] border border-[22305c] rounded px-3 py-2 text-white" placeholder="Project name" value={newProj.name} onChange={(e) => setNewProj({ ...newProj, name: e.target.value })} />
            <input className="w-full bg-[070b14] border border-[22305c] rounded px-3 py-2 text-white" placeholder="URL (optional)" value={newProj.url} onChange={(e) => setNewProj({ ...newProj, url: e.target.value })} />
            <textarea className="w-full bg-[070b14] border border-[22305c] rounded px-3 py-2 text-white" placeholder="Description" rows={2} value={newProj.desc} onChange={(e) => setNewProj({ ...newProj, desc: e.target.value })} />
            <button onClick={addProj} className="bg-[2be4a8] text-[04241a] px-4 py-2 rounded font-medium">Add Project</button>
          </div>
          {projects.map((p, i) => (
            <div key={i} className="bg-[0f1420] border border-[22305c] rounded p-4 flex justify-between gap-4">
              <div>
                <p className="font-medium text-white">{p.name}</p>
                {p.url && <p className="text-[8fa0b5] small">{p.url}</p>}
                <p className="text-[8fa0b5] small mt-1">{p.desc}</p>
              </div>
              <button onClick={() => deleteProj(i)} className="text-[dc2625] text-sm hover:opacity-80">Delete</button>
            </div>
          ))}
          <p className="text-[8fa0b5] small">Note: Design/pictures/games management can be added similarly; admin data stored locally.</p>
        </div>
      )}
    </div>
  );
}