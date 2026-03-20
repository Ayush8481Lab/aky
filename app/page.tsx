import { list } from '@vercel/blob';

// Forces Vercel to show fresh updates instantly
export const revalidate = 0; 

async function getLinks() {
  try {
    const { blobs } = await list();
    const file = blobs.find(b => b.pathname === 'links.json');
    if (!file) return[];
    const res = await fetch(file.url, { cache: 'no-store' });
    return await res.json();
  } catch (error) {
    return[];
  }
}

export default async function Home() {
  const links = await getLinks();

  return (
    <main className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900 via-gray-900 to-black p-6 pt-20 flex flex-col items-center font-sans text-white">
      <div className="w-full max-w-md space-y-10">
        
        {/* Profile Info */}
        <div className="text-center">
          <div className="w-28 h-28 mx-auto bg-gradient-to-tr from-cyan-400 to-purple-500 rounded-full shadow-[0_0_40px_rgba(168,85,247,0.4)] mb-5 border-4 border-white/10"></div>
          <h1 className="text-3xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">Ayush8481</h1>
          <p className="text-purple-300 mt-2 font-medium">My official links 👇</p>
        </div>

        {/* Links Grid */}
        <div className="flex flex-col gap-4">
          {links.map((link: any) => (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-center justify-between p-5 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 hover:bg-white/20 active:scale-95 transition-all duration-200 shadow-xl"
            >
              <span className="font-semibold text-lg text-white/90 group-hover:text-white">{link.title}</span>
              <svg className="w-5 h-5 text-white/50 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          ))}
          
          {links.length === 0 && (
            <div className="text-center p-6 bg-white/5 rounded-2xl border border-white/10">
              <p className="text-white/50 text-sm">Links coming soon...</p>
            </div>
          )}
        </div>

      </div>
    </main>
  );
}
