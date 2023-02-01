const express = require("express");
const products = require("./data/products");
const cors = require("cors");
const app = express();
const connectDB = require("./config/db");
require("dotenv").config();
require("colors");
const productRoute = require("./routes/productRoutes");

// DB CONNECTION
connectDB();

// CORS USE
app.use(cors());

app.use("/api/products", productRoute);

// CONNECT SERVER TO PORT 5000
app.listen(process.env.PORT || 5000, () => {
  console.log(`Server Running on ${process.env.PORT}`.yellow.bold);
});
