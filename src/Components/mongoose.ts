import { connect } from "mongoose";
import {
  ConnectionTestModel,
  IConnectionTest,
} from "../Models/ConnectionTestModel";
import { logger } from "../Modules/logger";
import { env } from "../Utils/env";
import { undefinedEnv } from "../Utils/undefinedEnv";

//check that MONGO_URL is defined
if (!env("MONGO_URL")) {
  //handle undefined env
  undefinedEnv("MONGO_URL");
}

//connect to mongo database
connect(env("MONGO_URL") as string, () => {
  //log that connection was created
  logger.log("info", "MongoDB connection established");

  //test the connection
  testConnection();
});

//test connection to mongo database
async function testConnection() {
  try {
    //make dummy object to test "create"
    const test1 = await ConnectionTestModel.create({});

    //log successfull "create"
    logger.log("debug", `"create" test successfull with "_id": ${test1._id}`);

    //get dummy object to test "find" (use "as" to cast to IConnectionTest)
    const test2 = (await ConnectionTestModel.findById(
      test1._id,
    )) as IConnectionTest;

    //log successfull "find"
    logger.log("debug", `"find" test successfull with "_id": ${test2._id}`);

    //remove dummy object to test "delete"
    await ConnectionTestModel.deleteOne({ _id: test2._id });

    //log successfull "delete"
    logger.log("debug", `"delete" test successfull with "_id": ${test2._id}`);
  } catch (err) {
    //log all errors that could occur
    logger.log("error", String(err));

    //exit the application
    process.exit(1);
  }
}
