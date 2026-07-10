import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, Card, Textarea } from "../../../shared/components/ui";
import {
  bookDoctorAppointment,
  getAvailableDoctorSchedule,
} from "../../doctors/api/doctorDashboardApi.js";
import { fetchSpecialties } from "../../specialities/api";
import { getSpecialityOptions } from "../../specialities/data/specialities";

const appointmentTimes = [
  "08:00 AM",
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "01:00 PM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
  "05:00 PM",
  "06:00 PM",
  "07:00 PM",
  "08:00 PM",
  "09:00 PM",
  "10:00 PM",
  "11:00 PM",
  "12:00 AM",
];

const getEndTime = (time) => {
  if (!time) return undefined;
  const [clock, period] = time.split(" ");
  const [hourText, minuteText] = clock.split(":");
  let hour = Number(hourText);
  const minute = Number(minuteText);

  if (period === "PM" && hour !== 12) hour += 12;
  if (period === "AM" && hour === 12) hour = 0;

  const date = new Date(2000, 0, 1, hour, minute + 30);
  return date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true });
};

function BookAppointmentPage() {
  const { doctorId } = useParams();
  const navigate = useNavigate();
  const { state } = useLocation();
  const [slots, setSlots] = useState([]);
  const [form, setForm] = useState({
    scheduleId: "",
    issue: "",
  });

  useEffect(() => {
    getAvailableDoctorSchedule(doctorId)
      .then(setSlots)
      .catch((error) => toast.error(error.response?.data?.message || "Failed to load doctor slots"));
  }, [doctorId]);

  const canBook = Boolean(form.scheduleId);

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
        scheduleId: form.scheduleId || undefined,
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
                  <p className="font-bold">{slot.day}</p>
                  <p className="text-sm text-slate-600">{slot.startTime} - {slot.endTime}</p>
                </button>
              ))}
            </div>
            {slots.length === 0 && (
              <p className="mt-2 text-sm text-slate-500">
                No available slot found for this doctor.
              </p>
            )}
          </div>
          <Textarea label="Issue" name="issue" value={form.issue} onChange={handleChange} rows={4} />
          <Button type="submit" disabled={!canBook}>Book Appointment</Button>
        </form>
      </Card>
    </section>
  );
}

export default BookAppointmentPage;
