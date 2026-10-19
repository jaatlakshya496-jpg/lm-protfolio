import { useState, useEffect } from 'react';

const ADMIN_PASSWORD = 'lakshya2024';

export function AdminLogin({ onLogin }: { onLogin?: () => void }) {
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    // Check if already logged in via localStorage
    const stored = localStorage.getItem('adminLoggedIn');
    if (stored === 'true') {
      setSuccess(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setSuccess(true);
      localStorage.setItem('adminLoggedIn', 'true');
      onLogin?.();
    } else {
      alert('Sahi password daal.');
    }
  };

  if (success) return null; // Hide login if already logged in

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="bg-[070b18] rounded-2xl p-8 w-80 mx-8 mt-16">
        <h2 className="text-2xl font-bold text-[2be4a8] mb-6 text-center">Admin Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-white mb-2">Password</label>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-[0f1420] border border-[22305c] rounded px-4 py-3 text-white"
            />
          </div>
          <button type="submit" className="w-full bg-[2be4a8] text-[04241a] py-3 rounded font-medium hover:opacity-90">
            Login
          </button>
        </form>
        <p className="mt-6 text-center text-[8fa0b5] small">
          Password: {ADMIN_PASSWORD}
        </p>
      </div>
    </div>
  );
}