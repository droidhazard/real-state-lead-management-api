import { connectDB } from "./database/index.js";
import express from "express";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8088;

connectDB()
  .then(() => {
    console.log(`^^^SUCCESSFULLY connected to Database.`);
    app.listen(PORT, () => {
      console.log(`^^^SUCCESSFULLY listening on port: `, PORT);
    });
  })
  .catch((error) => {
    console.log(`^^^FAILED to connect to Database, `, error);
  });
