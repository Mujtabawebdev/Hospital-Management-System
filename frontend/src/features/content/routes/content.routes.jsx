import AboutUsPage from "../pages/AboutUsPage.jsx";
import ContactPage from "../pages/ContactPage.jsx";
import ErrorPage from "../pages/ErrorPage.jsx";
import FaqsPage from "../pages/FaqsPage.jsx";
import PrivacyPolicyPage from "../pages/PrivacyPolicyPage.jsx";
import TermsAndConditionsPage from "../pages/TermsAndConditionsPage.jsx";

export const contentRoutes = [
  {
    path: "/faqs",
    element: <FaqsPage />,
  },
  {
    path: "/aboutus",
    element: <AboutUsPage />,
  },
  {
    path: "/contact",
    element: <ContactPage />,
  },
  {
    path: "/privacypolicy",
    element: <PrivacyPolicyPage />,
  },
  {
    path: "/termsandconditions",
    element: <TermsAndConditionsPage />,
  },
  {
    path: "/*",
    element: <ErrorPage />,
  },
];
