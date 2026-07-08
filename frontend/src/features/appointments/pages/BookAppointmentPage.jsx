import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, Card, Input, Textarea } from "../../../shared/components/ui";
import {
  bookDoctorAppointment,
  getAvailableDoctorSchedule,
} from "../../doctors/api/doctorDashboardApi.js";

function BookAppointmentPage() {
  const { doctorId } = useParams();
  const navigate = useNavigate();
  const [slots, setSlots] = useState([]);
  const [form, setForm] = useState({
    scheduleId: "",
    city: "",
    pincode: "",
    department: "General",
    issue: "",
  });

  useEffect(() => {
    getAvailableDoctorSchedule(doctorId)
      .then(setSlots)
      .catch((error) => toast.error(error.response?.data?.message || "Failed to load doctor slots"));
  }, [doctorId]);

  const selectedSlot = slots.find((slot) => slot._id === form.scheduleId);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleBook = async (event) => {
    event.preventDefault();
    try {
      await bookDoctorAppointment({
        ...form,
        doctorId,
        appointmentDate: selectedSlot?.date || new Date(),
      });
      toast.success("Appointment booked");
      navigate("/appointments");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to book appointment");
    }
  };

  return (
    <section className="mx-auto my-10 max-w-4xl px-4">
      <h1 className="mb-6 text-3xl font-black text-slate-900">Book Appointment</h1>
      <Card className="p-6">
        <form onSubmit={handleBook} className="space-y-4">
          <div>
            <label className="mb-2 block font-bold text-slate-700">Select Slot</label>
            <div className="grid gap-3 md:grid-cols-2">
              {slots.map((slot) => (
                <button
                  type="button"
                  key={slot._id}
                  onClick={() => setForm((current) => ({ ...current, scheduleId: slot._id }))}
                  className={`rounded-md border p-3 text-left ${
                    form.scheduleId === slot._id
                      ? "border-main_theme bg-light_theme"
                      : "border-slate-200 bg-white"
                  }`}
                >
                  <p className="font-bold">{new Date(slot.date).toLocaleDateString()}</p>
                  <p className="text-sm text-slate-600">{slot.startTime} - {slot.endTime}</p>
                </button>
              ))}
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <Input label="City" name="city" value={form.city} onChange={handleChange} required />
            <Input label="Pincode" name="pincode" value={form.pincode} onChange={handleChange} required />
            <Input label="Department" name="department" value={form.department} onChange={handleChange} required />
          </div>
          <Textarea label="Issue" name="issue" value={form.issue} onChange={handleChange} rows={4} />
          <Button type="submit" disabled={!form.scheduleId}>Book Appointment</Button>
        </form>
      </Card>
    </section>
  );
}

export default BookAppointmentPage;
