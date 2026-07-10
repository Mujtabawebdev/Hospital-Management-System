import asyncHandler from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { Doctor } from "../models/doctor.model.js";
import { DOCTOR_STATUS, USER_ROLES } from "../constants/roles.js";
import { cookieNameForRole, sendAuthResponse } from "../utils/auth-response.js";
import crypto from "crypto";
import { issueEmailOtp, issuePasswordResetOtp, otpMatches, passwordResetOtpMatches, hashResetToken } from "../services/email-verification.service.js";

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
  const emailSent = await issueEmailOtp(account);
  if (!emailSent) throw new ApiError(503, "Verification email could not be sent. Check the SMTP configuration and try again.");
  res.status(200).json(new ApiResponse(200, null, "A new verification code was sent"));
});

const resetAccount = async (email, role, fields = "") => {
  if (![USER_ROLES.PATIENT, USER_ROLES.DOCTOR].includes(role)) return null;
  const Model = role === USER_ROLES.DOCTOR ? Doctor : User;
  return Model.findOne(role === USER_ROLES.DOCTOR ? { email } : { email, role }).select(fields);
};

export const forgotPassword = asyncHandler(async (req, res) => {
  const { email, role } = req.body;
  const account = await resetAccount(email, role);
  if (!account) throw new ApiError(404, "Patient or doctor account not found");
  const sent = await issuePasswordResetOtp(account);
  if (!sent) throw new ApiError(503, "Password reset email could not be sent. Please try again.");
  res.status(200).json(new ApiResponse(200, { email: account.email, role }, "Password reset OTP sent"));
});

export const verifyPasswordResetOtp = asyncHandler(async (req, res) => {
  const { email, role, otp } = req.body;
  const account = await resetAccount(email, role, "+passwordResetOtp +passwordResetOtpExpires");
  if (!account || !passwordResetOtpMatches(account, otp)) throw new ApiError(400, "Reset code is invalid or expired");
  const resetToken = crypto.randomBytes(32).toString("hex");
  account.passwordResetToken = hashResetToken(resetToken);
  account.passwordResetTokenExpires = new Date(Date.now() + 10 * 60 * 1000);
  account.passwordResetOtp = undefined;
  account.passwordResetOtpExpires = undefined;
  await account.save({ validateBeforeSave: false });
  res.status(200).json(new ApiResponse(200, { resetToken }, "OTP verified"));
});

export const resetPassword = asyncHandler(async (req, res) => {
  const { email, role, resetToken, password, confirmPassword } = req.body;
  if (!password || password.length < 8) throw new ApiError(400, "Password must contain at least 8 characters");
  if (password !== confirmPassword) throw new ApiError(400, "Passwords do not match");
  const account = await resetAccount(email, role, "+password +passwordResetToken +passwordResetTokenExpires");
  if (!account || account.passwordResetTokenExpires <= new Date() || account.passwordResetToken !== hashResetToken(resetToken)) throw new ApiError(400, "Password reset session is invalid or expired");
  account.password = password;
  account.passwordResetToken = undefined;
  account.passwordResetTokenExpires = undefined;
  await account.save();
  res.status(200).json(new ApiResponse(200, null, "Password reset successfully. Please login."));
});
