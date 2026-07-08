import MedicinesPage from "../pages/MedicinesPage.jsx";
import ProductsByCategory from "../pages/ProductsByCategory.jsx";
import SingleMedicine from "../pages/SingleMedicine.jsx";

export const medicinesRoutes = [
  {
    path: "/medicines",
    element: <MedicinesPage />,
  },
  {
    path: "/medicines/shop_by_category/:id",
    element: <ProductsByCategory />,
  },
  {
    path: "/buy-medicines/:id",
    element: <SingleMedicine />,
  },
];
