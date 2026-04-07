import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["farmer", "admin"],
    default: "farmer",
  },
}, { timestamps: true });

export default mongoose.model("User", userSchema);
