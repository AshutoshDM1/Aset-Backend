import { TRPCError } from '@trpc/server';
import { router, protectedProcedure } from '../../trpc';

export const userRouter = router({
  me: protectedProcedure.query(async ({ ctx }) => {
    const user = await ctx.db.user.findUnique({
      where: { id: ctx.auth.userId },
      include: { storage: true },
    });

    if (!user) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'User not provisioned',
      });
    }

    return user;
  }),
});
