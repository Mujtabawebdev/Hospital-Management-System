import React, { useEffect, useState } from "react";
import { SpecialitiesCard } from "../../../import-export/ImportExport";
import { fetchSpecialties } from "../api";
import { fallbackSpecialities } from "../data/specialities";

const SpecialitiesPage = () => {
  const [specialities, setSpecialities] = useState(fallbackSpecialities);

  useEffect(() => {
    let isMounted = true;

    fetchSpecialties()
      .then((items) => {
        if (isMounted) setSpecialities(items);
      })
      .catch(() => {
        if (isMounted) setSpecialities(fallbackSpecialities);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="w-full">
      <div className="my-20 h-full max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 items-center px-3 md:px-6 lg:px-6 py-2">
        {specialities.map((speciality) => (
          <SpecialitiesCard key={speciality._id || speciality.name} speciality={speciality} />
        ))}
      </div>
    </div>
  );
};

export default SpecialitiesPage;
