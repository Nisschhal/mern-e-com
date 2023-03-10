const bcrypt = require("bcryptjs");
const users = [
  {
    name: "Admin User",
    email: "admin@example.com",
    password: bcrypt.hashSync("12345", 10),
    isAdmin: true,
  },
  {
    name: "John Doe",
    email: "john@example.com",
    password: bcrypt.hashSync("12345", 10),
  },
  {
    name: "Jina Eod",
    email: "jina@example.com",
    password: bcrypt.hashSync("12345", 10),
  },
];

module.exports = users;
