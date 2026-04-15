import 'dotenv/config';
import { defineConfig } from 'prisma/config';

/**
 * `prisma generate` only reads the schema and does not open a DB connection.
 * Frontend CI (e.g. Vercel) often has no DATABASE_URL; a placeholder satisfies config loading.
 * Runtime and real migrations still use DATABASE_URL from the environment when set.
 */
const datasourceUrl =
  process.env.DATABASE_URL ??
  'postgresql://127.0.0.1:5432/_prisma_generate_placeholder';

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
  },
  datasource: {
    url: datasourceUrl,
  },
});
