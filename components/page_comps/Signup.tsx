"use client";

import React, { useState } from "react";
import axios from "axios";
import Link from "next/link";
import PopAlert from "@/components/PopAlert";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loading, setLoading] = useState(false);
  const [modalMessage, setModalMessage] = useState<string | null>(null);
  const [modalType, setModalType] = useState<"success" | "error" | null>(null); // Track modal type (success/error)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check if passwords match
    if (password !== confirmPassword) {
      setModalMessage("Passwords do not match!"); // Show modal with error message
      setModalType("error"); // Set type as error
      return;
    }

    setLoading(true); // Start loading

    try {
      // API call with form data
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const response = await axios.post("/api/mocksignup", {
        name,
        email,
        password,
      });

      // Handle response (you can display a success message or redirect)
      setModalMessage("Sign up successful!");
      setModalType("success"); // Set type as success
    } catch (error) {
      // Handle error (e.g., display an error message)
      setModalMessage(`Error: ${error}`);
      setModalType("error"); // Set type as error
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="flex w-full h-[100vh] overflow-hidden">
      {/* Left Section: Image */}
      <div className="hidden md:block w-1/2 bg-[url('/images/un6.jpg')] bg-cover bg-bottom relative">
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent z-10"></div>
        <div className="absolute inset-0 bg-black z-10 opacity-25"></div>

        {/* Text at the Bottom */}
        <div className="absolute bottom-20 flex p-6 space-y-4 flex-col items-start  text-white z-20 text-center">
          <h2 className="text-5xl text-left px-4 font-semibold">
            Join Us <span className="text-[#ff8552]">Today</span>,
          </h2>
          <h1 className="text-xl text-left px-4 font-normal">
            and transform your patient data into actionable insights for better
            care, proactive measures & operational efficiency.
          </h1>
        </div>
      </div>

      <div className="w-full md:w-1/2 md:p-32 p-10 bg-white flex flex-col justify-center relative">
        {/* Title and SVG */}
        <div className="flex items-center mb-20">
          <h2 className="zen text-5xl text-[#356966] font-bold">Rhazari</h2>
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
        <p className="text-gray-500 mb-6">Create an account to get started!</p>

        {/* Sign Up Form */}
        <form onSubmit={handleSubmit}>
          {/* Name Input */}
          <div className="mb-4 relative">
            <label htmlFor="name" className="sr-only">
              Name
            </label>
            <div className="flex items-center border rounded-lg overflow-hidden">
              <div className="p-3 border-r bg-lime-50">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="#356966"
                    d="M15.71 12.71a6 6 0 1 0-7.42 0a10 10 0 0 0-6.22 8.18a1 1 0 0 0 2 .22a8 8 0 0 1 15.9 0a1 1 0 0 0 1 .89h.11a1 1 0 0 0 .88-1.1a10 10 0 0 0-6.25-8.19M12 12a4 4 0 1 1 4-4a4 4 0 0 1-4 4"
                  />
                </svg>
              </div>
              <input
                type="text"
                id="name"
                className="w-full p-3 focus:outline-none"
                placeholder="Username"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>

          {/* Email Input */}
          <div className="mb-4 relative">
            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <div className="flex items-center border rounded-lg overflow-hidden">
              <div className="p-3 border-r bg-lime-50">
                {" "}
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
                className="w-full p-3 focus:outline-none"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="mb-4 relative">
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <div className="flex items-center border rounded-lg overflow-hidden">
              <div className="p-3 border-r bg-lime-50">
                {" "}
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
                className="w-full p-3 focus:outline-none"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {/* Confirm Password Input */}
          <div className="mb-4 relative">
            <label htmlFor="confirmPassword" className="sr-only">
              Confirm Password
            </label>
            <div className="flex items-center border rounded-lg overflow-hidden">
              <div className="p-3 border-r bg-lime-50">
                {" "}
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
                id="confirmPassword"
                className="w-full p-3 focus:outline-none"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>

          {/* Sign Up Button */}
          <button
            type="submit"
            className="w-full py-3 mt-4 shadow-lg bg-[#356966] text-white rounded-full hover:bg-[#f9d957] transition mb-4"
          >
            Sign Up
          </button>
        </form>

        {/* Show Modal Message */}
        {modalMessage && modalType && (
          <PopAlert
            message={modalMessage}
            type={modalType} // Pass the type (success/error)
            onClose={() => setModalMessage(null)}
          />
        )}

        {/* Login Link */}
        <p className="text-center py-4 text-sm text-gray-600">
          Already have an account?{" "}
          <Link href="/" className="text-[#ff8552] underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
