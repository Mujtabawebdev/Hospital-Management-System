import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import MedicineCard from "../components/MedicineCard.jsx";
import { getCategoryMedicines } from "../api/medicineApi";
import { Button, Card } from "../../../shared/components/ui";

export default function ProductsByCategory() {
  const { id } = useParams();
  const category = decodeURIComponent(id || "");
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getCategoryMedicines(category, currentPage)
      .then((response) => {
        setProducts(response?.data || []);
      })
      .catch((error) => {
        toast.error(error.response?.data?.message || "Failed to load category products");
      })
      .finally(() => setLoading(false));
  }, [category, currentPage]);

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10">
      <section className="mx-auto max-w-7xl">
        <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-main_theme">
              Product Category
            </p>
            <h1 className="mt-2 text-3xl font-black text-slate-900">{category}</h1>
          </div>
          <Link to="/medicines">
            <Button variant="secondary">Back to Marketplace</Button>
          </Link>
        </div>

        {loading ? (
          <Card className="p-8 text-center text-slate-500">Loading products...</Card>
        ) : products.length > 0 ? (
          <MedicineCard products={products} />
        ) : (
          <Card className="p-8 text-center text-slate-500">
            No products found in this category.
          </Card>
        )}

        {products.length === 12 && (
          <div className="mt-8 flex justify-end gap-3">
            <Button
              variant="secondary"
              disabled={currentPage <= 1}
              onClick={() => setCurrentPage((page) => page - 1)}
            >
              Previous
            </Button>
            <Button onClick={() => setCurrentPage((page) => page + 1)}>Next</Button>
          </div>
        )}
      </section>
    </main>
  );
}
