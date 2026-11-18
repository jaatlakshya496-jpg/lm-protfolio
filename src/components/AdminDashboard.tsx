import { useState, useEffect, useCallback } from 'react';
import {
  fetchMessages,
  deleteMessage,
  fetchFaqs,
  addFaq as addFaqDoc,
  deleteFaq as deleteFaqDoc,
  fetchProjects,
  addProject,
  deleteProject,
  describeError,
  type Message,
  type Faq,
  type Project,
} from '../lib/db';

const inputCls = 'w-full bg-[#070b14] border border-[#22305c] rounded px-3 py-2 text-white';
const cardCls = 'bg-[#0f1420] border border-[#22305c] rounded p-4';

/** Admin panel — everything is stored in Firestore, so nothing is lost when the browser is cleared. */
export function AdminDashboard() {
  const [tab, setTab] = useState<'messages' | 'faqs' | 'projects'>('messages');
  const [messages, setMessages] = useState<Message[]>([]);
  const [faqs, setFaqs] = useState<Faq[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [newFaq, setNewFaq] = useState({ q: '', a: '' });
  const [newProj, setNewProj] = useState({ name: '', url: '', desc: '', imgUrl: '' });

  const reload = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const [m, f, p] = await Promise.all([fetchMessages(), fetchFaqs(), fetchProjects()]);
      setMessages(m);
      setFaqs(f);
      setProjects(p);
    } catch (e) {
      setError(describeError(e));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    reload();
  }, [reload]);

  /** Runs a write, shows any error, then refreshes the lists. */
  const run = async (fn: () => Promise<void>) => {
    setError('');
    try {
      await fn();
      await reload();
    } catch (e) {
      setError(describeError(e));
    }
  };

  const confirmDelete = (what: string) => window.confirm(`${what} delete karna hai? Ye wapas nahi aayega.`);

  const addFaq = () => {
    if (!newFaq.q.trim() || !newFaq.a.trim()) return;
    run(async () => {
      await addFaqDoc({ q: newFaq.q.trim(), a: newFaq.a.trim() });
      setNewFaq({ q: '', a: '' });
    });
  };

  const addProj = () => {
    if (!newProj.name.trim()) return;
    run(async () => {
      await addProject({
        name: newProj.name.trim(),
        url: newProj.url.trim() || '#',
        desc: newProj.desc.trim(),
        imgUrl: newProj.imgUrl.trim(),
      });
      setNewProj({ name: '', url: '', desc: '', imgUrl: '' });
    });
  };

  const tabBtn = (t: typeof tab, label: string) => (
    <button
      onClick={() => setTab(t)}
      className={`px-4 py-2 rounded ${tab === t ? 'bg-[#2be4a8] text-[#04241a]' : 'bg-[#0f1420] text-white'}`}
    >
      {label}
    </button>
  );

  return (
    <div className="p-6">
      <div className="flex items-center justify-between gap-3 flex-wrap mb-6">
        <h1 className="text-2xl font-bold text-[#2be4a8]">Admin Dashboard</h1>
        <button onClick={reload} disabled={loading} className="bg-[#0f1420] text-white px-3 py-1.5 rounded text-sm">
          {loading ? 'Loading…' : '↻ Refresh'}
        </button>
      </div>

      {error && (
        <p className="text-[#dc2625] mb-4" role="alert">
          {error}
        </p>
      )}

      <div className="flex gap-2 mb-6 flex-wrap">
        {tabBtn('messages', `Messages (${messages.length})`)}
        {tabBtn('faqs', `FAQs (${faqs.length})`)}
        {tabBtn('projects', `Projects (${projects.length})`)}
      </div>

      {tab === 'messages' && (
        <div className="space-y-4">
          {!loading && messages.length === 0 && (
            <p className="text-[#8fa0b5] italic">Koi message nahi aaya ab tak.</p>
          )}
          {messages.map((msg) => (
            <div key={msg.id} className={cardCls}>
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium text-white">Name: {msg.name}</p>
                  {msg.email && <p className="text-[#8fa0b5] small">Email: {msg.email}</p>}
                  {msg.phone && <p className="text-[#8fa0b5] small">Phone: {msg.phone}</p>}
                  <p className="text-[#8fa0b5] small">Date: {msg.date}</p>
                </div>
                <button
                  onClick={() => confirmDelete('Ye message') && run(() => deleteMessage(msg.id))}
                  className="text-[#dc2625] text-sm hover:opacity-80"
                >
                  Delete
                </button>
              </div>
              <p className="mt-2 text-[#eaf0f7] whitespace-pre-wrap">{msg.message}</p>
            </div>
          ))}
          <p className="text-[#8fa0b5] small">Total messages: {messages.length}</p>
        </div>
      )}

      {tab === 'faqs' && (
        <div className="space-y-4">
          <p className="text-[#8fa0b5] small">
            Yahan add kiye FAQs site ke built-in FAQs ke baad dikhte hain.
          </p>
          <div className={`${cardCls} space-y-2`}>
            <input
              className={inputCls}
              placeholder="Question"
              value={newFaq.q}
              onChange={(e) => setNewFaq({ ...newFaq, q: e.target.value })}
            />
            <textarea
              className={inputCls}
              placeholder="Answer"
              rows={3}
              value={newFaq.a}
              onChange={(e) => setNewFaq({ ...newFaq, a: e.target.value })}
            />
            <button onClick={addFaq} className="bg-[#2be4a8] text-[#04241a] px-4 py-2 rounded font-medium">
              Add FAQ
            </button>
          </div>
          {faqs.map((f) => (
            <div key={f.id} className={`${cardCls} flex justify-between gap-4`}>
              <div>
                <p className="font-medium text-white">{f.q}</p>
                <p className="text-[#8fa0b5] small mt-1">{f.a}</p>
              </div>
              <button
                onClick={() => confirmDelete('Ye FAQ') && run(() => deleteFaqDoc(f.id))}
                className="text-[#dc2625] text-sm hover:opacity-80"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}

      {tab === 'projects' && (
        <div className="space-y-4">
          <p className="text-[#8fa0b5] small">
            Yahan add kiye projects site ke built-in projects ke baad dikhte hain.
          </p>
          <div className={`${cardCls} space-y-2`}>
            <input
              className={inputCls}
              placeholder="Project name"
              value={newProj.name}
              onChange={(e) => setNewProj({ ...newProj, name: e.target.value })}
            />
            <input
              className={inputCls}
              placeholder="Project URL (e.g. https://your-project.vercel.app)"
              value={newProj.url}
              onChange={(e) => setNewProj({ ...newProj, url: e.target.value })}
            />
            <textarea
              className={inputCls}
              placeholder="Project description"
              rows={2}
              value={newProj.desc}
              onChange={(e) => setNewProj({ ...newProj, desc: e.target.value })}
            />
            <input
              className={inputCls}
              placeholder="Project image URL (optional)"
              value={newProj.imgUrl}
              onChange={(e) => setNewProj({ ...newProj, imgUrl: e.target.value })}
            />
            <button onClick={addProj} className="bg-[#2be4a8] text-[#04241a] px-4 py-2 rounded font-medium w-full">
              Add Project
            </button>
          </div>
          {projects.map((p) => (
            <div key={p.id} className={`${cardCls} flex justify-between gap-4`}>
              <div>
                <p className="font-medium text-white">{p.name}</p>
                {p.url && p.url !== '#' && (
                  <a href={p.url} className="text-[#8fa0b5] small block" target="_blank" rel="noopener noreferrer">
                    Visit: {p.url}
                  </a>
                )}
                {p.imgUrl && <p className="text-[#8fa0b5] small mt-1">Image: {p.imgUrl}</p>}
                <p className="text-[#8fa0b5] small mt-1">{p.desc}</p>
              </div>
              <button
                onClick={() => confirmDelete('Ye project') && run(() => deleteProject(p.id))}
                className="text-[#dc2625] text-sm hover:opacity-80"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
