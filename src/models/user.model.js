import mongoose from "mongoose";

const leadModel = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  phoneNumber: {
    type: String,
    default: "",
  },
  message: {
    type: String,
    default: "",
  },
  label: {
    type: String,
    default: "NEW",
    enum: [
      "NEW",
      "HOT",
      "WARM",
      "COLD",
      "WON",
      "LOST",
      "FOLLOWUP-WAIT",
      "FOLLOWUP-DONE",
    ],
  },
  estimatedAmount: {
    type: Number,
    default: 0,
  },
  company: {
    type: String,
    default: "",
  },
  country: {
    type: String,
    default: "",
  },
  city: {
    type: String,
    default: "",
  },
  state: {
    type: String,
    default: "",
  },
  street: {
    type: String,
    default: "",
  },
  notes: {
    type: String,
    default: "",
  },
});

export const Lead = mongoose.model("Lead", leadModel);
