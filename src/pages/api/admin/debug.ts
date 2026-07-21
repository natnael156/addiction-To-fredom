import type { NextApiRequest, NextApiResponse } from 'next';

// Temporary debug endpoint — remove after confirming DB works
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const adminSecret = process.env.ADMIN_SECRET || 'admin1234';
  if (req.headers['x-admin-secret'] !== adminSecret) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const uri = process.env.MONGODB_URI;
  const hasUri = !!uri;
  const uriPreview = uri ? uri.replace(/:([^@]+)@/, ':***@') : null;

  // Try connecting
  let connectionStatus = 'not attempted';
  let connectionError = null;

  if (hasUri) {
    try {
      const { getClientPromise } = await import('@/lib/mongodb');
      const client = await getClientPromise();
      await client.db('a2f').command({ ping: 1 });
      connectionStatus = 'connected';
    } catch (err: any) {
      connectionStatus = 'failed';
      connectionError = err?.message;
    }
  }

  return res.status(200).json({
    hasMongoUri: hasUri,
    uriPreview,
    connectionStatus,
    connectionError,
    nodeEnv: process.env.NODE_ENV,
  });
}
