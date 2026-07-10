import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Lottie from "react-lottie";
import animationData from "../../../lottie-animation/loginAnimation.json"; // Replace with your Lottie animation file
import api from "../../../shared/api/httpClient";
import { Button, Input, Select } from "../../../shared/components/ui";
import { Context } from "../../../shared/context/AppContext.jsx";

function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { setIsAuthenticated, setUser } = useContext(Context);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "Patient",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password, role } = formData;
    try {
      const response = await api.post("/user/login", {
        email,
        password,
        role,
      });
      const authData = response.data?.data;
      if (authData?.user) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setIsAuthenticated(true);
        setUser(authData.user);
        toast.success("Login successful");
        if (role === "Admin") {
          navigate("/admin");
          return;
        }
        if (role === "Doctor") {
          navigate("/doctor/dashboard");
          return;
        }
        navigate(location.state?.from?.pathname || "/", { replace: true });
      } else {
        toast.error("Login failed");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      const validationMessage = error.response?.data?.errors?.[0]?.message;
      toast.error(validationMessage || error.response?.data?.message || "Login failed");
    }
  };

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="flex h-screen bg-blue-50">
      <div className="w-1/2 flex justify-center items-center">
        <Lottie options={defaultOptions} height={400} width={400} />
      </div>
      <div className="w-1/2 flex flex-col justify-center items-center bg-white  shadow-lg p-8">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-bold text-center mb-6">Welcome back</h1>
          <h2 className="text-2xl text-center mb-6">Login your account</h2>
          <form
            className="flex flex-col"
            id="login-form"
            onSubmit={handleLogin}
          >
            <Input
              label="Email:"
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              id="email"
              required
              className="mb-4"
            />
            <Input
              label="Password:"
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              id="password"
              required
              className="mb-4"
            />
            <Select
              label="Login as:"
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              id="role"
              required
              className="mb-4"
            >
              <option value="Patient">Patient</option>
              <option value="Doctor">Doctor</option>
              <option value="Admin">Admin</option>
            </Select>
            <Button
              type="submit"
              className="mb-4"
            >
              Login
            </Button>
          </form>
          <div className="grid gap-2 text-sm sm:grid-cols-3">
            <Link
              to="/signup"
              className="rounded-xl border border-blue-200 px-3 py-2 text-center font-bold text-blue-600 hover:bg-blue-50"
            >
              Create Account
            </Link>
            <Link
              to="/doctor/signup"
              className="rounded-xl border border-blue-200 px-3 py-2 text-center font-bold text-blue-600 hover:bg-blue-50"
            >
              Register as Doctor
            </Link>
            <Link
              to="/"
              className="rounded-xl border border-blue-200 px-3 py-2 text-center font-bold text-blue-600 hover:bg-blue-50"
            >
              Forgot Password?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
