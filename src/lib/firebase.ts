import { firebaseConfig, firebaseReady } from '../config/firebase';

/**
 * Firebase is loaded lazily so normal visitors don't download it until the
 * contact form is used or the admin panel / lists need data.
 */
let loader: ReturnType<typeof load> | null = null;

async function load() {
  const [app, fs, au] = await Promise.all([
    import('firebase/app'),
    import('firebase/firestore'),
    import('firebase/auth'),
  ]);
  const a = app.getApps().length ? app.getApp() : app.initializeApp(firebaseConfig);
  return { db: fs.getFirestore(a), auth: au.getAuth(a), fs, au };
}

export function getFirebase() {
  if (!firebaseReady) return Promise.reject(new Error('firebase-not-configured'));
  if (!loader) {
    loader = load().catch((e) => {
      loader = null; // allow a retry after a network failure
      throw e;
    });
  }
  return loader;
}
