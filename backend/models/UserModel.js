const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const UserSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.methods.matchPassword = async function (inputPassword) {
  return bcrypt.compare(inputPassword, this.password);
};
const User = mongoose.model("User", UserSchema);
module.exports = User;
