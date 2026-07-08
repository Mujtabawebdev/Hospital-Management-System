import api from "../../../shared/api/httpClient.jsx";

const getHighDiscountMedicines = async (page) => {
    try {
        const response = await api.get("/medicines/discount",{
            params: {
                page: page,
            }
        });
        return response.data;
    } catch (error) {
        return error;
    }
}

const getMedicines = async (id) => {
    try {
        console.log(id);
        const response = await api.get(`/medicines/get/${id}`);
        return response.data;
    } catch (error) {
        return error;
    }
}

const getCategoryMedicines = async (category, page) => {
    try {
        const response = await api.get(`/medicines/shop-by-category/${category}`, {
            params: {
                page: page
            }
        });
        return response.data;
    } catch (error) {
        return error;
    }
}
const AddtoUserCart = async ({medicineId, quantity= 1, price, discount}) => {
    const response = await api.post("/medicines-cart/add-to-cart", {
        medicineId,
        quantity,
        totalPrice: quantity * (price - discount)
    })

    return response.data
}

const deleteFromUserCart = async ({CartId}) => {
    const response = await api.delete(`/medicines-cart/delete-from-cart/${CartId}`)
    return response.data
}

const GetUserCart = async () => {
    const response = await api.get("/medicines-cart/user-cart")
    return response.data
}

const CheckoutPayment = async ({ amount }) => {
    try {
        const response = await api.post("/payment/checkout", {
            amount
        })

        return response.data
    } catch (error) {
        return error;
    }
}
const paymentVerification = async ({
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
}) => {
    try {
        const response = await api.post("/payment/paymentverification", {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
        })

        return response.data
    } catch (error) {
        return error;
    }
}

const SearchMedicines = async (search) => {
    try {
        const response = await api.get("/medicines/search-medicine", {
            params: {
                search
            }
        });
        return response.data;
    } catch (error) {
        return error
    }
}
const CheckoutMedicineCart = async () => {
    const response = await api.post("/medicines-cart/checkout");
    return response.data;
}

const GetMedicineOrders = async () => {
    const response = await api.get("/medicines-cart/orders");
    return response.data;
}
export {
    getHighDiscountMedicines,
    getCategoryMedicines,
    getMedicines,
    deleteFromUserCart,
    GetUserCart,
    AddtoUserCart,
    CheckoutPayment,
    CheckoutMedicineCart,
    GetMedicineOrders,
    paymentVerification,
    SearchMedicines
}
