const express = require("express");

const router = express.Router();
const {
  getProducts,
  getProductById,
} = require("../controllers/productControllers");
// @desc Fetch all Products
// @route GET api/products
// @access public
router.get("/", getProducts);

// @desc Fetch all Product via Id
// @route GET api/products/:id
// @access public
router.get("/:id", getProductById);

module.exports = router;
