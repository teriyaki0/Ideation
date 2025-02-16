import { trpc } from "../../../lib/trpc";
import { getPasswordHash } from "../../../utils/getPasswordHash";
import { singJWT } from "../../../utils/signJWT";
import { zSignInTrpcScheme } from "./input";

export const signInTrpcRoute = trpc.procedure
  .input(zSignInTrpcScheme)
  .mutation(async ({ input, ctx }) => {
    const user = await ctx.prisma.user.findFirst({
      where: {
        nick: input.nick,
        password: getPasswordHash(input.password),
      },
    });

    if (!user) {
      throw new Error("User or Password incorrect");
    }
    const token = singJWT(user.id);

    return { token };
  });
