import { trpc } from "../../../lib/trpc";
import { getPasswordHash } from "../../../utils/getPasswordHash";
import { zEditPasswordTrpcScheme } from "./input";

export const updatePasswordTrpcRoute = trpc.procedure
  .input(zEditPasswordTrpcScheme)
  .mutation(async ({ input, ctx }) => {
    if (!ctx.me) {
      throw new Error("UNAUTHORIZED");
    }

    if (ctx.me.password !== getPasswordHash(input.oldPassword)) {
      throw new Error("Password is incorrect");
    }

    const updateMe = await ctx.prisma.user.update({
      where: {
        id: ctx.me.id,
      },
      data: {
        password: getPasswordHash(input.newPassword),
      },
    });

    ctx.me = updateMe;

    return true;
  });
