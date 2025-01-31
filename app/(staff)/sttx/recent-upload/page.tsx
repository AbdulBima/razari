"use client";

import React, { useState, useEffect } from "react";
import RecentDeathRecords from "@/components/recentTables/RecentDeathRecords";
import RecentBirthRecords from "@/components/recentTables/RecentBirthRecords";
import RecentEmergencyRecords from "@/components/recentTables/RecentEmergencyRecords";
import RecentAdmissionRecords from "@/components/recentTables/RecentAdmissionRecords";
import RecentDiagnosisRecords from "@/components/recentTables/RecentDiagnosisRecords";
import Loader from "@/utils/loader";
import Link from "next/link";

type Role =
  | "superstaff"
  | "birth officer"
  | "consultant"
  | "admission officer"
  | "emergency officer"
  | "record officer"
  | null;

const RecentUpload: React.FC = () => {
  const [role, setRole] = useState<Role>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Simulate a delay for loading the role from localStorage (for demo purposes)
    const timer = setTimeout(() => {
      const savedRole = localStorage.getItem("sttxr") as Role;
      setRole(savedRole);
      setLoading(false); // Stop loading once the role is retrieved
    }, 1000); // You can adjust this timeout as per your needs

    return () => clearTimeout(timer); // Cleanup on component unmount
  }, []);

  const renderComponents = () => {
    // Check the role and render the appropriate components
    if (role === "superstaff") {
      // Superstaff should see all components
      return (
        <>
          <RecentDiagnosisRecords />
          <RecentAdmissionRecords />
          <RecentBirthRecords />
          <RecentEmergencyRecords />
          <RecentDeathRecords />
        </>
      );
    }

    // Render based on other roles
    switch (role) {
      case "birth officer":
        return <RecentBirthRecords />;
      case "consultant":
        return <RecentDiagnosisRecords />;
      case "admission officer":
        return <RecentAdmissionRecords />;
      case "emergency officer":
        return <RecentEmergencyRecords />;
      case "record officer":
        return <RecentDeathRecords />;
      default:
        return <div>No records available for this role.</div>;
    }
  };

  if (loading) {
    // Show a loading state before rendering any content
    return (
      <Loader/  >
    );
  }

  return <div className="overflow-y-auto h-full overscroll-y-auto pb-10">
      <div className="md:hidden flex text-sm items-center opacity-30  px-8 mt-2 mb-5 overflow-x-auto whitespace-nowrap">
        {/* Fixed Home Link */}
        <Link href="/sttx/addrecord" className="text-gray-900">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
          </svg>
        </Link>

        {/* Divider */}
        <span className="mx-5 text-gray-900">/</span>

        {/* Dynamic Second Link */}
        <h1 className="text-gray-900 hover:underline">Recent Upload</h1>
      </div>
      
      {renderComponents()}</div>;
};

export default RecentUpload;
