import { Router } from "express";
import {
  createLead,
  getLeads,
  getLead,
  deleteLead,
  expoortLeads,
} from "../controllers/lead.controllers.js";
import { authenticateJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/").post(authenticateJWT, createLead);
router.route("/").get(authenticateJWT, getLeads);
router.route("/export").get(authenticateJWT, expoortLeads);
router.route("/:id").get(authenticateJWT, getLead);
router.route("/:id").delete(authenticateJWT, deleteLead);

export default router;
