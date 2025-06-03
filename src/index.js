import { connectDB } from "./database/index.js";
import express from "express";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8088;

app.use(
  express.json({
    limit: "16kb",
  })
);

app.use(express.urlencoded({ extended: true, limit: "16kb" }));

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`^^^SUCCESSFULLY listening on port: `, PORT);
  });
});

// * Import Routes
import leadRouter from "./routes/user.routes.js";

// * Declare Routes
app.use("/api/v1/lead", leadRouter);
