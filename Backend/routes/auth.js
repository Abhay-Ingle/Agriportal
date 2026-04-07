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

// ========================
// ✅ SEND OTP ROUTE (OTP-based registration)
// ========================
router.post("/send-otp", async (req, res) => {
  try {
    const { phone, email } = req.body;

    if (!phone || !email) {
      return res.status(400).json({ message: "Phone and email are required" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists with this email" });
    }

    // Generate random OTP (6 digits)
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = new Date(Date.now() + 2 * 60 * 1000); // 2 minutes expiry

    // Check if user doc exists for this phone/email (for updating OTP)
    let user = await User.findOne({ $or: [{ phone }, { email }] });
    
    if (!user) {
      // Create a temporary user document with OTP
      user = new User({
        phone,
        email,
        otp,
        otpExpiry,
        isVerified: false,
      });
    } else {
      // Update existing user's OTP
      user.otp = otp;
      user.otpExpiry = otpExpiry;
    }

    await user.save();

    // IMPORTANT: In production, send SMS via Twilio, AWS SNS, etc.
    // For now, we'll just log it
    console.log(`✅ OTP for ${phone}: ${otp}`);
    console.log(`OTP will expire at: ${otpExpiry}`);

    // TODO: Uncomment to use Twilio or another SMS service
    /*
    const twilio = require('twilio');
    const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
    
    await client.messages.create({
      body: `Your AgriPortal OTP is: ${otp}. Valid for 2 minutes.`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phone,
    });
    */

    return res.status(200).json({
      message: "OTP sent successfully. Check your SMS.",
      // Remove this in production - only for testing
      otp: process.env.NODE_ENV === "development" ? otp : undefined,
    });

  } catch (error) {
    console.log("Send OTP error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// ========================
// ✅ VERIFY OTP AND SIGNUP ROUTE
// ========================
router.post("/verify-otp-and-signup", async (req, res) => {
  try {
    const { phone, email, otp, name, password } = req.body;

    if (!phone || !email || !otp || !name || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Find user by phone/email
    const user = await User.findOne({ $or: [{ phone }, { email }] });

    if (!user) {
      return res.status(400).json({ message: "User not found. Please send OTP first." });
    }

    // Check if OTP is expired
    if (new Date() > user.otpExpiry) {
      return res.status(400).json({ message: "OTP expired. Please request a new OTP." });
    }

    // Verify OTP
    if (user.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update user with verified details
    user.name = name;
    user.password = hashedPassword;
    user.isVerified = true;
    user.otp = null; // Clear OTP
    user.otpExpiry = null;
    user.role = "farmer";

    await user.save();

    return res.status(201).json({
      message: "Account created successfully!",
    });

  } catch (error) {
    console.log("Verify OTP error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

export default router;
