import { toClientMe } from "../../../lib/models";
import { trpc } from "../../../lib/trpc";
import { zEditProfileTrpcScheme } from "./input";

export const updateProfileTrpcRoute = trpc.procedure
  .input(zEditProfileTrpcScheme)
  .mutation(async ({ input, ctx }) => {
    if (!ctx.me) {
      throw new Error("UNAUTHORIZED");
    }

    if (ctx.me.nick !== input.nick) {
      const exUser = await ctx.prisma.user.findUnique({
        where: {
          nick: input.nick,
        },
      });
      if (exUser) {
        throw new Error("User with this nick already exists");
      }
    }

    const updateMe = await ctx.prisma.user.update({
      where: {
        id: ctx.me.id,
      },
      data: input,
    });

    return toClientMe(updateMe);
  });
