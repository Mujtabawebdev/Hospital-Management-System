import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { CalendarDays, Factory, Package, Tags } from "lucide-react";
import { toast } from "react-toastify";
import { getMedicines } from "../api/medicineApi";
import { Button, Card } from "../../../shared/components/ui";

const formatDate = (date) => {
  if (!date) return "Not set";

  return new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const getDiscountedPrice = (medicine) => {
  const price = Number(medicine?.price || 0);
  const discount = Number(medicine?.discount || 0);

  return Math.max(price - discount, 0);
};

function SingleMedicine() {
  const { id: productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getMedicines(productId)
      .then((response) => {
        setProduct(response?.data || null);
      })
      .catch((error) => {
        toast.error(error.response?.data?.message || "Failed to load medicine details");
      })
      .finally(() => setLoading(false));
  }, [productId]);

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-10">
        <Card className="mx-auto max-w-5xl p-8 text-center text-slate-500">Loading medicine...</Card>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-10">
        <Card className="mx-auto max-w-5xl p-8 text-center text-slate-500">Medicine not found.</Card>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10">
      <section className="mx-auto max-w-6xl">
        <Link to="/medicines">
          <Button variant="secondary" size="sm">Back to Marketplace</Button>
        </Link>

        <Card className="mt-5 overflow-hidden">
          <div className="grid gap-6 md:grid-cols-[420px_1fr]">
            <div className="bg-slate-100">
              <img src={product.image} alt={product.name} className="h-full min-h-96 w-full object-cover" />
            </div>

            <div className="space-y-6 p-6 md:p-8">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-main_theme">{product.category}</p>
                <h1 className="mt-2 text-3xl font-black text-slate-900">{product.name}</h1>
                <p className="mt-3 text-slate-600">{product.description}</p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-md border border-slate-200 p-4">
                  <p className="flex items-center gap-2 text-sm font-semibold text-slate-500">
                    <Package className="h-4 w-4 text-main_theme" aria-hidden="true" />
                    Quantity
                  </p>
                  <p className="mt-2 text-2xl font-black text-slate-900">{product.stock || 0}</p>
                </div>
                <div className="rounded-md border border-slate-200 p-4">
                  <p className="flex items-center gap-2 text-sm font-semibold text-slate-500">
                    <CalendarDays className="h-4 w-4 text-main_theme" aria-hidden="true" />
                    Expire Date
                  </p>
                  <p className="mt-2 text-2xl font-black text-slate-900">{formatDate(product.expiryDate)}</p>
                </div>
                <div className="rounded-md border border-slate-200 p-4">
                  <p className="flex items-center gap-2 text-sm font-semibold text-slate-500">
                    <Factory className="h-4 w-4 text-main_theme" aria-hidden="true" />
                    Manufacturer
                  </p>
                  <p className="mt-2 text-lg font-black text-slate-900">{product.manufacturer}</p>
                </div>
                <div className="rounded-md border border-slate-200 p-4">
                  <p className="flex items-center gap-2 text-sm font-semibold text-slate-500">
                    <Tags className="h-4 w-4 text-main_theme" aria-hidden="true" />
                    Price
                  </p>
                  <p className="mt-2 text-2xl font-black text-slate-900">Rs {getDiscountedPrice(product)}</p>
                  {Number(product.discount || 0) > 0 && (
                    <p className="text-sm text-slate-400">
                      <span className="line-through">Rs {product.price}</span>
                      <span className="ml-2 text-main_theme">Save Rs {product.discount}</span>
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Card>
      </section>
    </main>
  );
}

export default SingleMedicine;
