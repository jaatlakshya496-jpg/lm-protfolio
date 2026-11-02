import { useEffect, useState } from 'react';

const ADMIN_PASSWORD = 'lakshya2024'; // <-- Change this password to whatever you want

export function AdminLogin({ onLogin }: { onLogin?: () => void }) {
  const [password, setPassword] = useState('');
  const [failed, setFailed] = useState(false);

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      window.sessionStorage.setItem('adminLoggedIn', 'true');
      setFailed(false);
      onLogin?.();
    } else {
      setFailed(true);
    }
  };

  if (window.sessionStorage.getItem('adminLoggedIn') === 'true') {
    onLogin?.();
    return null;
  }

  return (
    <div className="max-w-sm mx-auto bg-[#070b18] border border-[#22305c] rounded-2xl p-8 text-center">
      <h2 className="text-2xl font-bold text-[#2be4a8] mb-4">Admin</h2>
      {failed && (
        <p className="text-[dc2625] mb-4">Sahi password na daalne ki wajah se login fail ho gaya.</p>
      )}
      <input
        type="password"
        placeholder="Password daal dein"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full bg-[070b14] border border-[22305c] rounded px-3 py-2 text-white mb-4"
        required
      />
      <button
        onClick={handleLogin}
        className="bg-[2be4a8] text-[04241a] px-4 py-2 rounded font-medium w-full"
      >
        Login
      </button>
    </div>
  );
}
