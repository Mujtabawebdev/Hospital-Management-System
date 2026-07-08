import React from "react";
import ProfilePage from "../../auth/pages/ProfilePage.jsx";
import PatientSidebar from "../components/PatientSidebar.jsx";

function PatientProfilePage() {
  return (
    <div className="min-h-screen bg-slate-50 md:flex">
      <PatientSidebar />
      <main className="flex-1">
        <ProfilePage />
      </main>
    </div>
  );
}

export default PatientProfilePage;
