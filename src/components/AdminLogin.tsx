import { useEffect } from 'react';

export function AdminLogin({ onLogin }: { onLogin?: () => void }) {
  useEffect(() => {
    window.sessionStorage.setItem('adminLoggedIn', 'true');
    onLogin?.();
  }, [onLogin]);

  return (
    <div className="max-w-sm mx-auto bg-[#070b18] border border-[#22305c] rounded-2xl p-8 text-center">
      <h2 className="text-2xl font-bold text-[#2be4a8] mb-4">Admin</h2>
      <p className="text-white/70">Loading admin panel…</p>
    </div>
  );
}
