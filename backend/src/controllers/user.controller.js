import asyncHandler from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { Doctor } from "../models/doctor.model.js";
import { USER_ROLES } from "../constants/roles.js";
import { sendAuthResponse, publicUser } from "../utils/auth-response.js";

const normalizeAddress = (address) => {
  if (typeof address === "string") {
    return { line1: address };
  }

  return address;
};

export const patientRegister = asyncHandler(async (req, res) => {
  const payload = req.validated?.body || req.body;
  const existedUser = await User.findOne({ email: payload.email });

  if (existedUser) {
    throw new ApiError(409, "An account with this email already exists");
  }

  const createdUser = await User.create({
    ...payload,
    address: normalizeAddress(payload.address),
    role: USER_ROLES.PATIENT,
  });

  return sendAuthResponse(res, createdUser, "Patient registered successfully", 201);
});

export const getUserDetails = asyncHandler(async (req, res) => {
  res.status(200).json(new ApiResponse(200, publicUser(req.user), `${req.user.role} details`));
});

export const getDoctorDetails = asyncHandler(async (req, res) => {
  const doctor = await Doctor.findById(req.doctor._id).select("-password");
  res.status(200).json(new ApiResponse(200, doctor, "Doctor details"));
});
