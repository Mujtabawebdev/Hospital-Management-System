import React, { useContext, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { CalendarCheck, FileText, Heart, Plus, Stethoscope } from "lucide-react";
import { getMyAppointments } from "../api/patientAppointmentApi.js";
import PatientSidebar from "../components/PatientSidebar.jsx";
import { Context } from "../../../shared/context/AppContext.jsx";
import DashboardCard from "../../../shared/components/dashboard/DashboardCard.jsx";
import StatCard from "../../../shared/components/dashboard/StatCard.jsx";
import StatusBadge from "../../../shared/components/dashboard/StatusBadge.jsx";
import AvatarPlaceholder from "../../../shared/components/dashboard/AvatarPlaceholder.jsx";
import EmptyState from "../../../shared/components/dashboard/EmptyState.jsx";

function MyAppointmentsPage() {
  const { user } = useContext(Context);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    getMyAppointments()
      .then(setAppointments)
      .catch((error) => toast.error(error.response?.data?.message || "Failed to load appointments"));
  }, []);

  const patientName = [user?.firstName, user?.lastName].filter(Boolean).join(" ") || "Patient";
  const upcomingAppointments = useMemo(
    () => appointments.filter((appointment) => !["Completed", "Cancelled", "Rejected"].includes(appointment.status)),
    [appointments],
  );
  const completedVisits = useMemo(
    () => appointments.filter((appointment) => appointment.status === "Completed").length,
    [appointments],
  );
  const savedDoctors = useMemo(
    () => new Set(appointments.map((appointment) => appointment.doctor?._id || `${appointment.doctorFirstName}-${appointment.doctorLastName}`)).size,
    [appointments],
  );

  const stats = [
    { title: "Upcoming Appointments", value: upcomingAppointments.length, icon: CalendarCheck, accent: "blue" },
    { title: "Completed Visits", value: completedVisits, icon: Stethoscope, accent: "green" },
    { title: "Saved Doctors", value: savedDoctors, icon: Heart, accent: "teal" },
    { title: "Medical Records", value: 0, icon: FileText, accent: "purple", helper: "Coming soon" },
  ];

  return (
    <div className="min-h-screen bg-[#f8fbff] md:flex">
      <PatientSidebar />
      <main className="flex-1 p-4 md:p-8">
        <section className="mx-auto max-w-7xl space-y-6">
          <div className="rounded-3xl border border-blue-100 bg-gradient-to-br from-blue-50 via-white to-cyan-50 p-6 shadow-sm">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <span className="inline-flex rounded-full bg-white px-4 py-2 text-xs font-black text-blue-600 shadow-sm">
                  Patient Dashboard
                </span>
                <h1 className="mt-4 text-3xl font-black text-[#0f1f44] md:text-4xl">Welcome back, {patientName}</h1>
                <p className="mt-2 max-w-2xl text-sm font-semibold leading-6 text-slate-600 md:text-base">
                  Manage your appointments, doctors, and medical records from one place.
                </p>
              </div>
              <Link
                to="/appointment"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-main_theme px-5 py-3 text-sm font-black text-white shadow-lg shadow-blue-100 hover:bg-blue-700"
              >
                <Plus size={17} />
                Book Appointment
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => (
              <StatCard key={stat.title} {...stat} />
            ))}
          </div>

          <div className="grid gap-6 xl:grid-cols-[1.25fr_0.85fr]">
            <div className="space-y-6">
              <DashboardCard className="p-5">
                <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div>
                    <h2 className="text-xl font-black text-[#0f1f44]">Upcoming Appointments</h2>
                    <p className="mt-1 text-sm font-semibold text-slate-500">Your active bookings and visit details.</p>
                  </div>
                  <Link to="/appointment" className="text-sm font-black text-blue-600 hover:text-blue-800">
                    Find doctors
                  </Link>
                </div>
                <div className="grid gap-4">
                  {appointments.length === 0 ? (
                    <EmptyState title="No appointments found." description="Book your first consultation to see it here." />
                  ) : (
                    appointments.map((appointment) => (
                      <div key={appointment._id} className="rounded-2xl border border-slate-100 bg-slate-50/60 p-4">
                        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                          <div className="flex items-start gap-4">
                            <AvatarPlaceholder label={`${appointment.doctorFirstName || appointment.doctor?.firstName || "D"}${appointment.doctorLastName || appointment.doctor?.lastName || "R"}`} />
                            <div>
                              <h3 className="text-lg font-black text-[#0f1f44]">
                                Dr. {appointment.doctorFirstName || appointment.doctor?.firstName}{" "}
                                {appointment.doctorLastName || appointment.doctor?.lastName}
                              </h3>
                              <p className="mt-1 text-sm font-semibold text-slate-500">
                                {appointment.appointmentDate ? new Date(appointment.appointmentDate).toLocaleDateString() : "-"}{" "}
                                {appointment.startTime && `${appointment.startTime} - ${appointment.endTime}`}
                              </p>
                              <p className="mt-2 text-sm font-semibold text-slate-700">{appointment.issue || "General consultation"}</p>
                            </div>
                          </div>
                          <div className="text-left md:text-right">
                            <StatusBadge status={appointment.status} />
                            <p className="mt-2 text-sm font-black text-slate-700">Rs {appointment.fees || 0}</p>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </DashboardCard>

            </div>

            <div className="space-y-6">
              <DashboardCard className="bg-gradient-to-br from-blue-50 to-cyan-50 p-5">
                <h2 className="text-xl font-black text-[#0f1f44]">Book Appointment</h2>
                <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">
                  Choose an approved doctor and available slot from the appointment booking flow.
                </p>
                <Link to="/appointment" className="mt-5 inline-flex items-center gap-2 rounded-xl bg-main_theme px-4 py-3 text-sm font-black text-white hover:bg-blue-700">
                  <CalendarCheck size={16} />
                  Start Booking
                </Link>
              </DashboardCard>

              <DashboardCard className="p-5">
                <h2 className="text-xl font-black text-[#0f1f44]">Medical Records</h2>
                <div className="mt-4 rounded-2xl border border-dashed border-blue-200 bg-blue-50/50 p-5 text-sm font-semibold text-slate-600">
                  No reports uploaded yet. Future lab reports and prescriptions will appear here.
                </div>
              </DashboardCard>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default MyAppointmentsPage;
