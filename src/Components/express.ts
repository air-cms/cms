import cors from "cors";
import express from "express";
import { logger } from "../Modules/logger";
import { ContentRouter } from "../Routers/ContentRouter";
import { DebugRouter } from "../Routers/DebugRouter";
import { env } from "../Utils/env";
import { undefinedEnv } from "../Utils/undefinedEnv";

//create new express instance
export const ExpressApp = express();
ExpressApp.use(express.json());

//use cors on the express app
//TODO: maybe add preflight?
ExpressApp.use(cors({ origin: env("CORS_ORIGIN") || "*" }));

//include routers
ExpressApp.use("/content", ContentRouter);

//include special debug router only when debug mode is enabled
if (env("DEBUG_MODE")) {
  //load debug router
  ExpressApp.use("/debug", DebugRouter);
}

//check if port is defined
if (!env("APP_PORT")) {
  //handle undefined APP_PORT
  undefinedEnv("APP_PORT");
}

//listen on the APP_PORT
ExpressApp.listen(env("APP_PORT"), () => {
  //log info message with port
  logger.log(
    "info",
    `Express listening on port: ${env("APP_PORT")} (TCP/HTTP)`,
  );
});
