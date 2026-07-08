import express from "express";
import { getUserDetails, getDoctorDetails } from "../controllers/user.controller.js";
import { getAdminDoctors, getAllDoctors, updateDoctorStatus } from "../controllers/doctor.controller.js";
import { isAdminAuthenticated, isPatientAuthenticated, isDoctorAuthenticated } from "../middleware/auth.middleware.js"


const router = express.Router();

router.get("/admin/doctors", isAdminAuthenticated, getAdminDoctors);
router.patch("/doctor/:doctorId/status", isAdminAuthenticated, updateDoctorStatus);
router.get("/alldoctors", getAllDoctors);
router.get("/admin/me", isAdminAuthenticated, getUserDetails);
router.get("/patient/me", isPatientAuthenticated, getUserDetails);
router.get("/doctor/me", isDoctorAuthenticated, getDoctorDetails);

export default router;
