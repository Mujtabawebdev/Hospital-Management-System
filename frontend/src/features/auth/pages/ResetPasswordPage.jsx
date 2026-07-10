import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../../shared/api/httpClient.jsx";
import { Button, Input, Select } from "../../../shared/components/ui";

export default function ResetPasswordPage() {
  const { state } = useLocation(); const navigate = useNavigate();
  const [email, setEmail] = useState(state?.email || ""); const [role, setRole] = useState(state?.role || "Patient");
  const [otp, setOtp] = useState(""); const [resetToken, setResetToken] = useState(""); const [password, setPassword] = useState(""); const [confirmPassword, setConfirmPassword] = useState("");
  const verifyOtp = async (event) => { event.preventDefault(); try { const { data } = await api.post("/user/forgot-password/verify", { email, role, otp }); setResetToken(data.data.resetToken); toast.success(data.message); } catch (error) { toast.error(error.response?.data?.message || "OTP verification failed"); } };
  const savePassword = async (event) => { event.preventDefault(); if (password !== confirmPassword) return toast.error("Passwords do not match"); try { const { data } = await api.post("/user/reset-password", { email, role, resetToken, password, confirmPassword }); toast.success(data.message); navigate("/login", { replace: true }); } catch (error) { toast.error(error.response?.data?.message || "Password reset failed"); } };
  return <main className="flex min-h-screen items-center justify-center bg-blue-50 px-4"><form onSubmit={resetToken ? savePassword : verifyOtp} className="w-full max-w-md space-y-4 rounded-2xl bg-white p-8 shadow-xl"><h1 className="text-2xl font-black">{resetToken ? "Create new password" : "Verify reset OTP"}</h1>{!resetToken ? <><Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required /><Select label="Account type" value={role} onChange={(e) => setRole(e.target.value)}><option value="Patient">Patient</option><option value="Doctor">Doctor</option></Select><Input label="6-digit OTP" inputMode="numeric" pattern="[0-9]{6}" maxLength={6} value={otp} onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))} required /><Button type="submit" className="w-full">Verify OTP</Button></> : <><Input label="New password" type="password" minLength={8} value={password} onChange={(e) => setPassword(e.target.value)} required /><Input label="Confirm password" type="password" minLength={8} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required /><Button type="submit" className="w-full">Reset password</Button></>}<Link to="/login" className="block text-center font-bold text-blue-600">Back to login</Link></form></main>;
}
