import React from "react";
import { CalendarDays, ClipboardList, Eye, Package } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button, Card } from "../../../shared/components/ui";

const getDiscountedPrice = (medicine) => {
  const price = Number(medicine?.price || 0);
  const discount = Number(medicine?.discount || 0);

  return Math.max(price - discount, 0);
};

const formatDate = (date) => {
  if (!date) return "Not set";

  return new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

function MedicineCard({ products = [] }) {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((medicine) => {
        const discountedPrice = getDiscountedPrice(medicine);

        return (
          <Card key={medicine._id} className="overflow-hidden shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
            <button
              type="button"
              className="block h-52 w-full overflow-hidden bg-slate-100"
              onClick={() => navigate(`/buy-medicines/${medicine._id}`)}
            >
              <img
                src={medicine.image}
                alt={medicine.name}
                className="h-full w-full object-cover transition duration-300 hover:scale-105"
                loading="lazy"
              />
            </button>
            <div className="space-y-4 p-4">
              <div>
                <p className="line-clamp-1 text-sm font-semibold text-main_theme">{medicine.category}</p>
                <h3 className="line-clamp-2 min-h-12 text-lg font-black text-slate-900">
                  {medicine.name}
                </h3>
                <p className="line-clamp-3 min-h-16 text-sm text-slate-500">
                  {medicine.description}
                </p>
              </div>

              <div className="grid gap-2 text-sm text-slate-600">
                <p className="flex items-center gap-2">
                  <Package className="h-4 w-4 text-main_theme" aria-hidden="true" />
                  Quantity: <span className="font-bold text-slate-900">{medicine.stock || 0}</span>
                </p>
                <p className="flex items-center gap-2">
                  <CalendarDays className="h-4 w-4 text-main_theme" aria-hidden="true" />
                  Expire: <span className="font-bold text-slate-900">{formatDate(medicine.expiryDate)}</span>
                </p>
                <p className="flex items-center gap-2">
                  <ClipboardList className="h-4 w-4 text-main_theme" aria-hidden="true" />
                  Manufacturer: <span className="font-bold text-slate-900">{medicine.manufacturer}</span>
                </p>
              </div>

              <div className="flex items-end justify-between gap-3">
                <div>
                  <p className="text-xl font-black text-slate-900">Rs {discountedPrice}</p>
                  {Number(medicine.discount || 0) > 0 && (
                    <p className="text-sm text-slate-400">
                      <span className="line-through">Rs {medicine.price}</span>
                      <span className="ml-2 text-main_theme">Save Rs {medicine.discount}</span>
                    </p>
                  )}
                </div>
              </div>

              <Button className="w-full gap-2" onClick={() => navigate(`/buy-medicines/${medicine._id}`)}>
                <Eye className="h-4 w-4" aria-hidden="true" />
                View Details
              </Button>
            </div>
          </Card>
        );
      })}
    </div>
  );
}

export default MedicineCard;
