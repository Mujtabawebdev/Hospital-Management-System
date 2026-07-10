import LoginPage from "../pages/LoginPage.jsx";
import DoctorSignupPage from "../pages/DoctorSignupPage.jsx";
import ProfilePage from "../pages/ProfilePage.jsx";
import SignupPage from "../pages/SignupPage.jsx";
import VerifyEmailPage from "../pages/VerifyEmailPage.jsx";
import ForgotPasswordPage from "../pages/ForgotPasswordPage.jsx";
import ResetPasswordPage from "../pages/ResetPasswordPage.jsx";

export const authRoutes = [
  { path: "/forgot-password", element: <ForgotPasswordPage /> },
  { path: "/reset-password", element: <ResetPasswordPage /> },
  { path: "/verify-email", element: <VerifyEmailPage /> },
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
