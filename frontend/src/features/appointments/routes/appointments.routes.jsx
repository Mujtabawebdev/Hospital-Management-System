import Appointment from "../pages/Appointment.jsx";
import BookAppointmentPage from "../pages/BookAppointmentPage.jsx";
import MyAppointmentsPage from "../pages/MyAppointmentsPage.jsx";
import PatientDoctorsPage from "../pages/PatientDoctorsPage.jsx";
import PatientProfilePage from "../pages/PatientProfilePage.jsx";

export const appointmentsRoutes = [
  {
    path: "/appointment",
    element: <Appointment />,
  },
  {
    path: "/appointment/book/:doctorId",
    element: <BookAppointmentPage />,
  },
  {
    path: "/appointments",
    element: <MyAppointmentsPage />,
  },
  {
    path: "/patient/dashboard",
    element: <MyAppointmentsPage />,
  },
  {
    path: "/patient/appointments",
    element: <MyAppointmentsPage />,
  },
  {
    path: "/patient/doctors",
    element: <PatientDoctorsPage />,
  },
  {
    path: "/patient/profile",
    element: <PatientProfilePage />,
  },
];
