import { kv } from '@vercel/kv';
import { NextResponse } from 'next/server';

export async function GET() {
  const links = await kv.get('links') ||[];
  return NextResponse.json(links);
}

export async function POST(req) {
  const { title, url } = await req.json();
  const links = await kv.get('links') ||[];
  const newLink = { id: Date.now().toString(), title, url };
  await kv.set('links', [...links, newLink]);
  return NextResponse.json({ success: true });
}

export async function DELETE(req) {
  const { id } = await req.json();
  const links = await kv.get('links') ||[];
  const newLinks = links.filter(link => link.id !== id);
  await kv.set('links', newLinks);
  return NextResponse.json({ success: true });
}
