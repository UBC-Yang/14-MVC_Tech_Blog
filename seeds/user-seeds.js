// Importing Post model from ../models directory
const { User } = require("../models");
// Array of dummy blog post data
const userData = [
  {
    username: "Xandromus",
    email: "xandromus@example.com",
    password: "password1",
  },
  {
    username: "Lernantino",
    email: "lernantino@example.com",
    password: "password2",
  },
];
// Function to seed posts table with dummy data using bulkCreate method
const seedUsers = () => User.bulkCreate(userData);
// Exporting seedPosts function for use in other files
module.exports = seedUsers;