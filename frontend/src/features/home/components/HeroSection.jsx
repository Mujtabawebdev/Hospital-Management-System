import React from "react";
import { ArrowRight, CalendarDays, CheckCircle2, FileHeart, Plus, ShieldCheck, Star, Stethoscope, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../../../shared/components/ui";

const metrics = [
  { label: "Patients", value: "500+", icon: Users },
  { label: "Appointments", value: "120+", icon: CalendarDays },
  { label: "Doctors", value: "50+", icon: Stethoscope },
];

const patients = ["Ayesha", "Bilal", "Sara", "Hamza"];

function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-white via-blue-50 to-blue-100 px-4 py-14 md:py-20">
      <div className="absolute left-8 top-28 hidden h-32 w-32 rounded-full bg-[radial-gradient(circle,#bfdbfe_2px,transparent_2px)] [background-size:16px_16px] md:block" />
      <Plus className="absolute left-24 top-1/2 hidden h-10 w-10 text-blue-200 md:block" strokeWidth={4} aria-hidden="true" />
      <Plus className="absolute right-20 top-24 hidden h-9 w-9 text-blue-200 md:block" strokeWidth={4} aria-hidden="true" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[0.92fr_1.08fr]">
        <div>
          <div className="inline-flex items-center gap-2 rounded-xl border border-blue-100 bg-white/80 px-4 py-2 text-sm font-semibold text-blue-600 shadow-sm">
            <ShieldCheck className="h-4 w-4" aria-hidden="true" />
            Trusted by Hospitals, Loved by Patients
          </div>
          <h1 className="mt-6 max-w-3xl text-4xl font-black leading-tight text-[#0f1f44] md:text-6xl">
            Smart Healthcare Management for <span className="text-[#2563eb]">Modern Hospitals</span>
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600 md:text-lg">
            MediHub helps hospitals manage patients, doctors, appointments, billing, and medical records from one secure platform.
          </p>

          <div className="mt-7 flex flex-col gap-4 sm:flex-row">
            <Link to="/appointment">
              <Button className="w-full gap-2 rounded-xl bg-[#2563eb] px-7 py-4 text-base shadow-lg shadow-blue-500/20 hover:bg-blue-700 sm:w-auto">
                <CalendarDays className="h-5 w-5" aria-hidden="true" />
                Book Appointment
              </Button>
            </Link>
            <Link to="/specialities">
              <Button variant="secondary" className="w-full gap-2 rounded-xl border-blue-600 px-7 py-4 text-base text-blue-600 hover:bg-blue-50 sm:w-auto">
                Explore Services
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </Button>
            </Link>
          </div>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="flex -space-x-3">
              {Array.from({ length: 4 }).map((_, index) => (
                <span key={index} className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-white bg-gradient-to-br from-blue-100 to-blue-300 text-sm font-black text-blue-700">
                  {index + 1}
                </span>
              ))}
            </div>
            <div>
              <div className="flex text-blue-500">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star key={index} className="h-5 w-5 fill-current" aria-hidden="true" />
                ))}
              </div>
              <p className="mt-1 text-sm font-semibold text-slate-600">Trusted by 500+ Hospitals</p>
            </div>
          </div>
        </div>

        <div className="relative min-h-[560px]">
          <div className="absolute right-8 top-4 hidden h-80 w-80 rounded-[2.5rem] border border-blue-100 bg-blue-50/80 md:block">
            <div className="absolute left-12 top-14 grid grid-cols-3 gap-3">
              {Array.from({ length: 9 }).map((_, index) => (
                <span key={index} className="h-8 w-8 rounded-md bg-blue-200/70" />
              ))}
            </div>
            <div className="absolute left-24 top-28 flex h-20 w-20 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg">
              <Plus className="h-12 w-12" strokeWidth={3} aria-hidden="true" />
            </div>
          </div>

          <div className="absolute left-4 top-16 hidden h-[400px] w-72 overflow-hidden rounded-[2rem] bg-gradient-to-br from-blue-100 to-white shadow-2xl shadow-blue-200/70 lg:block">
            <div className="mx-auto mt-10 h-20 w-20 rounded-full bg-gradient-to-br from-slate-200 to-blue-100" />
            <div className="mx-auto mt-4 h-44 w-36 rounded-t-[4rem] bg-blue-600" />
            <div className="absolute bottom-10 left-10 h-36 w-28 rotate-6 rounded-t-[3rem] bg-white shadow-lg" />
            <div className="absolute bottom-10 right-10 h-36 w-28 -rotate-6 rounded-t-[3rem] bg-white shadow-lg" />
            <Stethoscope className="absolute bottom-20 left-20 h-12 w-12 text-slate-500" aria-hidden="true" />
            <div className="absolute bottom-5 right-5 rounded-xl border border-blue-100 bg-white p-3 shadow-lg">
              <p className="text-xs font-black text-[#0f1f44]">Doctor Online</p>
              <p className="mt-1 text-[11px] text-slate-500">Holding patient tablet</p>
            </div>
          </div>

          <div className="relative ml-auto w-full max-w-2xl rounded-[1.6rem] border border-slate-200 bg-white p-4 shadow-2xl shadow-blue-200/70 md:p-6 lg:mt-20">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-lg font-black text-[#0f1f44]">Hospital Dashboard</h2>
              <div className="rounded-full bg-blue-50 px-4 py-2 text-xs font-bold text-blue-600">Live</div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {metrics.map((item) => (
                <div key={item.label} className="rounded-xl border border-slate-100 bg-white p-3 shadow-sm">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                    <item.icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <p className="text-lg font-black text-[#0f1f44]">{item.value}</p>
                  <p className="text-xs font-semibold text-slate-500">{item.label}</p>
                </div>
              ))}
            </div>

            <div className="mt-4 grid gap-4 lg:grid-cols-[1.25fr_0.75fr]">
              <div className="rounded-xl border border-slate-100 bg-white p-4 shadow-sm">
                <p className="mb-4 text-sm font-black text-[#0f1f44]">Appointments Overview</p>
                <div className="relative h-40">
                  <div className="absolute inset-0 grid grid-rows-4">
                    {Array.from({ length: 4 }).map((_, index) => (
                      <div key={index} className="border-t border-slate-100" />
                    ))}
                  </div>
                  <svg viewBox="0 0 260 140" className="relative h-full w-full">
                    <polyline points="0,108 35,90 70,72 105,100 140,62 175,82 210,54 260,30" fill="none" stroke="#2563eb" strokeWidth="4" strokeLinecap="round" />
                    <polyline points="0,118 35,104 70,96 105,112 140,86 175,96 210,74 260,62" fill="none" stroke="#cbd5e1" strokeWidth="4" strokeLinecap="round" />
                  </svg>
                </div>
              </div>
              <div className="rounded-xl border border-slate-100 bg-white p-4 shadow-sm">
                <p className="mb-3 text-sm font-black text-[#0f1f44]">Recent Patients</p>
                <div className="space-y-3">
                  {patients.map((patient, index) => (
                    <div key={patient} className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-100 to-blue-300" />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-xs font-black text-slate-800">{patient}</p>
                        <p className="text-[10px] text-slate-400">MRN #{String(index + 1001).padStart(4, "0")}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="absolute right-3 top-0 hidden rounded-2xl border border-blue-100 bg-white p-4 shadow-xl md:block">
            <p className="flex items-center gap-2 text-sm font-black text-[#0f1f44]">
              <FileHeart className="h-5 w-5 text-blue-600" />
              24/7 Support
            </p>
          </div>
          <div className="absolute bottom-4 left-2 hidden rounded-2xl border border-blue-100 bg-white p-4 shadow-xl md:block">
            <p className="flex items-center gap-2 text-sm font-black text-[#0f1f44]">
              <CheckCircle2 className="h-5 w-5 text-blue-600" />
              Secure & Reliable
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
