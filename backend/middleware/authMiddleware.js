const jwt = require("jsonwebtoken")
const User = require("../models/UserModel")
require("dotenv").config()

const protect = async (req, res, next) => {
  let token = req.headers.authorization
  if (token && token.startsWith("Bearer")) {
    console.log("Token found!!")
    try {
      token = token.split(" ")[1]
      const decoded = jwt.verify(token, process.env.JWT_TOEKN)
      req.user = await User.findById(decoded.id).select("-password")
    } catch (error) {
      res.status(401)
      throw new Error("Not authorized!!, token failed!!")
    }
  } else {
    res.status(401)
    throw new Error("Not authorized!!, no token")
  }
  next()
}

module.exports = protect
