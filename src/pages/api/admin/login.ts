import type { NextApiRequest, NextApiResponse } from 'next';
import { getClientPromise } from '@/lib/mongodb';

const DB = 'a2f';
const COLLECTION = 'adminSettings';
const DOC_ID = 'settings';

// Get stored password from DB, fall back to env var
async function getStoredPassword(): Promise<string> {
  try {
    const client = await getClientPromise();
    const doc = await client.db(DB).collection(COLLECTION).findOne({ _id: DOC_ID as any });
    if (doc?.adminPassword) return doc.adminPassword as string;
  } catch {
    // fall through
  }
  return process.env.ADMIN_SECRET || 'admin1234';
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { password } = req.body as { password: string };
  if (!password) {
    return res.status(400).json({ error: 'Password required' });
  }

  try {
    const stored = await getStoredPassword();
    if (password === stored) {
      return res.status(200).json({ success: true });
    }
    return res.status(401).json({ error: 'Incorrect password' });
  } catch (err: any) {
    return res.status(500).json({ error: err?.message || 'Server error' });
  }
}
