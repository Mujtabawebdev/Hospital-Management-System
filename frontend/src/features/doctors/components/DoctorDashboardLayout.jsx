import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { CalendarDays, LayoutDashboard, Users } from "lucide-react";

const links = [
  { to: "/doctor/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/doctor/appointments", label: "Appointments", icon: Users },
  { to: "/doctor/availability", label: "Availability", icon: CalendarDays },
];

function DoctorDashboardLayout() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 md:flex">
      <aside className="border-r border-slate-200 bg-white p-4 md:min-h-screen md:w-64">
        <h2 className="mb-6 text-xl font-black text-main_theme">Doctor Panel</h2>
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
      <main className="flex-1 p-4 md:p-8">
        <Outlet />
      </main>
    </div>
  );
}

export default DoctorDashboardLayout;
