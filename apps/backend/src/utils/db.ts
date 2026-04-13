import { Pool } from 'pg';
import { PrismaClient } from '../generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const connectionString = process.env.DATABASE_URL?.trim();
if (!connectionString) {
  throw new Error('DATABASE_URL is not set');
}

/** Longer default helps Neon cold start / cross-region latency; override with PG_CONNECTION_TIMEOUT_MS */
const connectionTimeoutMillis = Number(
  process.env.PG_CONNECTION_TIMEOUT_MS ?? '30000',
);

const pool = new Pool({
  connectionString,
  connectionTimeoutMillis,
  max: Number(process.env.PG_POOL_MAX ?? '10'),
  idleTimeoutMillis: 30_000,
});

const adapter = new PrismaPg(pool);

export const db = new PrismaClient({ adapter });
