"use client";

import React, { useState } from "react";
import axios from "axios";

import Breadcrumb from "@/components/navigation/Breadcrumb";
import Link from "next/link";

const HospitalDataForm = () => {
  const [activeTab, setActiveTab] = useState(1);
  const [formData, setFormData] = useState({
    gender: "",
    weight: "",
    admissionType: "",
    dateTime: "",
    diagnosis: "",
    secondaryDiagnosis: "",
    emergencyNature: "",
    ageGroup: "",
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
      console.logr("Error submitting form", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="oppins-regular  w-full md:w-[70vw] overflow-y-auto mx-auto px-8  md:px-20 pb-10 bg-white flex flex-col justify-center relative">
      {/* Tabs */}

      <div className="flex items-center justify-between">
        <Breadcrumb secondLink={{ href: "/addrecord", label: "Add Record" }} />
        <Link
          href="/recent-upload"
          className="text-gray-600 flex flex-row justify-center items-center space-x-2 md:text-lg md:mt-6 text-sm underline  hover:text-[#356966] transition duration-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 32 32"
          >
            <path fill="black" d="M20.59 22L15 16.41V7h2v8.58l5 5.01z" />
            <path
              fill="black"
              d="M16 2A13.94 13.94 0 0 0 6 6.23V2H4v8h8V8H7.08A12 12 0 1 1 4 16H2A14 14 0 1 0 16 2"
            />
          </svg>{" "}
        <h1 className=" ">Recent Upload</h1>
        </Link>
      </div>

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
       
          </select>
        </div>

        {/* Age Group */}
        {activeTab !== 5 && (
          <div className="mb-4">
            <label className="block">Age Group</label>
            <select
              name="ageGroup"
              value={formData.ageGroup}
              onChange={handleChange}
              className="w-full md:p-2 px-4 py-2 appearance-none border rounded-lg"
            >
              <option value="">Select</option>
              <option value="Infant">Infant</option>
              <option value="Child">Child</option>
              <option value="Adult">Adult</option>
            </select>
          </div>
        )}

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

        {activeTab === 3 && (
          <>
            <div className="mb-4">
              <label className="block">Emergency Type</label>
              <select
                name="emergencyNature"
                value={formData.emergencyNature}
                onChange={handleChange}
                className="w-full md:p-2 px-4 py-2 appearance-none border rounded-lg"
              >
                <option value="">Select</option>
                <option value="Trauma">Trauma</option>
                <option value="Medical">Medical</option>
                <option value="Surgical">Surgical</option>
                <option value="Obstetric">Obstetric</option>
                <option value="Pediatric">Pediatric</option>
              </select>
            </div>
          </>
        )}

        {activeTab === 4 && (
          <>
            <div className="mb-4">
              <label className="block">Cause of Death</label>
              <input
                type="text"
                name="causeOfDeath"
                value={formData.causeOfDeath}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
              />
            </div>
          </>
        )}

        {activeTab === 5 && (
          <>
            {/* Weight */}
            <div className="mb-4">
              <label className="block">Weight (in kg)</label>
              <input
                type="number"
                name="weight"
                value={formData.weight || ""}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
                placeholder="Enter weight"
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
