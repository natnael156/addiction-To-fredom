import type { NextApiRequest, NextApiResponse } from 'next';
import { getClientPromise } from '@/lib/mongodb';

const DB = 'a2f';
const COLLECTION = 'adminSettings';
const DOC_ID = 'settings';

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

async function setPassword(newPassword: string): Promise<void> {
  const client = await getClientPromise();
  await client
    .db(DB)
    .collection(COLLECTION)
    .updateOne(
      { _id: DOC_ID as any },
      { $set: { adminPassword: newPassword } },
      { upsert: true }
    );
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { currentPassword, newPassword } = req.body as { currentPassword: string; newPassword: string };

  if (!currentPassword || !newPassword) {
    return res.status(400).json({ error: 'Current and new password required' });
  }

  if (newPassword.length < 6) {
    return res.status(400).json({ error: 'New password must be at least 6 characters' });
  }

  try {
    const stored = await getStoredPassword();
    if (currentPassword !== stored) {
      return res.status(401).json({ error: 'Current password incorrect' });
    }

    await setPassword(newPassword);
    return res.status(200).json({ success: true });
  } catch (err: any) {
    console.error('[change-password]', err?.message);
    return res.status(500).json({ error: err?.message || 'Failed to change password' });
  }
}
