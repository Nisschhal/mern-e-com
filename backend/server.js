const express = require("express");
const products = require("./data/products");
const cors = require("cors");
const app = express();
const connectDB = require("./config/db");
require("dotenv").config();
require("colors");
const productRoute = require("./routes/productRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

// DB CONNECTION
connectDB();

// CORS USE
app.use(cors());

app.use("/api/products", productRoute);

app.use((err, req, res, next) => {
  const statusCode = res.statusCode == 200 ? 500 : res.statusCode;
  res.status(statusCode).json({ message: err.message, stack: err.stack });
});

// ERROR HANDLER MIDDLEWARE
app.use(notFound);
app.use(errorHandler);

// CONNECT SERVER TO PORT 5000
app.listen(process.env.PORT || 5000, () => {
  console.log(`Server Running on ${process.env.PORT}`.yellow.bold);
});
