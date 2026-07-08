import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Button, Card, Input } from "../../../shared/components/ui";
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
    <section>
      <h1 className="mb-6 text-3xl font-black text-slate-900">Availability</h1>
      <Card className="mb-8 p-6">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 md:grid-cols-4">
          <Input label="Date" type="date" name="date" value={form.date} onChange={handleChange} required />
          <Input label="Start Time" type="time" name="startTime" value={form.startTime} onChange={handleChange} required />
          <Input label="End Time" type="time" name="endTime" value={form.endTime} onChange={handleChange} required />
          <div className="flex items-end">
            <Button type="submit" className="w-full">Add Slot</Button>
          </div>
        </form>
      </Card>

      <div className="overflow-hidden rounded-md border border-slate-200 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-100 text-slate-700">
            <tr>
              <th className="p-3">Date</th>
              <th className="p-3">Time</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {schedule.map((slot) => (
              <tr key={slot._id} className="border-t border-slate-100">
                <td className="p-3">{new Date(slot.date).toLocaleDateString()}</td>
                <td className="p-3">{slot.startTime} - {slot.endTime}</td>
                <td className="p-3">{slot.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default DoctorAvailabilityPage;
