import { adminRoutes } from "../features/admin/routes/admin.routes.jsx";
import { appointmentsRoutes } from "../features/appointments/routes/appointments.routes.jsx";
import { authRoutes } from "../features/auth/routes/auth.routes.jsx";
import { cartRoutes } from "../features/cart/routes/cart.routes.jsx";
import { contentRoutes } from "../features/content/routes/content.routes.jsx";
import { doctorsRoutes } from "../features/doctors/routes/doctors.routes.jsx";
import { homeRoutes } from "../features/home/routes/home.routes.jsx";
import { medicinesRoutes } from "../features/medicines/routes/medicines.routes.jsx";
import { specialitiesRoutes } from "../features/specialities/routes/specialities.routes.jsx";

export const appRoutes = [
  ...homeRoutes,
  ...adminRoutes,
  ...doctorsRoutes,
  ...appointmentsRoutes,
  ...specialitiesRoutes,
  ...medicinesRoutes,
  ...cartRoutes,
  ...authRoutes,
  ...contentRoutes,
];
