import express from "express";
import { addNewAdmin } from "../controllers/admin.controller.js";
import { login, logoutAdmin, logoutDoctor, logoutPatient } from "../controllers/auth.controller.js";
import { addNewDoctor, registerDoctor } from "../controllers/doctor.controller.js";
import { patientRegister } from "../controllers/user.controller.js";
import {
  isAdminAuthenticated,
  isDoctorAuthenticated,
  isPatientAuthenticated,
} from "../middleware/auth.middleware.js";
import { upload } from "../middleware/multer.middleware.js";
import { validate } from "../middleware/validate.middleware.js";
import {
  doctorRegisterSchema,
  loginSchema,
  patientRegisterSchema,
} from "../validators/auth.validator.js";

const router = express.Router();

router.post("/patient/register", validate(patientRegisterSchema), patientRegister);
router.post(
  "/doctor/register",
  upload.fields([
    { name: "profilePicture", maxCount: 1 },
    { name: "documents", maxCount: 8 },
  ]),
  validate(doctorRegisterSchema),
  registerDoctor,
);
router.post("/login", validate(loginSchema), login);
router.post("/admin/addnew", isAdminAuthenticated, validate(patientRegisterSchema), addNewAdmin);
router.post(
  "/doctor/addnew",
  isAdminAuthenticated,
  upload.fields([
    { name: "profilePicture", maxCount: 1 },
    { name: "documents", maxCount: 8 },
  ]),
  validate(doctorRegisterSchema),
  addNewDoctor,
);
router.get("/admin/logout", isAdminAuthenticated, logoutAdmin);
router.get("/doctor/logout", isDoctorAuthenticated, logoutDoctor);
router.get("/patient/logout", isPatientAuthenticated, logoutPatient);

export default router;
