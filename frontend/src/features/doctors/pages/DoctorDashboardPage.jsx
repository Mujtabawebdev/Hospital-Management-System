import React, { useEffect, useMemo, useState } from "react";
import { CalendarCheck, Clock, Stethoscope, Users, ArrowRight, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import DashboardCard from "../../../shared/components/dashboard/DashboardCard.jsx";
import StatCard from "../../../shared/components/dashboard/StatCard.jsx";
import StatusBadge from "../../../shared/components/dashboard/StatusBadge.jsx";
import AvatarPlaceholder from "../../../shared/components/dashboard/AvatarPlaceholder.jsx";
import EmptyState from "../../../shared/components/dashboard/EmptyState.jsx";
import { getDoctorAppointments, getDoctorSchedule } from "../api/doctorDashboardApi.js";

function DoctorDashboardPage() {
  const [appointments, setAppointments] = useState([]);
  const [schedule, setSchedule] = useState([]);

  useEffect(() => {
    Promise.all([getDoctorAppointments(), getDoctorSchedule()])
      .then(([appointmentData, scheduleData]) => {
        setAppointments(appointmentData);
        setSchedule(scheduleData);
      })
      .catch((error) => console.error("Failed to load doctor dashboard", error));
  }, []);

  const stats = useMemo(() => {
    const today = new Date().toDateString();
    return [
      {
        title: "Today's Appointments",
        value: appointments.filter((item) => new Date(item.appointmentDate).toDateString() === today).length,
        icon: CalendarCheck,
        accent: "blue",
      },
      {
        title: "Pending Appointments",
        value: appointments.filter((item) => item.status === "Pending").length,
        icon: Clock,
        accent: "amber",
      },
      {
        title: "Completed Checkups",
        value: appointments.filter((item) => item.status === "Completed").length,
        icon: Stethoscope,
        accent: "green",
      },
      {
        title: "Total Patients",
        value: new Set(appointments.map((item) => item.patientId || item.patient?._id || `${item.patientFirstName}-${item.patientLastName}`)).size,
        icon: Users,
        accent: "teal",
      },
    ];
  }, [appointments]);

  const upcomingAppointments = useMemo(() => appointments.slice(0, 5), [appointments]);
  const availableSlots = useMemo(() => schedule.slice(0, 6), [schedule]);
  const openSlotCount = useMemo(
    () => schedule.filter((item) => item.status === "Available").length,
    [schedule],
  );

  return (
    <section className="space-y-6">
      <div className="overflow-hidden rounded-3xl border border-blue-100 bg-gradient-to-br from-blue-50 via-white to-cyan-50 p-6 shadow-sm">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <span className="inline-flex rounded-full bg-white px-4 py-2 text-xs font-black text-blue-600 shadow-sm">
              Doctor Dashboard
            </span>
            <h1 className="mt-4 text-3xl font-black text-[#0f1f44] md:text-4xl">Welcome back, Doctor</h1>
            <p className="mt-2 max-w-2xl text-sm font-semibold leading-6 text-slate-600 md:text-base">
              Here is your schedule and patient activity for today.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                to="/doctor/appointments"
                className="inline-flex items-center gap-2 rounded-xl bg-main_theme px-4 py-3 text-sm font-black text-white shadow-lg shadow-blue-100 hover:bg-blue-700"
              >
                View Appointments
                <ArrowRight size={16} />
              </Link>
              <Link
                to="/doctor/availability"
                className="inline-flex items-center gap-2 rounded-xl border border-blue-200 bg-white px-4 py-3 text-sm font-black text-blue-700 hover:bg-blue-50"
              >
                Set Availability
              </Link>
            </div>
          </div>
          <DashboardCard className="w-full p-5 lg:w-80">
            <div className="flex items-center gap-4">
              <AvatarPlaceholder label="DR" className="h-16 w-16 rounded-3xl" />
              <div>
                <p className="text-lg font-black text-[#0f1f44]">Doctor workspace</p>
                <p className="text-sm font-semibold text-slate-500">{openSlotCount} open slots available</p>
              </div>
            </div>
            <div className="mt-5 rounded-2xl bg-blue-50 p-4 text-sm font-bold text-blue-700">
              Keep appointment approvals and checkups moving from this panel.
            </div>
          </DashboardCard>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.4fr_0.9fr]">
        <DashboardCard className="p-5">
          <div className="mb-5 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-black text-[#0f1f44]">Appointment Schedule</h2>
              <p className="mt-1 text-sm font-semibold text-slate-500">Recent patient bookings and current statuses.</p>
            </div>
            <Link to="/doctor/appointments" className="text-sm font-black text-blue-600 hover:text-blue-800">
              View all
            </Link>
          </div>
          {upcomingAppointments.length === 0 ? (
            <EmptyState title="No appointments found." description="Patient appointments will appear here." />
          ) : (
            <div className="space-y-3">
              {upcomingAppointments.map((appointment) => (
                <div key={appointment._id} className="flex flex-col gap-4 rounded-2xl border border-slate-100 bg-slate-50/60 p-4 md:flex-row md:items-center md:justify-between">
                  <div className="flex items-center gap-3">
                    <AvatarPlaceholder label={`${appointment.patientFirstName || "P"}${appointment.patientLastName || ""}`} />
                    <div>
                      <p className="font-black text-[#0f1f44]">
                        {appointment.patientFirstName} {appointment.patientLastName}
                      </p>
                      <p className="text-sm font-semibold text-slate-500">
                        {appointment.appointmentDate ? new Date(appointment.appointmentDate).toLocaleDateString() : "-"}{" "}
                        {appointment.startTime && `${appointment.startTime} - ${appointment.endTime}`}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-sm font-semibold text-slate-600">{appointment.issue || "General consultation"}</span>
                    <StatusBadge status={appointment.status} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </DashboardCard>

        <div className="space-y-6">
          <DashboardCard className="p-5">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-teal-50 text-teal-600">
                <Clock size={21} />
              </div>
              <div>
                <h2 className="text-xl font-black text-[#0f1f44]">Availability</h2>
                <p className="text-sm font-semibold text-slate-500">Upcoming schedule slots.</p>
              </div>
            </div>
            {availableSlots.length === 0 ? (
              <p className="rounded-2xl bg-slate-50 p-4 text-sm font-semibold text-slate-500">No slots added yet.</p>
            ) : (
              <div className="space-y-3">
                {availableSlots.map((slot) => (
                  <div key={slot._id} className="flex items-center justify-between rounded-2xl border border-slate-100 p-3">
                    <div>
                      <p className="text-sm font-black text-[#0f1f44]">{slot.date ? new Date(slot.date).toLocaleDateString() : "-"}</p>
                      <p className="text-xs font-semibold text-slate-500">{slot.startTime} - {slot.endTime}</p>
                    </div>
                    <StatusBadge status={slot.status} />
                  </div>
                ))}
              </div>
            )}
          </DashboardCard>

          <DashboardCard className="bg-gradient-to-br from-blue-50 to-cyan-50 p-5">
            <ShieldCheck className="text-blue-600" size={28} />
            <h2 className="mt-4 text-xl font-black text-[#0f1f44]">Doctor Info</h2>
            <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">
              Your profile, verification details, appointment slots, and patient requests are connected to this secure dashboard.
            </p>
            <Link to="/doctor/profile" className="mt-4 inline-flex font-black text-blue-600 hover:text-blue-800">
              Update profile
            </Link>
          </DashboardCard>
        </div>
      </div>
    </section>
  );
}

export default DoctorDashboardPage;
