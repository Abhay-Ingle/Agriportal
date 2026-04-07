import mongoose from "mongoose";

const grievanceSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    mobile: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      default: null,
    },

    status: {
      type: String,
      enum: ["Pending", "In Progress", "Resolved"],
      default: "Pending",
    },

    adminNotes: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Griviences", grievanceSchema);
