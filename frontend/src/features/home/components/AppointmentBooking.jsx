import React, { useEffect, useMemo, useState } from "react";
import { CheckCircle2, ClipboardCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, Card, Input, Select } from "../../../shared/components/ui";
import api from "../../../shared/api/httpClient.jsx";
import { fetchSpecialties } from "../../specialities/api";
import { getSpecialityOptions } from "../../specialities/data/specialities";

const initialForm = {
  department: "",
  date: "",
  doctor: "",
  time: "",
};

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

function AppointmentBooking() {
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [doctors, setDoctors] = useState([]);
  const [loadingDoctors, setLoadingDoctors] = useState(true);
  const [departmentOptions, setDepartmentOptions] = useState(getSpecialityOptions());

  useEffect(() => {
    api.get("/user/alldoctors")
      .then((response) => setDoctors(response.data?.data || []))
      .catch((error) => toast.error(error.response?.data?.message || "Failed to load doctors"))
      .finally(() => setLoadingDoctors(false));
  }, []);

  useEffect(() => {
    let isMounted = true;

    fetchSpecialties()
      .then((items) => {
        if (isMounted) setDepartmentOptions(getSpecialityOptions(items));
      })
      .catch(() => {
        if (isMounted) setDepartmentOptions(getSpecialityOptions());
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const filteredDoctors = useMemo(() => {
    if (!form.department) return doctors;

    return doctors.filter((doctor) => {
      const department = doctor?.department?.name || doctor?.specialization;
      return department === form.department;
    });
  }, [doctors, form.department]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({
      ...current,
      [name]: value,
      ...(name === "department" ? { doctor: "" } : {}),
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!form.doctor) {
      toast.error("Please select a doctor");
      return;
    }

    console.log("Appointment form data", form);
    navigate(`/appointment/book/${form.doctor}`, {
      state: {
        appointmentDate: form.date,
        department: form.department,
        startTime: form.time,
      },
    });
  };

  const fieldClass = "h-[52px] rounded-xl border-slate-200 bg-white px-4 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100";

  return (
    <section className="bg-white px-4 pb-12">
      <div className="mx-auto max-w-7xl">
        <Card className="relative overflow-hidden rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 via-white to-blue-100 p-6 shadow-lg shadow-blue-100/70 md:p-8">
          <div className="absolute right-8 top-8 hidden h-32 w-32 rounded-full bg-blue-200/40 blur-3xl md:block" />
          <div className="relative grid gap-8 lg:grid-cols-[1fr_300px] lg:items-center">
            <div>
              <h2 className="text-3xl font-black text-[#0f1f44]">Book an Appointment</h2>
              <p className="mt-3 max-w-2xl text-slate-600">
                Pick your department, doctor, date, and time to start a smoother consultation flow.
              </p>
              <form onSubmit={handleSubmit} className="mt-6 grid gap-4 md:grid-cols-4">
                <Select name="department" value={form.department} onChange={handleChange} selectClassName={fieldClass} required>
                  <option value="">Select Department</option>
                  {departmentOptions.map((department) => (
                    <option key={department} value={department}>
                      {department}
                    </option>
                  ))}
                </Select>
                <Input type="date" name="date" value={form.date} onChange={handleChange} inputClassName={fieldClass} required />
                <Select name="doctor" value={form.doctor} onChange={handleChange} selectClassName={fieldClass} required>
                  <option value="">{loadingDoctors ? "Loading doctors..." : "Select Doctor"}</option>
                  {filteredDoctors.map((doctor) => (
                    <option key={doctor._id} value={doctor._id}>
                      Dr. {doctor.firstName} {doctor.lastName}
                    </option>
                  ))}
                </Select>
                <Select name="time" value={form.time} onChange={handleChange} selectClassName={fieldClass} required>
                  <option value="">Select Time</option>
                  {appointmentTimes.map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </Select>
                <div className="md:col-span-4">
                  <Button type="submit" className="gap-2 rounded-xl bg-[#2563eb] px-7 py-4 hover:bg-blue-700">
                    <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
                    Book Now
                  </Button>
                </div>
              </form>
            </div>
            <div className="hidden justify-center lg:flex">
              <div className="relative flex h-52 w-52 items-center justify-center rounded-[2rem] bg-white shadow-xl">
                <div className="absolute inset-5 rounded-[1.5rem] border border-blue-100" />
                <ClipboardCheck className="h-24 w-24 text-blue-600" strokeWidth={1.6} aria-hidden="true" />
                <div className="absolute -bottom-4 rounded-2xl bg-blue-600 px-4 py-3 text-center text-white shadow-lg">
                  <p className="text-2xl font-black">{doctors.length}+</p>
                  <p className="text-xs font-bold">Doctors available</p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}

export default AppointmentBooking;
