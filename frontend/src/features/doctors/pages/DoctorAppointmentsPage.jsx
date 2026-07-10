import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { CalendarClock, CheckCircle2, Trash2, XCircle } from "lucide-react";
import { Button } from "../../../shared/components/ui";
import DashboardCard from "../../../shared/components/dashboard/DashboardCard.jsx";
import StatusBadge from "../../../shared/components/dashboard/StatusBadge.jsx";
import AvatarPlaceholder from "../../../shared/components/dashboard/AvatarPlaceholder.jsx";
import EmptyState from "../../../shared/components/dashboard/EmptyState.jsx";
import {
  completeDoctorAppointment,
  deleteDoctorAppointment,
  getDoctorAppointments,
  updateDoctorAppointmentStatus,
} from "../api/doctorDashboardApi.js";

function DoctorAppointmentsPage() {
  const [appointments, setAppointments] = useState([]);

  const loadAppointments = async () => {
    try {
      setAppointments(await getDoctorAppointments());
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load appointments");
    }
  };

  useEffect(() => {
    loadAppointments();
  }, []);

  const handleComplete = async (appointmentId) => {
    try {
      await completeDoctorAppointment(appointmentId);
      toast.success("Appointment completed");
      loadAppointments();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to complete appointment");
    }
  };

  const handleStatusChange = async (appointmentId, status) => {
    try {
      await updateDoctorAppointmentStatus(appointmentId, status);
      toast.success(`Appointment ${status.toLowerCase()}`);
      loadAppointments();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update appointment");
    }
  };

  const handleDelete = async (appointmentId) => {
    try {
      await deleteDoctorAppointment(appointmentId);
      toast.success("Appointment deleted");
      loadAppointments();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete appointment");
    }
  };

  return (
    <section className="space-y-6">
      <div className="rounded-3xl border border-blue-100 bg-gradient-to-br from-blue-50 via-white to-cyan-50 p-6 shadow-sm">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <span className="inline-flex rounded-full bg-white px-4 py-2 text-xs font-black text-blue-600 shadow-sm">
              Doctor Schedule
            </span>
            <h1 className="mt-4 text-3xl font-black text-[#0f1f44]">Appointments</h1>
            <p className="mt-2 text-sm font-semibold text-slate-600">Review requests, approve visits, and complete patient checkups.</p>
          </div>
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-100">
            <CalendarClock size={26} />
          </div>
        </div>
      </div>
      <div className="space-y-4">
        {appointments.length === 0 ? (
          <EmptyState title="No appointments found." description="New patient bookings will appear here." />
        ) : (
          appointments.map((appointment) => (
            <DashboardCard key={appointment._id} className="p-5">
              <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
                <div className="flex items-start gap-4">
                  <AvatarPlaceholder label={`${appointment.patientFirstName || "P"}${appointment.patientLastName || ""}`} className="h-14 w-14" />
                  <div>
                    <h2 className="text-lg font-black text-[#0f1f44]">
                      {appointment.patientFirstName} {appointment.patientLastName}
                    </h2>
                    <p className="mt-1 text-sm font-semibold text-slate-500">
                      {appointment.appointmentDate ? new Date(appointment.appointmentDate).toLocaleDateString() : "-"}{" "}
                      {appointment.startTime && `${appointment.startTime} - ${appointment.endTime}`}
                    </p>
                    <p className="mt-2 max-w-2xl text-sm font-semibold text-slate-700">{appointment.issue || "General consultation"}</p>
                    <p className="mt-1 text-sm font-semibold text-slate-600">Phone: {appointment.patient?.phone || "Not provided"}</p>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <StatusBadge status={appointment.status} />
                  {appointment.status === "Pending" && (
                    <>
                      <Button onClick={() => handleStatusChange(appointment._id, "Accepted")} size="sm" className="gap-2 rounded-xl">
                        <CheckCircle2 size={15} />
                        Accept
                      </Button>
                      <Button onClick={() => handleStatusChange(appointment._id, "Rejected")} variant="secondary" size="sm" className="gap-2 rounded-xl">
                        <XCircle size={15} />
                        Reject
                      </Button>
                    </>
                  )}
                  {appointment.status !== "Completed" && (
                    <Button onClick={() => handleComplete(appointment._id)} variant="green" size="sm" className="gap-2 rounded-xl">
                      <CheckCircle2 size={15} />
                      Mark Complete
                    </Button>
                  )}
                  <Button onClick={() => handleDelete(appointment._id)} variant="red" size="sm" className="gap-2 rounded-xl">
                    <Trash2 size={15} />
                    Delete
                  </Button>
                </div>
              </div>
            </DashboardCard>
          ))
        )}
      </div>
    </section>
  );
}

export default DoctorAppointmentsPage;
