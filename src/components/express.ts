import cors from "cors";
import express from "express";
import { logger } from "../modules/logger";
import { env } from "../utils/env";
import { undefinedEnv } from "../utils/undefinedEnv";

//create new express instance
const app = express();

//use cors on the express app
//maybe add preflight?
app.use(cors({ origin: env("CORS_ORIGIN") || "*" }));

//check if port is defined
if (!env("APP_PORT")) {
  //handle undefined APP_PORT
  undefinedEnv("APP_PORT")
}

//listen on the APP_PORT
app.listen(env("APP_PORT"), () => {
  //log info message with port
  logger.log(
    "info",
    `Express listening on port: ${env("APP_PORT")} (TCP/HTTP)`,
  );
});
