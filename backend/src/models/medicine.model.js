import { Schema, model } from "mongoose";

const medicineSchema = new Schema({
    name: {
        type: String,
        required: [true, "Medicine Name is required"],
        trim: true,
        minLength: [3, "Medicine Name contaians at least 3 characters"],
    },
    price: {
        type: Number,
        required: [true, "Price is required"],
        min: [0, "Price cannot be negative"],
    },
    description: {
        type: String,
        required: [true, "Description is required"],
        trim: true,
        minLength: [10, "Description should contain at least 10 characters"],
    },
    category: {
        type: String,
        required: [true, "Category is required"],
        enum: ["Tablet", "Syrup", "Injection", "Drops", "Cream", "Powder", "Lotion", "Inhaler"],
    },
    manufacturer: {
        type: String,
        required: [true, "Manufacturer is required"],
        trim: true,
    },
    expiryDate: {
        type: Date,
        required: [true, "Expiry Date is required"],
    },
    stock: {
        type: Number,
        required: [true, "Stock is required"],
        min: [0, "Stock cannot be negative"],
        default: 0,
    },
    image: {
        type: String, // cloudinary url
        required: [true, "Image is required"],
    },
    discount: {
        type: Number,
        min: [0, "Discount cannot be negative"],
        default: 0,
    }
}, { timestamps: true });

medicineSchema.index({ name: "text", manufacturer: "text", category: "text" });
medicineSchema.index({ category: 1, createdAt: -1 });

export const Medicine = model("Medicine", medicineSchema);
