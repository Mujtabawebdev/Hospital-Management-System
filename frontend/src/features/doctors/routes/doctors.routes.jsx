import AllDoctorsPage from "../pages/AllDoctorsPage.jsx";
import DoctorAppointmentsPage from "../pages/DoctorAppointmentsPage.jsx";
import DoctorAvailabilityPage from "../pages/DoctorAvailabilityPage.jsx";
import DoctorDashboardPage from "../pages/DoctorDashboardPage.jsx";
import DoctorDashboardLayout from "../components/DoctorDashboardLayout.jsx";
import ProfilePage from "../../auth/pages/ProfilePage.jsx";
import ProtectedRoute from "../../../shared/components/ProtectedRoute.jsx";

const approvedDoctor = (page) => <ProtectedRoute roles={["Doctor"]} statuses={["Approved"]}>{page}</ProtectedRoute>;

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
        element: approvedDoctor(<DoctorDashboardPage />),
      },
      {
        path: "appointments",
        element: approvedDoctor(<DoctorAppointmentsPage />),
      },
      {
        path: "availability",
        element: approvedDoctor(<DoctorAvailabilityPage />),
      },
      {
        path: "profile",
        element: <ProfilePage />,
      },
    ],
  },
];
