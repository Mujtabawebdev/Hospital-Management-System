import mongoose from "mongoose";

export const APPOINTMENT_STATUS = {
    PENDING_DETAILS: "Pending Details",
    PENDING_REPORT: "Pending Report",
    PENDING_PAYMENT: "Pending Payment",
    PAYMENT_PROCESSING: "Payment Processing",
    CONFIRMED: "Confirmed",
    PAYMENT_FAILED: "Payment Failed",
    EXPIRED: "Expired",
    CANCELLED: "Cancelled",
    COMPLETED: "Completed",
    REFUNDED: "Refunded",
    NO_SHOW: "No Show",
    PENDING: "Pending",
    ACCEPTED: "Accepted",
    REJECTED: "Rejected",
};

export const PAYMENT_STATUS = {
    PENDING: "Pending",
    REQUIRES_PAYMENT_METHOD: "Requires Payment Method",
    REQUIRES_ACTION: "Requires Action",
    PROCESSING: "Processing",
    SUCCEEDED: "Succeeded",
    FAILED: "Failed",
    CANCELLED: "Cancelled",
    REFUNDED: "Refunded",
};

const appointmentSchema = new mongoose.Schema({
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Reference to the patient (user) who booked the appointment
        required: [true, "Patient ID is required"],
    },
    patientFirstName: {
        type: String,
        trim: true,
    },
    patientLastName: {
        type: String,
        trim: true,
    },
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Doctor", // Reference to the doctor who will handle the appointment
        required: [true, "Doctor ID is required"],
    },
    schedule: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "DoctorSchedule",
        index: true,
    },
    pet: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Pet",
    },
    petIssueReport: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "PetIssueReport",
    },
    doctorFirstName: {
        type: String,
        trim: true,
    },
    doctorLastName: {
        type: String,
        trim: true,
    },
    experience: {
        type: String,
    },
    appointmentCharges: {
        type: Number,
        min: 0,
    },
    fees: {
        type: Number,
        min: 0,
    },
    currency: {
        type: String,
        default: "pkr",
        lowercase: true,
        trim: true,
    },
    city: {
        type: String,
        required: [true, "City is required"],
        trim: true,
    },
    pincode: {
        type: String,
        required: [true, "Pincode is required"],
        trim: true,
    },
    appointmentDate: {
        type: Date,
        required: [true, "Appointment date is required"],
    },
    startTime: {
        type: String,
        trim: true,
    },
    endTime: {
        type: String,
        trim: true,
    },
    checkupTime: Date,
    expiresAt: {
        type: Date,
        index: true,
    },
    issue: {
        type: String,
        trim: true,
    },
    department: {
        type: String,
        required: [true, "department is required"],
        trim: true,
    },
    status: {
        type: String,
        enum: Object.values(APPOINTMENT_STATUS),
        default: APPOINTMENT_STATUS.PENDING,
        index: true,
    },
    paymentStatus: {
        type: String,
        enum: Object.values(PAYMENT_STATUS),
        default: PAYMENT_STATUS.PENDING,
        index: true,
    },
    payment: {
        stripePaymentIntentId: String,
        stripeClientSecret: String,
        stripeChargeId: String,
        paymentMethod: String,
        receiptUrl: String,
        failureReason: String,
        metadata: mongoose.Schema.Types.Mixed,
        paidAt: Date,
        cancelledAt: Date,
        refundedAt: Date,
    },
    confirmedAt: Date,
    cancelledAt: Date,
    completedAt: Date,
}, { timestamps: true });

appointmentSchema.index({ doctor: 1, appointmentDate: 1 });
appointmentSchema.index({ patient: 1, status: 1 });
appointmentSchema.index({ pet: 1 });
appointmentSchema.index({ petIssueReport: 1 });

export const Appointment = mongoose.model("Appointment", appointmentSchema);
