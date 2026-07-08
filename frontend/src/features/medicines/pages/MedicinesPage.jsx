import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Search, SlidersHorizontal } from "lucide-react";
import { toast } from "react-toastify";
import MedicineCard from "../components/MedicineCard.jsx";
import { getMarketplaceMedicines } from "../api/medicineApi";
import { Category } from "../../../shared/constants/constants";
import { Button, Card, Input } from "../../../shared/components/ui";
import { MedicineTile } from "../../../shared/components/ui";

function MedicinesPage() {
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({});
  const [filters, setFilters] = useState({
    search: "",
    category: "",
    page: 1,
  });
  const [searchDraft, setSearchDraft] = useState("");
  const [loading, setLoading] = useState(true);

  const activeCategoryLabel = useMemo(
    () => filters.category || "All Products",
    [filters.category],
  );

  const loadProducts = async () => {
    try {
      setLoading(true);
      const response = await getMarketplaceMedicines({
        page: filters.page,
        limit: filters.category ? 12 : 500,
        search: filters.search,
        category: filters.category,
      });

      const data = response?.data || {};
      setProducts(data.medicines || []);
      setPagination(data.pagination || {});
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load marketplace");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, [filters]);

  const handleSearch = (event) => {
    event.preventDefault();
    setFilters((current) => ({ ...current, search: searchDraft.trim(), page: 1 }));
  };

  const handleCategory = (category) => {
    setFilters((current) => ({ ...current, category, page: 1 }));
  };

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="bg-dark_theme px-4 py-12 text-white">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-white/70">Medicine Marketplace</p>
          <h1 className="mt-3 max-w-3xl text-4xl font-black md:text-5xl">
            Buy medicines by product category
          </h1>
          <form onSubmit={handleSearch} className="mt-8 grid gap-3 md:grid-cols-[1fr_auto]">
            <div className="relative">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
              <Input
                value={searchDraft}
                onChange={(event) => setSearchDraft(event.target.value)}
                placeholder="Search medicines, category, manufacturer..."
                inputClassName="h-12 rounded-md border-none pl-12 text-slate-900"
              />
            </div>
            <Button type="submit" variant="green" className="h-12 gap-2">
              <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
              Search
            </Button>
          </form>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8">
        <div className="mb-8">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="text-2xl font-black text-slate-900">Shop by Category</h2>
            <Button variant="ghost" size="sm" onClick={() => handleCategory("")}>
              View all
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-8">
            {Category.map((category) => (
              <Link
                key={category.name}
                to={`/medicines/shop_by_category/${encodeURIComponent(category.name)}`}
                className="block"
              >
                <MedicineTile
                  image={category.image}
                  name={category.name}
                  className="h-36 w-full shadow-sm"
                  imageClassName="h-24 object-cover"
                />
              </Link>
            ))}
          </div>
        </div>

        <Card className="mb-6 p-4 shadow-sm">
          <div className="flex flex-wrap items-center gap-2">
            <Button
              variant={!filters.category ? "primary" : "secondary"}
              size="sm"
              onClick={() => handleCategory("")}
            >
              All
            </Button>
            {Category.map((category) => (
              <Button
                key={category.name}
                variant={filters.category === category.name ? "primary" : "secondary"}
                size="sm"
                onClick={() => handleCategory(category.name)}
              >
                {category.name}
              </Button>
            ))}
          </div>
        </Card>

        <div className="mb-5 flex flex-col gap-1 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-2xl font-black text-slate-900">{activeCategoryLabel}</h2>
            <p className="text-sm text-slate-500">
              {pagination.total || products.length || 0} products available
            </p>
          </div>
        </div>

        {loading ? (
          <Card className="p-8 text-center text-slate-500">Loading marketplace...</Card>
        ) : products.length > 0 ? (
          <MedicineCard products={products} />
        ) : (
          <Card className="p-8 text-center text-slate-500">
            No products found in this category.
          </Card>
        )}

        {filters.category && pagination.totalPages > 1 && (
          <div className="mt-8 flex items-center justify-end gap-3">
            <Button
              variant="secondary"
              disabled={filters.page <= 1}
              onClick={() => setFilters((current) => ({ ...current, page: current.page - 1 }))}
            >
              Previous
            </Button>
            <span className="text-sm font-bold text-slate-600">
              Page {pagination.page} of {pagination.totalPages}
            </span>
            <Button
              variant="secondary"
              disabled={filters.page >= pagination.totalPages}
              onClick={() => setFilters((current) => ({ ...current, page: current.page + 1 }))}
            >
              Next
            </Button>
          </div>
        )}
      </section>
    </main>
  );
}

export default MedicinesPage;
