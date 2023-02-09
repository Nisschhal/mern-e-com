const express = require("express");
const router = express.Router();
const {
  userLogin,
  userSignup,
  getUserProfile,
  getUsers,
  updateUserProfile,
} = require("../controllers/userControllers");
const protect = require("../middleware/authMiddleware");

router.get("/", getUsers);
router.get("/profile", protect, getUserProfile);
router.post("/login", userLogin);
router.post("/signup", userSignup);
router.put("/updateProfile", protect, updateUserProfile);
module.exports = router;
