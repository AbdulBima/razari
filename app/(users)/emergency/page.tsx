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
      type: "Trauma",
      severity: "High",
    },
    {
      hospitalId: "HSP2",
      time: "2024-12-02 09:15",
      type: "Medical",
      severity: "Moderate",
    },
    {
      hospitalId: "HSP3",
      time: "2024-12-03 10:10",
      type: "Surgical",
      severity: "Critical",
    },
    {
      hospitalId: "HSP4",
      time: "2024-12-04 11:45",
      type: "Obstetric",
      severity: "Low",
    },
    {
      hospitalId: "HSP5",
      time: "2024-12-05 16:30",
      type: "Pediatric",
      severity: "Moderate",
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
      setMonthlyEmergencies([30, 45, 50, 55, 60, 65, 70, 80, 90, 100, 110, 120]);
      setEmergencyTypeDistribution({
        Trauma: 25,
        Medical: 20,
        Surgical: 15,
        Obstetric: 10,
        Pediatric: 30,
      });
      setSeverityDistribution({
        High: 35,
        Moderate: 25,
        Critical: 20,
        Low: 20,
      });
      setFilteredData(tableData.filter((data) => data.hospitalId === "HSP1"));
    } else if (hospital === "HSP2") {
      setMonthlyEmergencies([20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130]);
      setEmergencyTypeDistribution({
        Trauma: 40,
        Medical: 15,
        Surgical: 20,
        Obstetric: 15,
        Pediatric: 10,
      });
      setSeverityDistribution({
        High: 25,
        Moderate: 45,
        Critical: 15,
        Low: 15,
      });
      setFilteredData(tableData.filter((data) => data.hospitalId === "HSP2"));
    }
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
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"],
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
        <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-orange-700"></div>
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
