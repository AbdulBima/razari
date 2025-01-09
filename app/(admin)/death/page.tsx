"use client";

import React, { useEffect, useState } from "react";
import { Line, Pie, Bar } from "react-chartjs-2";
import "chart.js/auto";
import {
  FaSkullCrossbones,
  FaHeartbeat,
  FaAmbulance,
} from "react-icons/fa";
import Link from "next/link";
import Breadcrumb from "@/components/navigation/Breadcrumb";

type DeathData = {
  hospitalId: string;
  time: string;
  cause: string;
  ageGroup: string;
};

const DeathDashboard = () => {
  const [deathData, setDeathData] = useState<DeathData[]>([]);
  const [filteredData, setFilteredData] = useState<DeathData[]>([]);
  const [selectedHospital, setSelectedHospital] = useState("HSP1");

  const [currentPage, setCurrentPage] = useState(1);

  const [monthlyDeaths, setMonthlyDeaths] = useState<number[]>([]);
  const [ageGroupDistribution, setAgeGroupDistribution] = useState<{
    [key: string]: number;
  }>({});
  const [causeDistribution, setCauseDistribution] = useState<{
    [key: string]: number;
  }>({});
  const [isLoading, setIsLoading] = useState(false); // Loading state

  const recommendations = [
    { title: "Hospitals with Low Mortality Rates", icon: <FaSkullCrossbones size={15} color="red" /> },
    { title: "Hospitals with Advanced ICU Facilities", icon: <FaHeartbeat size={15} color="blue" /> },
    { title: "Hospitals with Best Emergency Response", icon: <FaAmbulance size={15} color="green" /> },
  ];

  const rowsPerPage = 5;

  const tableData = [
    { hospitalId: "HSP1", time: "2024-12-01 14:35", cause: "Illness", ageGroup: "Adult" },
    { hospitalId: "HSP2", time: "2024-12-02 09:15", cause: "Accident", ageGroup: "Adult" },
    { hospitalId: "HSP3", time: "2024-12-03 10:10", cause: "Illness", ageGroup: "Child" },
    { hospitalId: "HSP4", time: "2024-12-04 11:45", cause: "Others", ageGroup: "Infant" },
  ];

  useEffect(() => {
    setDeathData(tableData);
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
      setMonthlyDeaths([20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75]);
      setAgeGroupDistribution({
        Infant: 15,
        Child: 25,
        Adult: 60,
      });
      setCauseDistribution({
        Illness: 50,
        Accident: 30,
        Others: 20,
      });
      setFilteredData(
        tableData.filter((data) => data.hospitalId === "HSP1")
      );
    } else if (hospital === "HSP2") {
      setMonthlyDeaths([30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85]);
      setAgeGroupDistribution({
        Infant: 10,
        Child: 20,
        Adult: 70,
      });
      setCauseDistribution({
        Illness: 40,
        Accident: 40,
        Others: 20,
      });
      setFilteredData(
        tableData.filter((data) => data.hospitalId === "HSP2")
      );
    } else if (hospital === "HSP3") {
      setMonthlyDeaths([25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80]);
      setAgeGroupDistribution({
        Infant: 20,
        Child: 15,
        Adult: 65,
      });
      setCauseDistribution({
        Illness: 60,
        Accident: 20,
        Others: 20,
      });
      setFilteredData(
        tableData.filter((data) => data.hospitalId === "HSP3")
      );
    } else if (hospital === "HSP4") {
      setMonthlyDeaths([15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70]);
      setAgeGroupDistribution({
        Infant: 5,
        Child: 10,
        Adult: 85,
      });
      setCauseDistribution({
        Illness: 70,
        Accident: 15,
        Others: 15,
      });
      setFilteredData(
        tableData.filter((data) => data.hospitalId === "HSP4")
      );
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
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Deaths",
        data: monthlyDeaths,
        borderColor: "#ff5733",
        backgroundColor: "rgba(255, 87, 51, 0.2)",
      },
    ],
  };

  const pieChartData = {
    labels: Object.keys(ageGroupDistribution),
    datasets: [
      {
        data: Object.values(ageGroupDistribution),
        backgroundColor: ["#ff715b", "#FFD700", "#90EE90", "#6495ED", "#a11692"],
      },
    ],
  };

  const barChartData = {
    labels: Object.keys(causeDistribution),
    datasets: [
      {
        data: Object.values(causeDistribution),
        backgroundColor: ["#FF6347", "#49111c", "#87CEEB"],
      },
    ],
  };

  const barChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false, // Disables the legend
      },
      tooltip: {
        enabled: true, // Tooltips enabled
      },
    },
  };

  const lineChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false, // Hide the legend if not needed
      },
      tooltip: {
        intersect: false, // Ensure tooltips appear only on points
      },
    },
    scales: {
      x: {
        grid: {
          display: false, // Hide vertical gridlines
        },
      },
      y: {
        grid: {
          display: true, // Show horizontal gridlines
          color: "#e0e0e0", // Optional: Customize gridline color
        },
      },
    },
  };

  return (
    <div className="poppins-regular px-8 pt-2 w-full bg-gray-50 h-full overscroll-y-none overflow-y-hidden">
     
     
     <Breadcrumb secondLink = {{href: "/death",label: "Death" }} />
     
     <select
        className="border border-gray-300 px-2 py-1 mt-4  rounded-md mb-4 md:mb-2 text-lg"
     value={selectedHospital}
        onChange={(e) => setSelectedHospital(e.target.value)}
      >
        <option value="HSP1">HSP1</option>
        <option value="HSP2">HSP2</option>
        <option value="HSP3">HSP3</option>
        <option value="HSP4">HSP4</option>
      </select>

      {isLoading ? (
     <div className="flex justify-center items-center h-screen">
     <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-orange-700"></div>
   </div>
      ) : (
        <>
          {/* Chart Components */}
          <div className="flex flex-col lg:flex-row mt-2 justify-between w-full gap-6 mb-6">
            <div className="bg-white shadow-md p-3 rounded-lg border border-gray-200 flex-1">
              <h2 className="text-sm font-semibold text-gray-800 mb-2">Deaths Per Month</h2>
              <Line data={lineChartData} options={lineChartOptions} />
            </div>

            <div className="bg-white shadow-md p-3 rounded-lg border border-gray-200 flex-1">
              <h2 className="text-sm font-semibold text-gray-800 mb-2">Age Group Distribution</h2>
              <div style={{ width: "100%", height: "220px" }}>
              <Pie
                data={pieChartData}
                options={{
                  plugins: {
                    legend: { position: "bottom" },
                    tooltip: {
                      callbacks: {
                        label: (context) => `${context.label}: ${context.raw}`,
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
              <h2 className="text-sm font-semibold text-gray-800 mb-2">Cause of Death Distribution</h2>
              <Bar data={barChartData} options={barChartOptions} />
            </div>
          </div>

          {/* Table and Recommendations */}
          <div className="bg-white shadow-md flex flex-col lg:flex-row p-3 mt-6 rounded-lg border border-gray-200 gap-6 w-full">
            <div className="flex-1 w-full overflow-x-auto">
              <table className="w-full table-auto border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-[#ff5733] text-white">
                    <th className="border border-gray-300 p-2 text-xs">Hospital ID</th>
                    <th className="border border-gray-300 p-2 text-xs">Time</th>
                    <th className="border border-gray-300 p-2 text-xs">Cause</th>
                    <th className="border border-gray-300 p-2 text-xs">Age Group</th>
                  </tr>
                </thead>
                <tbody>
                  {currentRows.map((row, index) => (
                    <tr key={index} className="even:bg-gray-100">
                      <td className="border border-gray-300 p-2 text-center text-xs">{row.hospitalId}</td>
                      <td className="border border-gray-300 p-2 text-center text-xs">{row.time}</td>
                      <td className="border border-gray-300 p-2 text-center text-xs">{row.cause}</td>
                      <td className="border border-gray-300 p-2 text-center text-xs">{row.ageGroup}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="flex text-xs justify-between items-center mt-4">
                <span>Page {currentPage} of {totalPages}</span>
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

            <div className="bg-white shadow-md p-4 rounded-lg border border-gray-200 flex flex-col w-full lg:flex-[0.4]">
              <h2 className="text-xs font-semibold text-gray-800 mb-3">Insights & Recommendations</h2>
              <ul className="flex flex-col space-y-2">
                {recommendations.map((item, index) => (
                  <li key={index} className="flex items-center space-x-2 text-xs cursor-pointer hover:underline">
                    <Link href={`/recommendation/${index + 1}`} aria-label={item.title}>
                      <div className="flex items-center space-x-2">
                        <div className="bg-gray-100 text-xs p-2 rounded-full">{item.icon}</div>
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

export default DeathDashboard;
