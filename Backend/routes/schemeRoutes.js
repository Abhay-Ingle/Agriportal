import express from "express";
import Scheme from "../models/Scheme.js";
import {
  scrapeAllSchemes,
  storeScrapedSchemes,
  getScraperStatus,
} from "../scrapers/schemeScraper.js";

const router = express.Router();

// GET all schemes
router.get("/", async (req, res) => {
  try {
    const schemes = await Scheme.find().sort({ name: 1 });
    res.json({
      success: true,
      count: schemes.length,
      data: schemes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// GET single scheme by ID
router.get("/:id", async (req, res) => {
  try {
    const scheme = await Scheme.findOne({ id: req.params.id });
    if (!scheme) {
      return res.status(404).json({
        success: false,
        message: "Scheme not found",
      });
    }
    res.json({
      success: true,
      data: scheme,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// GET schemes by category
router.get("/category/:category", async (req, res) => {
  try {
    const schemes = await Scheme.find({
      category: req.params.category,
    }).sort({ name: 1 });

    if (schemes.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No schemes found for this category",
      });
    }

    res.json({
      success: true,
      count: schemes.length,
      data: schemes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Search schemes
router.get("/search/:query", async (req, res) => {
  try {
    const query = req.params.query;

    // Use full-text search on name, description, and benefits
    const schemes = await Scheme.find(
      { $text: { $search: query } },
      { score: { $meta: "textScore" } }
    ).sort({ score: { $meta: "textScore" } });

    // Fallback: partial text matching if no full-text results
    if (schemes.length === 0) {
      const fallbackSchemes = await Scheme.find({
        $or: [
          { name: { $regex: query, $options: "i" } },
          { description: { $regex: query, $options: "i" } },
          { benefits: { $regex: query, $options: "i" } },
        ],
      }).sort({ name: 1 });

      return res.json({
        success: true,
        count: fallbackSchemes.length,
        data: fallbackSchemes,
      });
    }

    res.json({
      success: true,
      count: schemes.length,
      data: schemes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Admin: Trigger web scraping
router.post("/admin/scrape", async (req, res) => {
  try {
    console.log("Admin requested scheme scraping...");

    // Check if scraping is already in progress (optional safeguard)
    const result = await storeScrapedSchemes();

    if (result.success) {
      res.json({
        success: true,
        message: result.message,
        scrapedCount: result.count,
      });
    } else {
      res.status(500).json({
        success: false,
        message: result.message,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Admin: Get scraper status
router.get("/admin/status", async (req, res) => {
  try {
    const status = await getScraperStatus();
    res.json({
      success: true,
      status: status,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Admin: Reset all schemes (delete all)
router.delete("/admin/reset", async (req, res) => {
  try {
    const result = await Scheme.deleteMany({});
    res.json({
      success: true,
      message: `Deleted ${result.deletedCount} schemes from database`,
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

export default router;
