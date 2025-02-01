import { type inferAsyncReturnType, initTRPC } from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";
import { type ExpressRequest } from "@utils/types";
import { type Express } from "express";
import { type TrpcRouter } from "../router";
import { type AppContext } from "./ctx";

const getCreateTrpcContext =
  (appContext: AppContext) =>
  ({ req }: trpcExpress.CreateExpressContextOptions) => ({
    ...appContext,
    me: (req as ExpressRequest).user || null,
  });

type TrpcContext = inferAsyncReturnType<
  ReturnType<typeof getCreateTrpcContext>
>;

export const trpc = initTRPC.context<TrpcContext>().create();

export const applyTrpcToApp = (
  app: Express,
  trpcRouter: TrpcRouter,
  appContext: AppContext
) => {
  app.use(
    "/trpc",
    trpcExpress.createExpressMiddleware({
      router: trpcRouter,
      createContext: getCreateTrpcContext(appContext),
    })
  );
};
