const asyncHandler = require("express-async-handler");
const User = require("../models/UserModel");

const userLogin = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;

  res.json({ email: email, password: password });
});

const userSignup = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  res.json({ email: email, password: password });
});

module.exports = { userLogin, userSignup };
