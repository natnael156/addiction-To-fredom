import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '@/lib/mongodb';
import type { SiteContent } from '@/types/admin';
import { DEFAULT_CONTENT } from '@/utils/defaultContent';

const DB = 'a2f';
const COLLECTION = 'siteContent';
const DOC_ID = 'main';

async function readContent(): Promise<SiteContent> {
  try {
    const client = await clientPromise;
    const doc = await client.db(DB).collection(COLLECTION).findOne({ _id: DOC_ID as any });
    if (!doc) return DEFAULT_CONTENT;
    const { _id, ...content } = doc;
    return content as unknown as SiteContent;
  } catch {
    return DEFAULT_CONTENT;
  }
}

async function writeContent(content: SiteContent): Promise<void> {
  const client = await clientPromise;
  await client
    .db(DB)
    .collection(COLLECTION)
    .updateOne(
      { _id: DOC_ID as any },
      { $set: { ...content } },
      { upsert: true }
    );
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
