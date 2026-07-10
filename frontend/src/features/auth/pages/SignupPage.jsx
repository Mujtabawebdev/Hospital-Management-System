import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Lottie from "react-lottie";
import animationData from "../../../lottie-animation/loginAnimation.json"; // Replace with your Lottie animation file
import api from "../../../shared/api/httpClient";
import { Button, Input, Select } from "../../../shared/components/ui";

function SignupPage() {
  const navigate = useNavigate();
  const [strength, setStrength] = useState(0);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    address: "",
    phone: "",
    email: "",
    gender: "",
    password: "",
    cpassword: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const { password, cpassword, ...data } = formData;
    if (password !== cpassword) {
      toast.error("Passwords do not match!");
      return;
    }
    if (password.length < 8) {
      toast.error("Password must contain at least 8 characters");
      return;
    }
    console.log("Form data", formData);

    try {
      const payload = {
        ...data,
        address: data.address ? { line1: data.address } : undefined,
        password,
      };
      const response = await api.post("/user/patient/register", payload);
      toast.success(response.data?.message || "Account created successfully!");
      navigate("/verify-email", { state: response.data?.data });
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      const validationMessage = error.response?.data?.errors?.[0]?.message;
      toast.error(validationMessage || error.response?.data?.message || "Signup failed");
    }
  };

  useEffect(() => {
    checkStrength(formData.password);
  }, [formData.password]);

  const checkStrength = (password) => {
    let strength = 0;

    if (password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)) {
      strength += 1;
    }
    if (password.match(/([0-9])/)) {
      strength += 1;
    }
    if (password.match(/([!,%,&,@,#,$,^,*,?,_,~])/)) {
      strength += 1;
    }
    if (password.length > 7) {
      strength += 1;
    }

    setStrength(strength);
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
          <h1 className="font-bold text-3xl text-center mb-6">Signup</h1>
          <form className="flex flex-col" onSubmit={handleSignup}>
            <div className="flex flex-wrap -mx-2">
              <div className="w-1/2 px-2 mb-4">
                <Input
                  label="First Name:"
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  id="firstName"
                  required
                />
              </div>
              <div className="w-1/2 px-2 mb-4">
                <Input
                  label="Last Name:"
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  id="lastName"
                  required
                />
              </div>
              <div className="w-1/2 px-2 mb-4">
                <Input
                  label="Date of Birth:"
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleInputChange}
                  id="dob"
                  required
                />
              </div>
              <div className="w-1/2 px-2 mb-4">
                <Input
                  label="Address:"
                  type="text"
                  name="address"
                  placeholder="Address"
                  value={formData.address}
                  onChange={handleInputChange}
                  id="address"
                  required
                />
              </div>
              <div className="w-1/2 px-2 mb-4">
                <Input
                  label="Phone Number:"
                  type="tel"
                  name="phone"
                  placeholder="03001234567 (11 digits)"
                  pattern="^(?:(?:(?:\\+|00)92)?|0)3[0-9]{9}$"
                  value={formData.phone}
                  onChange={(e) => setFormData((current) => ({ ...current, phone: e.target.value.replace(/\D/g, "") }))}
                  id="phone"
                  required
                />
              </div>
              <div className="w-1/2 px-2 mb-4">
                <Input
                  label="Email:"
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  id="email"
                  required
                />
              </div>
              <div className="w-1/2 px-2 mb-4">
                <Select
                  label="Gender:"
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  id="gender"
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </Select>
              </div>
              <div className="w-1/2 px-2 mb-4">
                <Input
                  label="Password:"
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleInputChange}
                  id="password"
                  minLength={8}
                  required
                />
              </div>
              <div className="w-1/2 px-2 mb-4">
                <Input
                  label="Confirm Password:"
                  type="password"
                  name="cpassword"
                  placeholder="Confirm Password"
                  value={formData.cpassword}
                  onChange={handleInputChange}
                  id="cpassword"
                  minLength={8}
                  required
                />
              </div>
            </div>
            <div className="m-2 flex flex-col-reverse md:flex-row-reverse items-center">
              <div className="w-1/2">
                <div
                  style={{
                    height: "10px",
                    width: `${strength * 25}%`,
                    backgroundColor:
                      strength === 0
                        ? "#dbeafe"
                        : strength === 1
                        ? "#93c5fd"
                        : strength === 2
                        ? "#60a5fa"
                        : strength === 3
                        ? "#3b82f6"
                        : "#2563eb",
                  }}
                ></div>
              </div>
              <div className="w-1/2 flex items-center justify-around mt-4 md:mt-0">
                {["Weak", "Fair", "Good", "Strong"].map((label, index) => (
                  <div
                    key={index}
                    className={`text-sm ${index < strength ? "font-bold" : ""}`}
                  >
                    {label}
                  </div>
                ))}
              </div>
            </div>
            <Button type="submit" className="mt-4">
              Create New Account
            </Button>
            <Link to="/login">
              <p
                className="my-3 p-1 text-blue-600 hover:underline md:p-0"
              >
                Already have an account?
              </p>
            </Link>{" "}
            <Link to="/doctor/signup">
              <p
                className="my-3 p-1 text-blue-600 hover:underline md:p-0"
              >
                Register as Doctor
              </p>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
