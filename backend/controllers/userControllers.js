const asyncHandler = require("express-async-handler");
const User = require("../models/UserModel");
const generateToken = require("../utils/generateToken");

// @desc GET all Users
// @route api/users
// @access Private

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select("-password");
  return res.json({ users: users });
});

const userLogin = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(404);
    throw new Error("Invalid Email or Password!!");
  }

  //   res.json({ email: email, password: password });
});

const userSignup = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  let user = await User.findOne({ email });
  if (user) {
    res.status(400);
    throw new Error("User with email already Exist!!");
  }

  user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      password: user.password,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid User Data!!");
  }

  res.json({ email: email, password: password });
});

// @dec GET user profile
// @route GET /api/users/profile
// @access Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.name,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not Found");
  }
  // res.json({ profile: req.user });

  //   res.json({ email: email, password: password });
});

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  const { name, email } = req.body;
  if (!name || !email) {
    res.status(403);
    throw new Error("Please enter valid name or email detail");
  }
  if (user) {
    user.name = name;
    user.email = email;
  }
  const updatedUser = user.save();
  res.json({
    _id: updatedUser._id,
    name: updatedUser.name,
    email: updatedUser.name,
    isAdmin: updatedUser.isAdmin,
  });
});

module.exports = {
  userLogin,
  userSignup,
  getUserProfile,
  getUsers,
  updateUserProfile,
};
