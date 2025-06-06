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
  res.status(201).json({ msg: "success", lead: newLead });
}

async function getLeads(req, res) {
  const leads = await Lead.find();
  res.status(200).json({ message: "success", leads });
}

async function getLead(req, res) {
  const leadId = req.params.id;
  const lead = await Lead.findById(leadId);
  res.status(200).json({ message: "success", lead });
}
export { createLead, getLeads, getLead };
