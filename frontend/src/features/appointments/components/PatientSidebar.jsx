import React from "react";
import { NavLink } from "react-router-dom";
import { CalendarDays, UserCircle } from "lucide-react";

const links = [
  { to: "/appointments", label: "Appointments", icon: CalendarDays },
  { to: "/patient/profile", label: "Profile", icon: UserCircle },
];

function PatientSidebar() {
  return (
    <aside className="border-r border-slate-200 bg-white p-4 md:min-h-screen md:w-64">
      <div className="mb-6">
        <NavLink to="/" className="block text-xl font-black text-main_theme hover:text-dark_theme">
          Medicare Hub
        </NavLink>
        <p className="mt-1 text-sm font-semibold text-slate-500">Patient Panel</p>
      </div>
      <nav className="flex gap-2 md:flex-col">
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-md px-3 py-2 text-sm font-bold ${
                isActive
                  ? "bg-main_theme text-white"
                  : "text-slate-600 hover:bg-light_theme hover:text-dark_theme"
              }`
            }
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

export default PatientSidebar;
