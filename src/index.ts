import { config } from "dotenv";
import { env } from "./Utils/env";

//check if not in production setup
if (env("NODE_ENV") !== "production") {
  //load environment variables
  config();
}

//import the logger before the components and after the environment variables
import { logger } from "./Modules/logger";

//check if not in production setup
if (env("NODE_ENV") !== "production") {
  logger.log(
    "debug",
    `Environment variables have been loaded in ${env("NODE_ENV")} environment`,
  );
}

//load all components of the application (AFTER the environment variables are loaded)
import "./Components/mongoose";
import "./Components/express";
