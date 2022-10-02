import express from "express";
import { logger } from "../modules/logger";
import { env } from "../utils/env";

//create new express instance
const app = express();

//check if port is defined
if (env("APP_PORT")) {
  //listen on the APP_PORT
  app.listen(env("APP_PORT"), () => {
    //log info message with port
    logger.log("info", `Express listening on port: ${env("APP_PORT")} (TCP/HTTP)`);
  });
} else {
  //log error that port is missing
  logger.log("error", "Environment Variable APP_PORT is not defined.")

  //exit application
  process.exit(1)
}
