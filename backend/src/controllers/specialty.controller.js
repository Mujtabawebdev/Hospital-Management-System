import asyncHandler from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Specialty } from "../models/specialty.model.js";

export const getAllSpecialties = asyncHandler(async (req, res) => {
  const specialties = await Specialty.find({});
  res.status(200).json(new ApiResponse(200, specialties, "Specialties fetched"));
});
