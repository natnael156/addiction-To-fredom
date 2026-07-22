import type { NextApiRequest, NextApiResponse } from 'next';
import { getClientPromise } from '@/lib/mongodb';
import type { SiteContent } from '@/types/admin';
import { DEFAULT_CONTENT } from '@/utils/defaultContent';

const DB = 'a2f';
const COLLECTION = 'siteContent';
const DOC_ID = 'main';
const SETTINGS_COLLECTION = 'adminSettings';
const SETTINGS_DOC_ID = 'settings';

async function getStoredPassword(): Promise<string> {
  try {
    const client = await getClientPromise();
    const doc = await client.db(DB).collection(SETTINGS_COLLECTION).findOne({ _id: SETTINGS_DOC_ID as any });
    if (doc?.adminPassword) return doc.adminPassword as string;
  } catch {
    // fall through
  }
  return process.env.ADMIN_SECRET || 'admin1234';
}

async function readContent(): Promise<SiteContent> {
  const client = await getClientPromise();
  const doc = await client.db(DB).collection(COLLECTION).findOne({ _id: DOC_ID as any });
  if (!doc) return DEFAULT_CONTENT;
  const { _id, ...content } = doc;
  return content as unknown as SiteContent;
}

async function writeContent(content: SiteContent): Promise<void> {
  const client = await getClientPromise();
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
  const authHeader = req.headers['x-admin-secret'];
  if (!authHeader) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const stored = await getStoredPassword();
    if (authHeader !== stored) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
  } catch (err: any) {
    return res.status(500).json({ error: err?.message || 'Auth error' });
  }

  if (req.method === 'GET') {
    try {
      const content = await readContent();
      return res.status(200).json(content);
    } catch (err: any) {
      console.error('[GET /api/admin/content]', err?.message);
      return res.status(500).json({ error: err?.message || 'Failed to read content' });
    }
  }

  if (req.method === 'POST') {
    try {
      const body = req.body as SiteContent;
      await writeContent(body);
      return res.status(200).json({ success: true });
    } catch (err: any) {
      console.error('[POST /api/admin/content]', err?.message);
      return res.status(500).json({ error: err?.message || 'Failed to save content' });
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
