import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ArrowLeft, CalendarDays, LayoutDashboard, Mail, Pill, Plus, Settings, Stethoscope, UserPlus, UserRoundCog } from "lucide-react";

const links = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/admin/doctors/new", label: "Add Doctor", icon: UserPlus },
  { to: "/admin/appointments", label: "Appointments", icon: CalendarDays },
  { to: "/admin/medicines", label: "Medicines", icon: Pill },
  { to: "/admin/messages", label: "Messages", icon: Mail },
  { to: "/admin/profile", label: "Profile", icon: UserRoundCog },
  { to: "/admin/settings", label: "Settings", icon: Settings },
];

function AdminSidebar() {
  const navigate = useNavigate();
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
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Admin Panel</p>
        </div>
      </div>
      <nav className="flex gap-2 overflow-x-auto md:flex-col md:overflow-visible">
        <button type="button" onClick={() => navigate(-1)} className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-black text-slate-600 hover:bg-light_theme"><ArrowLeft size={18} />Back</button>
        {links.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
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
        <Stethoscope className="mb-3 text-blue-600" size={24} />
        <p className="text-sm font-black text-[#0f1f44]">Hospital command center</p>
        <p className="mt-1 text-xs font-semibold text-slate-500">Approvals, bookings, medicines, and messages stay organized here.</p>
      </div>
    </aside>
  );
}

export default AdminSidebar;
