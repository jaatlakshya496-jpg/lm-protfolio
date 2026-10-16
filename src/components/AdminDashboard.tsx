import { useState, useEffect } from 'react';

export function AdminDashboard() {
  const [messages, setMessages] = useState<Array<{name: string; email: string; message: string; date: string}>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load messages from localStorage on client side
    const stored = localStorage.getItem('portfolio_messages');
    if (stored) {
      const parsed = JSON.parse(stored);
      setMessages(parsed);
    }
    setLoading(false);
  }, []);

  const addMessage = (name: string, email: string, message: string) => {
    const newMsg = {
      name,
      email,
      message,
      date: new Date().toLocaleString(),
    };
    const current = JSON.parse(localStorage.getItem('portfolio_messages') || '[]');
    current.push(newMsg);
    localStorage.setItem('portfolio_messages', JSON.stringify(current));
    setMessages([...messages, newMsg]);
  };

  if (loading) return <p className="p-4">Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-[2be4a8] mb-6">Admin Dashboard</h1>
      
      <div className="space-y-4">
        {messages.length === 0 && <p className="text-[8fa0b5] italic">Koi message nahi aaya ab tak.</p>}
        
        {messages.map((msg, i) => (
          <div key={i} className="bg-[0f1420] border border-[22305c] rounded p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-medium text-white">Name: {msg.name}</p>
                <p className="text-[8fa0b5] small">Email: {msg.email}</p>
                <p className="text-[8fa0b5] small">Date: {msg.date}</p>
              </div>
              <button
                onClick={() => {
                  if (confirm('Delete this message?')) {
                    const current = JSON.parse(localStorage.getItem('portfolio_messages') || '[]');
                    const filtered = current.filter((_: any) => _ !== msg);
                    localStorage.setItem('portfolio_messages', JSON.stringify(filtered));
                    setMessages(messages.filter((_: any) => _ !== msg));
                    alert('Message delete kar diya gaya.');
                  }
                }}
                className="text-[dc2625] text-sm hover:opacity-80"
              >
                Delete
              </button>
            </div>
            <p className="mt-2 text-[eaf0f7] whitespace-pre-wrap">{msg.message}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 pt-6 border-t border-[22305c]">
        <p className="text-[8fa0b5] small">Total messages: {messages.length}</p>
      </div>
    </div>
  );
}