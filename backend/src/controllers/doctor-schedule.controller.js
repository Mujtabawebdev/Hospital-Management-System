import asyncHandler from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { DoctorSchedule, SCHEDULE_STATUS } from "../models/doctor-schedule.model.js";

export const createDoctorSchedule = asyncHandler(async (req, res) => {
  const { day, startTime, endTime } = req.body;

  if (!day || !startTime || !endTime) {
    throw new ApiError(400, "Day, start time, and end time are required");
  }

  if (startTime >= endTime) {
    throw new ApiError(400, "Start time must be earlier than end time");
  }

  const schedule = await DoctorSchedule.create({
    doctor: req.doctor._id,
    day,
    startTime,
    endTime,
    status: SCHEDULE_STATUS.AVAILABLE,
  });

  res.status(201).json(new ApiResponse(201, schedule, "Doctor schedule created successfully"));
});

export const getMyDoctorSchedule = asyncHandler(async (req, res) => {
  const schedules = await DoctorSchedule.find({ doctor: req.doctor._id })
    .sort({ day: 1, startTime: 1 })
    .populate("appointment");

  res.status(200).json(new ApiResponse(200, schedules, "Doctor schedules fetched successfully"));
});

export const getDoctorSchedulesByDoctorId = asyncHandler(async (req, res) => {
  const schedules = await DoctorSchedule.find({
    doctor: req.params.doctorId,
    status: SCHEDULE_STATUS.AVAILABLE,
  }).sort({ day: 1, startTime: 1 });

  res.status(200).json(new ApiResponse(200, schedules, "Available doctor schedules fetched successfully"));
});

export const deleteDoctorSchedule = asyncHandler(async (req, res) => {
  const schedule = await DoctorSchedule.findOneAndDelete({ _id: req.params.scheduleId, doctor: req.doctor._id, status: SCHEDULE_STATUS.AVAILABLE });
  if (!schedule) throw new ApiError(404, "Available schedule slot not found");
  res.status(200).json(new ApiResponse(200, schedule, "Schedule slot deleted"));
});
