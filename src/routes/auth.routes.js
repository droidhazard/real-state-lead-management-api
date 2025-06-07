import express from "express";
import { registerUser } from "../controllers/auth.controllers.js";
import { model } from "mongoose";
import { registerValidator } from "../helpers/validator.js";

const router = express.Router();

router.post("/register", registerValidator, registerUser);

export default router;
