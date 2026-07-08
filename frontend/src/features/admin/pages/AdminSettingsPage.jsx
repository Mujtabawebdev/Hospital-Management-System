import React, { useState } from "react";
import { toast } from "react-toastify";
import { Button, Card, Input } from "../../../shared/components/ui";
import AdminSidebar from "../components/AdminSidebar.jsx";
import { createAdminAccount } from "../api/adminAccountApi.js";

const initialForm = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  password: "",
};

function AdminSettingsPage() {
  const [form, setForm] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setSubmitting(true);
      await createAdminAccount(form);
      toast.success("Admin account created");
      setForm(initialForm);
    } catch (error) {
      const validationMessage = error.response?.data?.errors?.[0]?.message;
      toast.error(validationMessage || error.response?.data?.message || "Failed to create admin");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 md:flex">
      <AdminSidebar />
      <main className="flex-1 p-4 md:p-8">
        <div className="mb-6">
          <h1 className="text-3xl font-black text-slate-900">Admin Settings</h1>
          <p className="mt-2 text-slate-600">Create another admin account.</p>
        </div>

        <Card className="max-w-3xl p-6">
          <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
            <Input label="First Name" name="firstName" value={form.firstName} onChange={handleChange} minLength={2} required />
            <Input label="Last Name" name="lastName" value={form.lastName} onChange={handleChange} minLength={2} required />
            <Input label="Email" type="email" name="email" value={form.email} onChange={handleChange} required />
            <Input label="Phone" name="phone" value={form.phone} onChange={handleChange} minLength={7} maxLength={20} required />
            <Input label="Password" type="password" name="password" value={form.password} onChange={handleChange} minLength={8} required />
            <div className="flex items-end">
              <Button type="submit" disabled={submitting}>
                {submitting ? "Creating..." : "Create Admin"}
              </Button>
            </div>
          </form>
        </Card>
      </main>
    </div>
  );
}

export default AdminSettingsPage;
