import React from "react";

function WhoWeAre() {
  return (
    <section className="bg-white px-4 py-14">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-3xl font-black text-[#0f1f44] md:text-4xl">Who We Are</h2>
        <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-[#2563eb]" />
        <p className="mt-6 text-base leading-8 text-slate-600 md:text-lg">
          MediHub is a secure, modern, and user-friendly Hospital Management System built to simplify hospital operations and improve patient care. Our platform empowers healthcare providers to manage everything efficiently-from patient registration to billing and medical records-with complete data security and reliability.
        </p>
      </div>
    </section>
  );
}

export default WhoWeAre;
