"use client"

import Link from "next/link";
import React, { useState } from "react";
import axios from "axios";

const OtpVerificationPage = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;
    if (/[^0-9]/.test(value)) return; // Allow only digits
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Focus on the next input field when a digit is entered
    if (value && index < otp.length - 1) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleSubmit = async () => {
    const otpCode = otp.join("");
    if (otpCode.length !== 6) {
      alert("Please enter a complete OTP.");
      return;
    }

    setIsLoading(true); // Show loader
    try {
      const response = await axios.post("https://mockapi.example.com/verify-otp", {
        otp: otpCode,
      });
      console.log("OTP verification successful:", response.data);
      // Handle successful OTP verification, e.g., redirect or show success message
    } catch (error) {
      console.error("Error verifying OTP:", error);
      // Handle error, e.g., show a toast notification
    } finally {
      setIsLoading(false); // Hide loader
    }
  };

  return (
    <div className="flex w-full h-[100vh] overflow-hidden">
      {/* Left Section: Image */}
      <div className="hidden md:block w-1/2 bg-[url('/images/un5.jpg')] bg-cover bg-bottom relative">
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent z-10"></div>
        <div className="absolute inset-0 bg-black z-10 opacity-25"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-20 text-center">
          <h2 className="text-6xl p-10 font-semibold"> OTP Verification</h2>
        </div>
      </div>

      {/* Right Section: OTP Verification Form */}
      <div className="w-full md:w-1/2 md:p-32 p-10 bg-white flex flex-col items-center  justify-center relative">
       

        <p className="text-gray-500 mb-6">
          Enter the 6-digit OTP sent to your email
        </p>

        {/* OTP Input Fields */}
        <div className="flex space-x-2 mb-6">
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              id={`otp-input-${index}`}
              maxLength={1}
              value={digit}
              onChange={(e) => handleOtpChange(e, index)}
              className="w-12 h-12 text-center text-xl border rounded-lg"
              placeholder="-"
            />
          ))}
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="w-full py-3 shadow-lg bg-[#356966] text-white rounded-full hover:bg-[#f9d957] transition mb-4"
        >
          {isLoading ? <div className="loader"></div> : "Verify OTP"}
        </button>

        {/* Link to Resend OTP */}
        <p className="text-center py-4 text-sm text-gray-600">
          Didn&apos;t receive the OTP?{" "}
          <Link href={"/resend-otp"} className="text-[#ff8552] underline">
            Resend OTP
          </Link>
        </p>
      </div>
    </div>
  );
};

export default OtpVerificationPage;
