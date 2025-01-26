import { trpc } from "../../lib/trpc";
import { zCreateIdeaTrpcScheme } from "./input";

export const createIdeaTrpcRoute = trpc.procedure
  .input(zCreateIdeaTrpcScheme)
  .mutation(async ({ input, ctx }) => {
    const exIdea = await ctx.prisma.idea.findUnique({
      where: {
        nick: input.nick,
      },
    });

    if (exIdea) {
      throw new Error("throw Error('Idea with this nick already exists')");
    }

    await ctx.prisma.idea.create({ data: input });
  });
