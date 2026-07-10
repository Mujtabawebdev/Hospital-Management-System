import asyncHandler from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { Doctor } from "../models/doctor.model.js";
import { DOCTOR_STATUS, USER_ROLES } from "../constants/roles.js";
import { cookieNameForRole, sendAuthResponse } from "../utils/auth-response.js";
import { issueEmailOtp, otpMatches } from "../services/email-verification.service.js";

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

  if (role !== USER_ROLES.ADMIN && user.emailVerified === false) {
    throw new ApiError(403, "Please verify your email before logging in");
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

export const verifyEmail = asyncHandler(async (req, res) => {
  const { email, role, otp } = req.body;
  if (role === USER_ROLES.ADMIN) throw new ApiError(403, "Admin accounts do not use public email verification");
  const Model = role === USER_ROLES.DOCTOR ? Doctor : User;
  const account = await Model.findOne(role === USER_ROLES.DOCTOR ? { email } : { email, role })
    .select("+password +emailVerificationOtp +emailVerificationExpires");
  if (!account || !otpMatches(account, otp)) throw new ApiError(400, "Verification code is invalid or expired");
  account.emailVerified = true;
  account.emailVerificationOtp = undefined;
  account.emailVerificationExpires = undefined;
  await account.save({ validateBeforeSave: false });
  return sendAuthResponse(res, account, "Email verified successfully");
});

export const resendEmailOtp = asyncHandler(async (req, res) => {
  const { email, role } = req.body;
  if (role === USER_ROLES.ADMIN) throw new ApiError(403, "Admin accounts do not use public email verification");
  const account = await findPrincipalByRole(email, role);
  if (!account) throw new ApiError(404, "Account not found");
  if (account.emailVerified) throw new ApiError(400, "Email is already verified");
  await issueEmailOtp(account);
  res.status(200).json(new ApiResponse(200, null, "A new verification code was sent"));
});
