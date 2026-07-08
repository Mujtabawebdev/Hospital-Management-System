import AddtoCart from "../pages/AddtoCart.jsx";
import OrderHistoryPage from "../pages/OrderHistoryPage.jsx";

export const cartRoutes = [
  {
    path: "/medicines/cart",
    element: <AddtoCart />,
  },
  {
    path: "/medicine-cart",
    element: <AddtoCart />,
  },
  {
    path: "/medicines/order_history",
    element: <OrderHistoryPage />,
  },
];
