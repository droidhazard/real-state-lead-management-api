import mongoose from "mongoose";
import { Lead } from "../models/user.model.js";
async function createLead(req, res) {
  const {
    firstName,
    lastName,
    email,
    phoneNumber,
    message,
    label,
    estimatedAmount,
    company,
    country,
    city,
    state,
    street,
    notes,
  } = req.body;

  const newLead = await Lead.create({
    firstName,
    lastName,
    email,
    phoneNumber,
    message,
    label,
    estimatedAmount,
    company,
    country,
    city,
    state,
    street,
    notes,
  });
  res.status(200).json({ msg: "success", lead: newLead });
}

export { createLead };
