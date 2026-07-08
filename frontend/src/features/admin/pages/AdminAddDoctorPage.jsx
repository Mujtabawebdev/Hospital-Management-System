import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Button, Card, Input, Select, Textarea } from "../../../shared/components/ui";
import AdminSidebar from "../components/AdminSidebar.jsx";
import { createAdminDoctor } from "../api/adminDoctorApi.js";
import { fetchSpecialties } from "../../specialities/api";
import { getSpecialityOptions } from "../../specialities/data/specialities";

const initialForm = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  password: "",
  gender: "",
  qualification: "",
  specialization: "",
  experience: "",
  hospital: "",
  clinic: "",
  fee: "",
  licenseNumber: "",
  address: "",
  city: "",
  country: "",
  pincode: "",
  biography: "",
  availableDay: "Monday",
  availableSlots: "",
  profilePicture: null,
  documents: [],
};

const appendDoctorForm = (form) => {
  const payload = new FormData();
  const availability = [
    {
      day: form.availableDay,
      slots: form.availableSlots
        .split(",")
        .map((slot) => slot.trim())
        .filter(Boolean),
    },
  ];
  const address = {
    line1: form.address,
    city: form.city,
    country: form.country,
    pincode: form.pincode,
  };

  [
    "firstName",
    "lastName",
    "email",
    "phone",
    "password",
    "gender",
    "qualification",
    "specialization",
    "experience",
    "hospital",
    "clinic",
    "fee",
    "licenseNumber",
    "biography",
  ].forEach((field) => {
    if (form[field] !== "") payload.append(field, form[field]);
  });

  payload.append("address", JSON.stringify(address));
  payload.append("availability", JSON.stringify(availability));

  if (form.profilePicture) payload.append("profilePicture", form.profilePicture);
  form.documents.forEach((document) => payload.append("documents", document));

  return payload;
};

function AdminAddDoctorPage() {
  const [form, setForm] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [previewUrl, setPreviewUrl] = useState("");
  const [specialityOptions, setSpecialityOptions] = useState(getSpecialityOptions());

  useEffect(() => {
    let isMounted = true;

    fetchSpecialties()
      .then((items) => {
        if (isMounted) setSpecialityOptions(getSpecialityOptions(items));
      })
      .catch(() => {
        if (isMounted) setSpecialityOptions(getSpecialityOptions());
      });

    return () => {
      isMounted = false;
    };
  }, []);

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
      if (name === "profilePicture") {
        const selectedFile = files?.[0] || null;

        setPreviewUrl((current) => {
          if (current?.startsWith("blob:")) {
            URL.revokeObjectURL(current);
          }

          return selectedFile ? URL.createObjectURL(selectedFile) : "";
        });
      }

      setForm((current) => ({
        ...current,
        [name]: name === "documents" ? Array.from(files || []) : files?.[0] || null,
      }));
      return;
    }

    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (form.biography.trim().length < 20) {
      toast.error("Biography must contain at least 20 characters");
      return;
    }

    if (!form.availableSlots.trim()) {
      toast.error("Please add at least one available slot");
      return;
    }

    try {
      setSubmitting(true);
      await createAdminDoctor(appendDoctorForm(form));
      toast.success("Doctor created and approved");
      setForm(initialForm);
      setPreviewUrl("");
      event.target.reset();
    } catch (error) {
      const validationMessage = error.response?.data?.errors?.[0]?.message;
      toast.error(validationMessage || error.response?.data?.message || "Failed to create doctor");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 md:flex">
      <AdminSidebar />
      <main className="flex-1 p-4 md:p-8">
        <div className="mb-6">
          <h1 className="text-3xl font-black text-slate-900">Add Doctor</h1>
          <p className="mt-2 text-slate-600">Create an approved doctor account directly.</p>
        </div>

        <Card className="p-6">
          <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <Input label="First Name" name="firstName" value={form.firstName} onChange={handleChange} minLength={2} required />
            <Input label="Last Name" name="lastName" value={form.lastName} onChange={handleChange} minLength={2} required />
            <Input label="Email" type="email" name="email" value={form.email} onChange={handleChange} required />
            <Input label="Phone" name="phone" value={form.phone} onChange={handleChange} minLength={7} maxLength={20} required />
            <Input label="Password" type="password" name="password" value={form.password} onChange={handleChange} minLength={8} required />
            <Select label="Gender" name="gender" value={form.gender} onChange={handleChange} required>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </Select>
            <Input label="Qualification" name="qualification" value={form.qualification} onChange={handleChange} minLength={2} required />
            <Select label="Specialization" name="specialization" value={form.specialization} onChange={handleChange} required>
              <option value="">Select Specialization</option>
              {specialityOptions.map((speciality) => (
                <option key={speciality} value={speciality}>
                  {speciality}
                </option>
              ))}
            </Select>
            <Input label="Experience" type="number" min="0" max="70" name="experience" value={form.experience} onChange={handleChange} required />
            <Input label="Hospital" name="hospital" value={form.hospital} onChange={handleChange} minLength={2} required />
            <Input label="Clinic" name="clinic" value={form.clinic} onChange={handleChange} />
            <Input label="Consultation Fee" type="number" min="0" name="fee" value={form.fee} onChange={handleChange} required />
            <Input label="License Number" name="licenseNumber" value={form.licenseNumber} onChange={handleChange} minLength={3} required />
            <Input label="Address" name="address" value={form.address} onChange={handleChange} minLength={2} required />
            <Input label="City" name="city" value={form.city} onChange={handleChange} required />
            <Input label="Country" name="country" value={form.country} onChange={handleChange} required />
            <Input label="Pincode" name="pincode" value={form.pincode} onChange={handleChange} required />
            <Select label="Available Day" name="availableDay" value={form.availableDay} onChange={handleChange} required>
              <option value="Monday">Monday</option>
              <option value="Tuesday">Tuesday</option>
              <option value="Wednesday">Wednesday</option>
              <option value="Thursday">Thursday</option>
              <option value="Friday">Friday</option>
              <option value="Saturday">Saturday</option>
              <option value="Sunday">Sunday</option>
            </Select>
            <Input label="Available Slots" name="availableSlots" value={form.availableSlots} onChange={handleChange} placeholder="10:00 AM, 11:30 AM" required />
            <div className="md:col-span-2 xl:col-span-4">
              <Input label="Profile Picture" type="file" name="profilePicture" onChange={handleChange} accept="image/*" />
              {previewUrl && (
                <div className="mt-3 flex items-center gap-3 rounded-md border border-slate-200 bg-slate-50 p-3">
                  <img src={previewUrl} alt="Profile preview" className="h-16 w-16 rounded-full object-cover" />
                  <p className="text-sm font-semibold text-slate-600">Preview of selected image</p>
                </div>
              )}
            </div>
            <Input label="Documents" type="file" name="documents" onChange={handleChange} multiple />
            <Textarea label="Biography" name="biography" value={form.biography} onChange={handleChange} rows={4} className="md:col-span-2 xl:col-span-4" minLength={20} required />
            <div className="md:col-span-2 xl:col-span-4">
              <Button type="submit" disabled={submitting}>
                {submitting ? "Creating..." : "Create Approved Doctor"}
              </Button>
            </div>
          </form>
        </Card>
      </main>
    </div>
  );
}

export default AdminAddDoctorPage;
