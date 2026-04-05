import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/UserRoutes.js";  
import grivienceRoutes from "./routes/Grivience.js";
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ Mongo Error:", err));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes); 


app.use("/api/griviences", grivienceRoutes);



app.get("/", (req, res) => {
  res.send("Backend is running ✅");
});



app.listen(process.env.PORT, () => {
  console.log(`🚀 Server running on port ${process.env.PORT}`);
});
