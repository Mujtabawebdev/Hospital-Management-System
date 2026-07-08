import React from "react";
import { Link } from "react-router-dom";
import { Category } from "../../../../shared/constants/constants";
import { MedicineTile } from "../../../../shared/components/ui";
import {
  SkeletonLoading,
  useLoading,
} from "../../../../import-export/ImportExport";

export default function ShopByCategory() {
  const loading = useLoading(1000);

  return (
    <section className="space-y-4 my-20">
      <div className="px-3 md:px-4 lg:px-6 py-2 inline-flex">
        <h2 className="text-lg md:text-xl lg:text-2xl text-dark_theme font-semibold">
          Shop by Category
        </h2>
      </div>

      {/* cards section */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 justify-items-center gap-6 px-3 md:px-4 lg:px-6 py-2">
        {loading
          ? Array.from({ length: 6 }).map((_, index) => (
              <SkeletonLoading key={index} type="category" />
            ))
          : Category.map((category, index) => (
              <Link
                key={index}
                to={`/medicines/shop_by_category/${encodeURIComponent(category.name)}`}
              >
                <MedicineTile image={category.image} name={category.name} />
              </Link>
            ))}
      </div>
    </section>
  );
}
