import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cron from "node-cron";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/UserRoutes.js";  
import grivienceRoutes from "./routes/Grivience.js";
import schemeRoutes from "./routes/schemeRoutes.js";
import { storeScrapedSchemes } from "./scrapers/schemeScraper.js";
dotenv.config();

const app = express();

// CORS Configuration - Allow frontend from Vercel and localhost
const corsOptions = {
  origin: [
    "http://localhost:3000",
    "http://localhost:5173",
    "http://localhost:8080",
    "http://localhost:8081",
    "http://localhost:8082",
    "http://localhost:8083",
    "https://agriportal3.vercel.app",
    "https://agriportal-1-hkp4.onrender.com"
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ Mongo Error:", err));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes); 
app.use("/api/griviences", grivienceRoutes);
app.use("/api/schemes", schemeRoutes);



app.get("/", (req, res) => {
  res.send("Backend is running ✅");
});

// Schedule automatic scraping daily at 2 AM
cron.schedule("0 2 * * *", async () => {
  console.log("⏰ Running scheduled scheme scraping at 2 AM...");
  try {
    const result = await storeScrapedSchemes();
    if (result.success) {
      console.log(`✅ Scheduled scraping completed: ${result.message}`);
    } else {
      console.error(`❌ Scheduled scraping failed: ${result.message}`);
    }
  } catch (error) {
    console.error("Error in scheduled scraping:", error);
  }
});

// Initial scraping on server startup (optional)
(async () => {
  try {
    console.log("🔄 Running initial scheme scraping on startup...");
    const result = await storeScrapedSchemes();
    if (result.success) {
      console.log(`✅ Initial scraping completed: ${result.message}`);
    }
  } catch (error) {
    console.error("Error in initial scraping:", error);
  }
})();

app.listen(process.env.PORT, () => {
  console.log(`🚀 Server running on port ${process.env.PORT}`);
});
