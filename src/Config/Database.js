require("dotenv").config();
const mongoose = require("mongoose");
const connectToMongoDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URI, {
      dbName: "manindar_real_estate",
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1);
  }
};

module.exports = { mongoose, connectToMongoDB };
