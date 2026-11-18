import { firebaseReady } from '../config/firebase';
import { getFirebase } from './firebase';

export type Message = {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  date: string;
};
export type Project = { id: string; name: string; url: string; desc: string; imgUrl: string };
export type Faq = { id: string; q: string; a: string };

const LEGACY_MSG_KEY = 'portfolio_messages';

const str = (v: unknown) => (typeof v === 'string' ? v : '');

/** Visitor contact form → Firestore `messages` (falls back to the old local save until Firebase is configured). */
export async function sendMessage(input: {
  name: string;
  email: string;
  phone: string;
  message: string;
}) {
  if (!firebaseReady) {
    const raw = window.localStorage.getItem(LEGACY_MSG_KEY);
    const current = raw ? JSON.parse(raw) : [];
    const list = Array.isArray(current) ? current : [];
    list.push({ ...input, date: new Date().toLocaleString() });
    window.localStorage.setItem(LEGACY_MSG_KEY, JSON.stringify(list));
    return;
  }
  const { db, fs } = await getFirebase();
  await fs.addDoc(fs.collection(db, 'messages'), {
    ...input,
    createdAt: fs.serverTimestamp(),
  });
}

export async function fetchMessages(): Promise<Message[]> {
  const { db, fs } = await getFirebase();
  const snap = await fs.getDocs(
    fs.query(fs.collection(db, 'messages'), fs.orderBy('createdAt', 'desc'))
  );
  return snap.docs.map((d) => {
    const x = d.data();
    return {
      id: d.id,
      name: str(x.name),
      email: str(x.email),
      phone: str(x.phone),
      message: str(x.message),
      date: x.createdAt?.toDate ? x.createdAt.toDate().toLocaleString('en-IN') : '',
    };
  });
}

export async function deleteMessage(id: string) {
  const { db, fs } = await getFirebase();
  await fs.deleteDoc(fs.doc(db, 'messages', id));
}

/* ---------- projects (public read, admin write) ---------- */

export async function fetchProjects(): Promise<Project[]> {
  const { db, fs } = await getFirebase();
  const snap = await fs.getDocs(
    fs.query(fs.collection(db, 'projects'), fs.orderBy('createdAt', 'asc'))
  );
  return snap.docs.map((d) => {
    const x = d.data();
    return {
      id: d.id,
      name: str(x.name),
      url: str(x.url),
      desc: str(x.desc),
      imgUrl: str(x.imgUrl),
    };
  });
}

export async function addProject(p: Omit<Project, 'id'>) {
  const { db, fs } = await getFirebase();
  await fs.addDoc(fs.collection(db, 'projects'), { ...p, createdAt: fs.serverTimestamp() });
}

export async function deleteProject(id: string) {
  const { db, fs } = await getFirebase();
  await fs.deleteDoc(fs.doc(db, 'projects', id));
}

/* ---------- FAQs (public read, admin write) ---------- */

export async function fetchFaqs(): Promise<Faq[]> {
  const { db, fs } = await getFirebase();
  const snap = await fs.getDocs(
    fs.query(fs.collection(db, 'faqs'), fs.orderBy('createdAt', 'asc'))
  );
  return snap.docs.map((d) => {
    const x = d.data();
    return { id: d.id, q: str(x.q), a: str(x.a) };
  });
}

export async function addFaq(f: Omit<Faq, 'id'>) {
  const { db, fs } = await getFirebase();
  await fs.addDoc(fs.collection(db, 'faqs'), { ...f, createdAt: fs.serverTimestamp() });
}

export async function deleteFaq(id: string) {
  const { db, fs } = await getFirebase();
  await fs.deleteDoc(fs.doc(db, 'faqs', id));
}

/* ---------- admin auth (Firebase Auth, email + password) ---------- */

/** Calls back with true/false as the admin signs in/out. Returns an unsubscribe function. */
export async function onAdminAuthChange(cb: (signedIn: boolean) => void): Promise<() => void> {
  if (!firebaseReady) {
    cb(false);
    return () => {};
  }
  const { auth, au } = await getFirebase();
  return au.onAuthStateChanged(auth, (user) => cb(!!user));
}

export async function adminSignIn(email: string, password: string) {
  const { auth, au } = await getFirebase();
  await au.signInWithEmailAndPassword(auth, email, password);
}

export async function adminSignOut() {
  if (!firebaseReady) return;
  const { auth, au } = await getFirebase();
  await au.signOut(auth);
}

/** Human-friendly (Hinglish) message for a Firebase error. */
export function describeError(e: unknown): string {
  const code = (e as { code?: string })?.code ?? (e as Error)?.message ?? '';
  if (code.includes('permission-denied'))
    return 'Permission denied — Firestore rules mein admin email check karo.';
  if (code.includes('invalid-credential') || code.includes('wrong-password') || code.includes('user-not-found'))
    return 'Email ya password galat hai.';
  if (code.includes('too-many-requests')) return 'Bahut zyada koshish ho gayi, thodi der baad try karo.';
  if (code.includes('network')) return 'Internet / network error. Dobara try karo.';
  if (code.includes('firebase-not-configured')) return 'Firebase abhi connect nahi hai.';
  return 'Kuch gadbad ho gayi. Dobara try karo.';
}
