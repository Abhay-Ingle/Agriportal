import mongoose from "mongoose";

const schemeSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
      index: true,
    },
    category: {
      type: String,
      required: true,
      enum: [
        "financial-support",
        "crop-insurance",
        "renewable-energy",
        "technology-adoption",
        "soil-management",
        "organic-farming",
        "infrastructure",
        "price-support",
      ],
      index: true,
    },
    description: {
      type: String,
      required: true,
    },
    benefits: {
      type: [String],
      default: [],
    },
    eligibility: {
      type: [String],
      default: [],
    },
    ministry: {
      type: String,
      required: true,
    },
    launchYear: {
      type: Number,
    },
    targetBenefit: {
      type: String,
    },
    applicationMethod: {
      type: String,
    },
    officialWebsite: {
      type: String,
      required: true,
    },
    source: {
      type: String,
      default: "web-scraper",
    },
    scrapedAt: {
      type: Date,
      default: Date.now,
    },
    lastUpdated: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// Create full-text search index
schemeSchema.index({ name: "text", description: "text", benefits: "text" });

const Scheme = mongoose.model("Scheme", schemeSchema);

export default Scheme;
