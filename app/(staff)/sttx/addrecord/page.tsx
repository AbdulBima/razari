"use client";

import { useRouter } from "next/navigation";
import AddAdmisionRec from "@/components/recordAdditions/AddAdmissionRec";
import AddBirthRecord from "@/components/recordAdditions/AddBirthRecord";
import AddDeathRecord from "@/components/recordAdditions/AddDeathRecord";
import AddDiagnosisRecord from "@/components/recordAdditions/AddDiagnosisRecord";
import AddEmergencyRecord from "@/components/recordAdditions/AddEmergencyRecord";
import Link from "next/link";
import React, { useState, useEffect, JSX } from "react";

const roleComponents: { [key: string]: JSX.Element } = {
  "admission officer": <AddAdmisionRec />,
  "birth officer": <AddBirthRecord />,
  "consultant": <AddDiagnosisRecord />,
  "emergency officer": <AddEmergencyRecord />,
  "record officer": <AddDeathRecord />,
};

const AddRecordPage = () => {
  const [role, setRole] = useState<string | null>(null);
  const [selectedTab, setSelectedTab] = useState<keyof typeof roleComponents>("admission officer");
  const router = useRouter();

  useEffect(() => {
    const storedRole = localStorage.getItem("sttxr");
    if (!storedRole) {
      router.push("/");
    } else {
      setRole(storedRole);
    }
  }, [router]);

  return (
    <div className="p-4 poppins-regular">
  <div className="md:hidden flex px-4 md:px-10 mt-2">
    <Link
      href="/recent-upload"
      className="text-gray-700 flex flex-row justify-center items-center space-x-2 md:text-lg text-sm underline hover:text-orange-600 transition duration-300"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 32 32">
        <path fill="black" d="M20.59 22L15 16.41V7h2v8.58l5 5.01z" />
        <path fill="black" d="M16 2A13.94 13.94 0 0 0 6 6.23V2H4v8h8V8H7.08A12 12 0 1 1 4 16H2A14 14 0 1 0 16 2" />
      </svg>
      <h1 className="text-lg font-semibold">Recent Upload</h1>
    </Link>
  </div>

  {role === "superstaff" ? (
    <div className="md:px-10 px-4 mt-4" >
      {/* Tabs for Desktop */}
      <div className="hidden md:flex space-x-4 border-b ">
        {Object.keys(roleComponents).map((key) => (
          <button
            key={key}
            onClick={() => setSelectedTab(key)}
            className={`px-4 py-2 transition duration-300 font-normal text-sm ${
  selectedTab === key ? "border-b-2  border-orange-500 text-orange-600" : "text-gray-500 hover:text-orange-500"
}`}
          >
            {key.replace(/ officer/g, "").toUpperCase()}
          </button>
        ))}
      </div>
      {/* Select Dropdown for Mobile */}
      <div className="md:hidden mb-4">
        <select
          value={selectedTab}
          onChange={(e) => setSelectedTab(e.target.value)}
          className="w-full px-2 py-1.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
        >
          {Object.keys(roleComponents).map((key) => (
            <option key={key} value={key} className="text-gray-700">
              {key.replace(/ officer/g, "").toUpperCase()}
            </option>
          ))}
        </select>
      </div>
      {/* Render Selected Component */}
      <div className="w-full flex justify-center">{roleComponents[selectedTab]}</div>
    </div>
  ) : (
    <div className="">{role && roleComponents[role]}</div>
  )}
</div>

  );
};

export default AddRecordPage;
