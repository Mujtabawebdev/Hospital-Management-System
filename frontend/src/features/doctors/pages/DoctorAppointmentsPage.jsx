import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Button, Card } from "../../../shared/components/ui";
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
    <section>
      <h1 className="mb-6 text-3xl font-black text-slate-900">Appointments</h1>
      <div className="space-y-4">
        {appointments.length === 0 ? (
          <Card className="p-6 text-center text-slate-500">No appointments found.</Card>
        ) : (
          appointments.map((appointment) => (
            <Card key={appointment._id} className="p-5">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-lg font-black text-slate-900">
                    {appointment.patientFirstName} {appointment.patientLastName}
                  </h2>
                  <p className="text-sm text-slate-600">
                    {new Date(appointment.appointmentDate).toLocaleDateString()}{" "}
                    {appointment.startTime && `${appointment.startTime} - ${appointment.endTime}`}
                  </p>
                  <p className="mt-2 text-sm text-slate-700">{appointment.issue || "General consultation"}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="rounded-full bg-light_theme px-3 py-1 text-xs font-black text-dark_theme">
                    {appointment.status}
                  </span>
                  {appointment.status === "Pending" && (
                    <>
                      <Button onClick={() => handleStatusChange(appointment._id, "Accepted")} size="sm">
                        Accept
                      </Button>
                      <Button onClick={() => handleStatusChange(appointment._id, "Rejected")} variant="secondary" size="sm">
                        Reject
                      </Button>
                    </>
                  )}
                  {appointment.status !== "Completed" && (
                    <Button onClick={() => handleComplete(appointment._id)} variant="green">
                      Mark Complete
                    </Button>
                  )}
                  <Button onClick={() => handleDelete(appointment._id)} variant="red" size="sm">
                    Delete
                  </Button>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </section>
  );
}

export default DoctorAppointmentsPage;
