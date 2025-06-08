import { User } from "../models/user.model.js";
import { validationResult } from "express-validator";
import bcrypt from "bcrypt";

const registerUser = async function (req, res) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(200)
        .json({ message: "Error(s) in request.", errors: errors.array() });
    }

    const { username, email, password } = req.body;

    const userExists = await User.findOne({ email });
    console.log(userExists);
    if (userExists) {
      res.status(400).json({ message: "user with this email already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      email,
      password: hashedPassword,
    });

    const userData = await user.save();

    return res.status(201).json({
      message: "user created successfully",
      success: true,
      user: userData,
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const loginUser = async function (req, res) {
  const { email, password } = req.body;

  // * Find User by Email
  const userExists = await User.findOne({ email });
  if (!userExists) {
    return res
      .status(404)
      .json({ message: "No account with this email found." });
  }
  res.status(200).json({ message: "logged in." });
};

// module.exports = { registerUser };
export { registerUser, loginUser };
