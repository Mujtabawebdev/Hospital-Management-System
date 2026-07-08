import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Card } from "../../../shared/components/ui";
import { getMyAppointments } from "../api/patientAppointmentApi.js";
import PatientSidebar from "../components/PatientSidebar.jsx";

function MyAppointmentsPage() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    getMyAppointments()
      .then(setAppointments)
      .catch((error) => toast.error(error.response?.data?.message || "Failed to load appointments"));
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 md:flex">
      <PatientSidebar />
      <main className="flex-1 p-4 md:p-8">
        <section className="mx-auto max-w-5xl">
          <h1 className="mb-6 text-3xl font-black text-slate-900">My Appointments</h1>
          <div className="grid gap-4">
            {appointments.length === 0 ? (
              <Card className="p-6 text-center text-slate-500">No appointments found.</Card>
            ) : (
              appointments.map((appointment) => (
                <Card key={appointment._id} className="p-5">
                  <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
                    <div>
                      <h2 className="text-xl font-black text-slate-900">
                        Dr. {appointment.doctorFirstName || appointment.doctor?.firstName}{" "}
                        {appointment.doctorLastName || appointment.doctor?.lastName}
                      </h2>
                      <p className="text-sm text-slate-600">
                        {new Date(appointment.appointmentDate).toLocaleDateString()}{" "}
                        {appointment.startTime && `${appointment.startTime} - ${appointment.endTime}`}
                      </p>
                      <p className="mt-2 text-sm text-slate-700">{appointment.issue || "General consultation"}</p>
                    </div>
                    <div className="text-left md:text-right">
                      <span className="rounded-full bg-light_theme px-3 py-1 text-xs font-bold text-dark_theme">
                        {appointment.status}
                      </span>
                      <p className="mt-2 text-sm font-bold text-slate-700">Rs {appointment.fees || 0}</p>
                    </div>
                  </div>
                </Card>
              ))
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default MyAppointmentsPage;
