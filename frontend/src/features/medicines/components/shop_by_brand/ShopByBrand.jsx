import React from "react";
import { Link } from "react-router-dom";
import { Category } from "../../../../shared/constants/constants";
import { MedicineTile } from "../../../../shared/components/ui";

export default function ShopByBrand() {
  return (
    <section className="space-y-4 my-20">
      <div className="px-3 md:px-4 lg:px-6 py-2">
        <h2 className="text-lg md:text-xl lg:text-2xl text-dark_theme font-semibold">
          Shop by Brand
        </h2>
      </div>

      {/* cards section */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6  justify-items-center gap-6 px-3 md:px-4 lg:px-6 py-2">
        {Category.map((category, index) => (
          <Link key={index} to={`/shop-by-category${category.Url}`}>
            <MedicineTile image={category.image} name={category.name} />
          </Link>
        ))}
      </div>
    </section>
  );
}
