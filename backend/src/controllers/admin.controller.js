import asyncHandler from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { USER_ROLES } from "../constants/roles.js";
import { publicUser } from "../utils/auth-response.js";

export const addNewAdmin = asyncHandler(async (req, res) => {
  const payload = req.validated?.body || req.body;
  const existedAdmin = await User.findOne({ email: payload.email });

  if (existedAdmin) {
    throw new ApiError(409, "An account with this email already exists");
  }

  const createdAdmin = await User.create({
    ...payload,
    role: USER_ROLES.ADMIN,
  });

  res.status(201).json(new ApiResponse(201, publicUser(createdAdmin), "Admin created successfully"));
});
