import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  amount: {
    type: Number,
    min: 0,
  },
  currency: {
    type: String,
    default: "INR",
    uppercase: true,
    trim: true,
  },
  status: {
    type: String,
    enum: ["Created", "Paid", "Failed"],
    default: "Created",
    index: true,
  },
  razorpay_order_id: {
    type: String,
    trim: true,
  },
  razorpay_payment_id: {
    type: String,
    trim: true,
  },
  razorpay_signature: {
    type: String,
    trim: true,
  },
}, { timestamps: true });

paymentSchema.index({ razorpay_order_id: 1 });

export const Payment = mongoose.model("Payment", paymentSchema);
