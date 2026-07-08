import React, { useEffect, useState } from "react";
import { CalendarCheck, Heart, Star, UserRound } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, Card } from "../../../shared/components/ui";
import api from "../../../shared/api/httpClient.jsx";

function ExpertDoctors() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/user/alldoctors")
      .then((response) => setDoctors((response.data?.data || []).slice(0, 4)))
      .catch((error) => toast.error(error.response?.data?.message || "Failed to load doctors"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="bg-white px-4 py-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-7 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-blue-600">Doctors</p>
            <h2 className="mt-2 text-3xl font-black text-[#0f1f44]">Our Expert Doctors</h2>
          </div>
          <Link to="/alldoctors">
            <Button variant="secondary" className="rounded-xl border-blue-600 text-blue-600 hover:bg-blue-50">
              View All Doctors
            </Button>
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {loading ? (
            Array.from({ length: 4 }).map((_, index) => (
              <Card key={index} className="rounded-2xl border border-slate-200 p-5 shadow-sm">
                <div className="mx-auto h-28 w-28 animate-pulse rounded-full bg-blue-100" />
                <div className="mx-auto mt-5 h-5 w-32 animate-pulse rounded bg-slate-100" />
                <div className="mx-auto mt-3 h-4 w-24 animate-pulse rounded bg-blue-100" />
              </Card>
            ))
          ) : doctors.length === 0 ? (
            <Card className="col-span-full rounded-2xl border border-slate-200 p-8 text-center shadow-sm">
              <p className="text-lg font-black text-[#0f1f44]">No doctors available right now.</p>
              <p className="mt-2 text-sm font-semibold text-slate-500">Approved doctors will appear here automatically.</p>
            </Card>
          ) : (
            doctors.map((doctor) => {
              const fullName = `Dr. ${doctor.firstName || ""} ${doctor.lastName || ""}`.trim();
              const specialty = doctor?.department?.name || doctor?.specialization || "General Physician";
              const avatar = doctor?.profilePicture?.url || doctor?.docAvatar;
              const fee = doctor?.appointmentCharges || doctor?.fee || 0;
              const rating = doctor?.rating || doctor?.averageRating || "4.8";

              return (
                <Card key={doctor._id} className="relative rounded-2xl border border-slate-200 p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                  <button type="button" className="absolute right-5 top-5 rounded-full border border-blue-100 bg-white p-2 text-blue-600 shadow-sm">
                    <Heart className="h-4 w-4" aria-hidden="true" />
                  </button>
                  <div className="mx-auto flex h-28 w-28 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-blue-100 to-blue-300 text-3xl font-black text-blue-700">
                    {avatar ? (
                      <img src={avatar} alt={fullName} className="h-full w-full object-cover" />
                    ) : (
                      <UserRound className="h-14 w-14" aria-hidden="true" />
                    )}
                  </div>
                  <div className="mt-5 text-center">
                    <h3 className="text-lg font-black text-[#0f1f44]">{fullName}</h3>
                    <p className="mt-1 text-sm font-semibold text-blue-600">{specialty}</p>
                    <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
                      <p className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-3 py-1 text-sm font-bold text-slate-700">
                        <Star className="h-4 w-4 fill-blue-500 text-blue-500" aria-hidden="true" />
                        {rating}
                      </p>
                      <p className="rounded-full bg-teal-50 px-3 py-1 text-sm font-bold text-teal-700">
                        Rs {fee}
                      </p>
                    </div>
                    <Link
                      to={`/appointment/book/${doctor._id}`}
                      className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-black text-white transition hover:bg-blue-700"
                    >
                      <CalendarCheck className="h-4 w-4" aria-hidden="true" />
                      Book Now
                    </Link>
                  </div>
                </Card>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
}

export default ExpertDoctors;
