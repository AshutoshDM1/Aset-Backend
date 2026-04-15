import { TRPCError } from '@trpc/server';
import { router, protectedProcedure } from '../../trpc';

export const userRouter = router({
  me: protectedProcedure.query(async ({ ctx }) => {
    const { userId, email } = ctx.auth;

    if (!email) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Could not resolve user email from Clerk',
      });
    }

    const existing = await ctx.db.user.findUnique({
      where: { id: userId },
    });

    if (existing) {
      if (existing.email !== email) {
        return ctx.db.user.update({
          where: { id: userId },
          data: { email },
        });
      }
      return existing;
    }

    return ctx.db.user.create({
      data: { id: userId, email, name: null },
    });
  }),
});
