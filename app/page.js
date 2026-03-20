import { kv } from '@vercel/kv';

export const revalidate = 0; 

export default async function Home() {
  const links = await kv.get('links') ||[];

  return (
    <main className="min-h-screen relative flex flex-col items-center p-6 overflow-hidden bg-[#0a0a0a] font-sans">
      {/* Animated Background Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-purple-600/30 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="z-10 w-full max-w-md mt-20 flex flex-col items-center">
        
        {/* Profile Avatar with Glowing Ring */}
        <div className="relative mb-6 group">
          <div className="absolute inset-0 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full blur-xl opacity-60 animate-pulse"></div>
          <img
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Ayush"
            alt="Ayush"
            className="relative w-28 h-28 rounded-full border border-white/20 object-cover bg-black shadow-2xl"
          />
        </div>

        {/* Name and Bio */}
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-500 mb-2">
          Ayush
        </h1>
        <p className="text-gray-400 font-medium mb-10 tracking-wide text-sm">Explore my world below 👇</p>

        {/* Premium Glassmorphism Links */}
        <div className="w-full flex flex-col gap-4">
          {links.length === 0 ? (
            <p className="text-white/40 text-center">No links available at the moment.</p>
          ) : (
            links.map((link) => (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center justify-between p-5 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl transition-all duration-300 hover:bg-white/10 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(139,92,246,0.15)] overflow-hidden"
              >
                {/* Hover gradient effect inside card */}
                <div className="absolute inset-0 bg-gradient-to-r from-violet-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <span className="relative text-lg font-semibold text-white/90 group-hover:text-white tracking-wide">{link.title}</span>
                
                {/* Arrow Icon */}
                <svg className="relative w-5 h-5 text-white/40 group-hover:text-white group-hover:translate-x-1 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
              </a>
            ))
          )}
        </div>
      </div>
    </main>
  );
    }
