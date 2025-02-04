import { trpc } from "../../../lib/trpc";
import { getPasswordHash } from "../../../utils/getPasswordHash";
import { singJWT } from "../../../utils/signJWT";
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

    const user = await ctx.prisma.user.create({
      data: {
        nick: input.nick,
        password: getPasswordHash(input.nick),
      },
    });

    const token = singJWT(user.id);

    return { token };
  });
