"use client";

import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Modal from "../PopAlert";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Staff");
  const [isLoading, setIsLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalType, setModalType] = useState<"success" | "error">("success");

  const router = useRouter();

  const showModal = (message: string, type: "success" | "error") => {
    setModalMessage(message);
    setModalType(type);
    setModalVisible(true);
  };

  const handleLogin = async () => {
    setIsLoading(true); // Show loader
    try {
      // Determine endpoint based on role
      const endpoint =
        role === "Company"
          ? "http://127.0.0.1:8000/api/company/login"
          : "http://127.0.0.1:8000/api/staff/login";

      // Make API call
      const response = await axios.post(endpoint, { email, password });

      const { accessToken, ...additionalData } = response.data;
      console.log("Login successful:", response.data);

      // Show success modal
      showModal("Login successful!", "success");

      // Store token and data in localStorage
      if (role === "Company") {
        const { companyId, companyName } = additionalData;
        localStorage.setItem("cpm", accessToken);
        localStorage.setItem("cmpx", companyId);
        localStorage.setItem("cmpxn", companyName);
        router.push("/cmpx/dashboard");
      } else if (role === "Staff") {
        const { staffId, clinicId, companyId, email, role } = additionalData;
        localStorage.setItem("stf", accessToken);
        localStorage.setItem("sttx", staffId);
        localStorage.setItem("sttxci", clinicId);
        localStorage.setItem("sttxcm", companyId);
        localStorage.setItem("sttxe", email);
        localStorage.setItem("sttxr", role);
        router.push("/sttx/addrecord");
      }
    } catch (error) {
      console.log("Error logging in:", error);

      // Show error modal
      showModal("Login failed. Please check your credentials.", "error");
    } finally {
      setIsLoading(false); // Hide loader
    }
  };
  return (
    <div className="flex w-full h-[100vh] overflow-hidden">
      {/* Left Section: Image */}
      <div className="hidden md:block w-1/2  bg-[url('/images/un4.jpg')] bg-cover bg-bottom relative">
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent z-10"></div>
        <div className="absolute inset-0 bg-black z-10 opacity-25"></div>

        {/* Text at the Bottom */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-20 text-center">
          <h2 className="text-6xl p-10 font-semibold"> Welcome back.</h2>
        </div>
      </div>

      {/* Right Section: Login Form */}
      <div className="w-full md:w-1/2 md:p-32 p-10 bg-white flex flex-col justify-center relative">
        {/* Title and SVG */}
        <div className="flex items-center mb-20">
          <h2 className="zen text-5xl text-[#356966] font-bold">Razari</h2>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="50"
            height="50"
            viewBox="0 0 24 24"
            className="ml-2"
          >
            <path
              fill="#ff8552"
              d="M8.47 9.353a5.88 5.88 0 0 1 5.883-5.882V2.294a7.06 7.06 0 0 0-7.059 7.059zm5.883-4.118a4.12 4.12 0 0 0-4.118 4.118H9.06a5.294 5.294 0 0 1 5.294-5.294zm0 1.765A2.353 2.353 0 0 0 12 9.353h-1.177a3.53 3.53 0 0 1 3.53-3.53zm-5.294 8.235a5.88 5.88 0 0 1-5.883-5.882H2a7.06 7.06 0 0 0 7.059 7.059zM4.94 9.353a4.12 4.12 0 0 0 4.118 4.118v1.176a5.294 5.294 0 0 1-5.294-5.294zm1.765 0a2.353 2.353 0 0 0 2.353 2.353v1.176a3.53 3.53 0 0 1-3.53-3.529zm8.235-.588a5.88 5.88 0 0 1 5.882 5.882H22a7.06 7.06 0 0 0-7.059-7.059zm4.118 5.882a4.117 4.117 0 0 0-4.118-4.118V9.353a5.294 5.294 0 0 1 5.294 5.294zm-1.765 0a2.353 2.353 0 0 0-2.353-2.353v-1.176a3.53 3.53 0 0 1 3.53 3.53zm-5.882 0A2.353 2.353 0 0 1 9.059 17v1.177a3.53 3.53 0 0 0 3.53-3.53zm1.764 0a4.12 4.12 0 0 1-4.117 4.118v1.176a5.294 5.294 0 0 0 5.294-5.294zM9.06 20.53a5.88 5.88 0 0 0 5.882-5.882h1.177a7.06 7.06 0 0 1-7.06 7.059z"
            />
          </svg>
        </div>

        {/* Welcome Text */}
        <p className="text-gray-500 mb-6">Enter your email and password</p>

        {/* Login Form */}
        <div>
          {/* Role Selection */}
          <div className="mb-4 relative">
            <label
              htmlFor="role"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Login as:
            </label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#356966]"
            >
              <option value="Company">Company</option>
              <option value="Staff">Staff</option>
            </select>
          </div>

          {/* Email Input */}
          <div className="mb-4 relative">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email
            </label>
            <div className="flex items-center border rounded-lg overflow-hidden">
              <div className="p-3 border-r bg-lime-50">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 36 36"
                >
                  <path
                    fill="#356966"
                    d="M32 6H4a2 2 0 0 0-2 2v20a2 2 0 0 0 2 2h28a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2m-1.54 22H5.66l7-7.24l-1.44-1.39L4 26.84V9.52l12.43 12.37a2 2 0 0 0 2.82 0L32 9.21v17.5l-7.36-7.36l-1.41 1.41ZM5.31 8h25.07L17.84 20.47Z"
                    className="clr-i-outline clr-i-outline-path-1"
                  />
                  <path fill="none" d="M0 0h36v36H0z" />
                </svg>
              </div>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 focus:outline-none"
                placeholder="Email"
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="mb-4 relative">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Password
            </label>
            <div className="flex items-center border rounded-lg overflow-hidden">
              <div className="p-3 border-r bg-lime-50">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <g fill="none" stroke="#356966">
                    <path
                      strokeWidth="1.5"
                      d="M2 16c0-2.828 0-4.243.879-5.121C3.757 10 5.172 10 8 10h8c2.828 0 4.243 0 5.121.879C22 11.757 22 13.172 22 16s0 4.243-.879 5.121C20.243 22 18.828 22 16 22H8c-2.828 0-4.243 0-5.121-.879C2 20.243 2 18.828 2 16Z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeWidth="1.5"
                      d="M6 10V8a6 6 0 1 1 12 0v2"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 16h.009m3.982 0H12m3.991 0H16"
                    />
                  </g>
                </svg>
              </div>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 focus:outline-none"
                placeholder="Password"
              />
            </div>
          </div>
        </div>

        {/* Remember Me and Forgot Password */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center"></div>
          <button className="text-sm text-[#356966] hover:underline">
            Forgot password?
          </button>
        </div>
 
        {/* Login Button */}
        {isLoading ? (
          <div className="w-full py-2 flex items-center justify-center rounded-full bg-gray-300 cursor-not-allowed mb-4">
            <div className="animate-spin h-5 w-5 border-2 border-gray-600 border-t-transparent rounded-full"></div>
          </div>
        ) : (
          <button
            onClick={handleLogin}
            className="w-full py-2 flex items-center justify-center rounded-full bg-[#356966] shadow-sm text-white hover:bg-[#ff8552] transition mb-4"
          >
            Login
          </button>
        )}
      </div>
      {/* Conditionally render the Modal */}
      {modalVisible && (
        <Modal
          message={modalMessage}
          type={modalType}
          onClose={() => setModalVisible(false)} // Close the modal
        />
      )}
    </div>
  );
};

export default LoginPage;
