import React from "react";
import { Activity, CalendarCheck, Stethoscope, Users } from "lucide-react";

const stats = [
  { value: "500+", label: "Patients Managed", icon: Users },
  { value: "50+", label: "Expert Doctors", icon: Stethoscope },
  { value: "10K+", label: "Appointments", icon: CalendarCheck },
  { value: "99%", label: "System Uptime", icon: Activity },
];

function HomeStats() {
  return (
    <section className="bg-white px-4 py-8">
      <div className="mx-auto grid max-w-7xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg shadow-slate-200/60 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <div key={stat.label} className={`flex items-center justify-center gap-5 p-7 ${index !== stats.length - 1 ? "lg:border-r lg:border-slate-200" : ""}`}>
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600">
              <stat.icon className="h-8 w-8" aria-hidden="true" />
            </div>
            <div>
              <p className="text-3xl font-black text-[#0f1f44]">{stat.value}</p>
              <p className="mt-1 text-sm font-medium text-slate-600">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default HomeStats;
