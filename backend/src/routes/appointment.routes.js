import express from "express";
import { bookAppointment, deleteAppointment, getAllAppointments, getPatientAppointments, updateAppointmentStatus } from "../controllers/appointment.controller.js";
import { isPatientAuthenticated, isDoctorAuthenticated, isAdminAuthenticated } from "../middleware/auth.middleware.js";

const router = express.Router();


router.post("/book", isPatientAuthenticated, bookAppointment);
router.get("/my", isPatientAuthenticated, getPatientAppointments);
router.put("/update/:id", isDoctorAuthenticated, updateAppointmentStatus);
router.delete("/delete/:id", isDoctorAuthenticated, deleteAppointment);
router.get("/getall", isAdminAuthenticated, getAllAppointments);






export default router;
