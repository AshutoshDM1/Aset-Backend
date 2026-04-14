import { healthRouter } from './routers/health/health';
import { router } from './trpc';
import { userRouter } from './routers/user/user';
import { folderRouter } from './routers/folder/folder.route';
import { fileRouter } from './routers/file/file.route';

export const appRouter = router({
  health: healthRouter,
  user: userRouter,
  folder: folderRouter,
  file: fileRouter,
});

export type AppRouter = typeof appRouter;
