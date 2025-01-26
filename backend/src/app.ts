import cors from "cors";
import Express from "express";
import { config } from "./config";
import { type AppContext, createAppContext } from "./lib/ctx";
import { applyTrpcToApp } from "./lib/trpc";
import { trpcRouter } from "./router";

async function startServer() {
  let ctx: AppContext | null = null;
  try {
    ctx = createAppContext();
    const app = Express();

    app.use(cors());

    ctx = createAppContext();
    applyTrpcToApp(app, trpcRouter, ctx);

    const serverPort = config.http.port;
    const serverHost = config.http.host;

    app.listen(serverPort, () => {
      console.log(`http://${serverHost}:${serverPort}/api/v1`);
    });
  } catch (error) {
    console.error(error);
    await ctx?.stop();
  }
}

void startServer();
