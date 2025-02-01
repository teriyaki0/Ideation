import cors from "cors";
import Express from "express";

import { config } from "./lib/config";
import { createAppContext, type AppContext } from "./lib/ctx";
import { applyPassportToApp } from "./lib/passport";
import { applyTrpcToApp } from "./lib/trpc";
import { trpcRouter } from "./router";

async function startServer() {
  let ctx: AppContext | null = null;
  try {
    ctx = createAppContext();
    const app = Express();

    app.use(cors());

    ctx = createAppContext();
    applyPassportToApp(app, ctx);
    applyTrpcToApp(app, trpcRouter, ctx);

    const serverPort = config.HTTP_PORT;
    const serverHost = config.HTTP_HOST;

    app.get("/api/example", (req, res) => {
      res.send(config.EXAMPLE_MESSAGE);
    });

    app.listen(serverPort, () => {
      console.log(`http://${serverHost}:${serverPort}/api/v1`);
    });
  } catch (error) {
    console.error(error);
    await ctx?.stop();
  }
}

void startServer();
