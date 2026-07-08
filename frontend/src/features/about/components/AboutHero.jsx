import React from "react";
import {
  Activity,
  ArrowRight,
  Bell,
  CalendarDays,
  CheckCircle2,
  DollarSign,
  Hospital,
  ShieldCheck,
  Stethoscope,
  Users,
} from "lucide-react";
import { Button } from "../../../shared/components/ui";

const metrics = [
  { label: "Patients", value: "500+", icon: Users, color: "bg-blue-100 text-blue-600" },
  { label: "Appointments", value: "120+", icon: CalendarDays, color: "bg-blue-100 text-blue-600" },
  { label: "Doctors", value: "50+", icon: Stethoscope, color: "bg-blue-100 text-blue-700" },
  { label: "Revenue", value: "$48,750", icon: DollarSign, color: "bg-blue-100 text-blue-600" },
];

const patients = ["John Smith", "Maria Garcia", "Robert Brown", "Linda Wilson"];

function AboutHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-white via-[#eff6ff] to-blue-100/70 px-4 py-14 md:py-20">
      <div className="absolute left-8 top-28 hidden text-6xl font-black text-blue-200/70 md:block">+</div>
      <div className="absolute bottom-10 left-0 hidden h-36 w-36 rounded-full bg-[radial-gradient(circle,#bfdbfe_2px,transparent_2px)] [background-size:16px_16px] md:block" />
      <div className="absolute right-16 top-28 hidden h-24 w-24 rounded-full bg-blue-200/30 blur-2xl md:block" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[0.92fr_1.08fr]">
        <div>
          <div className="inline-flex items-center gap-2 rounded-xl border border-blue-100 bg-white/80 px-4 py-2 text-sm font-semibold text-blue-600 shadow-sm">
            <ShieldCheck className="h-4 w-4" aria-hidden="true" />
            About MediHub
          </div>
          <h1 className="mt-6 max-w-3xl text-4xl font-black leading-tight text-[#0f1f44] md:text-6xl">
            Smart Healthcare Management for Modern Hospitals
          </h1>
          <p className="mt-5 max-w-xl text-base leading-8 text-slate-600 md:text-lg">
            MediHub helps hospitals manage patients, doctors, appointments, billing, and medical records from one secure platform.
          </p>
          <Button className="mt-7 gap-2 rounded-xl bg-[#2563eb] px-7 py-4 text-base shadow-lg shadow-blue-500/20 hover:bg-blue-700">
            Explore MediHub
            <ArrowRight className="h-5 w-5" aria-hidden="true" />
          </Button>
        </div>

        <div className="relative min-h-[520px]">
          <div className="absolute left-2 top-10 hidden h-80 w-72 rounded-[2rem] border border-blue-100 bg-white/70 shadow-xl shadow-blue-100/70 md:block">
            <div className="mx-auto mt-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 text-white">
              <Hospital className="h-9 w-9" aria-hidden="true" />
            </div>
            <div className="mt-8 space-y-3 px-7">
              <div className="h-3 rounded-full bg-blue-100" />
              <div className="h-3 w-4/5 rounded-full bg-blue-100" />
              <div className="h-3 w-2/3 rounded-full bg-blue-100" />
            </div>
          </div>

          <div className="absolute left-8 top-4 hidden h-[410px] w-72 overflow-hidden rounded-[2.2rem] bg-gradient-to-br from-blue-50 to-white shadow-2xl shadow-blue-200/60 lg:block">
            <div className="absolute bottom-0 left-12 h-72 w-44 rounded-t-[4rem] bg-white shadow-xl" />
            <div className="absolute left-20 top-24 h-20 w-20 rounded-full bg-gradient-to-br from-slate-200 to-slate-300" />
            <div className="absolute left-16 top-44 h-48 w-32 rounded-t-[3rem] bg-blue-600" />
            <div className="absolute left-8 top-48 h-44 w-28 rotate-6 rounded-t-[3rem] bg-white shadow-lg" />
            <div className="absolute left-28 top-48 h-44 w-28 -rotate-6 rounded-t-[3rem] bg-white shadow-lg" />
            <div className="absolute left-36 top-64 h-24 w-20 rounded-xl border border-slate-200 bg-slate-50 shadow-lg" />
            <Stethoscope className="absolute left-16 top-56 h-12 w-12 text-slate-500" aria-hidden="true" />
          </div>

          <div className="relative ml-auto w-full max-w-2xl rounded-[1.6rem] border border-slate-200 bg-white p-4 shadow-2xl shadow-blue-200/60 md:p-6 lg:mt-8">
            <div className="grid gap-4 md:grid-cols-[150px_1fr]">
              <aside className="hidden border-r border-slate-100 pr-4 md:block">
                <p className="mb-6 text-xs font-black text-blue-600">MediHub</p>
                {["Dashboard", "Patients", "Appointments", "Doctors", "Billing", "Reports", "Settings"].map((item, index) => (
                  <div
                    key={item}
                    className={`mb-2 flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold ${
                      index === 0 ? "bg-blue-50 text-blue-600" : "text-slate-500"
                    }`}
                  >
                    <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                    {item}
                  </div>
                ))}
              </aside>

              <div>
                <div className="mb-5 flex items-center justify-between gap-4">
                  <h2 className="text-lg font-black text-[#0f1f44]">Dashboard</h2>
                  <div className="flex items-center gap-3">
                    <div className="hidden h-9 w-48 rounded-full border border-slate-200 bg-slate-50 px-4 text-xs text-slate-400 md:flex md:items-center">
                      Search anything...
                    </div>
                    <Bell className="h-5 w-5 text-slate-400" aria-hidden="true" />
                    <div className="h-9 w-9 rounded-full bg-gradient-to-br from-blue-200 to-white" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
                  {metrics.map((item) => (
                    <div key={item.label} className="rounded-xl border border-slate-100 bg-white p-3 shadow-sm">
                      <p className="text-xs font-semibold text-slate-500">{item.label}</p>
                      <p className="mt-2 text-lg font-black text-[#0f1f44]">{item.value}</p>
                      <div className={`mt-3 flex h-9 w-9 items-center justify-center rounded-full ${item.color}`}>
                        <item.icon className="h-5 w-5" aria-hidden="true" />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
                  <div className="rounded-xl border border-slate-100 bg-white p-4 shadow-sm">
                    <p className="mb-4 text-sm font-black text-[#0f1f44]">Appointments Overview</p>
                    <div className="relative h-40">
                      <div className="absolute inset-0 grid grid-rows-4">
                        {Array.from({ length: 4 }).map((_, index) => (
                          <div key={index} className="border-t border-slate-100" />
                        ))}
                      </div>
                      <svg viewBox="0 0 260 140" className="relative h-full w-full">
                        <polyline
                          points="0,108 35,90 70,72 105,100 140,62 175,82 210,54 260,30"
                          fill="none"
                          stroke="#2563eb"
                          strokeWidth="4"
                          strokeLinecap="round"
                        />
                        <polyline
                          points="0,118 35,104 70,96 105,112 140,86 175,96 210,74 260,62"
                          fill="none"
                          stroke="#cbd5e1"
                          strokeWidth="4"
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>
                  </div>

                  <div className="rounded-xl border border-slate-100 bg-white p-4 shadow-sm">
                    <div className="mb-3 flex items-center justify-between">
                      <p className="text-sm font-black text-[#0f1f44]">Recent Patients</p>
                      <span className="text-xs font-semibold text-blue-600">View all</span>
                    </div>
                    <div className="space-y-3">
                      {patients.map((patient, index) => (
                        <div key={patient} className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-slate-200 to-blue-100" />
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-xs font-black text-slate-800">{patient}</p>
                            <p className="text-[10px] text-slate-400">MRN #{String(index + 1001).padStart(4, "0")}</p>
                          </div>
                          <span className={`h-2 w-2 rounded-full ${index === 2 ? "bg-blue-300" : "bg-blue-500"}`} />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-2 rounded-xl bg-blue-50 p-3 text-sm font-semibold text-blue-700">
                  <Activity className="h-5 w-5" aria-hidden="true" />
                  Live hospital operations in one secure view
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutHero;
