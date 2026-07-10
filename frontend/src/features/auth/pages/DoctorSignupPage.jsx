import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../../shared/api/httpClient";
import { Button, Input, Select, Textarea } from "../../../shared/components/ui";
import { fetchSpecialties } from "../../specialities/api";
import { getSpecialityOptions } from "../../specialities/data/specialities";


const initialForm = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  password: "",
  cpassword: "",
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
  startTime: "",
  endTime: "",
  profilePicture: null,
  documents: [],
};

const formatApiError = (error) => {
  const errors = error.response?.data?.errors || [];

  if (errors.length > 0) {
    return errors
      .map((item) => {
        const field = item.path?.replace("body.", "");
        return field ? `${field}: ${item.message}` : item.message;
      })
      .join(", ");
  }

  return error.response?.data?.message || "Doctor signup failed";
};

function DoctorSignupPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialForm);
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



  const handleInputChange = (event) => {
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

      setFormData((current) => ({
        ...current,
        [name]: name === "documents" ? Array.from(files || []) : files?.[0] || null,
      }));
      return;
    }

    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleDoctorSignup = async (event) => {
    event.preventDefault();

    if (formData.password !== formData.cpassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (formData.biography.trim().length < 20) {
      toast.error("Biography must contain at least 20 characters");
      return;
    }

    if (!formData.startTime || !formData.endTime || formData.startTime >= formData.endTime) {
      toast.error("Please choose a valid available time range");
      return;
    }

    const payload = new FormData();
    const address = {
      line1: formData.address,
      city: formData.city,
      country: formData.country,
      pincode: formData.pincode,
    };
    const availability = [{ day: formData.availableDay, slots: [`${formData.startTime} - ${formData.endTime}`] }];

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
      if (formData[field] !== "") {
        payload.append(field, formData[field]);
      }
    });

    payload.append("address", JSON.stringify(address));
    payload.append("availability", JSON.stringify(availability));

    if (formData.profilePicture) {
      payload.append("profilePicture", formData.profilePicture);
    }

    formData.documents.forEach((document) => {
      payload.append("documents", document);
    });

    try {
      setSubmitting(true);
      const response = await api.post("/user/doctor/register", payload);
      toast.success(response.data?.message || "Doctor registration submitted for approval");
      navigate("/verify-email", { state: response.data?.data });
    } catch (error) {
      toast.error(formatApiError(error));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-light_theme/60 px-4 py-10">
      <section className="mx-auto max-w-5xl rounded-md bg-white p-6 shadow-lg md:p-8">
        <div className="mb-6">
          <h1 className="text-3xl font-black text-slate-900">Doctor Registration</h1>
          <p className="mt-2 text-sm text-slate-600">
            Your profile will be sent to admin for approval before you can login.
          </p>
        </div>

        <form onSubmit={handleDoctorSignup} className="grid gap-4 md:grid-cols-2">
          <Input label="First Name" name="firstName" value={formData.firstName} onChange={handleInputChange} minLength={2} required />
          <Input label="Last Name" name="lastName" value={formData.lastName} onChange={handleInputChange} minLength={2} required />
          <Input label="Email" type="email" name="email" value={formData.email} onChange={handleInputChange} required />
          <Input label="Phone" type="tel" inputMode="numeric" name="phone" value={formData.phone} onChange={(e) => setFormData((current) => ({ ...current, phone: e.target.value.replace(/\D/g, "") }))} pattern="03[0-9]{9}" maxLength={11} placeholder="03001234567 (11 digits)" required />
          <Input label="Password" type="password" name="password" value={formData.password} onChange={handleInputChange} minLength={8} required />
          <Input label="Confirm Password" type="password" name="cpassword" value={formData.cpassword} onChange={handleInputChange} minLength={8} required />

          <Select label="Gender" name="gender" value={formData.gender} onChange={handleInputChange} required>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </Select>
          <Input label="Qualification" name="qualification" value={formData.qualification} onChange={handleInputChange} minLength={2} maxLength={200} placeholder="MBBS, FCPS" required />
          <Select label="Specialization" name="specialization" value={formData.specialization} onChange={handleInputChange} required>
            <option value="">Select Specialization</option>
            {specialityOptions.map((speciality) => (
              <option key={speciality} value={speciality}>
                {speciality}
              </option>
            ))}
          </Select>
          <Input label="Experience (Years)" type="number" min="0" max="70" name="experience" value={formData.experience} onChange={handleInputChange} required />
          <Input label="Hospital" name="hospital" value={formData.hospital} onChange={handleInputChange} minLength={2} maxLength={160} required />
          <Input label="Clinic" name="clinic" value={formData.clinic} onChange={handleInputChange} maxLength={160} />
          <Input label="Consultation Fee (PKR)" type="number" min="0" name="fee" value={formData.fee} onChange={handleInputChange} required />
          <Input label="License Number" name="licenseNumber" value={formData.licenseNumber} onChange={handleInputChange} minLength={3} maxLength={80} required />
          <Input label="Address" name="address" value={formData.address} onChange={handleInputChange} minLength={2} maxLength={160} required />
          <Input label="City" name="city" value={formData.city} onChange={handleInputChange} maxLength={80} required />
          <Input label="Country" name="country" value={formData.country} onChange={handleInputChange} maxLength={80} required />
          <Input label="Postal Code" name="pincode" value={formData.pincode} onChange={handleInputChange} maxLength={20} required />

          <Select label="Available Day" name="availableDay" value={formData.availableDay} onChange={handleInputChange} required>
            <option value="Monday">Monday</option>
            <option value="Tuesday">Tuesday</option>
            <option value="Wednesday">Wednesday</option>
            <option value="Thursday">Thursday</option>
            <option value="Friday">Friday</option>
            <option value="Saturday">Saturday</option>
            <option value="Sunday">Sunday</option>
          </Select>
          <Select label="From" name="startTime" value={formData.startTime} onChange={handleInputChange} required>
            <option value="">Start time</option>{Array.from({ length: 24 }, (_, i) => `${String(i).padStart(2, "0")}:00`).map((time) => <option key={time}>{time}</option>)}
          </Select>
          <Select label="To" name="endTime" value={formData.endTime} onChange={handleInputChange} required>
            <option value="">End time</option>{Array.from({ length: 24 }, (_, i) => `${String(i).padStart(2, "0")}:00`).map((time) => <option key={time}>{time}</option>)}
          </Select>
          <div className="md:col-span-2">
            <Input label="Profile Picture" type="file" name="profilePicture" onChange={handleInputChange} accept="image/*" />
            {previewUrl && (
              <div className="mt-3 flex items-center gap-3 rounded-md border border-slate-200 bg-slate-50 p-3">
                <img src={previewUrl} alt="Profile preview" className="h-16 w-16 rounded-full object-cover" />
                <p className="text-sm font-semibold text-slate-600">Preview of selected image</p>
              </div>
            )}
          </div>
          <Input label="Certificates or Degree" type="file" name="documents" onChange={handleInputChange} accept="application/pdf,image/*" />

          <Textarea
            label="Biography"
            name="biography"
            value={formData.biography}
            onChange={handleInputChange}
            rows={5}
            className="md:col-span-2"
            minLength={20}
            maxLength={2000}
            required
          />

          <div className="flex flex-col gap-3 md:col-span-2 md:flex-row md:items-center md:justify-between">
            <Link to="/signup" className="text-sm font-semibold text-dark_theme hover:underline">
              Register as patient
            </Link>
            <Button type="submit" disabled={submitting}>
              {submitting ? "Submitting..." : "Submit Doctor Registration"}
            </Button>
          </div>
        </form>
      </section>
    </main>
  );
}

export default DoctorSignupPage;
