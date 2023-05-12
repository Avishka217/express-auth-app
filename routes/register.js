const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const { body, validationResult } = require("express-validator");

router.get("/register", (req, res) => {
  res.render("register",{message:""});
});

router.post(
  "/register",
  [
    body("username")
      .isLength({ min: 3 })
      .withMessage("Username must be at least 3 characters long"),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters long"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const alert = errors.array().map((err) => err.msg);
      res.render("register", { message: alert });
    } else {
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
          password: hashedPassword,
        });

        // Save new user to database
        await newUser.save();

        // Redirect to login page
        res.redirect("/");
      } catch (err) {
        console.error(err);
        res.render("register", { message: "Error registering user" });
      }
    }
  }
);

module.exports = router;
