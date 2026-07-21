import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
import type { SiteContent } from '@/types/admin';
import { DEFAULT_CONTENT } from '@/utils/defaultContent';

const CONTENT_FILE = path.join(process.cwd(), 'data', 'content.json');

function ensureDataDir() {
  const dir = path.dirname(CONTENT_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function readContent(): SiteContent {
  try {
    ensureDataDir();
    if (!fs.existsSync(CONTENT_FILE)) {
      return DEFAULT_CONTENT;
    }
    const raw = fs.readFileSync(CONTENT_FILE, 'utf-8');
    return JSON.parse(raw) as SiteContent;
  } catch {
    return DEFAULT_CONTENT;
  }
}

function writeContent(content: SiteContent): void {
  ensureDataDir();
  fs.writeFileSync(CONTENT_FILE, JSON.stringify(content, null, 2), 'utf-8');
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Simple auth check via secret header
  const adminSecret = process.env.ADMIN_SECRET || 'admin1234';
  const authHeader = req.headers['x-admin-secret'];

  if (authHeader !== adminSecret) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (req.method === 'GET') {
    const content = readContent();
    return res.status(200).json(content);
  }

  if (req.method === 'POST') {
    try {
      const body = req.body as SiteContent;
      writeContent(body);
      return res.status(200).json({ success: true });
    } catch (err) {
      return res.status(500).json({ error: 'Failed to save content' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}

// Increase body size limit for base64 images
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
};
