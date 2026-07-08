import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Card, Input } from "../../../shared/components/ui";
import { GetMedicineOrders } from "../../medicines/api/medicineApi";

function OrderHistoryPage() {
  const [orders, setOrders] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    GetMedicineOrders()
      .then((response) => setOrders(response.data || []))
      .catch((error) => toast.error(error.response?.data?.message || "Failed to load orders"));
  }, []);

  const visibleOrders = orders.filter((order) =>
    order.items.some((item) => item.name.toLowerCase().includes(searchInput.toLowerCase())),
  );

  return (
    <section className="mx-auto my-10 max-w-6xl px-4">
      <h1 className="mb-6 text-3xl font-black text-slate-900">Medicine Orders</h1>
      <Input
        type="text"
        placeholder="Search your orders here"
        value={searchInput}
        onChange={(event) => setSearchInput(event.target.value)}
        className="mb-5"
      />

      <div className="grid gap-4">
        {visibleOrders.length === 0 ? (
          <Card className="p-6 text-center text-slate-500">No medicine orders found.</Card>
        ) : (
          visibleOrders.map((order) => (
            <Card key={order._id} className="p-5">
              <div className="mb-4 flex flex-col justify-between gap-2 md:flex-row md:items-center">
                <div>
                  <h2 className="text-lg font-black text-slate-900">
                    Order #{order._id.slice(-6).toUpperCase()}
                  </h2>
                  <p className="text-sm text-slate-500">{new Date(order.createdAt).toLocaleString()}</p>
                </div>
                <div className="text-left md:text-right">
                  <span className="rounded-full bg-light_theme px-3 py-1 text-xs font-bold text-dark_theme">
                    {order.status}
                  </span>
                  <p className="mt-2 font-black text-slate-900">Rs {order.totalAmount}</p>
                </div>
              </div>
              <div className="grid gap-3">
                {order.items.map((item) => (
                  <div key={item.medicine} className="flex items-center gap-3 rounded-md bg-slate-50 p-3">
                    <img src={item.image} alt={item.name} className="h-14 w-14 rounded-md object-cover" />
                    <div className="flex-1">
                      <p className="font-bold text-slate-900">{item.name}</p>
                      <p className="text-sm text-slate-600">
                        Qty {item.quantity} x Rs {item.price}
                      </p>
                    </div>
                    <p className="font-bold text-slate-900">Rs {item.totalPrice}</p>
                  </div>
                ))}
              </div>
            </Card>
          ))
        )}
      </div>
    </section>
  );
}

export default OrderHistoryPage;
