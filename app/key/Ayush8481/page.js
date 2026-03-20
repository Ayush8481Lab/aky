"use client";
import { useState, useEffect } from 'react';

export default function AdminPanel() {
  const[links, setLinks] = useState([]);
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchLinks(); },[]);

  const fetchLinks = async () => {
    const res = await fetch('/api/links');
    const data = await res.json();
    setLinks(data ||[]);
    setLoading(false);
  };

  const addLink = async (e) => {
    e.preventDefault();
    if (!title || !url) return;
    await fetch('/api/links', {
      method: 'POST',
      body: JSON.stringify({ title, url }),
      headers: { 'Content-Type': 'application/json' }
    });
    setTitle(''); setUrl(''); fetchLinks();
  };

  const deleteLink = async (id) => {
    await fetch('/api/links', {
      method: 'DELETE',
      body: JSON.stringify({ id }),
      headers: { 'Content-Type': 'application/json' }
    });
    fetchLinks();
  };

  return (
    <div className="min-h-screen bg-[#050505] p-6 font-sans flex flex-col items-center">
      <div className="w-full max-w-lg mt-10">
        
        <div className="flex items-center gap-3 mb-8">
          <div className="w-3 h-8 bg-gradient-to-b from-violet-500 to-fuchsia-500 rounded-full"></div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Admin Portal</h1>
        </div>

        {/* Add Link Form */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-3xl shadow-2xl mb-8">
          <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Add New Link</h2>
          <form onSubmit={addLink} className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Title (e.g., My Instagram)"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-4 bg-black/40 border border-white/5 rounded-2xl text-white focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all placeholder-gray-600"
            />
            <input
              type="url"
              placeholder="https://..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full p-4 bg-black/40 border border-white/5 rounded-2xl text-white focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all placeholder-gray-600"
            />
            <button type="submit" className="mt-2 w-full py-4 bg-white text-black font-bold rounded-2xl text-lg hover:bg-gray-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)] active:scale-95">
              Publish to App 🚀
            </button>
          </form>
        </div>

        {/* Manage Links */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-3xl shadow-2xl">
          <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Live Links</h2>
          
          {loading ? <div className="h-10 w-full bg-white/10 rounded-xl animate-pulse"></div> : (
            <div className="flex flex-col gap-3">
              {links.length === 0 && <p className="text-gray-600 text-sm">No links added yet.</p>}
              {links.map((link) => (
                <div key={link.id} className="flex justify-between items-center p-4 bg-black/30 rounded-2xl border border-white/5 group hover:border-white/10 transition-colors">
                  <div className="overflow-hidden pr-3">
                    <p className="font-semibold text-white truncate">{link.title}</p>
                    <p className="text-xs text-gray-500 truncate mt-1">{link.url}</p>
                  </div>
                  <button
                    onClick={() => deleteLink(link.id)}
                    className="p-3 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all active:scale-95"
                  >
                    {/* Trash Icon */}
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
                            }
