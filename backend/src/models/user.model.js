import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import { USER_ROLES } from "../constants/roles.js";


const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: [true, "First Name is required"],
            trim: true,
            minLength: [2, "First Name contaians at least 2 characters"],
        },
        lastName: {
            type: String,
            required: [true, "Last Name is required"],
            trim: true,
            minLength: [2, "Last Name contaians at least 2 characters"],
        },
        email: {
            type: String,
            required: [true, "Email is required!"],
            unique: true,
            lowercase: true,
            trim: true,
            validate: [validator.isEmail, "Email is invalid"]
        },
        phone: {
            type: String,
            required: [true, "Phone is required"],
            minLength: [7, "Phone Number must contain at least 7 digits"],
            maxLength: [20, "Phone Number must contain at most 20 digits"],
            match: [/^(?:(?:(?:\+|00)92)?|0)3[0-9]{9}$/, "Enter a valid Pakistani mobile number"],

        },
        address: {
            line1: {
                type: String,
                trim: true,
            },
            city: {
                type: String,
                trim: true,
            },
            country: {
                type: String,
                trim: true,
            },
            pincode: {
                type: String,
                trim: true,
            },
        },
        password: {
            type: String,
            required: true,
            minLength: [8, "Password must contain at least 8 characters"],
            select: false,
        },
        dob: {
            type: Date,
        },
        gender: {
            type: String,
            enum: ["Male", "Female"],
        },
        emailVerified: { type: Boolean, default: false },
        emailVerificationOtp: { type: String, select: false },
        emailVerificationExpires: { type: Date, select: false },
        passwordResetOtp: { type: String, select: false },
        passwordResetOtpExpires: { type: Date, select: false },
        passwordResetToken: { type: String, select: false },
        passwordResetTokenExpires: { type: Date, select: false },
        profilePicture: {
            url: String,
            publicId: String,
        },
        role: {
            type: String,
            required: true,
            enum: Object.values(USER_ROLES),
            default: USER_ROLES.PATIENT,
        },
    },
    { timestamps: true }
);


userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}

export const User = mongoose.model("User", userSchema); 
