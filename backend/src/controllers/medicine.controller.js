import validator from "validator";
import { Medicine } from "../models/medicine.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

//! Adding new medicine by admin only
export const addNewMedicine = asyncHandler(async (req, res) => {
    const { name, price, description, category, manufacturer, expiryDate, stock, discount } = req.body;

    if (
        !name ||
        price === undefined ||
        !description ||
        !category ||
        !manufacturer ||
        !expiryDate ||
        stock === undefined
    ) {
        throw new ApiError(400, "Please Fill All Medicine Details!");
    }
    if (new Date(expiryDate) <= new Date(new Date().setHours(0, 0, 0, 0))) {
        throw new ApiError(400, "Expiry date must be in the future");
    }

    let existedMedicine = await Medicine.findOne({ name });
    if (existedMedicine) {
        throw new ApiError(400, `Medicine with this Name already exists`);
    }

    // Medicine Image
    const medicineImageBuffer = req.file?.buffer;
    if (!medicineImageBuffer) {
        throw new ApiError(400, "Medicine image is required!");
    }
    const medicineImage = await uploadOnCloudinary(medicineImageBuffer);
    if (!medicineImage) {
        throw new ApiError(400, "Medicine Image is required")
    }
    const createdMedicine = await Medicine.create({
        name,
        price,
        description,
        category,
        expiryDate,
        manufacturer,
        stock,
        discount: discount ?? 0,
        image: medicineImage.secure_url || medicineImage.url,
    });

    return res.
        status(201).
        json(new ApiResponse(201, createdMedicine, "Medicine Added Successfully!"));
});

//! list medicines for admin marketplace management
export const getAllMedicines = asyncHandler(async (req, res) => {
    const page = parseInt(req.query.page, 10) || 1;
    const requestedLimit = parseInt(req.query.limit, 10) || 20;
    const limit = Math.min(Math.max(requestedLimit, 1), 500);
    const skip = (page - 1) * limit;
    const search = validator.escape(req.query.search || "");
    const category = validator.escape(req.query.category || "");

    const filter = {};
    if (search) {
        filter.$or = [
            { name: { $regex: search, $options: "i" } },
            { manufacturer: { $regex: search, $options: "i" } },
            { category: { $regex: search, $options: "i" } },
        ];
    }
    if (category && category !== "All") {
        filter.category = category;
    }

    const [medicines, total] = await Promise.all([
        Medicine.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
        Medicine.countDocuments(filter),
    ]);

    return res.json(
        new ApiResponse(
            200,
            {
                medicines,
                pagination: {
                    page,
                    limit,
                    total,
                    totalPages: Math.ceil(total / limit),
                },
            },
            "Medicines fetched successfully!",
        ),
    );
});

//! delete medicine by admin only
export const deleteMedicine = asyncHandler(async (req, res) => {
    const medicine = await Medicine.findByIdAndDelete(req.params.id);
    if (!medicine) {
        throw new ApiError(404, "Medicine not found");
    }
    return res.json(new ApiResponse(200, {}, "Medicine Deleted Successfully!"));
});


//! update medicine by admin only
export const updateMedicine = asyncHandler(async (req, res) => {
    const {
        name,
        price,
        description,
        category,
        manufacturer,
        expiryDate,
        stock,
        discount,
    } = req.body;

    // Ensure at least one field is provided
    if (
        name === undefined &&
        price === undefined &&
        description === undefined &&
        category === undefined &&
        manufacturer === undefined &&
        expiryDate === undefined &&
        stock === undefined &&
        discount === undefined &&
        !req.file
    ) {
        throw new ApiError(400, "Please provide at least one field to update!");
    }

    // Build the update object dynamically
    const updateFields = {};
    if (name !== undefined) updateFields.name = name;
    if (price !== undefined) updateFields.price = price;
    if (description !== undefined) updateFields.description = description;
    if (category !== undefined) updateFields.category = category;
    if (manufacturer !== undefined) updateFields.manufacturer = manufacturer;
    if (expiryDate !== undefined) {
        if (new Date(expiryDate) <= new Date(new Date().setHours(0, 0, 0, 0))) throw new ApiError(400, "Expiry date must be in the future");
        updateFields.expiryDate = expiryDate;
    }
    if (stock !== undefined) updateFields.stock = stock;
    if (discount !== undefined) updateFields.discount = discount;
    if (req.file?.buffer) {
        const medicineImage = await uploadOnCloudinary(req.file.buffer);
        if (!medicineImage) {
            throw new ApiError(400, "Medicine image upload failed");
        }
        updateFields.image = medicineImage.secure_url || medicineImage.url;
    }

    const medicine = await Medicine.findByIdAndUpdate(
        req.params.id,
        updateFields,
        {
            new: true,
            runValidators: true,
        }
    );
    if (!medicine) {
        throw new ApiError(404, "Medicine not found");
    }
    return res.json(new ApiResponse(200, medicine, "Medicine Updated Successfully!"));
});


//! get all high discount medicines by user
export const getHighDiscountMedicines = asyncHandler(async (req, res) => {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 12;
    const skip = (page - 1) * limit;
    const medicines = await Medicine.find({ discount: { $gte: 10 } }).skip(skip)
        .limit(limit);
    if (!medicines) {
        throw new ApiError(404, "No medicines found");
    }
    return res.json(new ApiResponse(200, medicines, "Medicines fetched successfully!"));
});


//! get category medicines by user
export const getCategoryMedicines = asyncHandler(async (req, res) => {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = (page - 1) * limit;

    const medicines = await Medicine.find({
        category: req.params.category,
    })
        .skip(skip)
        .limit(limit);

    if (!medicines) {
        throw new ApiError(404, "No medicines found");
    }

    return res.json(new ApiResponse(200, medicines, "Medicines fetched successfully!"));
});


//! get single medicine by user
export const getSingleMedicine = asyncHandler(async (req, res) => {
    const medicine = await Medicine.findById(req.params.id);
    if (!medicine) {
        throw new ApiError(404, "Medicine not found");
    }
    return res.json(new ApiResponse(200, medicine, "Medicine fetched successfully!"));
});


//! Search medicine on the basis of name and category
export const searchMedicine = asyncHandler(async (req, res) => {
    const search = validator.escape(req.query.search);
    const medicines = await Medicine.find({
        $or: [
            { name: { $regex: search, $options: "i" } },
            { category: { $regex: search, $options: "i" } },
        ],
    });
    if (!medicines) {
        throw new ApiError(404, "No medicines found");
    }
    return res.json(new ApiResponse(200, medicines, "Medicines fetched successfully!"));
});
