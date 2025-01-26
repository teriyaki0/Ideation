import { initTRPC } from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";
import { type Express } from "express";
import { type TrpcRouter } from "../router";
import { type AppContext } from "./ctx";

export const trpc = initTRPC.context<AppContext>().create();
export const applyTrpcToApp = (
  app: Express,
  trpcRouter: TrpcRouter,
  appContext: AppContext
) => {
  app.use(
    "/trpc",
    trpcExpress.createExpressMiddleware({
      router: trpcRouter,
      createContext: () => appContext,
    })
  );
};
