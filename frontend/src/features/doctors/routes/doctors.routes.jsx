import AllDoctorsPage from "../pages/AllDoctorsPage.jsx";
import DoctorAppointmentsPage from "../pages/DoctorAppointmentsPage.jsx";
import DoctorAvailabilityPage from "../pages/DoctorAvailabilityPage.jsx";
import DoctorDashboardPage from "../pages/DoctorDashboardPage.jsx";
import DoctorDashboardLayout from "../components/DoctorDashboardLayout.jsx";
import ProfilePage from "../../auth/pages/ProfilePage.jsx";
import ProtectedRoute from "../../../shared/components/ProtectedRoute.jsx";

export const doctorsRoutes = [
  {
    path: "/alldoctors",
    element: <AllDoctorsPage />,
  },
  {
    path: "/doctor",
    element: <ProtectedRoute roles={["Doctor"]}><DoctorDashboardLayout /></ProtectedRoute>,
    children: [
      {
        path: "dashboard",
        element: <DoctorDashboardPage />,
      },
      {
        path: "appointments",
        element: <DoctorAppointmentsPage />,
      },
      {
        path: "availability",
        element: <DoctorAvailabilityPage />,
      },
      {
        path: "profile",
        element: <ProfilePage />,
      },
    ],
  },
];
