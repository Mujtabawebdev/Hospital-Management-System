import React from "react";
import { NavLink } from "react-router-dom";

function Footer() {
  const navLinks = [
    {
      path: "/",
      display: "Home",
    },
    {
      path: "/about",
      display: "About Us",
    },
    {
      path: "/privacypolicy",
      display: "Privacy Policy",
    },
    {
      path: "/termsandconditions",
      display: "Terms and Conditions",
    },
  ];

  return (
    <div className="w-full border-t border-blue-100 bg-gradient-to-br from-blue-50 via-white to-blue-100 text-center">
      <div className="mx-auto flex max-w-screen-2xl flex-col items-center justify-center space-y-9 px-3 pt-8">
        <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-12">
          <div className="cols-span-1 text-left md:col-span-4">
            <h1 className="mb-6 text-lg font-black text-dark_theme lg:text-xl">
              Medicare Hub
            </h1>
            <p className="text-md font-medium leading-7 text-slate-600 lg:text-lg">
              Medicare Hub is a web-based platform facilitating seamless management
              of healthcare services, including appointments, patient records,
              and doctor interactions.
            </p>
          </div>

          <div className="cols-span-1 md:col-span-3">
            <h1 className="mb-6 text-left text-lg font-black text-dark_theme md:text-center lg:text-xl">
              Quick Links
            </h1>
            <ul className="text-md flex flex-col justify-between gap-3 text-left font-semibold md:items-center md:gap-y-4">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <NavLink
                    to={link.path}
                    className="text-md relative cursor-pointer text-slate-600 before:absolute before:bottom-[-4px] before:left-0 before:block before:h-0.5 before:w-0 before:rounded-full before:bg-main_theme before:transition-all before:delay-150 before:ease-in-out hover:text-main_theme hover:before:w-full"
                  >
                    {link.display}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="w-full border-t border-blue-100 py-4">
          <p className="text-center text-sm font-medium text-slate-600 lg:text-[1rem]">
            © {new Date().getFullYear()} Mohit kumar. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
