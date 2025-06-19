import mongoose from "mongoose";
import { Lead } from "../models/lead.model.js";
import { sendMail } from "../utils/mail.js";
import { AsyncParser } from "json2csv";
import fs from "fs";

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
    return res.status(400).json({
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

  // * Send Email Notification
  const htmlBody = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f7f7f7;
      margin: 0;
      padding: 20px;
    }
    .email-container {
      max-width: 600px;
      margin: auto;
      background-color: #ffffff;
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      padding: 20px;
    }
    h2 {
      color: #333333;
    }
    table {
      width: 100%;
      border-collapse: collapse;
    }
    td {
      padding: 8px;
      vertical-align: top;
    }
    td.label {
      font-weight: bold;
      width: 30%;
      color: #555;
    }
    tr:nth-child(even) {
      background-color: #f4f4f4;
    }
  </style>
</head>
<body>
  <div class="email-container">
      <img src="https://photo-cdn2.icons8.com/0Er236iTdEWAGsv5_GiBtNPxbGEXUoRwH-hDmkZKWvU/rs:fit:1480:1072/czM6Ly9pY29uczgu/bW9vc2UtcHJvZC5l/eHRlcm5hbC9hMmE0/Mi84MDFkODE1YmU4/NTg0OWRlYmY5YWRi/MjZkZGQ1OGU3MC5q/cGc.jpg" width="400">
    <h2>New Real Estate Lead Received</h2>
    <table>
      <tr><td class="label">First Name:</td><td>${firstName}</td></tr>
      <tr><td class="label">Last Name:</td><td>${lastName}</td></tr>
      <tr><td class="label">Email:</td><td>${email}</td></tr>
      <tr><td class="label">Phone Number:</td><td>${phoneNumber}</td></tr>
      <tr><td class="label">Message:</td><td>${message}</td></tr>
      <tr><td class="label">Label:</td><td>${label}</td></tr>
      <tr><td class="label">Estimated Amount:</td><td>${estimatedAmount}</td></tr>
      <tr><td class="label">Company:</td><td>${company}</td></tr>
      <tr><td class="label">Country:</td><td>${country}</td></tr>
      <tr><td class="label">State:</td><td>${state}</td></tr>
      <tr><td class="label">City:</td><td>${city}</td></tr>
      <tr><td class="label">Street:</td><td>${street}</td></tr>
      <tr><td class="label">Notes:</td><td>${notes}</td></tr>
    </table>
  </div>
</body>
</html>
`;
  sendMail(`New Lead received: ${firstName}`, htmlBody);
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

async function expoortLeads(req, res) {
  const leads = await Lead.find();

  // * Converting to CSV
  const csvAsyncParser = new AsyncParser();
  // const csvData = await csvAsyncParser.parse(leads).promise();
  const csvData = await csvAsyncParser.parse(JSON.stringify(leads)).promise();
  const leadsCount = await Lead.countDocuments();

  async function writeToFile() {
    try {
      await fs.writeFile("export.csv", csvData, () => {
        console.log("file exported successfully.");
      });
    } catch (error) {
      console.log(`Error while writing to csv file, ${error}`);
    }
  }

  writeToFile();
  res
    .status(200)
    .json({ message: "exported successfully", leadCount: leadsCount });
}

export { createLead, getLeads, getLead, deleteLead, expoortLeads };
