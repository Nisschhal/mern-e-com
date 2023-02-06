const express = require("express");
const router = express.Router();
const {
  userLogin,
  userSignup,
  getUserProfile,
  getUsers,
} = require("../controllers/userControllers");
const protect = require("../middleware/authMiddleware");

router.get("/", getUsers);
router.get("/profile", protect, getUserProfile);
router.post("/login", userLogin);
router.post("/signup", userSignup);
module.exports = router;
