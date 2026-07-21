import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '@/lib/mongodb';
import type { SiteContent } from '@/types/admin';
import { DEFAULT_CONTENT } from '@/utils/defaultContent';

const DB = 'a2f';
const COLLECTION = 'siteContent';
const DOC_ID = 'main';

export default async function handler(_req: NextApiRequest, res: NextApiResponse<SiteContent>) {
  try {
    const client = await clientPromise;
    const doc = await client.db(DB).collection(COLLECTION).findOne({ _id: DOC_ID as any });
    if (doc) {
      const { _id, ...content } = doc;
      res.setHeader('Cache-Control', 's-maxage=30, stale-while-revalidate');
      return res.status(200).json(content as unknown as SiteContent);
    }
  } catch {
    // fall through to default
  }
  return res.status(200).json(DEFAULT_CONTENT);
}
