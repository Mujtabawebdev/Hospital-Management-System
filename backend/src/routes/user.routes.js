import express from "express";
import { getUserDetails, getDoctorDetails, updateDoctorProfile, updateUserProfile } from "../controllers/user.controller.js";
import { getAdminDoctors, getAllDoctors, updateDoctorStatus } from "../controllers/doctor.controller.js";
import { isAdminAuthenticated, isPatientAuthenticated, isDoctorAuthenticated } from "../middleware/auth.middleware.js"
import { upload } from "../middleware/multer.middleware.js";


const router = express.Router();

router.get("/admin/doctors", isAdminAuthenticated, getAdminDoctors);
router.patch("/doctor/:doctorId/status", isAdminAuthenticated, updateDoctorStatus);
router.get("/alldoctors", getAllDoctors);
router.get("/admin/me", isAdminAuthenticated, getUserDetails);
router.get("/patient/me", isPatientAuthenticated, getUserDetails);
router.get("/doctor/me", isDoctorAuthenticated, getDoctorDetails);
router.patch("/admin/me", isAdminAuthenticated, upload.single("profilePicture"), updateUserProfile);
router.patch("/patient/me", isPatientAuthenticated, upload.single("profilePicture"), updateUserProfile);
router.patch("/doctor/me", isDoctorAuthenticated, upload.single("profilePicture"), updateDoctorProfile);

export default router;
