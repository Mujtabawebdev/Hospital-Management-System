import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import { UserCart } from "../models/user-cart.model.js";
import { Medicine } from "../models/medicine.model.js";
import { MedicineOrder } from "../models/medicine-order.model.js";


export const ToggleCart = asyncHandler(async (req, res) => {
    const { medicineId, quantity = 1, totalPrice, status } = req.body;
    const userId = req.user._id;

    if (!medicineId || !quantity || totalPrice === undefined) {
        throw new ApiError(400, "Please Fill Full Form!");
    }

    let existedCart = await UserCart.findOne({ userId, medicineId });
    if (existedCart) {
        existedCart.quantity = quantity;
        existedCart.totalPrice = totalPrice;
        existedCart.status = status || existedCart.status;
        await existedCart.save();
        return res.json(new ApiResponse(200, existedCart, "Medicine Cart Updated Successfully!"));
    }

    const cart = await UserCart.create({
        userId,
        medicineId,
        quantity,
        totalPrice,
        status,
    });

    return res.
        status(201).
        json(new ApiResponse(201, cart, "Medicine Added to Cart Successfully!"));
});

export const deleteFromCart = asyncHandler(async (req, res) => {
    const cart = await UserCart.findOneAndDelete({
        _id: req.params.id,
        userId: req.user._id,
    });
    if (!cart) {
        throw new ApiError(404, "Medicine not found");
    }
    return res.json(new ApiResponse(200, {}, "Medicine Deleted from Cart Successfully!"));
});

export const getUserCart = asyncHandler(async (req, res) => {
    const cart = await UserCart.find({ userId: req.user._id }).populate("medicineId");
    if (!cart) {
        throw new ApiError(404, "Cart not found");
    }
    return res.json(new ApiResponse(200, cart, "Cart Fetched Successfully!"));
});

export const checkoutMedicineCart = asyncHandler(async (req, res) => {
    const cart = await UserCart.find({ userId: req.user._id, status: "Pending" }).populate("medicineId");

    if (!cart.length) {
        throw new ApiError(400, "Your cart is empty");
    }

    const items = cart.map((cartItem) => {
        const medicine = cartItem.medicineId;
        return {
            medicine: medicine._id,
            name: medicine.name,
            image: medicine.image,
            quantity: cartItem.quantity,
            price: medicine.price,
            totalPrice: cartItem.totalPrice,
        };
    });

    const totalItems = items.reduce((total, item) => total + item.quantity, 0);
    const totalAmount = items.reduce((total, item) => total + item.totalPrice, 0);

    const order = await MedicineOrder.create({
        user: req.user._id,
        items,
        totalItems,
        totalAmount,
        status: "Placed",
    });

    await Promise.all(
        items.map((item) =>
            Medicine.findByIdAndUpdate(item.medicine, {
                $inc: { stock: -item.quantity },
            }),
        ),
    );
    await UserCart.deleteMany({ userId: req.user._id, status: "Pending" });

    return res.status(201).json(new ApiResponse(201, order, "Order placed successfully"));
});

export const getMyMedicineOrders = asyncHandler(async (req, res) => {
    const orders = await MedicineOrder.find({ user: req.user._id }).sort({ createdAt: -1 });
    return res.json(new ApiResponse(200, orders, "Orders fetched successfully"));
});
