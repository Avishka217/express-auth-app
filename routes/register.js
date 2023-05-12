const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

router.get("/register", (req, res) => {
  res.render("register",{message:""});
});

router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if user with same username already exists
    const existingUser = await User.findOne({ username: username });
    if (existingUser) {
      return res.render("register", { message: "Username already taken" });
    }

    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      username,
      password:hashedPassword,
    });

    // Save new user to database
    await newUser.save();

    // Redirect to login page
    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.render("register", { message: "Error registering user" });
  }
});

module.exports = router;
