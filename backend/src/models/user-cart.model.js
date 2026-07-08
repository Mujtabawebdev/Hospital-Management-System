import { Schema, model } from "mongoose";

const UserCartSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User is required"],
    },
    medicineId: {
        type: Schema.Types.ObjectId,
        ref: "Medicine",
        required: [true, "Medicine is required"],
    },
    quantity: {
        type: Number,
        required: [true, "Quantity is required"],
        min: [1, "Quantity must be at least 1"],
        default: 1,
    },
    totalPrice: {
        type: Number,
        required: [true, "Total Price is required"],
        min: [0, "Total price cannot be negative"],
    },
    status: {
        type: String,
        required: [true, "Status is required"],
        enum: ["Pending", "Completed"],
        default: "Pending",
    }
}, { timestamps: true });

UserCartSchema.index({ userId: 1, medicineId: 1 }, { unique: true });
UserCartSchema.index({ userId: 1, status: 1 });

export const UserCart = model("UserCart", UserCartSchema);
