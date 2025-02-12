import mongoose from "mongoose";
import { DB_NAME } from "./constants.js";

import dotenv from "dotenv";
import app from "./app.js"
dotenv.config(); // Load environment variables


 (async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
    console.log("✅ Connected to MongoDB");

    app.on("error", (error) => {
      console.error("❌ App Error:", error);
      throw error;
    });

    const PORT = process.env.PORT || 8000; // Default to 8000 if not in .env

    app.listen(PORT, () => {
      console.log(`🚀 Server is running at port: ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Connection Error:", error);
    process.exit(1); // Exit the process if MongoDB fails to connect
  }
})();
