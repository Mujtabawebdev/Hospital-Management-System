import React from "react";
import { NavLink } from "react-router-dom";

function AdminSidebar() {
  return (
    <aside className="border-r border-slate-200 bg-white p-4 md:min-h-screen md:w-64">
      <div className="mb-6">
        <NavLink to="/" className="block text-xl font-black text-main_theme hover:text-dark_theme">
          Medicare Hub
        </NavLink>
        <p className="mt-1 text-sm font-semibold text-slate-500">Admin Panel</p>
      </div>
      <nav className="flex gap-2 md:flex-col">
        <NavLink
          to="/admin"
          end
          className={({ isActive }) =>
            `rounded-md px-3 py-2 text-sm font-bold ${
              isActive
                ? "bg-main_theme text-white"
                : "text-slate-600 hover:bg-light_theme hover:text-dark_theme"
            }`
          }
        >
          Doctors
        </NavLink>
        <NavLink
          to="/admin/doctors/new"
          className={({ isActive }) =>
            `rounded-md px-3 py-2 text-sm font-bold ${
              isActive
                ? "bg-main_theme text-white"
                : "text-slate-600 hover:bg-light_theme hover:text-dark_theme"
            }`
          }
        >
          Add Doctor
        </NavLink>
        <NavLink
          to="/admin/appointments"
          className={({ isActive }) =>
            `rounded-md px-3 py-2 text-sm font-bold ${
              isActive
                ? "bg-main_theme text-white"
                : "text-slate-600 hover:bg-light_theme hover:text-dark_theme"
            }`
          }
        >
          Appointments
        </NavLink>
        <NavLink
          to="/admin/medicines"
          className={({ isActive }) =>
            `rounded-md px-3 py-2 text-sm font-bold ${
              isActive
                ? "bg-main_theme text-white"
                : "text-slate-600 hover:bg-light_theme hover:text-dark_theme"
            }`
          }
        >
          Products
        </NavLink>
        <NavLink
          to="/admin/messages"
          className={({ isActive }) =>
            `rounded-md px-3 py-2 text-sm font-bold ${
              isActive
                ? "bg-main_theme text-white"
                : "text-slate-600 hover:bg-light_theme hover:text-dark_theme"
            }`
          }
        >
          Messages
        </NavLink>
        <NavLink
          to="/admin/profile"
          className={({ isActive }) =>
            `rounded-md px-3 py-2 text-sm font-bold ${
              isActive
                ? "bg-main_theme text-white"
                : "text-slate-600 hover:bg-light_theme hover:text-dark_theme"
            }`
          }
        >
          Profile
        </NavLink>
        <NavLink
          to="/admin/settings"
          className={({ isActive }) =>
            `rounded-md px-3 py-2 text-sm font-bold ${
              isActive
                ? "bg-main_theme text-white"
                : "text-slate-600 hover:bg-light_theme hover:text-dark_theme"
            }`
          }
        >
          Settings
        </NavLink>
      </nav>
    </aside>
  );
}

export default AdminSidebar;
