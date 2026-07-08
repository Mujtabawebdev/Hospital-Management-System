import SpecialitiesPage from "../pages/SpecialitiesPage.jsx";
import DoctorsBySpecialityPage from "../pages/DoctorsBySpecialityPage.jsx";

export const specialitiesRoutes = [
  {
    path: "/specialities",
    element: <SpecialitiesPage />,
  },
  {
    path: "/specialties/:name",
    element: <DoctorsBySpecialityPage />,
  },
];
