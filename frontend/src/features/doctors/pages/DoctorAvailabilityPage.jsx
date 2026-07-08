import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { CalendarPlus, Clock3 } from "lucide-react";
import { Button, Input } from "../../../shared/components/ui";
import DashboardCard from "../../../shared/components/dashboard/DashboardCard.jsx";
import StatusBadge from "../../../shared/components/dashboard/StatusBadge.jsx";
import EmptyState from "../../../shared/components/dashboard/EmptyState.jsx";
import { createDoctorSchedule, getDoctorSchedule } from "../api/doctorDashboardApi.js";

const initialForm = {
  date: "",
  startTime: "",
  endTime: "",
};

function DoctorAvailabilityPage() {
  const [form, setForm] = useState(initialForm);
  const [schedule, setSchedule] = useState([]);

  const loadSchedule = async () => {
    try {
      setSchedule(await getDoctorSchedule());
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load schedule");
    }
  };

  useEffect(() => {
    loadSchedule();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (form.startTime >= form.endTime) {
      toast.error("Start time must be earlier than end time");
      return;
    }

    try {
      await createDoctorSchedule(form);
      toast.success("Availability slot added");
      setForm(initialForm);
      loadSchedule();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add slot");
    }
  };

  return (
    <section className="space-y-6">
      <div className="rounded-3xl border border-blue-100 bg-gradient-to-br from-blue-50 via-white to-cyan-50 p-6 shadow-sm">
        <span className="inline-flex rounded-full bg-white px-4 py-2 text-xs font-black text-blue-600 shadow-sm">
          Availability Manager
        </span>
        <h1 className="mt-4 text-3xl font-black text-[#0f1f44]">Set Availability</h1>
        <p className="mt-2 text-sm font-semibold text-slate-600">Add and review slots patients can book for consultations.</p>
      </div>

      <DashboardCard className="p-6">
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
            <CalendarPlus size={24} />
          </div>
          <div>
            <h2 className="text-xl font-black text-[#0f1f44]">Add New Slot</h2>
            <p className="text-sm font-semibold text-slate-500">Choose date and consultation time.</p>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 md:grid-cols-4">
          <Input label="Date" type="date" name="date" value={form.date} onChange={handleChange} required />
          <Input label="Start Time" type="time" name="startTime" value={form.startTime} onChange={handleChange} required />
          <Input label="End Time" type="time" name="endTime" value={form.endTime} onChange={handleChange} required />
          <div className="flex items-end">
            <Button type="submit" className="w-full gap-2 rounded-xl">
              <CalendarPlus size={16} />
              Add Slot
            </Button>
          </div>
        </form>
      </DashboardCard>

      <DashboardCard className="overflow-hidden">
        <div className="border-b border-slate-100 p-5">
          <h2 className="text-xl font-black text-[#0f1f44]">Availability Slots</h2>
          <p className="mt-1 text-sm font-semibold text-slate-500">Your latest schedule entries.</p>
        </div>
        {schedule.length === 0 ? (
          <div className="p-5">
            <EmptyState title="No slots added yet." description="Add your first available consultation slot above." />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead className="bg-slate-50 text-slate-600">
                <tr>
                  <th className="p-4">Date</th>
                  <th className="p-4">Time</th>
                  <th className="p-4">Status</th>
                </tr>
              </thead>
              <tbody>
            {schedule.map((slot) => (
              <tr key={slot._id} className="border-t border-slate-100">
                <td className="p-4 font-black text-[#0f1f44]">{slot.date ? new Date(slot.date).toLocaleDateString() : "-"}</td>
                <td className="p-4">
                  <span className="inline-flex items-center gap-2 font-semibold text-slate-600">
                    <Clock3 size={16} className="text-blue-600" />
                    {slot.startTime} - {slot.endTime}
                  </span>
                </td>
                <td className="p-4"><StatusBadge status={slot.status} /></td>
              </tr>
            ))}
              </tbody>
            </table>
          </div>
        )}
      </DashboardCard>
    </section>
  );
}

export default DoctorAvailabilityPage;
