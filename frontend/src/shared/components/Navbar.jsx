import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { LogOut, Menu, Plus, UserRound, X } from "lucide-react";
import { Context } from "../context/AppContext";
import { logoutCurrentUser } from "../../features/auth/api/authApi.js";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/specialities", label: "Services" },
  { to: "/alldoctors", label: "Doctors" },
  { to: "/medicines", label: "Marketplace" },
  { to: "/medicines", label: "Medicines" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

function Navbar() {
  const { isAuthenticated, setIsAuthenticated, setUser, user } = useContext(Context);
  const navigate = useNavigate();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAccountOpen, setAccountOpen] = useState(false);

  const profilePath =
    user?.role === "Admin"
      ? "/admin/profile"
      : user?.role === "Doctor"
      ? "/doctor/profile"
      : "/patient/profile";

  const handleLogOut = async () => {
    try {
      await logoutCurrentUser(user?.role);
    } catch (error) {
      console.error("Logout request failed", error);
    }

    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    setUser({});
    setAccountOpen(false);
    setMobileMenuOpen(false);
    navigate("/login");
  };

  const linkClass = ({ isActive }) =>
    `relative px-1 py-2 text-sm font-semibold transition ${
      isActive ? "text-[#2563eb] after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:rounded-full after:bg-[#2563eb]" : "text-[#0f1f44]/80 hover:text-[#2563eb]"
    }`;

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 bg-white/80 px-4 py-3 backdrop-blur-xl">
      <nav className="mx-auto flex h-[72px] max-w-7xl items-center justify-between rounded-2xl border border-slate-200 bg-white px-5 shadow-lg shadow-slate-200/70 md:px-7">
        <NavLink to="/" className="flex items-center gap-3" onClick={closeMobileMenu}>
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-sky-400 to-[#2563eb] text-white shadow-md shadow-blue-200">
            <Plus className="h-7 w-7" strokeWidth={3} aria-hidden="true" />
          </span>
          <span className="text-2xl font-black tracking-tight text-[#0f1f44]">
            Medi<span className="text-[#2563eb]">Hub</span>
          </span>
        </NavLink>

        <div className="hidden items-center gap-10 lg:flex">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} className={linkClass}>
              {item.label}
            </NavLink>
          ))}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          {isAuthenticated ? (
            <div className="relative">
              <button
                type="button"
                onClick={() => setAccountOpen((current) => !current)}
                className="inline-flex items-center gap-2 rounded-xl bg-[#2563eb] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:bg-blue-700"
              >
                <UserRound className="h-4 w-4" aria-hidden="true" />
                Account
              </button>
              {isAccountOpen && (
                <div className="absolute right-0 mt-3 w-52 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl">
                  <NavLink
                    to={profilePath}
                    className="block px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-blue-50"
                    onClick={() => setAccountOpen(false)}
                  >
                    My Profile
                  </NavLink>
                  <button
                    type="button"
                    onClick={handleLogOut}
                    className="flex w-full items-center gap-2 px-4 py-3 text-left text-sm font-semibold text-slate-700 hover:bg-blue-50"
                  >
                    <LogOut className="h-4 w-4" aria-hidden="true" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <NavLink
              to="/login"
              className="inline-flex items-center gap-2 rounded-xl bg-[#2563eb] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:bg-blue-700"
            >
              <UserRound className="h-4 w-4" aria-hidden="true" />
              Login
            </NavLink>
          )}
        </div>

        <button
          type="button"
          className="inline-flex rounded-xl border border-slate-200 p-2 text-[#0f1f44] lg:hidden"
          onClick={() => setMobileMenuOpen((current) => !current)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {isMobileMenuOpen && (
        <div className="mx-auto mt-3 max-w-7xl rounded-2xl border border-slate-200 bg-white p-4 shadow-xl lg:hidden">
          <div className="grid gap-2">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `rounded-xl px-4 py-3 text-sm font-semibold ${isActive ? "bg-blue-50 text-[#2563eb]" : "text-[#0f1f44] hover:bg-slate-50"}`
                }
                onClick={closeMobileMenu}
              >
                {item.label}
              </NavLink>
            ))}
            {isAuthenticated ? (
              <>
                <NavLink
                  to={profilePath}
                  className="rounded-xl px-4 py-3 text-sm font-semibold text-[#0f1f44] hover:bg-slate-50"
                  onClick={closeMobileMenu}
                >
                  My Profile
                </NavLink>
                <button
                  type="button"
                  onClick={handleLogOut}
                  className="rounded-xl bg-[#2563eb] px-4 py-3 text-left text-sm font-semibold text-white"
                >
                  Logout
                </button>
              </>
            ) : (
              <NavLink
                to="/login"
                className="rounded-xl bg-[#2563eb] px-4 py-3 text-sm font-semibold text-white"
                onClick={closeMobileMenu}
              >
                Login
              </NavLink>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
