import Redis from "ioredis";
import { env } from "../Utils/env";
import { undefinedEnv } from "../Utils/undefinedEnv";
import { logger } from "./logger";

//check that REDIS_URL is defined
if (!env("REDIS_URL")) {
  //handle undefined env
  undefinedEnv("REDIS_URL");
}

//create the redis client
export const redisClient = new Redis(env("REDIS_URL") as string);

//listen to the connect event
redisClient.connect(() => {
  logger.log("info", `Redis connection established`);
  testConnection();
});

//test connection to redis database
async function testConnection() {
  try {
    //make dummy object to test "set"
    const test1 = await redisClient.set("redisTest", "test");

    //log successfull "set"
    logger.log(
      "debug",
      `Redis: "set" test successfull: key = "redisTest"; value = "test" (Code: ${test1})`,
    );

    //find dummy object to test "get"
    const test2 = await redisClient.get("redisTest");

    //log successfull "get"
    logger.log(
      "debug",
      `Redis: "get" test successfull: key = "redisTest"; value = "${test2}"`,
    );

    //remove dummy object to test "del"
    const test3 = await redisClient.del("redisTest");

    //log successfull "del"
    logger.log(
      "debug",
      `Redis: "del" test successfull: key = "redisTest"; value = "test" (Code: ${test3})`,
    );
  } catch (err) {
    //log all errors that could occur
    logger.log("error", String(err));

    //exit the application
    process.exit(1);
  }
}
