import { serve } from 'bun';
import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { TRPCError } from '@trpc/server';
import { createContext } from './context';
import { buildCorsHeaders, withCors } from './utils/cors';
import appRouter from './routers/router';

function logTrpcError(opts: {
  error: TRPCError;
  path: string | undefined;
}) {
  const { error, path } = opts;
  const c = error.cause as
    | { code?: string; meta?: unknown; message?: string }
    | undefined;
  const code = typeof c?.code === 'string' ? c.code : undefined;
  if (code?.startsWith('P')) {
    console.error('[Prisma]', {
      path,
      code,
      meta: c?.meta,
      message: c?.message,
    });
    return;
  }
  if (
    code === 'ETIMEDOUT' ||
    code === 'ECONNREFUSED' ||
    code === 'ENOTFOUND'
  ) {
    console.error('[Prisma/DB network]', {
      path,
      code,
      hint: 'Cannot reach Postgres in time. Check Neon IP allow list, outbound TCP 5432/6432 from this host, DATABASE_URL host, and DNS. Try Neon pooled URL (…pooler…:6432).',
    });
    return;
  }
  console.error('[tRPC]', { path, message: error.message, cause: error.cause });
}

serve({
  port: parseInt(process.env.PORT || '5000'),
  async fetch(req) {
    const url = new URL(req.url);
    const corsHeaders = buildCorsHeaders();
    if (req.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders });
    }

    if (req.method === 'GET' && url.pathname === '/') {
      return withCors(
        new Response(
          JSON.stringify({
            message: 'Welcome to the ASET Backend built on Trpc',
          }),
          {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
          },
        ),
      );
    }

    const res = await fetchRequestHandler({
      endpoint: '/trpc',
      req,
      router: appRouter,
      createContext: () => createContext({ req }),
      onError: ({ error, path }) => logTrpcError({ error, path }),
    });

    return withCors(res);
  },
});

console.log(`Server running on http://localhost:${process.env.PORT}`);
