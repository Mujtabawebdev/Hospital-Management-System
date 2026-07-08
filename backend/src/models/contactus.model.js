import mongoose from "mongoose";
import validator from "validator";

const contactusSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        validate: [validator.isEmail, "Provide A Valid Email!"],
    },
    message: {
        type: String,
        required: true,
        trim: true,
        minLength: [10, "Message Must Contain At Least 10 Characters!"],
    },
}, { timestamps: true });

export const ContactUs = mongoose.model("ContactUs", contactusSchema);
