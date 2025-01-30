'use client'

import Breadcrumb from "@/components/navigation/Breadcrumb";
import React, { useState, useEffect } from "react";

// Define Types for Data
interface AdmissionRecord {
  hospitalId: string;
  time: string;
  gender: string;
  ageGroup: string;
  reason: string;
}

interface DeathRecord {
  hospitalId: string;
  time: string;
  cause: string;
  ageGroup: string;
}

interface DiagnosisRecord {
  doctorId: string;
  time: string;
  diagnosis: string;
  ageGroup: string;
}

interface EmergencyRecord {
  hospitalId: string;
  time: string;
  type: string;
  severity: string;
}

interface BirthRecord {
  hospitalId: string;
  time: string;
  gender: string;
  mode: string;
}

interface MockApiResponse {
  admissions: AdmissionRecord[];
  deaths: DeathRecord[];
  diagnoses: DiagnosisRecord[];
  emergencies: EmergencyRecord[];
  births: BirthRecord[];
}

// Mock API Simulation
const mockApiResponse: MockApiResponse = {
  admissions: [
    { hospitalId: "H001", time: "2025-01-05 14:30", gender: "Male", ageGroup: "Adult", reason: "Severe pain" },
    { hospitalId: "H002", time: "2025-01-06 09:00", gender: "Female", ageGroup: "Child", reason: "Routine check-up" },
  ],
  deaths: [
    { hospitalId: "H001", time: "2025-01-05 20:00", cause: "Heart failure", ageGroup: "Adult" },
    { hospitalId: "H002", time: "2025-01-06 13:00", cause: "Cancer", ageGroup: "Adult" },
  ],
  diagnoses: [
    { doctorId: "D001", time: "2025-01-05 08:30", diagnosis: "Flu", ageGroup: "Adult" },
    { doctorId: "D002", time: "2025-01-06 11:00", diagnosis: "COVID-19", ageGroup: "Child" },
  ],
  emergencies: [
    { hospitalId: "H001", time: "2025-01-05 10:30", type: "Trauma", severity: "High" },
    { hospitalId: "H002", time: "2025-01-06 07:45", type: "Surgical", severity: "Medium" },
  ],
  births: [
    { hospitalId: "H001", time: "2025-01-05 16:00", gender: "Female", mode: "Normal" },
    { hospitalId: "H002", time: "2025-01-06 12:30", gender: "Male", mode: "C-Section" },
  ],
};

const fetchDataFromApi = <T extends keyof MockApiResponse>(category: T): Promise<MockApiResponse[T]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockApiResponse[category]);
      }, 1000); // Simulating network delay
    });
  };
  

