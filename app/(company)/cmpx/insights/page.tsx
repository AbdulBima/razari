"use client";

import React, { useState } from "react";
import ClinicsTab from "@/components/insightsPageComps/ClinicsTab";

const InsightsPage = () => {
  const [activeTab, setActiveTab] = useState("clinics");

  const tabs = [
    {
      key: "clinics",
      label: "Clinics",
      svg: (
        <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 16 16"
      >
        <path
          fill="currentColor"
          fillRule="evenodd"
          d="M13.25 12a.75.75 0 1 0 0 1.5a.75.75 0 0 0 0-1.5m-.75-1.372a2.251 2.251 0 1 0 1.5 0v-.378a3 3 0 0 0-3-3H8.75V5.372a2.25 2.25 0 1 0-1.5 0V7.25H5a3 3 0 0 0-3 3v.378a2.251 2.251 0 1 0 1.5 0v-.378A1.5 1.5 0 0 1 5 8.75h2.25v1.878a2.251 2.251 0 1 0 1.5 0V8.75H11a1.5 1.5 0 0 1 1.5 1.5zM2.75 12a.75.75 0 1 0 0 1.5a.75.75 0 0 0 0-1.5m4.5.75a.75.75 0 1 1 1.5 0a.75.75 0 0 1-1.5 0M8 2.5A.75.75 0 1 0 8 4a.75.75 0 0 0 0-1.5"
          clipRule="evenodd"
        />
      </svg>
      ),
    },
    {
      key: "admissions",
      label: "General Admissions",
      svg: (
        <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 48 48"
      >
        <path
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="4"
          d="M6 17v22m36-14v14M26 15h12m-27 7h6M6 28h36M6 34h36M32 9v12"
        />
      </svg>
      ),
    },
    {
      key: "diagnosis",
      label: "General Diagnosis",
      svg: (
        <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
      >
        <g
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        >
          <path d="M10.617 13.837a3.22 3.22 0 1 0 0-6.44a3.22 3.22 0 0 0 0 6.44m-.537-8.855h1.074m-.537 0v2.415m3.605-1.144l.759.76m-.38-.38L12.894 8.34m3.358 1.74v1.074m0-.537h-2.415m1.144 3.605l-.759.759m.379-.38l-1.707-1.707m-1.74 3.358H10.08m.537 0v-2.415m-3.605 1.144l-.759-.759m.38.379l1.707-1.707m-3.358-1.74V10.08m0 .537h2.415M6.253 7.012l.759-.759m-.379.38L8.34 8.34" />
          <path d="M10.617 20.484c5.45 0 9.867-4.418 9.867-9.867S16.066.75 10.617.75S.75 5.168.75 10.617s4.418 9.867 9.867 9.867M23.25 23.25l-5.656-5.656" />
        </g>
      </svg>
      ),
    },
    {
      key: "births",
      label: "General Births",
      svg: (
        <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="M12 17c-1.1 0-2-.9-2-2s.9-2 2-2s2 .9 2 2s-.9 2-2 2m0-7c2.34 0 7 1.16 7 3.5v5.13c0 .87-.69 1.61-1.66 2.16v-7.41c0-.56-2.74-1.84-5.34-1.84s-5.34 1.28-5.34 1.84v5.37c0 .25.65.71 1.62 1.1C9 19 10.93 18.56 12 18.56c1.33 0 4 .66 4 2v.83c-1.37.49-2.93.74-4 .74s-2.62-.25-4-.74c-1.63-.58-3-1.5-3-2.76V13.5c0-2.34 4.66-3.5 7-3.5m0-6.25c-.97 0-1.75.78-1.75 1.75s.78 1.75 1.75 1.75s1.75-.78 1.75-1.75s-.78-1.75-1.75-1.75M12 9c-1.93 0-3.5-1.57-3.5-3.5S10.07 2 12 2s3.5 1.57 3.5 3.5S13.93 9 12 9"
        />
      </svg>
      ),
    },
    {
      key: "emergency",
      label: "General Emergency",
      svg: (
        <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="M5 20v-2h1.6L9 10h6l2.4 8H19v2zm3.7-2h6.6l-1.8-6h-3zM11 8V3h2v5zm5.95 2.475L15.525 9.05l3.55-3.525l1.4 1.4zM18 15v-2h5v2zM7.05 10.475l-3.525-3.55l1.4-1.4l3.55 3.525zM1 15v-2h5v2zm11 3"
        />
      </svg>
      ),
    },
    {
      key: "deaths",
      label: "General Deaths",
      svg: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            fillRule="evenodd"
            d="M21 12a9 9 0 1 1-18 0a9 9 0 0 1 18 0m-4.101 5A6.98 6.98 0 0 1 12 19a6.98 6.98 0 0 1-4.899-2zm1.427-2a7 7 0 1 0-12.653 0z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
  ];

  const renderActiveTab = () => {
    switch (activeTab) {
      case "clinics":
        return <ClinicsTab />;
      case "admissions":
        return <div>General Admissions content goes here.</div>;
      case "diagnosis":
        return <div>General Diagnosis content goes here.</div>;
      case "births":
        return <div>General Births content goes here.</div>;
      case "emergency":
        return <div>General Emergency content goes here.</div>;
      case "deaths":
        return <div>General Deaths content goes here.</div>;
      default:
        return null;
    }
  };

  return (
    <div className="poppins-regular px-10 pt-6">
      <div className="border-b border-gray-200">
        {/* Tabs */}
        <ul className="flex space-x-6">
          {tabs.map((tab) => (
            <li
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`cursor-pointer text-sm font-medium px-4 py-2 flex items-center space-x-2 ${
                activeTab === tab.key
                  ? "text-orange-500 border-b-2 border-orange-500"
                  : "text-gray-600"
              }`}
            >
              {tab.svg}
              <span>{tab.label}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Active Tab Content */}
      <div className="mt-4">{renderActiveTab()}</div>
    </div>
  );
};

export default InsightsPage;
