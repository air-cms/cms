import Auth from "@authfunctions/express";
import { env } from "../Utils/env";
import { undefinedEnv } from "../Utils/undefinedEnv";
import { logger } from "./logger";

//check if AUTH_ACCESS_TOKEN is defined
if (!env("AUTH_ACCESS_TOKEN")) {
  //handle undefined AUTH_ACCESS_TOKEN
  undefinedEnv("AUTH_ACCESS_TOKEN");
}

//check if AUTH_REFRESH_TOKEN is defined
if (!env("AUTH_REFRESH_TOKEN")) {
  //handle undefined AUTH_REFRESH_TOKEN
  undefinedEnv("AUTH_REFRESH_TOKEN");
}

//create new instance of Auth class
export const auth = new Auth({
  accessTokenSecret: env("AUTH_ACCESS_TOKEN") as string,
  refreshTokenSecret: env("AUTH_REFRESH_TOKEN") as string,
  emailValidation: Boolean(env("AUTH_VALIDATE_EMAIL")) ?? true,
  expiresIn: Number(env("AUTH_EXPIRESS_IN")) || 900,
  passwordValidation: (env("AUTH_PASSWORD_RULE") as any) || "Y-Y-Y-Y-8",
});

//TODO: implement auth methods

//set the logger of authfunctions
auth.logger(logger.log);
