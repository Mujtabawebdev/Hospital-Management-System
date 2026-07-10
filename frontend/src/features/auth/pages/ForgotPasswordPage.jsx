import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../../shared/api/httpClient.jsx";
import { Button, Input, Select } from "../../../shared/components/ui";

export default function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Patient");
  const [loading, setLoading] = useState(false);
  const submit = async (event) => { event.preventDefault(); try { setLoading(true); const { data } = await api.post("/user/forgot-password", { email, role }); toast.success(data.message); navigate("/reset-password", { state: { email, role } }); } catch (error) { toast.error(error.response?.data?.message || "Could not send reset OTP"); } finally { setLoading(false); } };
  return <main className="flex min-h-screen items-center justify-center bg-blue-50 px-4"><form onSubmit={submit} className="w-full max-w-md space-y-4 rounded-2xl bg-white p-8 shadow-xl"><h1 className="text-2xl font-black">Forgot password</h1><p className="text-slate-600">Enter your registered email to receive a reset OTP.</p><Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required /><Select label="Account type" value={role} onChange={(e) => setRole(e.target.value)}><option value="Patient">Patient</option><option value="Doctor">Doctor</option></Select><Button type="submit" disabled={loading} className="w-full">{loading ? "Sending..." : "Send reset OTP"}</Button><Link to="/login" className="block text-center font-bold text-blue-600">Back to login</Link></form></main>;
}
