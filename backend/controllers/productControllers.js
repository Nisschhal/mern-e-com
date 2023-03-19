const asyncHandler = require("express-async-handler")
const Product = require("../models/ProductModel")
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find()
  if (products) {
    res.json(products)
  } else {
    res.json({ message: "No Product in DB!!" })
  }
})

const getProductById = asyncHandler(async (req, res) => {
  const { id } = req.params
  const product = await Product.findById(id)
  if (product) {
    res.json(product)
  } else {
    res.status(404)
    throw new Error("No Product Found!!")
  }
})

module.exports = { getProducts, getProductById }
