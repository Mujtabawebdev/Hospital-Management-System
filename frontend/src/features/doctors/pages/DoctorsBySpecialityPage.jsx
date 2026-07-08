import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DoctorsCard } from "../../../import-export/ImportExport";
import api from "../../../shared/api/httpClient";

const DoctorsBySpecialityPage = () => {
  const { name } = useParams(); // specialty name from URL
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const { data } = await api.get("/user/alldoctors", {
          params: { specialization: name },
        });
        setDoctors(data.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchDoctors();
  }, [name]);

  return (
    <div className="w-full">
      <section className="my-20 h-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 items-center justify-between px-3 md:px-6 lg:px-6 py-2">
        {doctors.map((doctor) => (
          <DoctorsCard key={doctor._id} doctor={doctor} />
        ))}
      </section>
    </div>
  );
};

export default DoctorsBySpecialityPage;
