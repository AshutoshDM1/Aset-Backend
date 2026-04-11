import { router } from '../trpc';
import { fileRouter } from './file/file.route';
import { folderRouter } from './folder/folder.route';
import { healthRouter } from './health/health';
import { userRouter } from './user/user';

const appRouter = router({
  health: healthRouter,
  user: userRouter,
  folder: folderRouter,
  file: fileRouter,
});

export default appRouter;

export type AppRouter = typeof appRouter;
