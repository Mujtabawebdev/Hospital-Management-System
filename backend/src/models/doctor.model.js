import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import { DOCTOR_STATUS, USER_ROLES } from "../constants/roles.js";


const doctorSchema = new mongoose.Schema({
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
    password: {
        type: String,
        required: true,
        minLength: [8, "Password must contain at least 8 characters"],
        select: false,
    },
    address: {
        line1: {
            type: String,
            trim: true,
        },
        country: {
            type: String,
            trim: true,
        },
        city: {
            type: String,
            trim: true,
        },
        pincode: {
            type: String,
            trim: true,
        },
    },
    gender: {
        type: String,
        required: [true, "Gender Is Required!"],
        enum: ["Male", "Female"],
    },
    emailVerified: { type: Boolean, default: false },
    emailVerificationOtp: { type: String, select: false },
    emailVerificationExpires: { type: Date, select: false },
    passwordResetOtp: { type: String, select: false },
    passwordResetOtpExpires: { type: Date, select: false },
    passwordResetToken: { type: String, select: false },
    passwordResetTokenExpires: { type: Date, select: false },
    department: {
        name: {
            type: String,
        },
        description: {
            type: String,
        }
    },
    specializations: [{   //Array of specializations
        name: {
            type: String,
        },
        description: {
            type: String,
        }
    }],
    qualifications: {
        type: [String],
        default: [],
    },
    experience: {
        type: Number,
        required: true,
        min: [0, "Experience cannot be negative"],
    },
    availableSlots: {
        days: {
            type: [String],
            default: [],
        },
        hours: {
            type: String,
        }
    },
    docAvatar: {
        type: String,
    },
    role: {
        type: String,
        required: true,
        enum: Object.values(USER_ROLES),
        default: USER_ROLES.DOCTOR,
    },
    status: {
        type: String,
        enum: Object.values(DOCTOR_STATUS),
        default: DOCTOR_STATUS.PENDING,
        index: true,
    },
    qualification: {
        type: String,
        trim: true,
    },
    specialization: {
        type: String,
        trim: true,
        index: true,
    },
    hospital: {
        type: String,
        trim: true,
    },
    clinic: {
        type: String,
        trim: true,
    },
    fee: {
        type: Number,
        min: 0,
    },
    biography: {
        type: String,
        trim: true,
    },
    licenseNumber: {
        type: String,
        trim: true,
        index: true,
    },
    profilePicture: {
        url: String,
        publicId: String,
    },
    documents: [{
        name: String,
        url: String,
        publicId: String,
        uploadedAt: {
            type: Date,
            default: Date.now,
        },
    }],
    availability: [{
        day: { type: String, enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"] },
        slots: [String],
    }],
    isAvailable: {
        type: Boolean,
        default: false,
        index: true,
    },
    medicalLicenseNumber: {
        type: String,
        trim: true,
        index: true,
    },
    education: {
        type: String,
        trim: true,
    },
    languagesKnown: {
        type: [String],
        default: [],
    },
    appointmentCharges: {
        type: Number,
        min: 0,
    }
},
    { timestamps: true });

doctorSchema.index({ specialization: 1, fee: 1, isAvailable: 1 });
doctorSchema.index({ status: 1, createdAt: -1 });

doctorSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

doctorSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}

export const Doctor = mongoose.model("Doctor", doctorSchema);
