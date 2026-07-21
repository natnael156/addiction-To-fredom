import type { NextApiRequest, NextApiResponse } from 'next';
import { put, head, getDownloadUrl } from '@vercel/blob';
import type { SiteContent } from '@/types/admin';
import { DEFAULT_CONTENT } from '@/utils/defaultContent';

const BLOB_KEY = 'site-content.json';

async function readContent(): Promise<SiteContent> {
  try {
    // Check if the blob exists
    const blob = await head(BLOB_KEY).catch(() => null);
    if (!blob) return DEFAULT_CONTENT;

    const res = await fetch(blob.url);
    if (!res.ok) return DEFAULT_CONTENT;
    return (await res.json()) as SiteContent;
  } catch {
    return DEFAULT_CONTENT;
  }
}

async function writeContent(content: SiteContent): Promise<void> {
  const json = JSON.stringify(content);
  await put(BLOB_KEY, json, {
    access: 'public',
    contentType: 'application/json',
    addRandomSuffix: false,
  });
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const adminSecret = process.env.ADMIN_SECRET || 'admin1234';
  const authHeader = req.headers['x-admin-secret'];

  if (authHeader !== adminSecret) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (req.method === 'GET') {
    const content = await readContent();
    return res.status(200).json(content);
  }

  if (req.method === 'POST') {
    try {
      const body = req.body as SiteContent;
      await writeContent(body);
      return res.status(200).json({ success: true });
    } catch (err) {
      console.error('Failed to save content:', err);
      return res.status(500).json({ error: 'Failed to save content' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
};
