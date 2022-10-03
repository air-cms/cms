import { model, Schema } from "mongoose";
import { v4 } from "uuid";

//the interface for a connectionTest
export interface IConnectionTest {
  _id: string;
}

//the connectionTest schema
const ConnectionTestSchema = new Schema<IConnectionTest>({
  _id: {
    default: v4,
    type: String,
    required: true,
  },
});

//the connectionTest model
export const ConnectionTestModel = model(
  "connectionTest",
  ConnectionTestSchema,
);
