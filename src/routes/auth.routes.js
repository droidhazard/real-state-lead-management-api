import express from "express";
import { registerUser, loginUser } from "../controllers/auth.controllers.js";
import { model } from "mongoose";
import { registerValidator, loginValidator } from "../helpers/validator.js";

const router = express.Router();

router.post("/register", registerValidator, registerUser);
router.post("/login", loginValidator, loginUser);

export default router;
