import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Edit2, MapPin, UserCircle } from "lucide-react";
import { Button, Card, Input, Select, Textarea } from "../../../shared/components/ui";
import { Context } from "../../../shared/context/AppContext.jsx";
import { getCurrentUser, updateCurrentUser } from "../api/authApi.js";

const dateForInput = (value) => (value ? new Date(value).toISOString().split("T")[0] : "");
const formatDate = (value) => (value ? new Date(value).toLocaleDateString() : "-");
const displayValue = (value) => value || "-";

const getProfileImageUrl = (profile = {}) => {
  if (!profile) return "";

  if (typeof profile.profilePicture === "string") return profile.profilePicture;
  if (typeof profile.profilePicture?.url === "string") return profile.profilePicture.url;
  if (typeof profile.docAvatar === "string") return profile.docAvatar;
  if (typeof profile.avatar === "string") return profile.avatar;

  return "";
};

const getStoredUser = () => {
  try {
    return JSON.parse(localStorage.getItem("user") || "{}");
  } catch {
    return {};
  }
};

const profileToForm = (profile = {}) => ({
  firstName: profile.firstName || "",
  lastName: profile.lastName || "",
  email: profile.email || "",
  phone: profile.phone || "",
  gender: profile.gender || "",
  dob: dateForInput(profile.dob),
  addressLine1: profile.address?.line1 || "",
  addressCity: profile.address?.city || "",
  addressCountry: profile.address?.country || "",
  addressPincode: profile.address?.pincode || "",
  qualification: profile.qualification || "",
  specialization: profile.specialization || "",
  hospital: profile.hospital || "",
  clinic: profile.clinic || "",
  fee: profile.fee ?? "",
  biography: profile.biography || "",
  licenseNumber: profile.licenseNumber || "",
  profilePicture: null,
});

const formToPayload = (form, role) => {
  const payload = {
    firstName: form.firstName,
    lastName: form.lastName,
    phone: form.phone,
    gender: form.gender || undefined,
    address: {
      line1: form.addressLine1,
      city: form.addressCity,
      country: form.addressCountry,
      pincode: form.addressPincode,
    },
  };

  if (role !== "Doctor") {
    payload.dob = form.dob || undefined;
    return payload;
  }

  return {
    ...payload,
    qualification: form.qualification,
    specialization: form.specialization,
    hospital: form.hospital,
    clinic: form.clinic,
    fee: form.fee === "" ? undefined : Number(form.fee),
    biography: form.biography,
    licenseNumber: form.licenseNumber,
  };
};

const appendProfilePayload = (form, role) => {
  const payload = formToPayload(form, role);
  const formData = new FormData();

  Object.entries(payload).forEach(([key, value]) => {
    if (value === undefined || value === null) return;

    if (key === "address") {
      formData.append(key, JSON.stringify(value));
      return;
    }

    formData.append(key, value);
  });

  if (form.profilePicture) {
    formData.append("profilePicture", form.profilePicture);
  }

  return formData;
};

