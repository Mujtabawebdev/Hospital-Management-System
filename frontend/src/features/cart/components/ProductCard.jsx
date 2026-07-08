import React from "react";
import { Button, Card } from "../../../shared/components/ui";

const ProductCard = ({ order }) => {
  const { productImage, productName, size, price, status, date, isDelivered } =
    order;
  return (
    <Card className="rounded-lg p-6 mb-5 flex items-start shadow-none">
      <div className="flex-shrink-0">
        <img
          src={productImage}
          alt="Product"
          className="w-24 h-24 object-cover rounded "
        />
      </div>
      <div className="ml-4 flex-grow">
        <h3 className="text-lg font-semibold">{productName}</h3>
        <p className="text-gray-600 mr-10">size : {size}</p>
      </div>
      <p className="text-gray-600 mr-60 ">₹{price}</p>
      <div className="text-right">
        <p
          className={`font-semibold ${
            isDelivered ? "text-green-500" : "text-red-500"
          }`}
        >
          {status} on {date}
        </p>
        <p className="text-gray-600">
          {isDelivered
            ? "Your item has been delivered"
            : "Your item has been cancelled"}
        </p>
        {isDelivered && (
          <Button variant="blue" size="sm" className="mt-2">
            Rate & Review Product
          </Button>
        )}
      </div>
    </Card>
  );
};

export default ProductCard;
