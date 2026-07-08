import React, { useEffect, useMemo, useState } from "react";
import { CalendarCheck, Clock, Stethoscope, Users } from "lucide-react";
import { Card } from "../../../shared/components/ui";
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
        color: "text-teal-700",
      },
      {
        title: "Pending Appointments",
        value: appointments.filter((item) => item.status === "Pending").length,
        icon: Clock,
        color: "text-orange-500",
      },
      {
        title: "Completed",
        value: appointments.filter((item) => item.status === "Completed").length,
        icon: Stethoscope,
        color: "text-green-600",
      },
      {
        title: "Open Slots",
        value: schedule.filter((item) => item.status === "Available").length,
        icon: Users,
        color: "text-blue-600",
      },
    ];
  }, [appointments, schedule]);

  return (
    <section>
      <div className="mb-8">
        <h1 className="text-3xl font-black text-slate-900">Welcome back, Doctor</h1>
        <p className="mt-2 text-slate-600">Here is your appointment overview.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map(({ title, value, icon: Icon, color }) => (
          <Card key={title} className="p-5">
            <div className="flex items-center justify-between">
              <p className="text-sm font-bold text-slate-500">{title}</p>
              <Icon className={color} size={22} />
            </div>
            <p className={`mt-5 text-4xl font-black ${color}`}>{value}</p>
          </Card>
        ))}
      </div>
    </section>
  );
}

export default DoctorDashboardPage;
