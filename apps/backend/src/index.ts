import { createExpressMiddleware } from '@trpc/server/adapters/express';
import { clerkMiddleware } from '@clerk/express';
import express from 'express';
import cors from 'cors';
import { appRouter } from './appRouter';
import { createContext } from './context';
import { clerkWebhookHandler } from './webhooks/clerk';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: '*',
    credentials: true,
  }),
);

app.post(
  '/webhooks/clerk',
  express.raw({ type: 'application/json' }),
  clerkWebhookHandler,
);

app.use(express.json());

app.get('/', (req, res) => {
  res
    .status(200)
    .json({ status: 'success', message: 'Welcome to the Aset API' });
});

app.use(
  '/trpc',
  clerkMiddleware(),
  createExpressMiddleware({ router: appRouter, createContext }),
);

app.listen(Number(PORT), '0.0.0.0', () => {
  console.log(`Server is running on port http://0.0.0.0:${PORT}`);
});
