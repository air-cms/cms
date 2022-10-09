import { model, Schema } from "mongoose";
import { v4 } from "uuid";

//the interface for a user
export interface IUser {
  _id: string;
  username: string;
  email: string;
  hashedPassword: string;
}

//the user schema
const UserSchema = new Schema<IUser>({
  _id: {
    default: v4,
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  hashedPassword: {
    type: String,
    required: true,
  },
});

//the user model
export const UserModel = model("user", UserSchema);
