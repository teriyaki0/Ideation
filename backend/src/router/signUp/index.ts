import crypto from "crypto";
import { trpc } from "../../lib/trpc";
import { zSignUpTrpcScheme } from "./input";

export const signUpTrpcRoute = trpc.procedure
  .input(zSignUpTrpcScheme)
  .mutation(async ({ input, ctx }) => {
    const exUser = await ctx.prisma.user.findUnique({
      where: {
        nick: input.nick,
      },
    });

    if (exUser) {
      throw new Error("User already exist");
    }

    await ctx.prisma.user.create({
      data: {
        nick: input.nick,
        password: crypto
          .createHash("sha256")
          .update(input.password)
          .digest("hex"),
      },
    });

    return true;
  });
