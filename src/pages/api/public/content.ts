import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
import type { SiteContent } from '@/types/admin';
import { DEFAULT_CONTENT } from '@/utils/defaultContent';

const CONTENT_FILE = path.join(process.cwd(), 'data', 'content.json');

export default function handler(_req: NextApiRequest, res: NextApiResponse<SiteContent>) {
  try {
    if (fs.existsSync(CONTENT_FILE)) {
      const raw = fs.readFileSync(CONTENT_FILE, 'utf-8');
      const content = JSON.parse(raw) as SiteContent;
      return res.status(200).json(content);
    }
  } catch {
    // fall through to default
  }
  return res.status(200).json(DEFAULT_CONTENT);
}
