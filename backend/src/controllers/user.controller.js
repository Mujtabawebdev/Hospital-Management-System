import asyncHandler from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { Doctor } from "../models/doctor.model.js";
import { USER_ROLES } from "../constants/roles.js";
import { sendAuthResponse, publicUser } from "../utils/auth-response.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { issueEmailOtp } from "../services/email-verification.service.js";

const normalizeAddress = (address) => {
  if (typeof address === "string") {
    try {
      return JSON.parse(address);
    } catch {
      return { line1: address };
    }
  }

  if (!address || typeof address !== "object") {
    return { line1: address };
  }

  return address;
};

export const patientRegister = asyncHandler(async (req, res) => {
  const payload = req.validated?.body || req.body;
  const existedUser = await User.findOne({ email: payload.email });

  if (existedUser) {
    if (existedUser.role === USER_ROLES.PATIENT && existedUser.emailVerified === false) {
      const emailSent = await issueEmailOtp(existedUser);
      return res.status(200).json(new ApiResponse(200, { email: existedUser.email, role: existedUser.role, emailSent }, emailSent ? "A new verification code was sent" : "Continue to verification and use Resend OTP"));
    }
    throw new ApiError(409, "An account with this email already exists");
  }

  const createdUser = await User.create({
    ...payload,
    address: normalizeAddress(payload.address),
    role: USER_ROLES.PATIENT,
  });

  const emailSent = await issueEmailOtp(createdUser);
  res.status(201).json(new ApiResponse(201, { email: createdUser.email, role: createdUser.role, emailSent }, emailSent ? "Verification code sent to your email" : "Account created. Continue to verification and use Resend OTP"));
});

export const getUserDetails = asyncHandler(async (req, res) => {
  res.status(200).json(new ApiResponse(200, publicUser(req.user), `${req.user.role} details`));
});

export const getDoctorDetails = asyncHandler(async (req, res) => {
  const doctor = await Doctor.findById(req.doctor._id).select("-password");
  res.status(200).json(new ApiResponse(200, doctor, "Doctor details"));
});

const pickDefined = (source, fields) =>
  fields.reduce((picked, field) => {
    if (source[field] !== undefined) {
      picked[field] = source[field];
    }

    return picked;
  }, {});

const normalizeProfilePayload = (payload) => {
  const normalized = { ...payload };

  delete normalized.email;
  delete normalized.password;
  delete normalized.role;
  delete normalized.status;

  if (normalized.address !== undefined) {
    normalized.address = normalizeAddress(normalized.address);
  }

  return normalized;
};

const uploadProfilePicture = async (req) => {
  const file = req.file || req.files?.profilePicture?.[0];
  if (!file?.path) return undefined;

  const uploaded = await uploadOnCloudinary(file.path);
  if (!uploaded) {
    throw new ApiError(400, "Profile picture upload failed");
  }

  return {
    url: uploaded.url,
    publicId: uploaded.public_id,
  };
};

export const updateUserProfile = asyncHandler(async (req, res) => {
  const payload = normalizeProfilePayload(req.body);
  const profilePicture = await uploadProfilePicture(req);
  const updates = pickDefined(payload, [
    "firstName",
    "lastName",
    "phone",
    "address",
    "dob",
    "gender",
  ]);

  if (profilePicture) {
    updates.profilePicture = profilePicture;
  }

  const user = await User.findByIdAndUpdate(req.user._id, updates, {
    new: true,
    runValidators: true,
  });

  res.status(200).json(new ApiResponse(200, publicUser(user), `${user.role} profile updated successfully`));
});

export const updateDoctorProfile = asyncHandler(async (req, res) => {
  const payload = normalizeProfilePayload(req.body);
  const profilePicture = await uploadProfilePicture(req);
  const updates = pickDefined(payload, [
    "firstName",
    "lastName",
    "phone",
    "address",
    "gender",
    "qualification",
    "specialization",
    "hospital",
    "clinic",
    "fee",
    "biography",
    "licenseNumber",
    "availability",
  ]);

  if (profilePicture) {
    updates.profilePicture = profilePicture;
    updates.docAvatar = profilePicture.url;
  }

  const doctor = await Doctor.findByIdAndUpdate(req.doctor._id, updates, {
    new: true,
    runValidators: true,
  }).select("-password");

  res.status(200).json(new ApiResponse(200, doctor, "Doctor profile updated successfully"));
});
