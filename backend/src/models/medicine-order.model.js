import mongoose from "mongoose";

const medicineOrderItemSchema = new mongoose.Schema(
  {
    medicine: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Medicine",
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    image: String,
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    totalPrice: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  { _id: false },
);

const medicineOrderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    items: {
      type: [medicineOrderItemSchema],
      required: true,
      validate: [(items) => items.length > 0, "Order must have at least one item"],
    },
    totalItems: {
      type: Number,
      required: true,
      min: 1,
    },
    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },
    status: {
      type: String,
      enum: ["Placed", "Completed", "Cancelled"],
      default: "Placed",
      index: true,
    },
  },
  { timestamps: true },
);

medicineOrderSchema.index({ user: 1, createdAt: -1 });

export const MedicineOrder = mongoose.model("MedicineOrder", medicineOrderSchema);
