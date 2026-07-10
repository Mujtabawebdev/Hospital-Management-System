import AddtoCart from "../pages/AddtoCart.jsx";
import OrderHistoryPage from "../pages/OrderHistoryPage.jsx";
import ProtectedRoute from "../../../shared/components/ProtectedRoute.jsx";

const patientOnly = (page) => <ProtectedRoute roles={["Patient"]}>{page}</ProtectedRoute>;

export const cartRoutes = [
  {
    path: "/medicines/cart",
    element: patientOnly(<AddtoCart />),
  },
  {
    path: "/medicine-cart",
    element: patientOnly(<AddtoCart />),
  },
  {
    path: "/medicines/order_history",
    element: patientOnly(<OrderHistoryPage />),
  },
];
