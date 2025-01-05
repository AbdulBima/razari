"use client";

import React, { useEffect, useState } from "react";
import { Line, Pie, Bar } from "react-chartjs-2";
import "chart.js/auto";
import { FaAmbulance, FaHeartbeat, FaHospitalAlt, FaBed } from "react-icons/fa";
import Link from "next/link";
import Breadcrumb from "@/components/navigation/Breadcrumb";

type EmergencyData = {
  hospitalId: string;
  time: string;
  type: string;
  severity: string;
};

const EmergencyDashboard = () => {
  const [emergencyData, setEmergencyData] = useState<EmergencyData[]>([]);
  const [filteredData, setFilteredData] = useState<EmergencyData[]>([]);
  const [selectedHospital, setSelectedHospital] = useState("HSP1");

  const [currentPage, setCurrentPage] = useState(1);

  const [monthlyEmergencies, setMonthlyEmergencies] = useState<number[]>([]);
  const [emergencyTypeDistribution, setEmergencyTypeDistribution] = useState<{
    [key: string]: number;
  }>({});
  const [severityDistribution, setSeverityDistribution] = useState<{
    [key: string]: number;
  }>({});
  const [isLoading, setIsLoading] = useState(false); // Loading state

  const recommendations = [
    {
      title: "Best Emergency Care Hospitals",
      icon: <FaHospitalAlt size={15} color="red" />,
    },
    {
      title: "Top Trauma Centers",
      icon: <FaAmbulance size={15} color="red" />,
    },
    {
      title: "Leading Cardiology Emergency Units",
      icon: <FaHeartbeat size={15} color="red" />,
    },
    { title: "Critical Care Units", icon: <FaBed size={15} color="red" /> },
  ];

  const rowsPerPage = 5;

  const tableData = [
    {
      hospitalId: "HSP1",
      time: "2024-12-01 14:35",
      type: "Heart Attack",
      severity: "High",
    },
    {
      hospitalId: "HSP2",
      time: "2024-12-02 09:15",
      type: "Trauma",
      severity: "Moderate",
    },
    {
      hospitalId: "HSP3",
      time: "2024-12-03 10:10",
      type: "Stroke",
      severity: "Critical",
    },
    {
      hospitalId: "HSP4",
      time: "2024-12-04 11:45",
      type: "Infection",
      severity: "Low",
    },
  ];

  useEffect(() => {
    setEmergencyData(tableData);
    setFilteredData(tableData);
  }, []);

  useEffect(() => {
    setIsLoading(true); // Show loading state
    const timeout = setTimeout(() => {
      fetchHospitalData(selectedHospital);
      setIsLoading(false); // Hide loading state
    }, 500); // Simulated delay for fetching data

    return () => clearTimeout(timeout); // Cleanup timeout
  }, [selectedHospital]);

  const fetchHospitalData = (hospital: string) => {
    if (hospital === "HSP1") {
      setMonthlyEmergencies([
        30, 45, 50, 55, 60, 65, 70, 80, 90, 100, 110, 120,
      ]);
      setEmergencyTypeDistribution({
        "Heart Attack": 40,
        Trauma: 30,
        Stroke: 15,
        Infection: 15,
      });
      setSeverityDistribution({
        High: 35,
        Moderate: 25,
        Critical: 20,
        Low: 20,
      });
      setFilteredData(tableData.filter((data) => data.hospitalId === "HSP1"));
    } else if (hospital === "HSP2") {
      setMonthlyEmergencies([
        20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130,
      ]);
      setEmergencyTypeDistribution({
        Trauma: 50,
        "Heart Attack": 30,
        Stroke: 10,
        Infection: 10,
      });
      setSeverityDistribution({
        High: 25,
        Moderate: 45,
        Critical: 15,
        Low: 15,
      });
      setFilteredData(tableData.filter((data) => data.hospitalId === "HSP2"));
    }
    // Add more hospital data as needed
  };

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const currentRows = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handlePageChange = (direction: "prev" | "next") => {
    if (direction === "prev" && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    } else if (direction === "next" && currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const lineChartData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Emergencies",
        data: monthlyEmergencies,
        borderColor: "#FF6347",
        backgroundColor: "rgba(255, 99, 71, 0.2)",
      },
    ],
  };

  const pieChartData = {
    labels: Object.keys(emergencyTypeDistribution),
    datasets: [
      {
        data: Object.values(emergencyTypeDistribution),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
      },
    ],
  };

  const barChartData = {
    labels: Object.keys(severityDistribution),
    datasets: [
      {
        data: Object.values(severityDistribution),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
      },
    ],
  };

  const barChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
      },
    },
  };

  const lineChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        intersect: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: true,
          color: "#e0e0e0",
        },
      },
    },
  };

  return (
    <div className="poppins-regular px-8 pt-2 w-full bg-gray-50 h-full overscroll-y-none overflow-y-hidden">
      
      
     <Breadcrumb secondLink = {{href: "/emergency",label: "Emergency" }} />
     
     <select
        className="border border-gray-300 px-2 py-1 mt-4  rounded-md mb-4 md:mb-2 text-lg"
      value={selectedHospital}
        onChange={(e) => setSelectedHospital(e.target.value)}
      >
        <option value="HSP1">HSP1</option>
        <option value="HSP2">HSP2</option>
      </select>

      {isLoading ? (
        <div className=" text-gray-500 h-screen  flex items-center justify-center">
          <svg
            className="pl w-16 h-16 mr-20"
            viewBox="0 0 128 128"
            width="128px"
            height="128px"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="pl-grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(193,90%,55%)"></stop>
                <stop offset="100%" stopColor="hsl(223,90%,55%)"></stop>
              </linearGradient>
            </defs>
            <circle
              className="pl__ring"
              r="56"
              cx="64"
              cy="64"
              fill="none"
              stroke="hsla(0,10%,10%,0.1)"
              strokeWidth="16"
              strokeLinecap="round"
            ></circle>
            <path
              className="pl__worm"
              d="M92,15.492S78.194,4.967,66.743,16.887c-17.231,17.938-28.26,96.974-28.26,96.974L119.85,59.892l-99-31.588,57.528,89.832L97.8,19.349,13.636,88.51l89.012,16.015S81.908,38.332,66.1,22.337C50.114,6.156,36,15.492,36,15.492a56,56,0,1,0,56,0Z"
              fill="none"
              stroke="url(#pl-grad)"
              strokeWidth="16"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="44 1111"
              strokeDashoffset="10"
            ></path>
          </svg>
        </div>
      ) : (
        <>
          {/* Chart Components */}
          <div className="flex flex-col mt-2 lg:flex-row justify-between w-full gap-6 mb-6">
            <div className="bg-white shadow-md p-3 rounded-lg border border-gray-200 flex-1">
              <h2 className="text-sm font-semibold text-gray-800 mb-2">
                Emergencies Per Month
              </h2>
              <Line data={lineChartData} options={lineChartOptions} />
            </div>

            <div className="bg-white shadow-md p-3 rounded-lg border border-gray-200 flex-1">
              <h2 className="text-sm font-semibold text-gray-800 mb-2">
                Emergency Type Distribution
              </h2>
              <div style={{ width: "100%", height: "220px" }}>
                <Pie
                  data={pieChartData}
                  options={{
                    plugins: {
                      legend: { position: "bottom" },
                      tooltip: {
                        callbacks: {
                          label: (context) =>
                            `${context.label}: ${context.raw}`,
                        },
                      },
                    },
                    cutout: "60%",
                    maintainAspectRatio: false,
                  }}
                />
              </div>
            </div>

            <div className="bg-white shadow-md p-3 rounded-lg border border-gray-200 flex-1">
              <h2 className="text-sm font-semibold text-gray-800 mb-2">
                Severity Level Distribution
              </h2>
              <Bar data={barChartData} options={barChartOptions} />
            </div>
          </div>

          {/* Table and Recommendations */}
          <div className="bg-white shadow-md flex flex-col lg:flex-row p-3 mt-6 rounded-lg border border-gray-200 gap-6 w-full">
            <div className="flex-1 w-full overflow-x-auto">
              <table className="w-full table-auto border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-[#FF6347] text-white">
                    <th className="border border-gray-300 p-2 text-xs">
                      Hospital ID
                    </th>
                    <th className="border border-gray-300 p-2 text-xs">Time</th>
                    <th className="border border-gray-300 p-2 text-xs">Type</th>
                    <th className="border border-gray-300 p-2 text-xs">
                      Severity
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentRows.map((row, index) => (
                    <tr key={index} className="even:bg-gray-100">
                      <td className="border border-gray-300 p-2 text-center text-xs">
                        {row.hospitalId}
                      </td>
                      <td className="border border-gray-300 p-2 text-center text-xs">
                        {row.time}
                      </td>
                      <td className="border border-gray-300 p-2 text-center text-xs">
                        {row.type}
                      </td>
                      <td className="border border-gray-300 p-2 text-center text-xs">
                        {row.severity}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="flex text-xs justify-between items-center mt-4">
                <span>
                  Page {currentPage} of {totalPages}
                </span>
                <div className="flex space-x-2">
                  <button
                    className={`px-2 py-1 border rounded ${
                      currentPage === 1
                        ? "text-gray-400 cursor-not-allowed"
                        : "text-blue-500"
                    }`}
                    onClick={() => handlePageChange("prev")}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </button>
                  <button
                    className={`px-2 py-1 border rounded ${
                      currentPage === totalPages
                        ? "text-gray-400 cursor-not-allowed"
                        : "text-blue-500"
                    }`}
                    onClick={() => handlePageChange("next")}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white shadow-md p-4 rounded-lg border border-gray-200 flex flex-col w-full lg:flex-[0.4]">
              <h2 className="text-xs font-semibold text-gray-800 mb-3">
                Insights & Recommendations
              </h2>
              <ul className="flex flex-col space-y-2">
                {recommendations.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-center space-x-2 text-xs cursor-pointer hover:underline"
                  >
                    <Link
                      href={`/recommendation/${index + 1}`}
                      aria-label={item.title}
                    >
                      <div className="flex items-center space-x-2">
                        <div className="bg-gray-100 text-xs p-2 rounded-full">
                          {item.icon}
                        </div>
                        <span>{item.title}</span>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default EmergencyDashboard;
