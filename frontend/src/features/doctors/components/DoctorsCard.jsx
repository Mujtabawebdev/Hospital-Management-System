import React from "react";
import { NavLink } from "react-router-dom";
import { FaHospital, FaVideo } from "react-icons/fa";
import hero from "/new_hero.png";
import langIcon from "/language.webp";
import { SkeletonLoading, useLoading } from "../../../import-export/ImportExport";
import { Card } from "../../../shared/components/ui";

const DoctorsCard = ({ doctor }) => {
  const loading = useLoading(1000); // Using the custom hook
  const specialization = doctor?.department?.name || doctor?.specialization || "General";
  const qualifications = doctor?.qualifications?.length ? doctor.qualifications.join(", ") : doctor?.qualification || "Qualified doctor";
  const languages = doctor?.languagesKnown?.length ? doctor.languagesKnown.join(", ") : "English";
  const fee = doctor?.appointmentCharges || doctor?.fee || 0;

  return (
    <Card as="section" className="border-text_grey/40 shadow-lg py-1 px-1 bg-gray-300/20 transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-md">
      {loading || !doctor ? (
        <SkeletonLoading />
      ) : (
        <>
          <div className="flex gap-4 px-4 py-3 ">
            {/* Avatar with lazy loading */}
            <img
              src={doctor.docAvatar || hero}
              alt="hero"
              className="w-20 h-20 px-1 py-1 object-cover bg-main_theme/20 backdrop-blur-md rounded-full border border-dark_theme mt-2"
              loading="lazy"
            />

            {/* Details */}
            <div className="doc-details overflow-hidden w-fit">
              <h2 className="font-semibold text-lg tracking-wider text-dark_theme">
                Dr. {doctor.firstName} {doctor.lastName}
              </h2>
              <h3 className="text-main_theme text-sm font-medium tracking-tight uppercase">
                {specialization}
              </h3>
              <h3 className="text-main_theme text-sm font-medium uppercase">
                {doctor.experience} years experience
              </h3>
              <p className="text-text_grey/80 truncate overflow-hidden">
                {qualifications}
              </p>
              {/* Appointment fees for above medium screens */}
              <div className="hidden mt-2 md:flex gap-4 items-center w-full">
                <div>
                  <p className=" text-sm text-text_grey/80 font-medium">
                    You pay
                  </p>
                  <p className="text-dark_theme font-medium">
                    PKR {fee}
                  </p>
                </div>
                {/* Cashback */}
                <div className="border-l-2 border-text_grey/50 px-4">
                  <p className="text-xs text-cart_orange font-light">
                    MEDIHUB CASHBACK
                  </p>
                  <p className="text-cart_orange font-normal">Rs 51</p>
                </div>
              </div>
            </div>
          </div>

          {/* Appointment fees for smaller screen */}
          <div className="mt-2 mb-4 flex md:hidden gap-4 items-center justify-center w-full">
            <div>
              <p className="text-sm text-text_grey/80 font-medium">You pay</p>
              <p className="text-dark_theme font-medium">
                PKR {fee}
              </p>
            </div>

            {/* Cashback */}
            <div className="border-l-2 border-text_grey/50 px-4">
              <p className="text-xs text-cart_orange font-light">
                MEDIHUB CASHBACK
              </p>
              <p className="text-cart_orange font-normal">Rs 51</p>
            </div>
          </div>

          {/* Languages */}
          <div className="flex items-center px-8 mb-4">
            <img src={langIcon} alt="voice" className="mr-2 md:mr-0" />
            <p className="text-sm text-text_grey/70 font-medium md:px-4 tracking-tighter">
              {languages}
            </p>
          </div>

          {/* Actions */}
          <p className="px-4 pb-2 text-sm text-slate-600">Phone: {doctor.phone || "Not provided"}</p>
          <div className="ctas grid grid-cols-1 gap-1">
            <NavLink
              to={`/appointment/book/${doctor._id}`}
              className="bg-dark_theme/95 hover:bg-dark_theme text-text px-4 py-4 rounded border-none font-medium text-sm tracking-tighter flex items-center justify-center md:justify-normal"
            >
              <FaVideo className="mr-2 text-text size-4" />
              BOOK AN APPOINTMENT
            </NavLink>
          </div>
        </>
      )}
    </Card>
  );
};

export default DoctorsCard;
