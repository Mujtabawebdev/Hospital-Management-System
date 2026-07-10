import React, { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../../shared/api/httpClient.jsx";
import { Button, Input } from "../../../shared/components/ui";
import { Context } from "../../../shared/context/AppContext.jsx";

export default function VerifyEmailPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { setUser, setIsAuthenticated } = useContext(Context);
  const [otp, setOtp] = useState("");
  const { email, role } = state || {};
  const verify = async (event) => { event.preventDefault(); try { const { data } = await api.post("/user/verify-email", { email, role, otp }); setUser(data.data.user); setIsAuthenticated(true); toast.success(data.message); navigate("/", { replace: true }); } catch (error) { toast.error(error.response?.data?.message || "Verification failed"); } };
  if (!email || !role) return <main className="p-10 text-center">Please register first to verify your email.</main>;
  return <main className="flex min-h-screen items-center justify-center bg-blue-50 px-4"><form onSubmit={verify} className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl"><h1 className="text-2xl font-black">Verify your email</h1><p className="my-4 text-slate-600">Enter the 6-digit code sent to {email}.</p><Input label="Verification code" inputMode="numeric" pattern="[0-9]{6}" maxLength={6} value={otp} onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))} placeholder="123456" required /><Button type="submit" className="mt-5 w-full">Verify email</Button><Button type="button" variant="secondary" className="mt-3 w-full" onClick={async () => { try { const { data } = await api.post("/user/resend-otp", { email, role }); toast.success(data.message); } catch (error) { toast.error(error.response?.data?.message || "Could not resend code"); } }}>Resend OTP</Button></form></main>;
}
