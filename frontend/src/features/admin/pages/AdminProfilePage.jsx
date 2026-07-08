import React from "react";
import ProfilePage from "../../auth/pages/ProfilePage.jsx";
import AdminSidebar from "../components/AdminSidebar.jsx";

function AdminProfilePage() {
  return (
    <div className="min-h-screen bg-slate-50 md:flex">
      <AdminSidebar />
      <main className="flex-1">
        <ProfilePage />
      </main>
    </div>
  );
}

export default AdminProfilePage;
