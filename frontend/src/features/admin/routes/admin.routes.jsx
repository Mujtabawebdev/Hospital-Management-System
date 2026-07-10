import AdminAddDoctorPage from "../pages/AdminAddDoctorPage.jsx";
import AdminAppointmentsPage from "../pages/AdminAppointmentsPage.jsx";
import AdminDashboardPage from "../pages/AdminDashboardPage.jsx";
import AdminMessagesPage from "../pages/AdminMessagesPage.jsx";
import AdminMedicinesPage from "../pages/AdminMedicinesPage.jsx";
import AdminProfilePage from "../pages/AdminProfilePage.jsx";
import AdminSettingsPage from "../pages/AdminSettingsPage.jsx";
import AdminRoute from "../components/AdminRoute.jsx";

export const adminRoutes = [
  {
    path: "/admin",
    element: <AdminRoute><AdminDashboardPage /></AdminRoute>,
  },
  {
    path: "/admin/medicines",
    element: <AdminRoute><AdminMedicinesPage /></AdminRoute>,
  },
  {
    path: "/admin/doctors/new",
    element: <AdminRoute><AdminAddDoctorPage /></AdminRoute>,
  },
  {
    path: "/admin/appointments",
    element: <AdminRoute><AdminAppointmentsPage /></AdminRoute>,
  },
  {
    path: "/admin/messages",
    element: <AdminRoute><AdminMessagesPage /></AdminRoute>,
  },
  {
    path: "/admin/profile",
    element: <AdminRoute><AdminProfilePage /></AdminRoute>,
  },
  {
    path: "/admin/settings",
    element: <AdminRoute><AdminSettingsPage /></AdminRoute>,
  },
];
