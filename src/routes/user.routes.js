import { Router } from "express";
import {
  createLead,
  getLeads,
  getLead,
  deleteLead,
} from "../controllers/lead.controllers.js";

const router = Router();

router.route("/").post(createLead);
router.route("/").get(getLeads);
router.route("/:id").get(getLead);
router.route("/:id").delete(deleteLead);

export default router;
