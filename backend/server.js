const express = require("express");
const products = require("./data/products");
const cors = require("cors");
const app = express();
const connectDB = require("./config/db");
require("dotenv").config();
require("colors");

// DB CONNECTION
connectDB();

// CORS USE
app.use(cors());

// GET PRODUCTS
app.get("/api/products", (req, res) => {
  res.json(products);
});

// GET PRODUCT BY ID
app.get("/api/products/:id", (req, res) => {
  const product = products.find((p) => p._id == req.params.id);
  res.json(product);
});

// CONNECT SERVER TO PORT 5000
app.listen(process.env.PORT || 5000, () => {
  console.log(`Server Running on ${process.env.PORT}`.yellow.bold);
});
