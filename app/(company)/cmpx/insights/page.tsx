"use client";

import React, { useState } from "react";
import ClinicsTab from "@/components/insightsPageComps/ClinicsTab";
import tabs from "@/utils/insightsTabs";
import GAdmissionTab from "@/components/insightsPageComps/GAdmissionTab";
import Breadcrumb from "@/components/navigation/Breadcrumb";
import GDDiagnosisTab from "@/components/insightsPageComps/GDiagnosisTab";
import GBirthTab from "@/components/insightsPageComps/GBirthTab";
import GEmergencyTab from "@/components/insightsPageComps/GEmergencyTab";
import GDeathTab from "@/components/insightsPageComps/GDeathTab";


const InsightsPage = () => {
  const [activeTab, setActiveTab] = useState("clinics");

  const renderActiveTab = () => {
    switch (activeTab) {
      case "clinics":
        return <ClinicsTab />;
      case "admissions":
        return <GAdmissionTab />;
       case "diagnosis":
        return <GDDiagnosisTab />;
        case "births":
        return <GBirthTab />;
        case "emergency":
        return <GEmergencyTab />;
        case "deaths":
        return <GDeathTab />;
      default:
        return null;
    }
  };

  return (
    <div className="poppins-regular px-10 pt-2">
 <Breadcrumb secondLink={{ href: "/cmpx/insights", label: "Insights" }} />
      {/* Mobile Dropdown */}
      <div className="sm:hidden mt-4">
        <select
          className="w-full border text-xs border-gray-300 rounded-md px-3 py-5 text-gray-700"
          value={activeTab}
          onChange={(e) => setActiveTab(e.target.value)}
        >
          {tabs.map((tab) => (
            <option key={tab.key} value={tab.key}>
              {tab.label}
            </option>
          ))}
        </select>
      </div>

      {/* Desktop Tabs */}
      <div className="hidden sm:flex border-b border-gray-200">
        <ul className="flex space-x-6">
          {tabs.map((tab) => (
            <li
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`cursor-pointer whitespace-nowrap text-sm font-medium px-4 py-2 flex items-center space-x-2 ${
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
