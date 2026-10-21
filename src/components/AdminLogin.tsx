import { useState } from 'react';

const ADMIN_PASSWORD = 'lakshya2024';

export function AdminLogin({ onLogin }: { onLogin?: () => void }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      localStorage.setItem('adminLoggedIn', 'true');
      setError('');
      onLogin?.();
    } else {
      setError('Galat password. Dobara try karo.');
    }
  };

  return (
    <div className="max-w-sm mx-auto bg-[#070b18] border border-[#22305c] rounded-2xl p-8">
      <h2 className="text-2xl font-bold text-[#2be4a8] mb-6 text-center">Admin Login</h2>
      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label htmlFor="admin-password" className="block text-white mb-2">
            Password
          </label>
          <input
            id="admin-password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoFocus
            className="w-full bg-[#0f1420] border border-[#22305c] rounded px-4 py-3 text-white"
          />
        </div>
        {error && (
          <p className="text-[#dc2625] text-sm" role="alert">
            {error}
          </p>
        )}
        <button
          type="submit"
          className="w-full bg-[#2be4a8] text-[#04241a] py-3 rounded font-medium hover:opacity-90"
        >
          Login
        </button>
      </form>
    </div>
  );
}
