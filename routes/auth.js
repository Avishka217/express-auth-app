const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

router.get("/", (req, res) => {
  // Render the login page
  res.render("login", { message: "" });
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find user with matching username in MongoDB
    const user = await User.findOne({ username });
    if (!user) {
      return res.render("login", { message: "Invalid username or password" });
    }

    // Compare hashed password in database with plaintext password entered by user
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.render("login", { message: "Invalid username or password" });
    }

    // Set the user ID in the session object
    req.session.userid = user._id;

    // Redirect to the welcome page
    res.render("welcomepage", { username: user.username });
  } catch (err) {
    console.error(err);
    res.render("login", {
      message: "An error occurred. Please try again later.",
    });
  }
});

router.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});

module.exports = router;


