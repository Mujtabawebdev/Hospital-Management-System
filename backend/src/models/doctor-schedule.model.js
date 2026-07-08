import mongoose from "mongoose";

export const SCHEDULE_STATUS = {
  AVAILABLE: "Available",
  HELD: "Held",
  BOOKED: "Booked",
  COMPLETED: "Completed",
  CANCELLED: "Cancelled",
};

const doctorScheduleSchema = new mongoose.Schema(
  {
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
      index: true,
    },
    date: {
      type: Date,
      required: true,
      index: true,
    },
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(SCHEDULE_STATUS),
      default: SCHEDULE_STATUS.AVAILABLE,
      index: true,
    },
    lockedAt: Date,
    lockedByUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      index: true,
    },
    lockedByAppointment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Appointment",
      index: true,
    },
    appointment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Appointment",
    },
  },
  { timestamps: true },
);

doctorScheduleSchema.index({ doctor: 1, date: 1, startTime: 1 }, { unique: true });
doctorScheduleSchema.index({ doctor: 1, date: 1, status: 1 });

export const DoctorSchedule = mongoose.model("DoctorSchedule", doctorScheduleSchema);
