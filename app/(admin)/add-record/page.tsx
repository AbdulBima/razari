"use client";

import React, { useState } from "react";
import axios from "axios";
import Link from "next/link";

const HospitalDataForm = () => {
  const [activeTab, setActiveTab] = useState(1);
  const [formData, setFormData] = useState({
    gender: "",
    ageGroup: "",
    admissionType: "",
    dateTime: "",
    diagnosis: "",
    secondaryDiagnosis: "",
    emergencyNature: "",
    isEmergency: "",
    causeOfDeath: "",
    deliveryMode: "",
  });
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const hospitalId =
    typeof window !== "undefined"
      ? localStorage.getItem("hospitalId") || ""
      : "";

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleTabChange = (tabIndex: number) => {
    setActiveTab(tabIndex);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    let endpoint = "";
    switch (activeTab) {
      case 1:
        endpoint = "/api/daily-admissions";
        break;
      case 2:
        endpoint = "/api/doctors-diagnosis";
        break;
      case 3:
        endpoint = "/api/emergencies";
        break;
      case 4:
        endpoint = "/api/deaths";
        break;
      case 5:
        endpoint = "/api/births";
        break;
      default:
        break;
    }

    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key as keyof typeof formData] || "");
    });
    formDataToSend.append("hospitalId", hospitalId);
    if (image) {
      formDataToSend.append("image", image);
    }

    try {
      const response = await axios.post(endpoint, formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("Form submitted successfully", response.data);
    } catch (error) {
      console.error("Error submitting form", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" w-full md:w-[70vw] mx-auto p-8 md:px-20 pb-10 bg-white flex flex-col justify-center relative">
      <div className="flex items-center opacity-30 py-2 overflow-x-auto whitespace-nowrap">
        <Link href="#" className="text-gray-600 dark:text-gray-200">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
          </svg>
        </Link>

        <span className="mx-5 text-gray-500 dark:text-gray-300">/</span>

        <Link
          href="#"
          className="text-gray-600 dark:text-gray-200 hover:underline"
        >
          Add Record
        </Link>
      </div>

      {/* Tabs */}

      <div className="hidden md:flex mb-6 pt-4">
        {[
          "Daily Admissions",
          "Doctor's Diagnosis",
          "Emergencies",
          "Deaths",
          "Birth",
        ].map((label, index) => (
          <button
            key={index}
            className={`flex-1 p-4 text-center whitespace-nowrap ${
              activeTab === index + 1
                ? "text-orange-500 border-b-2 border-orange-500"
                : "bg-white text-gray-600"
            }`}
            onClick={() => handleTabChange(index + 1)}
          >
            {label}
          </button>
        ))}
      </div>
      {/* Tabs  mobile*/}
      <div className="mb-8  flex flex-col md:hidden pt-5">
        <label className="block text-lg text-orange-500">Select form</label>

        <select
          value={activeTab}
          onChange={(e) => handleTabChange(Number(e.target.value))}
          className="w-full appearance-none  bg-transparent flex p-2 border-b-2 rounded-lg text-black"
        >
          {[
            "Daily Admissions",
            "Doctor's Diagnosis",
            "Emergencies",
            "Deaths",
            "Birth",
          ].map((label, index) => (
            <option key={index} value={index + 1}>
              {label}
            </option>
          ))}
        </select>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        {/* Gender */}
        <div className="mb-4">
          <label className="block">Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full md:p-2 px-4 py-2 appearance-none border rounded-lg"
          >
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Age Group */}
        <div className="mb-4">
          <label className="block">Age Group</label>
          <select
            name="ageGroup"
            value={formData.ageGroup}
            onChange={handleChange}
            className="w-full md:p-2 px-4 py-2 appearance-none border rounded-lg"
          >
            <option value="">Select</option>
            <option value="Child">Child</option>
            <option value="Adult">Adult</option>
          </select>
        </div>

        {/* Dynamic Fields */}
        {activeTab === 1 && (
          <div className="mb-4">
            <label className="block">Reason for Admission</label>
            <input
              type="text"
              name="admissionType"
              value={formData.admissionType}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
            />
          </div>
        )}

        {activeTab === 2 && (
          <>
            <div className="mb-4">
              <label className="block">Primary Diagnosis</label>
              <input
                type="text"
                name="diagnosis"
                value={formData.diagnosis}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div className="mb-4">
              <label className="block">Secondary Diagnosis</label>
              <input
                type="text"
                name="secondaryDiagnosis"
                value={formData.secondaryDiagnosis}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
              />
            </div>
          </>
        )}

        {/* Date and Time */}
        <div className="mb-4">
          <label className="block">Date and Time</label>
          <input
            type="datetime-local"
            name="dateTime"
            value={formData.dateTime}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
          />
        </div>

        {/* Image Upload */}
        <div className="mb-4 py-5 flex items-center">
          <span className=" text-gray-600">Upload Data</span>

          <label className="flex items-center cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="ml-2"
            >
              <path
                fill="none"
                stroke="#356966"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2M7 9l5-5l5 5m-5-5v12"
              />
            </svg>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full md:w-44 py-3 bg-[#356966] text-white rounded-full hover:bg-[#f9d957] flex items-center justify-center"
          disabled={loading}
        >
          {loading ? (
            <span className="spinner-border spinner-border-sm"></span>
          ) : (
            "Submit"
          )}
        </button>
      </form>
    </div>
  );
};

export default HospitalDataForm;
