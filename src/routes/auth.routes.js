import express from "express";
import { registerUser, loginUser } from "../controllers/auth.controllers.js";
import { model } from "mongoose";
import { registerValidator, loginValidator } from "../helpers/validator.js";

const router = express.Router();

router.route("/register").post(registerValidator, registerUser);
router.route("/login").post(loginValidator, loginUser);

export default router;
