import AllDoctorsPage from "../pages/AllDoctorsPage.jsx";
import DoctorAppointmentsPage from "../pages/DoctorAppointmentsPage.jsx";
import DoctorAvailabilityPage from "../pages/DoctorAvailabilityPage.jsx";
import DoctorDashboardPage from "../pages/DoctorDashboardPage.jsx";
import DoctorDashboardLayout from "../components/DoctorDashboardLayout.jsx";

export const doctorsRoutes = [
  {
    path: "/alldoctors",
    element: <AllDoctorsPage />,
  },
  {
    path: "/doctor",
    element: <DoctorDashboardLayout />,
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
    ],
  },
];
