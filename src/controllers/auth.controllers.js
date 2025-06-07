import { User } from "../models/user.model.js";
import { validationResult } from "express-validator";

const registerUser = async function (req, res) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(200)
        .json({ message: "Error(s) in request.", errors: errors.array() });
    }
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// module.exports = { registerUser };
export { registerUser };
