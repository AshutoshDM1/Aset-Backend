import type { Request as ExpressRequest } from 'express';
import { getAuth } from '@clerk/express';

export type AuthState =
  | { userId: string; sessionId: string | null }
  | { userId: null; sessionId: null };

export function verifyAuth(req: ExpressRequest): AuthState {
  const { userId, sessionId } = getAuth(req);
  if (!userId) {
    return { userId: null, sessionId: null };
  }
  return { userId, sessionId: sessionId ?? null };
}
