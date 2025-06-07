import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    min: [6, "password can't be shorter than 6 character"],
    max: [32, "password can't be longer than 32 character"],
  },
});

export const User = mongoose.model("User", userSchema);
