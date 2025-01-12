import * as trpcExpress from "@trpc/server/adapters/express";
import cors from "cors";
import Express from "express";

import { trpcRouter } from "./trpc";
import { config } from "@/config";

const app = Express();

app.use(cors());

app.use(
  "/trpc",
  trpcExpress.createExpressMiddleware({
    router: trpcRouter,
  })
);

const serverPort = config.http.port;
const serverHost = config.http.host;

app.listen(serverPort, () => {
  console.log(`http://${serverHost}:${serverPort}/api/v1`);
});
