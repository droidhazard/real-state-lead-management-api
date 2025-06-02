import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

async function connectDB() {
  const connection = await mongoose
    .connect(`${process.env.MONGODB_CONNECTION_URI}/${process.env.DB_NAME}`)
    .then(() => {
      console.log("^^^Database CONNECTED Successfully.");
    })
    .catch((error) => {
      console.log(`^^^Connection FAILED. `, error);
    });
}

export { connectDB };
