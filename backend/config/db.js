const mongoose = require("mongoose");
require("colors");
require("dotenv").config();
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(
      `MongoDb Connected: ${conn.connection.host}`.blue.bold.underline
    );
  } catch (error) {
    console.error(`Error: ${error.message}`.red.underline);
    process.exit(1);
  }
};
module.exports = connectDB;
