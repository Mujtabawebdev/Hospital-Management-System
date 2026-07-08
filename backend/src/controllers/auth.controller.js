import asyncHandler from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { Doctor } from "../models/doctor.model.js";
import { DOCTOR_STATUS, USER_ROLES } from "../constants/roles.js";
import { cookieNameForRole, sendAuthResponse } from "../utils/auth-response.js";

const findPrincipalByRole = async (email, role) => {
  if (role === USER_ROLES.DOCTOR) {
    return Doctor.findOne({ email }).select("+password");
  }

  return User.findOne({ email, role }).select("+password");
};

export const login = asyncHandler(async (req, res) => {
  const { email, password, role } = req.validated?.body || req.body;
  const user = await findPrincipalByRole(email, role);

  if (!user) {
    throw new ApiError(401, "Invalid email or password");
  }

  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    throw new ApiError(401, "Invalid email or password");
  }

  if (role === USER_ROLES.DOCTOR && user.status !== DOCTOR_STATUS.APPROVED) {
    throw new ApiError(403, `Doctor account is ${user.status}. Admin approval is required before login.`);
  }

  return sendAuthResponse(res, user, "Logged in successfully");
});

const logout = (role) => (req, res) =>
  res
    .status(200)
    .cookie(cookieNameForRole(role), "", {
      expires: new Date(0),
      httpOnly: true,
    })
    .json(new ApiResponse(200, null, "Logged out successfully"));

export const logoutAdmin = logout(USER_ROLES.ADMIN);
export const logoutPatient = logout(USER_ROLES.PATIENT);
export const logoutDoctor = logout(USER_ROLES.DOCTOR);
