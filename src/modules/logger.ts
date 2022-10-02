import { Logger } from "@laurenz1606/logger";
import { env } from "../utils/env";

//interface for all log levels
interface LogLevels {
  debug: boolean;
  info: boolean;
  warn: boolean;
  error: boolean;
  [key: string]: boolean;
}

//default parameters for all log levels
const logLevels: LogLevels = {
  debug: false,
  info: false,
  warn: false,
  error: false,
};

//function to apply / set log levels from env files
function applyLogLevels() {
  //loop over each log level
  Object.keys(logLevels).forEach((key) => {
    //check for each level if it is included (first charachter) in the environment variable for the log levels,
    //or default if undefied to "iwe", which will log: info(s), warn(s), error(s)
    if ((env("LOG_LEVELS") || "iwe").includes(key[0])) {
      //if log level is included enable it
      logLevels[key] = true;
    }
  });
}

//load log levels from environment variables
applyLogLevels();

//create new instance of Logger
export const logger = new Logger({
  //get format from env vars, default to "[%L] %m"
  format: env("LOGGER_FORMAT") || "[%L] %m",
  ...logLevels
});
