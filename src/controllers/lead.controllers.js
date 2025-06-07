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

  // * Data validation
  // ^  Checking empty fields
  const requiredFields = ["firstName", "lastName", "email"];
  requiredFields.forEach((field) => {
    if (field.trim() === "") {
      return res
        .status(400)
        .json({ message: `'${field}' field can't be empty.` });
    }
  });
  // ^ Checking data validation for phone, email
  if (!email.includes("@")) {
    return res
      .status(400)
      .json({ message: `'email' must be in valid email format.` });
  }
  const phoneValidateRegex = /^(\+1\s?)?(\(?\d{3}\)?[\s.-]?)\d{3}[\s.-]?\d{4}$/;
  if (!phoneValidateRegex.test(phoneNumber)) {
    return res
      .status(400)
      .json({
        message: `'phoneNumber' must be in valid US Phone number format.`,
      });
  }

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
  const leadsCount = await Lead.countDocuments();
  res.status(200).json({ message: "success", leads, count: leadsCount });
}

async function getLead(req, res) {
  const leadId = req.params.id;
  const lead = await Lead.findById(leadId);
  res.status(200).json({ message: "success", lead });
}

async function deleteLead(req, res) {
  const leadId = req.params.id;
  const deletedLead = await Lead.findByIdAndDelete(leadId);
  res.status(200).json({ message: "success", lead: deletedLead });
}

export { createLead, getLeads, getLead, deleteLead };
