import type { Request as ExpressRequest } from 'express';
import { clerkClient, getAuth } from '@clerk/express';

export type AuthState =
  | { userId: string; sessionId: string | null; email: string | null }
  | { userId: null; sessionId: null; email: null };

function emailFromSessionClaims(
  claims: Record<string, unknown> | null | undefined,
): string | null {
  if (!claims) return null;
  if (typeof claims.email === 'string' && claims.email.length > 0)
    return claims.email;
  const primary = claims.primary_email_address;
  if (typeof primary === 'string' && primary.length > 0) return primary;
  return null;
}

/**
 * Requires `clerkMiddleware()` before this runs. Resolves `userId` from the session and `email`
 * from session claims (if you add `email` via a [custom session token](https://clerk.com/docs/guides/sessions/customize-session-tokens))
 * or from the Clerk Backend API when the default token has no email claim.
 */
export async function verifyAuth(req: ExpressRequest): Promise<AuthState> {
  const auth = getAuth(req);
  const userId = auth.userId ?? null;
  const sessionId = auth.sessionId ?? null;

  if (!userId) {
    return { userId: null, sessionId: null, email: null };
  }

  let email = emailFromSessionClaims(
    auth.sessionClaims as Record<string, unknown> | undefined,
  );

  if (!email) {
    const user = await clerkClient.users.getUser(userId);
    email =
      user.emailAddresses.find((e) => e.id === user.primaryEmailAddressId)
        ?.emailAddress ??
      user.emailAddresses[0]?.emailAddress ??
      null;
  }

  return { userId, sessionId, email };
}
