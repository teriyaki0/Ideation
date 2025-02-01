import { trpc } from "../../lib/trpc";
import { zUpdateIdeaTrpcScheme } from "./input";

export const updateIdeaTrpcRoute = trpc.procedure
  .input(zUpdateIdeaTrpcScheme)
  .mutation(async ({ input, ctx }) => {
    const { ideaId, ...ideaInput } = input;
    
    if (!ctx.me) {
      throw new Error("UNAUTHORIZED");
    }

    const idea = await ctx.prisma.idea.findUnique({
      where: {
        id: ideaId,
      },
    });

    if (!idea) {
      throw new Error("NOT_FOUND");
    }

    if (idea.authorId !== ctx.me.id) {
      throw new Error("NOT_YOUR_IDEA");
    }

    if (input.nick !== idea.nick) {
      const exIdea = await ctx.prisma.idea.findUnique({
        where: {
          nick: input.nick,
        },
      });

      if (exIdea) {
        throw new Error("Idea with this nick already exists");
      }
    }

    await ctx.prisma.idea.update({
      where: {
        id: ideaId,
      },
      data: {
        ...ideaInput,
      },
    });

    return true;
  });
