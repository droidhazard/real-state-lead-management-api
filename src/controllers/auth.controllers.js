import { User } from "../models/user.model.js";
import { validationResult } from "express-validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const registerUser = async function (req, res) {
  try {
    // * Validate request data
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(200)
        .json({ message: "Error(s) in request.", errors: errors.array() });
    }

    const { username, email, password } = req.body;

    // * Check if user doesn't already exist
    const userExists = await User.findOne({ email });
    console.log(userExists);
    if (userExists) {
      res.status(400).json({ message: "user with this email already exists." });
    }

    // * Generate hashed password and Create User
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      email,
      password: hashedPassword,
    });

    const userData = await user.save();

    // * Send response
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

  // * Check if password provided in request matches user's
  const hashedPassword = userExists?.password;
  const passwordMatched = await bcrypt.compare(password, hashedPassword);

  if (!passwordMatched) {
    res.status(401).json({ message: "email or password is incorrect." });
  }

  // * Generate Token
  const token = jwt.sign(
    { userId: userExists._id },
    process.env.JWT_SIGNING_SECRET,
    { expiresIn: "1d" }
  );

  // * Send Response
  res.status(200).json({ message: "logged in.", access_token: token });
};

// module.exports = { registerUser };
export { registerUser, loginUser };
