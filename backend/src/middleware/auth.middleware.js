import asyncHandler from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { Doctor } from "../models/doctor.model.js";
import { DOCTOR_STATUS, USER_ROLES } from "../constants/roles.js";
import { verifyAccessToken } from "../services/token.service.js";

const tokenFromRequest = (req, role) => {
  const cookieName = `${role.toLowerCase()}Token`;
  const bearerToken = req.headers.authorization?.startsWith("Bearer ")
    ? req.headers.authorization.split(" ")[1]
    : undefined;

  return req.cookies?.[cookieName] || bearerToken;
};

export const authenticate = (...allowedRoles) =>
  asyncHandler(async (req, res, next) => {
    const token = allowedRoles
      .map((role) => tokenFromRequest(req, role))
      .find(Boolean);

    if (!token) {
      throw new ApiError(401, "Unauthorized access");
    }

    const decoded = verifyAccessToken(token);

    if (!allowedRoles.includes(decoded.role)) {
      throw new ApiError(403, `${decoded.role} is not authorized for this resource`);
    }

    const principal =
      decoded.role === USER_ROLES.DOCTOR
        ? await Doctor.findById(decoded.id)
        : await User.findById(decoded.id);

    if (!principal) {
      throw new ApiError(401, "Authenticated account no longer exists");
    }

    req.user = principal;
    req.doctor = principal.role === USER_ROLES.DOCTOR ? principal : undefined;
    next();
  });

export const isAdminAuthenticated = authenticate(USER_ROLES.ADMIN);
export const isPatientAuthenticated = authenticate(USER_ROLES.PATIENT);
export const isDoctorSessionAuthenticated = authenticate(USER_ROLES.DOCTOR);
export const isDoctorAuthenticated = [
  isDoctorSessionAuthenticated,
  (req, res, next) => req.doctor.status === DOCTOR_STATUS.APPROVED
    ? next()
    : next(new ApiError(403, `Doctor application is ${req.doctor.status}`)),
];
