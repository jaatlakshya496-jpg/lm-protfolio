import React, { useState } from 'react';
import { adminSignIn, describeError } from '../lib/db';
import { firebaseReady } from '../config/firebase';

/** Admin login — Firebase Auth (email + password). No password lives in the code. */
export function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError('');
    try {
      await adminSignIn(email.trim(), password);
      // App listens to the auth state and opens the dashboard.
    } catch (err) {
      setError(describeError(err));
    } finally {
      setBusy(false);
    }
  };

  if (!firebaseReady) {
    return (
      <div className="max-w-sm mx-auto bg-[#070b18] border border-[#22305c] rounded-2xl p-8 text-center">
        <h2 className="text-2xl font-bold text-[#2be4a8] mb-4">Admin</h2>
        <p className="text-[#8fa0b5]">
          Firebase abhi connect nahi hai. <code>src/config/firebase.ts</code> mein config bharo,
          phir admin login chalega.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleLogin}
      className="max-w-sm mx-auto bg-[#070b18] border border-[#22305c] rounded-2xl p-8 text-center"
    >
      <h2 className="text-2xl font-bold text-[#2be4a8] mb-4">Admin</h2>
      {error && (
        <p className="text-[#dc2625] mb-4" role="alert">
          {error}
        </p>
      )}
      <input
        type="email"
        placeholder="Admin email"
        autoComplete="username"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full bg-[#070b14] border border-[#22305c] rounded px-3 py-2 text-white mb-3"
        required
      />
      <input
        type="password"
        placeholder="Password"
        autoComplete="current-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full bg-[#070b14] border border-[#22305c] rounded px-3 py-2 text-white mb-4"
        required
      />
      <button
        type="submit"
        disabled={busy}
        className="bg-[#2be4a8] text-[#04241a] px-4 py-2 rounded font-medium w-full"
      >
        {busy ? 'Login ho raha hai…' : 'Login'}
      </button>
    </form>
  );
}
