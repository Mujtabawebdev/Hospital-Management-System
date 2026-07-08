import express from "express";
import {
  completeAppointment,
  getDoctorAppointments,
} from "../controllers/appointment.controller.js";
import {
  createDoctorSchedule,
  getDoctorSchedulesByDoctorId,
  getMyDoctorSchedule,
} from "../controllers/doctor-schedule.controller.js";
import { isDoctorAuthenticated } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/appointments", isDoctorAuthenticated, getDoctorAppointments);
router.patch("/appointments/:appointmentId/complete", isDoctorAuthenticated, completeAppointment);
router.post("/schedule", isDoctorAuthenticated, createDoctorSchedule);
router.get("/schedule/me", isDoctorAuthenticated, getMyDoctorSchedule);
router.get("/schedule/doctor/:doctorId", getDoctorSchedulesByDoctorId);

export default router;
