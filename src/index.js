import mongoose from "mongoose";
import { connectDB } from "./database/index.js";
import { UserTest } from "./models/user.model.js";

connectDB();

const newUser = await UserTest.create({
  name: "Josh",
});

if (newUser) {
  console.log("user saved");
}
if (!newUser) {
  console.log("user create failed");
}
