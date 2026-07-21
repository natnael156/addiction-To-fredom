import type { NextApiRequest, NextApiResponse } from 'next';
import { head } from '@vercel/blob';
import type { SiteContent } from '@/types/admin';
import { DEFAULT_CONTENT } from '@/utils/defaultContent';

const BLOB_KEY = 'site-content.json';

export default async function handler(_req: NextApiRequest, res: NextApiResponse<SiteContent>) {
  try {
    const blob = await head(BLOB_KEY).catch(() => null);
    if (blob) {
      const r = await fetch(blob.url);
      if (r.ok) {
        const content = (await r.json()) as SiteContent;
        // Cache for 30 seconds on CDN
        res.setHeader('Cache-Control', 's-maxage=30, stale-while-revalidate');
        return res.status(200).json(content);
      }
    }
  } catch {
    // fall through
  }
  return res.status(200).json(DEFAULT_CONTENT);
}
