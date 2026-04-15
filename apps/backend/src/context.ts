import type { Request } from 'express';
import { verifyAuth } from './middleware/clerk-auth';
import { db } from './utils/db';

export function createContext({ req }: { req: Request }) {
  const auth = verifyAuth(req);
  return { db, auth };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
