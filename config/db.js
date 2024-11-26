require("dotenv").config();
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const uri = process.env.DB_URI;
    if (!uri) {
      console.error("MongoDB URI is undefined in .env file");
      process.exit(1); // Exit the app if no URI is provided
    }
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connected");
  } catch (err) {
    console.error("Database connection error", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
