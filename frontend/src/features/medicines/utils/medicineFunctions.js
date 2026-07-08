// store the card data based on user Authrntications

import { AddtoUserCart, GetUserCart } from "../api/medicineApi";

const CardStore = async (data)=>{
    if (localStorage.getItem("token")) {
        const response = await AddtoUserCart({
            medicineId: data._id,
            price: data.price,
            discount: data.discount || 0,
        });
        return response.data;
    }

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let itemExists = false;

    cart.forEach((element, index) => {
      if (element.medicineId === data._id) {
        cart.splice(index, 1);
        itemExists = true;
      }
    });

    if (!itemExists) {
      cart.push({ medicineId: data._id, quantity: 1, totalPrice: data.price - (data.discount || 0) });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    return cart;
}

const GetStore = () => {
    return JSON.parse(localStorage.getItem('cart')) || [];
}

export {
    CardStore,
    GetStore
}
