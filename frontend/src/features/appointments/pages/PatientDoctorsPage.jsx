import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { CalendarCheck, Search, Star, UserRound } from "lucide-react";
import PatientSidebar from "../components/PatientSidebar.jsx";
import api from "../../../shared/api/httpClient.jsx";
import DashboardCard from "../../../shared/components/dashboard/DashboardCard.jsx";
import EmptyState from "../../../shared/components/dashboard/EmptyState.jsx";

function PatientDoctorsPage() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    api.get("/user/alldoctors")
      .then((response) => setDoctors(response.data?.data || []))
      .catch((error) => toast.error(error.response?.data?.message || "Failed to load doctors"))
      .finally(() => setLoading(false));
  }, []);

  const filteredDoctors = doctors.filter((doctor) => {
    const name = `${doctor.firstName || ""} ${doctor.lastName || ""}`.toLowerCase();
    const specialization = (doctor?.department?.name || doctor?.specialization || "").toLowerCase();
    const query = search.toLowerCase();
    return name.includes(query) || specialization.includes(query);
  });

  return (
    <div className="min-h-screen bg-[#f8fbff] md:flex">
      <PatientSidebar />
      <main className="flex-1 p-4 md:p-8">
        <section className="mx-auto max-w-7xl space-y-6">
          <div className="rounded-3xl border border-blue-100 bg-gradient-to-br from-blue-50 via-white to-cyan-50 p-6 shadow-sm">
            <span className="inline-flex rounded-full bg-white px-4 py-2 text-xs font-black text-blue-600 shadow-sm">
              Patient Doctors
            </span>
            <div className="mt-4 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <h1 className="text-3xl font-black text-[#0f1f44] md:text-4xl">Find Doctors</h1>
                <p className="mt-2 max-w-2xl text-sm font-semibold leading-6 text-slate-600 md:text-base">
                  Browse approved doctors and book your next appointment from the patient panel.
                </p>
              </div>
              <div className="relative w-full lg:w-96">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search doctor or speciality"
                  className="h-12 w-full rounded-2xl border border-blue-100 bg-white pl-11 pr-4 text-sm font-semibold outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>
            </div>
          </div>

          {loading ? (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <DashboardCard key={index} className="p-5">
                  <div className="flex gap-4">
                    <div className="h-16 w-16 animate-pulse rounded-2xl bg-blue-100" />
                    <div className="flex-1 space-y-3">
                      <div className="h-5 w-40 animate-pulse rounded bg-slate-100" />
                      <div className="h-4 w-28 animate-pulse rounded bg-blue-100" />
                      <div className="h-4 w-24 animate-pulse rounded bg-slate-100" />
                    </div>
                  </div>
                </DashboardCard>
              ))}
            </div>
          ) : filteredDoctors.length === 0 ? (
            <EmptyState title="No doctors found." description="Try searching another name or speciality." />
          ) : (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {filteredDoctors.map((doctor) => {
                const fullName = `Dr. ${doctor.firstName || ""} ${doctor.lastName || ""}`.trim();
                const specialization = doctor?.department?.name || doctor?.specialization || "General Physician";
                const avatar = doctor?.profilePicture?.url || doctor?.docAvatar;
                const fee = doctor?.appointmentCharges || doctor?.fee || 0;
                const rating = doctor?.rating || doctor?.averageRating || "4.8";

                return (
                  <DashboardCard key={doctor._id} className="p-5">
                    <div className="flex gap-4">
                      <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-blue-100 to-cyan-100 text-blue-700">
                        {avatar ? (
                          <img src={avatar} alt={fullName} className="h-full w-full object-cover" />
                        ) : (
                          <UserRound className="h-8 w-8" />
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <h2 className="truncate text-lg font-black text-[#0f1f44]">{fullName}</h2>
                        <p className="mt-1 text-sm font-bold text-blue-600">{specialization}</p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-3 py-1 text-xs font-black text-slate-700">
                            <Star className="h-3.5 w-3.5 fill-blue-500 text-blue-500" />
                            {rating}
                          </span>
                          <span className="rounded-full bg-teal-50 px-3 py-1 text-xs font-black text-teal-700">
                            PKR {fee}
                          </span>
                        </div>
                      </div>
                    </div>
                    <p className="mt-3 text-sm font-semibold text-slate-600">Phone: {doctor.phone || "Not provided"}</p>
                    <Link
                      to={`/appointment/book/${doctor._id}`}
                      className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-main_theme px-4 py-3 text-sm font-black text-white transition hover:bg-blue-700"
                    >
                      <CalendarCheck className="h-4 w-4" />
                      Book Appointment
                    </Link>
                  </DashboardCard>
                );
              })}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default PatientDoctorsPage;
