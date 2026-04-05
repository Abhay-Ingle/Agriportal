import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

const ADMIN_EMAIL = "abhayingle21@gmail.com";
const ADMIN_PASSWORD = "abhay@1234";

// Signup
// ========================
// ✅ SIGNUP ROUTE
// ========================
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    await User.create({
      name,
      email,
      password: hashedPassword,
      role: "farmer",
    });

    return res.status(201).json({
      message: "Signup successful",
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
});


    // Farmer login
 // ========================
// ✅ LOGIN ROUTE
// ========================
router.post("/login", async (req, res) => {
  try {
    const { email, password, role } = req.body;

    console.log("Login request received:", { email, password: "***", role });

    if (!email || !password) {
      console.log("Validation failed - Missing email or password");
      return res.status(400).json({ message: "Email & password required" });
    }

    // Admin login
    if (role === "admin") {
      if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        const token = jwt.sign(
          { email, role: "admin" },
          process.env.JWT_SECRET,
          { expiresIn: "1d" }
        );

        return res.status(200).json({
          token,
          role: "admin",
        });
      } else {
        return res.status(401).json({ message: "Invalid admin credentials" });
      }
    }

    // Farmer login
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not registered" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Wrong password" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.status(200).json({
      token,
      role: user.role,
    });

  } catch (error) {
    console.log("Login error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});


export default router;
