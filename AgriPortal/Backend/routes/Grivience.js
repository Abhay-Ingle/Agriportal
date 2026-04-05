import express from "express";
import jwt from "jsonwebtoken";
import Grivience from "../models/Grivience.js";

const router = express.Router();

// Middleware to verify token
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

// Get logged-in user grievances - MUST BE BEFORE /:id route
router.get("/my", verifyToken, async (req, res) => {
  try {
    const grivience = await Grivience.find({
      userId: req.user.id,
    }).sort({ createdAt: -1 });

    res.json(grivience);
  } catch (error) {
    console.error("Error fetching grievances:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Submit grievance (with optional image as base64)
router.post("/", verifyToken, async (req, res) => {
  try {
    const { title, description, mobile, image } = req.body;

    if (!title || !description || !mobile) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const grivience = await Grivience.create({
      userId: req.user.id,
      title,
      description,
      mobile,
      image: image || null,
    });

    res.status(201).json(grivience);
  } catch (error) {
    console.error("Error creating grievance:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Get grievance by ID - MUST BE AFTER /my route
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const idUpper = id.toUpperCase();

    // Check if it's a full ObjectId (24 characters)
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      const grievance = await Grivience.findById(id);

      if (!grievance) {
        return res.status(404).json({ message: "Grievance not found" });
      }

      res.json(grievance);
    }
    // Check if it's a partial ID (8 characters) - search by comparing ObjectId strings
    else if (id.match(/^[0-9a-fA-F]{8}$/)) {
      // Fetch all grievances and find matching one
      const allGrievances = await Grivience.find({});
      const grievance = allGrievances.find(g => 
        g._id.toString().toUpperCase().startsWith(idUpper)
      );

      if (!grievance) {
        return res.status(404).json({ message: "Grievance not found with ID: " + id });
      }

      res.json(grievance);
    }
    else {
      return res.status(400).json({ 
        message: "Invalid grievance ID format. Use 8-character short ID or 24-character full ID." 
      });
    }
  } catch (error) {
    console.error("Error fetching grievance:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Update grievance status (Admin)
router.put("/:id/status", async (req, res) => {
  try {
    const { status, adminNotes } = req.body;

    if (!["Pending", "In Progress", "Resolved"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const grievance = await Grivience.findByIdAndUpdate(
      req.params.id,
      { status, adminNotes },
      { new: true }
    );

    if (!grievance) {
      return res.status(404).json({ message: "Grievance not found" });
    }

    res.json(grievance);
  } catch (error) {
    console.error("Error updating grievance:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Get all grievances (Admin)
router.get("/admin/all", async (req, res) => {
  try {
    const grievances = await Grivience.find({})
      .populate("userId", "name email")
      .sort({ createdAt: -1 });

    res.json(grievances);
  } catch (error) {
    console.error("Error fetching all grievances:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

export default router;
