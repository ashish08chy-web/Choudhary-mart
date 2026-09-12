const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User");

router.post("/signup", async (req, res) => {
  try {
    console.log("Signup Body:", req.body);
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashed });

    console.log("User Created:", user.email);
    res.status(201).json({ message: "User created" });

  } catch (err) {
    console.error("SIGNUP ERROR:", err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;