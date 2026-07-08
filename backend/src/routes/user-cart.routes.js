import express from 'express';
import {
    ToggleCart,
    checkoutMedicineCart,
    deleteFromCart,
    getMyMedicineOrders,
    getUserCart,
} from '../controllers/user-cart.controller.js';
import { isPatientAuthenticated } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/add-to-cart", isPatientAuthenticated, ToggleCart);
router.delete("/delete-from-cart/:id", isPatientAuthenticated, deleteFromCart);
router.get("/user-cart", isPatientAuthenticated, getUserCart);
router.get("/user-cart/:userId", isPatientAuthenticated, getUserCart);
router.post("/checkout", isPatientAuthenticated, checkoutMedicineCart);
router.get("/orders", isPatientAuthenticated, getMyMedicineOrders);

export default router
