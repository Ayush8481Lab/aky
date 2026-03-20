import { put, list } from '@vercel/blob';
import { revalidatePath } from 'next/cache';

// Helper function to read the JSON file from Vercel Storage
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

export default async function AdminPanel() {
  const links = await getLinks();

  async function addLink(formData: FormData) {
    "use server";
    const title = formData.get("title");
    const url = formData.get("url");
    if (!title || !url) return;
    
    const currentLinks = await getLinks();
    const newLink = { id: Date.now().toString(), title, url };
    const updatedLinks = [...currentLinks, newLink];
    
    // Save the new file to Vercel Storage!
    await put('links.json', JSON.stringify(updatedLinks), {
      access: 'public',
      addRandomSuffix: false, // Overwrites the old file
    });
    
    revalidatePath('/api/key/Ayush8481');
    revalidatePath('/');
  }

  async function deleteLink(formData: FormData) {
    "use server";
    const id = formData.get("id");
    const currentLinks = await getLinks();
    const updatedLinks = currentLinks.filter((l: any) => l.id !== id);
    
    // Save updated file back to Vercel Storage
    await put('links.json', JSON.stringify(updatedLinks), {
      access: 'public',
      addRandomSuffix: false,
    });
    
    revalidatePath('/api/key/Ayush8481');
    revalidatePath('/');
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 text-gray-900 font-sans">
      <div className="max-w-md mx-auto pt-10 space-y-8">
        <h1 className="text-3xl font-extrabold text-gray-900">Admin Panel ✨</h1>

        {/* Add Link Form */}
        <form action={addLink} className="bg-white p-6 rounded-3xl shadow-lg border border-gray-100 space-y-4">
          <h2 className="text-lg font-bold">Add New Link</h2>
          <input name="title" placeholder="Title (e.g. My Website)" required className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500" />
          <input name="url" type="url" placeholder="URL (https://...)" required className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500" />
          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl active:scale-95 transition-transform">
            Publish Link
          </button>
        </form>

        {/* Manage Links */}
        <div className="bg-white p-6 rounded-3xl shadow-lg border border-gray-100 space-y-4">
          <h2 className="text-lg font-bold">Manage Links</h2>
          {links.map((link: any) => (
            <div key={link.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200">
              <div className="overflow-hidden pr-2">
                <p className="font-bold text-gray-800 truncate">{link.title}</p>
                <p className="text-sm text-gray-500 truncate">{link.url}</p>
              </div>
              <form action={deleteLink}>
                <input type="hidden" name="id" value={link.id} />
                <button type="submit" className="p-3 bg-red-100 text-red-600 rounded-lg font-bold active:scale-90 transition-transform">
                  Delete
                </button>
              </form>
            </div>
          ))}
          {links.length === 0 && <p className="text-gray-400 text-sm">No links yet.</p>}
        </div>
      </div>
    </div>
  );
}
