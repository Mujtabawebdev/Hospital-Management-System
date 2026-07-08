import React from "react";
import { NavLink } from "react-router-dom";
// icons
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

function Footer() {
  const navLinks = [
    {
      path: "/",
      display: "Home",
    },
    {
      path: "/aboutus",
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
    <div className="bg-light_theme w-full  text-center">
      <div className="max-w-screen-2xl mx-auto flex flex-col items-center justify-center px-3 space-y-9 pt-8">
        {/* footer top */}
        <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Title */}
          <div className="cols-span-1 md:col-span-4 text-left">
            <h1 className="text-lg lg:text-xl font-bold text-black/80 mb-6">
              Medicare Hub
            </h1>
            {/* desc */}
            <p className="text-md lg:text-lg  text-black/70 font-medium">
              Medicare Hub is a web-based platform facilitating seamless management
              of healthcare services, including appointments, patient records,
              and doctor interactions.
            </p>
            {/* icons */}
            <div className="flex items-center gap-4 mt-10">
              <div className=" border border-white/70 rounded-full px-2 py-2 hover:bg-slate-700/30 cursor-pointer">
                <a
                  href="https://www.linkedin.com/in/itsmohit097/"
                  target="_blank"
                >
                  <FaInstagram />
                </a>
              </div>
              <div className=" border border-white/70 rounded-full px-2 py-2 hover:bg-slate-700/30 cursor-pointer">
                <a
                  href="https://www.linkedin.com/in/itsmohit097/"
                  target="_blank"
                >
                  <FaLinkedin />
                </a>
              </div>
              <div className=" border border-white/70 rounded-full px-2 py-2 hover:hover:bg-slate-700/30 cursor-pointer">
                <a
                  href="https://www.linkedin.com/in/itsmohit097/"
                  target="_blank"
                >
                  <FaXTwitter />
                </a>
              </div>
            </div>
          </div>
          {/* Quick links */}
          <div className="cols-span-1 md:col-span-3">
            <h1 className="text-lg text-left md:text-center lg:text-xl font-semibold mb-6">
              Quick Links
            </h1>
            <ul className="flex flex-col justify-between gap-3 md:items-center text-md font-semibold md:gap-y-4  text-left">
              {navLinks.map((link, index) => (
                <li key={index}>
                  <NavLink
                    to={link.path}
                    className="text-black/70 text-md relative cursor-pointer before:block before:absolute before:bottom-[-4px] before:left-0 before:w-0 before:h-0.5 before:rounded-full before:bg-main_theme before:transition-all before:delay-150 before:ease-in-out hover:before:w-full hover:text-black"
                  >
                    {link.display}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* footer bottom */}
        <div className="w-full py-4">
          {/* copyright */}
          <p className="text-sm lg:text-[1rem] font-medium text-center">
            © {new Date().getFullYear()} Mohit kumar. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
