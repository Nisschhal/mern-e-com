const express = require("express");
const Product = require("../models/ProductModel");
const asyncHandler = require("express-async-handler");
const router = express.Router();

// @desc Fetch all Products
// @route GET api/products
// @access public
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const products = await Product.find();
    if (products) {
      res.json(products);
    } else {
      res.json({ message: "No Product in DB!!" });
    }
    res.json(products);
  })
);

// @desc Fetch all Product via Id
// @route GET api/products/:id
// @access public
router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (product) {
      res.json(product);
    } else {
      res.json({ message: "No Product Found!!" });
    }
  })
);

module.exports = router;
