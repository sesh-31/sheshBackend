import mongoose from "mongoose";
import { DB_NAME } from "./constants.js";
import express from "express";
import dotenv from "dotenv";

dotenv.config(); // Load .env variables

const app = express();

(async () => {
  try {
    // Remove deprecated options
    await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
    console.log("✅ Connected to MongoDB");

    app.on("error", (error) => {
      console.error("❌ App Error:", error);
      throw error;
    });

    app.listen(process.env.PORT, () => {
      console.log(`🚀 App is listening at port ${process.env.PORT}`);
    });
  } catch (error) {
    console.error("❌ Connection Error:", error);
    throw error;
  }
})()
.then(()=>{
  app.listen(process.env.PORT || 8000,()=>{
    console.log(`Server is running at port : ${orocess.env.PORT} `);
  })
})
.catch((error) => {
  console.error("mongo db conncetion error", error);
  });