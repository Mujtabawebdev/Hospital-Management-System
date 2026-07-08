import React from "react";
import { NavLink } from "react-router-dom";
import { CalendarDays, HeartPulse, LayoutDashboard, Plus, Stethoscope, UserCircle } from "lucide-react";

const links = [
  { to: "/patient/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/appointments", label: "Appointments", icon: CalendarDays },
  { to: "/patient/doctors", label: "Doctors", icon: Stethoscope },
  { to: "/patient/profile", label: "Profile", icon: UserCircle },
];

function PatientSidebar() {
  return (
    <aside className="m-3 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm md:sticky md:top-3 md:h-[calc(100vh-24px)] md:w-72">
      <div className="mb-8 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 text-white shadow-lg shadow-blue-200">
          <Plus size={28} strokeWidth={3} />
        </div>
        <div>
          <NavLink to="/" className="block text-2xl font-black text-[#0f1f44] hover:text-main_theme">
            Medi<span className="text-main_theme">Hub</span>
          </NavLink>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Patient Panel</p>
        </div>
      </div>
      <nav className="flex gap-2 overflow-x-auto md:flex-col md:overflow-visible">
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-black transition ${
                isActive
                  ? "bg-main_theme text-white shadow-lg shadow-blue-100"
                  : "text-slate-600 hover:bg-light_theme hover:text-dark_theme"
              }`
            }
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </nav>
      <div className="mt-8 hidden rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-cyan-50 p-4 md:block">
        <HeartPulse className="mb-3 text-teal-600" size={24} />
        <p className="text-sm font-black text-[#0f1f44]">Your care hub</p>
        <p className="mt-1 text-xs font-semibold text-slate-500">Appointments and profile details in one secure place.</p>
      </div>
    </aside>
  );
}

export default PatientSidebar;
