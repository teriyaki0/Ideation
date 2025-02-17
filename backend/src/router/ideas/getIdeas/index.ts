import { trpc } from "../../../lib/trpc";
import { zGetIdeasTrpcScheme } from "./input";

export const getIdeasTrpcRoute = trpc.procedure
  .input(zGetIdeasTrpcScheme)
  .query(async ({ ctx, input }) => {
    const ideas = await ctx.prisma.idea.findMany({
      select: {
        id: true,
        nick: true,
        name: true,
        description: true,
        createdAt: true,
        serialNumber: true,
      },
      orderBy: [
        {
          createdAt: "desc",
        },
        {
          serialNumber: "desc",
        },
      ],
      cursor: input.cursor ? { serialNumber: input.cursor } : undefined,
      take: input.limit + 1,
    });
    const nextIdea = ideas.at(input.limit);
    const nextCursor = nextIdea?.serialNumber;
    const ideasExceptNext = ideas.slice(0, input.limit);

    return { ideas: ideasExceptNext, nextCursor };
  });
