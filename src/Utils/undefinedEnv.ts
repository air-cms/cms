import { logger } from "../Modules/logger";

//exit process and log undefined env
export function undefinedEnv(varName: string) {
  //log error that port is missing
  logger.log("error", `Environment Variable ${varName} is not defined.`);

  //exit application
  process.exit(1);
}