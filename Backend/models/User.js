import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String },
  otp: { type: String },
  otpExpiry: { type: Date },
  isVerified: { type: Boolean, default: false },
  role: {
    type: String,
    enum: ["farmer", "admin"],
    default: "farmer",
  },
}, { timestamps: true });

export default mongoose.model("User", userSchema);