function ProfilePage() {
  const { user, setUser } = useContext(Context);
  const activeUser = user?.role ? user : getStoredUser();
  const [profile, setProfile] = useState(activeUser || {});
  const [form, setForm] = useState(() => profileToForm(activeUser));
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(activeUser?.profilePicture?.url || "");

  useEffect(() => {
    if (!activeUser?.role) return;

    getCurrentUser(activeUser.role)
      .then((data) => {
        if (data) {
          setProfile(data);
          setForm(profileToForm(data));
          setPreviewUrl(data?.profilePicture?.url || "");
          setUser(data);
          localStorage.setItem("user", JSON.stringify(data));
        }
      })
      .catch((error) => toast.error(error.response?.data?.message || "Failed to load profile"));
  }, [activeUser?.role, setUser]);

  useEffect(() => {
    return () => {
      if (previewUrl?.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleChange = (event) => {
    const { name, value, files, type } = event.target;
    if (type === "file") {
      const selectedFile = files?.[0] || null;
      setForm((current) => ({ ...current, [name]: selectedFile }));

      setPreviewUrl((current) => {
        if (current?.startsWith("blob:")) {
          URL.revokeObjectURL(current);
        }

        if (!selectedFile) {
          return profile?.profilePicture?.url || "";
        }

        return URL.createObjectURL(selectedFile);
      });
      return;
    }

    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setIsSaving(true);
      const updatedProfile = await updateCurrentUser(activeUser.role, appendProfilePayload(form, activeUser.role));
      if (updatedProfile) {
        setProfile(updatedProfile);
        setForm(profileToForm(updatedProfile));
        setPreviewUrl(updatedProfile?.profilePicture?.url || "");
        setUser(updatedProfile);
        localStorage.setItem("user", JSON.stringify(updatedProfile));
      }
      setIsEditing(false);
      toast.success("Profile updated");
    } catch (error) {
      const validationMessage = error.response?.data?.errors?.[0]?.message;
      toast.error(validationMessage || error.response?.data?.message || error.message || "Failed to update profile");
    } finally {
      setIsSaving(false);
    }
  };

  const isDoctor = activeUser?.role === "Doctor";
  const imageUrl = getProfileImageUrl(profile) || previewUrl;
  const fullName = `${displayValue(profile.firstName)} ${displayValue(profile.lastName)}`.trim();
  const location = [
    profile.address?.city,
    profile.address?.country,
  ].filter(Boolean).join(", ");

  const handleCancel = () => {
    setForm(profileToForm(profile));
    setPreviewUrl(profile?.profilePicture?.url || "");
    setIsEditing(false);
  };

  const InfoItem = ({ label, value }) => (
    <div>
      <p className="mb-2 text-sm font-semibold text-slate-500">{label}</p>
      <p className="text-base font-bold text-slate-800">{displayValue(value)}</p>
    </div>
  );

  const SectionHeader = ({ title }) => (
    <div className="mb-8">
      <h2 className="text-xl font-black text-dark_theme">{title}</h2>
    </div>
  );

  return (
    <section className="mx-auto my-8 max-w-6xl px-4">
      <div className="mb-6 flex items-center justify-between gap-4">
        <h1 className="text-2xl font-black text-slate-900">My Profile</h1>
        {!isEditing && (
          <button
            type="button"
            onClick={() => setIsEditing(true)}
            className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-bold text-white shadow-sm hover:bg-blue-700"
          >
            Edit
            <Edit2 size={15} />
          </button>
        )}
      </div>

      <Card className="mb-6 border-none bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-5 md:flex-row md:items-center">
          <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-full bg-light_theme text-dark_theme">
            {imageUrl ? (
              <img src={imageUrl} alt="Profile" className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <UserCircle size={72} />
              </div>
            )}
          </div>
          <div>
            <h2 className="text-xl font-black text-dark_theme">{fullName}</h2>
            <p className="mt-1 text-sm font-semibold text-slate-700">{displayValue(profile.role)}</p>
            <p className="mt-2 flex items-center gap-2 text-sm font-semibold text-slate-600">
              <MapPin size={16} />
              {location || displayValue(profile.address?.line1)}
            </p>
          </div>
        </div>
      </Card>

      {!isEditing ? (
        <div className="space-y-6">
          <Card className="border-none bg-white p-6 shadow-sm">
            <SectionHeader title="Personal Information" />
            <div className="grid gap-x-20 gap-y-8 md:grid-cols-3">
              <InfoItem label="First Name" value={profile.firstName} />
              <InfoItem label="Last Name" value={profile.lastName} />
              <InfoItem label="Date of Birth" value={!isDoctor ? formatDate(profile.dob) : undefined} />
              <InfoItem label="Email Address" value={profile.email} />
              <InfoItem label="Phone Number" value={profile.phone} />
              <InfoItem label="User Role" value={profile.role} />
              <InfoItem label="Gender" value={profile.gender} />
              {profile.status && <InfoItem label="Status" value={profile.status} />}
            </div>
          </Card>

          <Card className="border-none bg-white p-6 shadow-sm">
            <SectionHeader title="Address" />
            <div className="grid gap-x-20 gap-y-8 md:grid-cols-3">
              <InfoItem label="Address" value={profile.address?.line1} />
              <InfoItem label="City" value={profile.address?.city} />
              <InfoItem label="Country" value={profile.address?.country} />
              <InfoItem label="Postal Code" value={profile.address?.pincode} />
            </div>
          </Card>

          {isDoctor && (
            <Card className="border-none bg-white p-6 shadow-sm">
              <SectionHeader title="Doctor Details" />
              <div className="grid gap-x-20 gap-y-8 md:grid-cols-3">
                <InfoItem label="Qualification" value={profile.qualification} />
                <InfoItem label="Specialization" value={profile.specialization} />
                <InfoItem label="Hospital" value={profile.hospital} />
                <InfoItem label="Clinic" value={profile.clinic} />
                <InfoItem label="Fee" value={profile.fee !== undefined ? `Rs ${profile.fee}` : ""} />
                <InfoItem label="License Number" value={profile.licenseNumber} />
                <div className="md:col-span-3">
                  <InfoItem label="Biography" value={profile.biography} />
                </div>
              </div>
            </Card>
          )}
        </div>
      ) : (
        <Card className="border-none bg-white p-6 shadow-sm">
          <div className="mb-8 flex items-center justify-between gap-4">
            <h2 className="text-xl font-black text-dark_theme">Edit Profile</h2>
            <button
              type="button"
              onClick={handleCancel}
              className="rounded-md border border-slate-200 px-4 py-2 text-sm font-bold text-slate-600 hover:bg-slate-50"
            >
              Cancel
            </button>
          </div>

          <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
          <div className="md:col-span-2">
            <Input label="Profile Picture" type="file" name="profilePicture" onChange={handleChange} accept="image/*" />
            {(previewUrl || getProfileImageUrl(profile)) && (
              <div className="mt-3 flex items-center gap-3 rounded-md border border-slate-200 bg-slate-50 p-3">
                <img src={previewUrl || getProfileImageUrl(profile)} alt="Profile preview" className="h-16 w-16 rounded-full object-cover" />
                <p className="text-sm font-semibold text-slate-600">Preview of selected image</p>
              </div>
            )}
          </div>
          <Input label="First Name" name="firstName" value={form.firstName} onChange={handleChange} minLength={2} required />
          <Input label="Last Name" name="lastName" value={form.lastName} onChange={handleChange} minLength={2} required />
          <Input label="Email" type="email" name="email" value={form.email} disabled inputClassName="bg-slate-100 text-slate-500" />
          <Input label="Phone" name="phone" value={form.phone} onChange={handleChange} pattern="^(?:(?:(?:\\+|00)92)?|0)3[0-9]{9}$" placeholder="03001234567" required />
          <Select label="Gender" name="gender" value={form.gender} onChange={handleChange}>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </Select>
          {!isDoctor && <Input label="Date of Birth" type="date" name="dob" value={form.dob} onChange={handleChange} />}
          <Input label="Address" name="addressLine1" value={form.addressLine1} onChange={handleChange} className="md:col-span-2" />
          <Input label="City" name="addressCity" value={form.addressCity} onChange={handleChange} />
          <Input label="Country" name="addressCountry" value={form.addressCountry} onChange={handleChange} />
          <Input label="Postal Code" name="addressPincode" value={form.addressPincode} onChange={handleChange} />

          {isDoctor && (
            <>
              <Input label="Qualification" name="qualification" value={form.qualification} onChange={handleChange} />
              <Input label="Specialization" name="specialization" value={form.specialization} onChange={handleChange} />
              <Input label="Hospital" name="hospital" value={form.hospital} onChange={handleChange} />
              <Input label="Clinic" name="clinic" value={form.clinic} onChange={handleChange} />
              <Input label="Fee" type="number" min="0" name="fee" value={form.fee} onChange={handleChange} />
              <Input label="License Number" name="licenseNumber" value={form.licenseNumber} onChange={handleChange} />
              <Textarea label="Biography" name="biography" value={form.biography} onChange={handleChange} rows={4} className="md:col-span-2" />
            </>
          )}

          <div className="md:col-span-2">
            <p className="mb-3 text-sm text-slate-500">
              Role: <span className="font-bold text-slate-700">{profile.role}</span>
              {profile.status && <span> | Status: <span className="font-bold text-slate-700">{profile.status}</span></span>}
            </p>
            <Button type="submit" disabled={isSaving}>
              {isSaving ? "Saving..." : "Save Profile"}
            </Button>
          </div>
        </form>
        </Card>
      )}
    </section>
  );
}

export default ProfilePage;
