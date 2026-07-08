import LoginPage from "../pages/LoginPage.jsx";
import DoctorSignupPage from "../pages/DoctorSignupPage.jsx";
import ProfilePage from "../pages/ProfilePage.jsx";
import SignupPage from "../pages/SignupPage.jsx";

export const authRoutes = [
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    path: "/doctor/signup",
    element: <DoctorSignupPage />,
  },
  {
    path: "/profile",
    element: <ProfilePage />,
  },
];
