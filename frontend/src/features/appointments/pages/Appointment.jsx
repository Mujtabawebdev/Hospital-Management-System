import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../../../shared/api/httpClient";
import DoctorsCard from "../../doctors/components/DoctorsCard.jsx";
import { Card } from "../../../shared/components/ui";

function Appointment() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await api.get("/user/alldoctors");
        setDoctors(response.data?.data || []);
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to load doctors");
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  return (
    <main className="w-full bg-light_theme/40">
      <section className="mx-auto max-w-7xl px-3 py-10 md:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-black text-slate-900 md:text-4xl">
            Book Appointment
          </h1>
          <p className="mt-2 max-w-2xl text-text_grey">
            Choose an approved doctor and select an available slot for your consultation.
          </p>
        </div>

        {loading ? (
          <Card className="p-6 text-center text-slate-500">Loading doctors...</Card>
        ) : doctors.length === 0 ? (
          <Card className="p-6 text-center text-slate-500">No doctors available right now.</Card>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {doctors.map((doctor) => (
              <DoctorsCard key={doctor._id} doctor={doctor} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default Appointment;
