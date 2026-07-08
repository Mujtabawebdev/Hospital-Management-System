import asyncHandler from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Doctor } from "../models/doctor.model.js";
import { DOCTOR_STATUS, USER_ROLES } from "../constants/roles.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const normalizeAddress = (address) => {
  if (typeof address === "string") {
    return { line1: address };
  }

  return address;
};

const mapDoctorPayload = (payload, uploads = {}) => ({
  firstName: payload.firstName,
  lastName: payload.lastName,
  email: payload.email,
  phone: payload.phone,
  password: payload.password,
  gender: payload.gender,
  address: normalizeAddress(payload.address),
  role: USER_ROLES.DOCTOR,
  status: payload.status || DOCTOR_STATUS.PENDING,
  qualification: payload.qualification,
  specialization: payload.specialization,
  experience: payload.experience,
  hospital: payload.hospital,
  clinic: payload.clinic,
  fee: payload.fee,
  biography: payload.biography,
  licenseNumber: payload.licenseNumber,
  availability: payload.availability,
  profilePicture: uploads.profilePicture,
  documents: uploads.documents || [],
  qualifications: payload.qualification ? [payload.qualification] : undefined,
  specializations: payload.specialization
    ? [{ name: payload.specialization, description: payload.specialization }]
    : undefined,
  appointmentCharges: payload.fee ? String(payload.fee) : undefined,
  docAvatar: uploads.profilePicture?.url,
});

const uploadDoctorFiles = async (req) => {
  const files = req.files || {};
  const profileFile = files.profilePicture?.[0] || req.file;
  const documentFiles = files.documents || [];
  const uploads = {};

  if (profileFile?.path) {
    const profilePicture = await uploadOnCloudinary(profileFile.path);
    if (!profilePicture) {
      throw new ApiError(400, "Profile picture upload failed");
    }

    uploads.profilePicture = {
      url: profilePicture.url,
      publicId: profilePicture.public_id,
    };
  }

  uploads.documents = await Promise.all(
    documentFiles
      .filter((file) => file.path)
      .map(async (file) => {
        const uploaded = await uploadOnCloudinary(file.path);
        if (!uploaded) {
          throw new ApiError(400, `Document upload failed: ${file.originalname}`);
        }

        return {
          name: file.originalname,
          url: uploaded.url,
          publicId: uploaded.public_id,
        };
      }),
  );

  return uploads;
};

export const registerDoctor = asyncHandler(async (req, res) => {
  const payload = req.validated?.body || req.body;
  const existedDoctor = await Doctor.findOne({ email: payload.email });

  if (existedDoctor) {
    throw new ApiError(409, "A doctor account with this email already exists");
  }

  const uploads = await uploadDoctorFiles(req);
  const doctor = await Doctor.create(mapDoctorPayload(payload, uploads));

  res
    .status(201)
    .json(new ApiResponse(201, doctor, "Doctor registration submitted for admin approval"));
});

export const addNewDoctor = asyncHandler(async (req, res) => {
  const payload = req.validated?.body || req.body;
  const existedDoctor = await Doctor.findOne({ email: payload.email });

  if (existedDoctor) {
    throw new ApiError(409, "A doctor account with this email already exists");
  }

  const uploads = await uploadDoctorFiles(req);
  const doctor = await Doctor.create(
    mapDoctorPayload({ ...payload, status: DOCTOR_STATUS.APPROVED }, uploads),
  );

  res.status(201).json(new ApiResponse(201, doctor, "Doctor created and approved"));
});

export const getAllDoctors = asyncHandler(async (req, res) => {
  const {
    specialization,
    location,
    gender,
    minExperience,
    maxFee,
    page = 1,
    limit = 12,
  } = req.query;

  const filter = {
    role: USER_ROLES.DOCTOR,
    status: DOCTOR_STATUS.APPROVED,
  };

  if (specialization) filter.specialization = new RegExp(specialization, "i");
  if (location) {
    filter.$or = [
      { "address.city": new RegExp(location, "i") },
      { "address.country": new RegExp(location, "i") },
      { hospital: new RegExp(location, "i") },
      { clinic: new RegExp(location, "i") },
    ];
  }
  if (gender) filter.gender = gender;
  if (minExperience) filter.experience = { $gte: Number(minExperience) };
  if (maxFee) filter.fee = { $lte: Number(maxFee) };

  const skip = (Number(page) - 1) * Number(limit);
  const [doctors, total] = await Promise.all([
    Doctor.find(filter).select("-password").sort({ createdAt: -1 }).skip(skip).limit(Number(limit)),
    Doctor.countDocuments(filter),
  ]);

  res.status(200).json(
    new ApiResponse(200, doctors, "Approved doctors list", {
      page: Number(page),
      limit: Number(limit),
      total,
      pages: Math.ceil(total / Number(limit)),
    }),
  );
});

export const getAdminDoctors = asyncHandler(async (req, res) => {
  const {
    search = "",
    status,
    page = 1,
    limit = 20,
  } = req.query;

  const filter = {
    role: USER_ROLES.DOCTOR,
  };

  if (status && Object.values(DOCTOR_STATUS).includes(status)) {
    filter.status = status;
  }

  if (search) {
    const searchRegex = new RegExp(search, "i");
    filter.$or = [
      { firstName: searchRegex },
      { lastName: searchRegex },
      { email: searchRegex },
      { specialization: searchRegex },
      { hospital: searchRegex },
      { clinic: searchRegex },
    ];
  }

  const skip = (Number(page) - 1) * Number(limit);
  const [doctors, total] = await Promise.all([
    Doctor.find(filter).select("-password").sort({ createdAt: -1 }).skip(skip).limit(Number(limit)),
    Doctor.countDocuments(filter),
  ]);

  res.status(200).json(
    new ApiResponse(200, {
      doctors,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        totalPages: Math.ceil(total / Number(limit)),
      },
    }, "Doctors fetched successfully"),
  );
});

export const updateDoctorStatus = asyncHandler(async (req, res) => {
  const { doctorId } = req.params;
  const { status } = req.body;

  if (!Object.values(DOCTOR_STATUS).includes(status)) {
    throw new ApiError(422, "Invalid doctor status");
  }

  const doctor = await Doctor.findByIdAndUpdate(
    doctorId,
    { status },
    { new: true, runValidators: true },
  ).select("-password");

  if (!doctor) {
    throw new ApiError(404, "Doctor not found");
  }

  res.status(200).json(new ApiResponse(200, doctor, `Doctor ${status.toLowerCase()} successfully`));
});
