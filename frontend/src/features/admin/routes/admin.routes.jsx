import AdminAddDoctorPage from "../pages/AdminAddDoctorPage.jsx";
import AdminAppointmentsPage from "../pages/AdminAppointmentsPage.jsx";
import AdminDashboardPage from "../pages/AdminDashboardPage.jsx";
import AdminMessagesPage from "../pages/AdminMessagesPage.jsx";
import AdminMedicinesPage from "../pages/AdminMedicinesPage.jsx";
import AdminSettingsPage from "../pages/AdminSettingsPage.jsx";

export const adminRoutes = [
  {
    path: "/admin",
    element: <AdminDashboardPage />,
  },
  {
    path: "/admin/medicines",
    element: <AdminMedicinesPage />,
  },
  {
    path: "/admin/doctors/new",
    element: <AdminAddDoctorPage />,
  },
  {
    path: "/admin/appointments",
    element: <AdminAppointmentsPage />,
  },
  {
    path: "/admin/messages",
    element: <AdminMessagesPage />,
  },
  {
    path: "/admin/settings",
    element: <AdminSettingsPage />,
  },
];
