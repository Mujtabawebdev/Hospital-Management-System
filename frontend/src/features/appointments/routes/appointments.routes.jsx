import Appointment from "../pages/Appointment.jsx";
import BookAppointmentPage from "../pages/BookAppointmentPage.jsx";
import MyAppointmentsPage from "../pages/MyAppointmentsPage.jsx";
import PatientDoctorsPage from "../pages/PatientDoctorsPage.jsx";
import PatientProfilePage from "../pages/PatientProfilePage.jsx";
import ProtectedRoute from "../../../shared/components/ProtectedRoute.jsx";

const patientOnly = (page) => <ProtectedRoute roles={["Patient"]}>{page}</ProtectedRoute>;

export const appointmentsRoutes = [
  {
    path: "/appointment",
    element: <Appointment />,
  },
  {
    path: "/appointment/book/:doctorId",
    element: patientOnly(<BookAppointmentPage />),
  },
  {
    path: "/appointments",
    element: patientOnly(<MyAppointmentsPage />),
  },
  {
    path: "/patient/dashboard",
    element: patientOnly(<MyAppointmentsPage />),
  },
  {
    path: "/patient/appointments",
    element: patientOnly(<MyAppointmentsPage />),
  },
  {
    path: "/patient/doctors",
    element: patientOnly(<PatientDoctorsPage />),
  },
  {
    path: "/patient/profile",
    element: patientOnly(<PatientProfilePage />),
  },
];