const RecentDataPage: React.FC = () => {
  const [recentData, setRecentData] = useState<MockApiResponse>({
    admissions: [],
    deaths: [],
    diagnoses: [],
    emergencies: [],
    births: [],
  });

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const admissions = await fetchDataFromApi("admissions");
        const deaths = await fetchDataFromApi("deaths");
        const diagnoses = await fetchDataFromApi("diagnoses");
        const emergencies = await fetchDataFromApi("emergencies");
        const births = await fetchDataFromApi("births");

        setRecentData({
          admissions,
          deaths,
          diagnoses,
          emergencies,
          births,
        });

        setTotalPages(1); // We have 1 page of mock data for simplicity
      } catch (error) {
        console.logr("Error fetching data:", error);
      }
    };

    fetchAllData();
  }, [currentPage]);

  const handlePageChange = (direction: "prev" | "next") => {
    if (direction === "prev" && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    } else if (direction === "next" && currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="oppins-regular bg-white shadow-md flex h-full overflow-y-auto flex-col lg:flex-row md:px-40 px-10 mt-6  gap-6 w-full">
        <Breadcrumb secondLink = {{href: "/recent-upload",label: "Recent Upload" }} />

     
      <div className="flex-1 w-full overflow-x-auto">
        {Object.keys(recentData).map((category) => (
          <div key={category} className="mb-8">
            <h3 className="text-lg font-semibold text-gray-800">{category}</h3>
            <table className="w-full table-auto border-collapse border border-gray-300 mt-4">
              <thead>
                <tr className="bg-[#356966] text-white">
                  {category === "admissions" && (
                    <>
                      <th className="border border-gray-300 p-2 text-xs">Hospital ID</th>
                      <th className="border border-gray-300 p-2 text-xs">Time</th>
                      <th className="border border-gray-300 p-2 text-xs">Gender</th>
                      <th className="border border-gray-300 p-2 text-xs">Age Group</th>
                      <th className="border border-gray-300 p-2 text-xs">Reason</th>
                    </>
                  )}
                  {category === "deaths" && (
                    <>
                      <th className="border border-gray-300 p-2 text-xs">Hospital ID</th>
                      <th className="border border-gray-300 p-2 text-xs">Time</th>
                      <th className="border border-gray-300 p-2 text-xs">Cause</th>
                      <th className="border border-gray-300 p-2 text-xs">Age Group</th>
                    </>
                  )}
                  {category === "diagnoses" && (
                    <>
                      <th className="border border-gray-300 p-2 text-xs">Doctor ID</th>
                      <th className="border border-gray-300 p-2 text-xs">Time</th>
                      <th className="border border-gray-300 p-2 text-xs">Diagnosis</th>
                      <th className="border border-gray-300 p-2 text-xs">Age Group</th>
                    </>
                  )}
                  {category === "emergencies" && (
                    <>
                      <th className="border border-gray-300 p-2 text-xs">Hospital ID</th>
                      <th className="border border-gray-300 p-2 text-xs">Time</th>
                      <th className="border border-gray-300 p-2 text-xs">Type</th>
                      <th className="border border-gray-300 p-2 text-xs">Severity</th>
                    </>
                  )}
                  {category === "births" && (
                    <>
                      <th className="border border-gray-300 p-2 text-xs">Hospital ID</th>
                      <th className="border border-gray-300 p-2 text-xs">Time</th>
                      <th className="border border-gray-300 p-2 text-xs">Gender</th>
                      <th className="border border-gray-300 p-2 text-xs">Mode</th>
                    </>
                  )}
                </tr>
              </thead>
              <tbody>
                {recentData[category as keyof MockApiResponse].map((row, index) => (
                  <tr key={index} className="even:bg-gray-100">
                    {category === "admissions" && (
                      <>
                        <td className="border border-gray-300 p-2 text-center text-xs">{(row as AdmissionRecord).hospitalId}</td>
                        <td className="border border-gray-300 p-2 text-center text-xs">{(row as AdmissionRecord).time}</td>
                        <td className="border border-gray-300 p-2 text-center text-xs">{(row as AdmissionRecord).gender}</td>
                        <td className="border border-gray-300 p-2 text-center text-xs">{(row as AdmissionRecord).ageGroup}</td>
                        <td className="border border-gray-300 p-2 text-center text-xs">{(row as AdmissionRecord).reason}</td>
                      </>
                    )}
                    {category === "deaths" && (
                      <>
                        <td className="border border-gray-300 p-2 text-center text-xs">{(row as DeathRecord).hospitalId}</td>
                        <td className="border border-gray-300 p-2 text-center text-xs">{(row as DeathRecord).time}</td>
                        <td className="border border-gray-300 p-2 text-center text-xs">{(row as DeathRecord).cause}</td>
                        <td className="border border-gray-300 p-2 text-center text-xs">{(row as DeathRecord).ageGroup}</td>
                      </>
                    )}
                    {category === "diagnoses" && (
                      <>
                        <td className="border border-gray-300 p-2 text-center text-xs">{(row as DiagnosisRecord).doctorId}</td>
                        <td className="border border-gray-300 p-2 text-center text-xs">{(row as DiagnosisRecord).time}</td>
                        <td className="border border-gray-300 p-2 text-center text-xs">{(row as DiagnosisRecord).diagnosis}</td>
                        <td className="border border-gray-300 p-2 text-center text-xs">{(row as DiagnosisRecord).ageGroup}</td>
                      </>
                    )}
                    {category === "emergencies" && (
                      <>
                        <td className="border border-gray-300 p-2 text-center text-xs">{(row as EmergencyRecord).hospitalId}</td>
                        <td className="border border-gray-300 p-2 text-center text-xs">{(row as EmergencyRecord).time}</td>
                        <td className="border border-gray-300 p-2 text-center text-xs">{(row as EmergencyRecord).type}</td>
                        <td className="border border-gray-300 p-2 text-center text-xs">{(row as EmergencyRecord).severity}</td>
                      </>
                    )}
                    {category === "births" && (
                      <>
                        <td className="border border-gray-300 p-2 text-center text-xs">{(row as BirthRecord).hospitalId}</td>
                        <td className="border border-gray-300 p-2 text-center text-xs">{(row as BirthRecord).time}</td>
                        <td className="border border-gray-300 p-2 text-center text-xs">{(row as BirthRecord).gender}</td>
                        <td className="border border-gray-300 p-2 text-center text-xs">{(row as BirthRecord).mode}</td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}

        {/* Pagination Controls */}
        <div className="flex text-xs justify-between items-center mt-4">
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <div className="flex space-x-2">
            <button
              className={`px-2 py-1 border rounded ${currentPage === 1 ? "text-gray-400 cursor-not-allowed" : "text-blue-500"}`}
              onClick={() => handlePageChange("prev")}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <button
              className={`px-2 py-1 border rounded ${currentPage === totalPages ? "text-gray-400 cursor-not-allowed" : "text-blue-500"}`}
              onClick={() => handlePageChange("next")}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentDataPage;
