import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Card } from "../../../shared/components/ui";
import { Context } from "../../../shared/context/AppContext.jsx";
import { getCurrentUser } from "../api/authApi.js";

function ProfilePage() {
  const { user, setUser } = useContext(Context);
  const [profile, setProfile] = useState(user || {});

  useEffect(() => {
    if (!user?.role) return;

    getCurrentUser(user.role)
      .then((data) => {
        if (data) {
          setProfile(data);
          setUser(data);
          localStorage.setItem("user", JSON.stringify(data));
        }
      })
      .catch((error) => toast.error(error.response?.data?.message || "Failed to load profile"));
  }, [setUser, user?.role]);

  return (
    <section className="mx-auto my-10 max-w-3xl px-4">
      <h1 className="mb-6 text-3xl font-black text-slate-900">My Profile</h1>
      <Card className="p-6">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <p className="text-xs font-bold uppercase text-slate-500">Name</p>
            <p className="text-lg font-black text-slate-900">
              {profile.firstName} {profile.lastName}
            </p>
          </div>
          <div>
            <p className="text-xs font-bold uppercase text-slate-500">Email</p>
            <p className="text-lg font-black text-slate-900">{profile.email}</p>
          </div>
          <div>
            <p className="text-xs font-bold uppercase text-slate-500">Role</p>
            <p className="text-lg font-black text-slate-900">{profile.role}</p>
          </div>
          {profile.status && (
            <div>
              <p className="text-xs font-bold uppercase text-slate-500">Status</p>
              <p className="text-lg font-black text-slate-900">{profile.status}</p>
            </div>
          )}
          {profile.phone && (
            <div>
              <p className="text-xs font-bold uppercase text-slate-500">Phone</p>
              <p className="text-lg font-black text-slate-900">{profile.phone}</p>
            </div>
          )}
          {profile.specialization && (
            <div>
              <p className="text-xs font-bold uppercase text-slate-500">Specialization</p>
              <p className="text-lg font-black text-slate-900">{profile.specialization}</p>
            </div>
          )}
          {profile.hospital && (
            <div>
              <p className="text-xs font-bold uppercase text-slate-500">Hospital</p>
              <p className="text-lg font-black text-slate-900">{profile.hospital}</p>
            </div>
          )}
          {profile.fee !== undefined && (
            <div>
              <p className="text-xs font-bold uppercase text-slate-500">Fee</p>
              <p className="text-lg font-black text-slate-900">Rs {profile.fee}</p>
            </div>
          )}
          {profile.biography && (
            <div className="md:col-span-2">
              <p className="text-xs font-bold uppercase text-slate-500">Biography</p>
              <p className="text-slate-700">{profile.biography}</p>
            </div>
          )}
          {profile.profilePicture?.url && (
            <div>
              <p className="text-xs font-bold uppercase text-slate-500">Photo</p>
              <img src={profile.profilePicture.url} alt="Profile" className="mt-2 h-24 w-24 rounded-md object-cover" />
            </div>
          )}
          {profile.documents?.length > 0 && (
            <div className="md:col-span-2">
              <p className="text-xs font-bold uppercase text-slate-500">Documents</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {profile.documents.map((document) => (
                  <a
                    key={document.publicId || document.url}
                    href={document.url}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-md bg-light_theme px-3 py-2 text-sm font-semibold text-dark_theme"
                  >
                    {document.name || "Document"}
                  </a>
                ))}
              </div>
            </div>
          )}
          {profile.address && (
            <div className="md:col-span-2">
              <p className="text-xs font-bold uppercase text-slate-500">Address</p>
              <p className="text-slate-700">
                {[profile.address.line1, profile.address.city, profile.address.country, profile.address.pincode]
                  .filter(Boolean)
                  .join(", ")}
              </p>
            </div>
          )}
          {profile.availability?.length > 0 && (
            <div className="md:col-span-2">
              <p className="text-xs font-bold uppercase text-slate-500">Availability</p>
              <div className="mt-2 grid gap-2">
                {profile.availability.map((item) => (
                  <p key={item.day} className="text-slate-700">
                    <span className="font-bold">{item.day}:</span> {item.slots?.join(", ")}
                  </p>
                ))}
              </div>
            </div>
          )}
          </div>
      </Card>
    </section>
  );
}

export default ProfilePage;
