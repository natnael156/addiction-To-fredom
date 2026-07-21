import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;

let clientPromise: Promise<MongoClient> | null = null;

export function getClientPromise(): Promise<MongoClient> {
  if (!uri) {
    throw new Error('MONGODB_URI environment variable is not set');
  }

  if (clientPromise) return clientPromise;

  // Reuse client across hot-reloads in development
  if (process.env.NODE_ENV === 'development') {
    const g = global as typeof global & { _mongoClientPromise?: Promise<MongoClient> };
    if (!g._mongoClientPromise) {
      g._mongoClientPromise = new MongoClient(uri).connect();
    }
    clientPromise = g._mongoClientPromise;
  } else {
    clientPromise = new MongoClient(uri).connect();
  }

  return clientPromise;
}

export default { connect: getClientPromise };
