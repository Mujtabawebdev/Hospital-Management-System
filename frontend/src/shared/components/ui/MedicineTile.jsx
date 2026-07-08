import React from "react";
import Card from "./Card.jsx";
import { cn } from "../../utils/classNames.js";

function MedicineTile({
  image,
  name,
  price,
  description,
  className = "",
  imageClassName = "",
}) {
  return (
    <Card
      className={cn(
        "w-[127px] h-[137px] md:w-[157px] md:h-[167px] xl:w-[177px] xl:h-[207px] flex flex-col items-center justify-center overflow-hidden shadow-none",
        className,
      )}
    >
      <div className="relative w-full h-full overflow-hidden">
        <img
          src={image}
          alt={name}
          className={cn(
            "w-full h-full object-center object-fill mix-blend-multiply transition duration-300 ease-in-out shadow-sm transform hover:scale-105 hover:shadow-md",
            imageClassName,
          )}
          loading="lazy"
        />
      </div>
      <h2 className="sm:text-base md:text-lg lg:text-xl text-dark_theme font-medium text-center mt-3 mb-2">
        {name}
      </h2>
      {price && <p className="text-sm text-gray-600 mt-1">{price}</p>}
      {description && <p className="text-sm mt-1 text-center">{description}</p>}
    </Card>
  );
}

export default MedicineTile;
