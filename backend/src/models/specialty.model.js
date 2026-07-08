import mongoose from "mongoose";

const specialtySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    icon: { type: String }, // URL or path to icon image
    desc: { type: String },
    symptoms: [{ type: String }],
    category: { type: String }, // optional grouping
  },
  { timestamps: true }
);

export const Specialty = mongoose.model("Specialty", specialtySchema);
