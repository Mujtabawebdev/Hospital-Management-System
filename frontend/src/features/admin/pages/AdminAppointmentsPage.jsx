import React, { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { Card, Select } from "../../../shared/components/ui";
import AdminSidebar from "../components/AdminSidebar.jsx";
import { getAdminAppointments } from "../api/adminAppointmentApi.js";

function AdminAppointmentsPage() {
  const [appointments, setAppointments] = useState([]);
  const [status, setStatus] = useState("");

  useEffect(() => {
    getAdminAppointments()
      .then(setAppointments)
      .catch((error) => toast.error(error.response?.data?.message || "Failed to load appointments"));
  }, []);

  const filteredAppointments = useMemo(() => {
    if (!status) return appointments;
    return appointments.filter((appointment) => appointment.status === status);
  }, [appointments, status]);

  const statuses = useMemo(
    () => [...new Set(appointments.map((appointment) => appointment.status).filter(Boolean))],
    [appointments],
  );

  return (
    <div className="min-h-screen bg-slate-50 md:flex">
      <AdminSidebar />
      <main className="flex-1 p-4 md:p-8">
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-3xl font-black text-slate-900">Appointments</h1>
            <p className="mt-2 text-slate-600">All patient bookings across approved doctors.</p>
          </div>
          <Select label="Status" value={status} onChange={(event) => setStatus(event.target.value)} className="md:w-56">
            <option value="">All statuses</option>
            {statuses.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </Select>
        </div>

        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-left text-sm">
              <thead className="bg-slate-100 text-slate-700">
                <tr>
                  <th className="p-3">Patient</th>
                  <th className="p-3">Doctor</th>
                  <th className="p-3">Date</th>
                  <th className="p-3">Department</th>
                  <th className="p-3">Issue</th>
                  <th className="p-3">Fee</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredAppointments.length === 0 ? (
                  <tr>
                    <td className="p-5 text-center text-slate-500" colSpan={7}>
                      No appointments found.
                    </td>
                  </tr>
                ) : (
                  filteredAppointments.map((appointment) => (
                    <tr key={appointment._id} className="border-t border-slate-100">
                      <td className="p-3">
                        {appointment.patientFirstName} {appointment.patientLastName}
                      </td>
                      <td className="p-3">
                        Dr. {appointment.doctorFirstName} {appointment.doctorLastName}
                      </td>
                      <td className="p-3">
                        {appointment.appointmentDate ? new Date(appointment.appointmentDate).toLocaleDateString() : "-"}{" "}
                        {appointment.startTime && `${appointment.startTime} - ${appointment.endTime}`}
                      </td>
                      <td className="p-3">{appointment.department || "-"}</td>
                      <td className="p-3">{appointment.issue || "General consultation"}</td>
                      <td className="p-3">Rs {appointment.fees || appointment.appointmentCharges || 0}</td>
                      <td className="p-3">
                        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700">
                          {appointment.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </main>
    </div>
  );
}

export default AdminAppointmentsPage;
