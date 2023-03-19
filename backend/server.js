const express = require("express")
const products = require("./data/products")
const cors = require("cors")
const app = express()
const connectDB = require("./config/db")
require("dotenv").config()
require("colors")
const productRoute = require("./routes/productRoutes")
const userRoute = require("./routes/userRoutes.js")
const orderRoute = require("./routes/orderRoutes.js")
const { notFound, errorHandler } = require("./middleware/errorMiddleware")

// JSON DATA PARSER TO DB
app.use(express.json())
// DB CONNECTION
connectDB()

// CORS USE
app.use(cors())

app.use("/api/products", productRoute)
app.use("/api/users", userRoute)
app.use("/api/orders", orderRoute)

// ERROR HANDLER MIDDLEWARE
app.use(notFound)
app.use(errorHandler)

// CONNECT SERVER TO PORT 5000
app.listen(process.env.PORT || 5000, () => {
  console.log(`Server Running on ${process.env.PORT}`.yellow.bold)
})
