import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, Card } from "../../../shared/components/ui";
import { CheckoutMedicineCart, GetUserCart, deleteFromUserCart } from "../../medicines/api/medicineApi";

function AddtoCart() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const loadCart = async () => {
    try {
      const response = await GetUserCart();
      setCartItems(response.data || []);
    } catch (error) {
      toast.error(error.response?.data?.message || "Please login to view your cart");
      navigate("/login");
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

  const totals = useMemo(
    () =>
      cartItems.reduce(
        (summary, item) => ({
          totalItems: summary.totalItems + item.quantity,
          totalPrice: summary.totalPrice + item.totalPrice,
        }),
        { totalItems: 0, totalPrice: 0 },
      ),
    [cartItems],
  );

  const removeItem = async (cartId) => {
    try {
      await deleteFromUserCart({ CartId: cartId });
      toast.success("Medicine removed from cart");
      loadCart();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to remove medicine");
    }
  };

  const handleBuyNow = async () => {
    try {
      setIsCheckingOut(true);
      await CheckoutMedicineCart();
      toast.success("Order placed successfully");
      navigate("/medicines/order_history");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to place order");
    } finally {
      setIsCheckingOut(false);
    }
  };

  return (
    <section className="mx-auto my-10 max-w-6xl px-4">
      <h1 className="mb-6 text-3xl font-black text-slate-900">My Cart</h1>
      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="grid gap-4">
          {cartItems.length === 0 ? (
            <Card className="p-6 text-center text-slate-500">Your cart is empty.</Card>
          ) : (
            cartItems.map((item) => {
              const medicine = item.medicineId;
              return (
                <Card key={item._id} className="flex flex-col gap-4 p-4 md:flex-row md:items-center">
                  <img
                    src={medicine?.image}
                    alt={medicine?.name}
                    className="h-32 w-full rounded-md object-cover md:w-40"
                  />
                  <div className="flex-1">
                    <h2 className="text-xl font-black text-slate-900">{medicine?.name}</h2>
                    <p className="mt-1 line-clamp-2 text-sm text-slate-600">{medicine?.description}</p>
                    <p className="mt-2 text-sm font-bold text-slate-700">Quantity: {item.quantity}</p>
                    <p className="text-sm font-bold text-slate-700">Total: Rs {item.totalPrice}</p>
                  </div>
                  <Button variant="red" size="sm" onClick={() => removeItem(item._id)}>
                    Remove
                  </Button>
                </Card>
              );
            })
          )}
        </div>
        <Card className="h-fit p-5">
          <div className="flex justify-between text-sm">
            <span>Total Items</span>
            <span className="font-black">{totals.totalItems}</span>
          </div>
          <div className="mt-3 flex justify-between text-lg">
            <span>Total Price</span>
            <span className="font-black">Rs {totals.totalPrice}</span>
          </div>
          <Button
            onClick={handleBuyNow}
            disabled={cartItems.length === 0 || isCheckingOut}
            className="mt-5 w-full"
          >
            {isCheckingOut ? "Placing Order..." : "Buy Now"}
          </Button>
        </Card>
      </div>
    </section>
  );
}

export default AddtoCart;
