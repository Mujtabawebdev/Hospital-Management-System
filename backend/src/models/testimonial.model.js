import mongoose from "mongoose";
import validator from "validator";

const TestimonialSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: [true, "Full Name is required"],
            trim: true,
        },
        email: {
            type: String,
            required: [true, "Email is required!"],
            lowercase: true,
            trim: true,
            validate: [validator.isEmail, "Email is invalid"]
        },
        country: {
            type: String,
            required: [true, "Country is required!"],
            trim: true,
        },
        state: {
            type: String,
            required: [true, "State is required!"],
            trim: true,
        },
        review: {
            type: String,
            trim: true,
        },
        testimonialImg: {
            type: String, // cloudinary url
        }
    },
    { timestamps: true }
);


export const Testimonial = mongoose.model("Testimonial", TestimonialSchema); 
