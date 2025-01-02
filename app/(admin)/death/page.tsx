"use client";

import React, { useEffect, useState } from "react";
import { Line, Pie, Bar } from "react-chartjs-2";
import "chart.js/auto";
import {
  FaChartLine,
  FaCogs,

  FaUserShield,
} from "react-icons/fa";

type DeathData = {
  hospitalId: string;
  time: string;
  cause: string;
  ageGroup: string; // e.g., "0-18", "19-60", "61+"
};

const DeathDashboard = () => {
  const [deathData, setDeathData] = useState<DeathData[]>([]);
  const [filteredData, setFilteredData] = useState<DeathData[]>([]);
  const [selectedHospital, setSelectedHospital] = useState("Overall");
  const [currentPage, setCurrentPage] = useState(1);

  const rowsPerPage = 5; // Rows per page

  const monthlyDeaths = [10, 15, 12, 20, 25, 22, 18, 24, 19, 21, 27, 30];
  const ageGroupDistribution = { "0-18": 15, "19-60": 50, "61+": 80 };
  const causeDistribution = { illness: 70, accident: 40, other: 35 };

  const tableData = [
    {
      hospitalId: "HSP001",
      time: "2024-12-01 12:00",
      cause: "Illness",
      ageGroup: "61+",
    },
    {
      hospitalId: "HSP002",
      time: "2024-12-02 08:30",
      cause: "Accident",
      ageGroup: "19-60",
    },
    {
      hospitalId: "HSP003",
      time: "2024-12-03 14:45",
      cause: "Other",
      ageGroup: "0-18",
    },
    {
      hospitalId: "HSP001",
      time: "2024-12-04 10:15",
      cause: "Illness",
      ageGroup: "61+",
    },
  ];

  useEffect(() => {
    // Initialize death data and filter it based on the default selection
    setDeathData(tableData);
    setFilteredData(tableData);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // Filter data whenever the selected hospital changes
    if (selectedHospital === "Overall") {
      setFilteredData(deathData);
    } else {
      const filtered = deathData.filter(
        (row) => row.hospitalId === selectedHospital
      );
      setFilteredData(filtered);
    }
  }, [selectedHospital, deathData]);

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
        label: "Deaths Per Month",
        data: monthlyDeaths,
        fill: false,
        backgroundColor: "#70161E",
        borderColor: "#D7263D",
      },
    ],
  };

  const pieChartData = {
    labels: ["0-18", "19-60", "61+"],
    datasets: [
      {
        label: "Age Group Distribution",
        data: [
          ageGroupDistribution["0-18"],
          ageGroupDistribution["19-60"],
          ageGroupDistribution["61+"],
        ],
        backgroundColor: ["#6A0572", "#D54062", "#FFA372"],
      },
    ],
  };

  const barChartData = {
    labels: ["Illness", "Accident", "Other"],
    datasets: [
      {
        label: "Cause of Death",
        data: [
          causeDistribution.illness,
          causeDistribution.accident,
          causeDistribution.other,
        ],
        backgroundColor: ["#9A031E", "#FB8B24", "#E36414"],
      },
    ],
  };

  const barChartOptions = {
    indexAxis: "x" as const,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: { display: false },
      },
      y: {
        grid: { display: false },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  const lineChartOptions = {
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: { display: false },
      },
      y: {
        grid: { color: "#e0e0e0", lineWidth: 1 },
        ticks: { stepSize: 5 },
      },
    },
    plugins: { legend: { display: false } },
  };

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  const handlePageChange = (direction: "next" | "prev") => {
    setCurrentPage((prevPage) =>
      direction === "next"
        ? Math.min(prevPage + 1, totalPages)
        : Math.max(prevPage - 1, 1)
    );
  };

  const currentRows = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <div className="poppins-regular px-8 pt-6 w-full bg-gray-50 h-full overscroll-y-none overflow-y-hidden">
      {/* Hospital Selection */}
      <select
        className="border border-gray-300 px-2 py-1 rounded-md mb-6 md:mb-2"
        value={selectedHospital}
        onChange={(e) => setSelectedHospital(e.target.value)}
      >
        <option value="Overall">Overall</option>
        <option value="HSP001">Hospital 1</option>
        <option value="HSP002">Hospital 2</option>
        <option value="HSP003">Hospital 3</option>
        <option value="HSP004">Hospital 4</option>
      </select>

      <div className="flex flex-col lg:flex-row justify-between w-full gap-6 mb-6">
        {/* Line Chart for Death Rates */}
        <div className="bg-white shadow-md p-3 rounded-lg border border-gray-200 flex-1">
          <h2 className="text-sm font-semibold text-gray-800 mb-2">
            Deaths Per Month
          </h2>
          <div
            className="poppins-regular mx-auto"
            style={{ width: "100%", height: "220px" }}
          >
                      <Line data={lineChartData} options={lineChartOptions}/>
                      
          
          </div>
        </div>

        {/* Pie Chart for Age Group Distribution */}
        <div className="bg-white shadow-md p-3 rounded-lg border border-gray-200 flex-1">
          <h2 className="text-sm font-semibold text-gray-800 mb-2">
            Age Group Distribution
          </h2>
          <div
            className="poppins-regular mx-auto"
            style={{ width: "100%", height: "220px" }}
          >
            <Pie data={pieChartData}  options={{
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
        }} />
          </div>
        </div>

        {/* Bar Chart for Cause of Death */}
        <div className="bg-white shadow-md p-3 rounded-lg border border-gray-200 flex-1">
          <h2 className="text-sm font-semibold text-gray-800 mb-2">
            Cause of Death
          </h2>
          <div
            className="poppins-regular mx-auto"
            style={{ width: "100%", height: "220px" }}
          >
          <Bar data={barChartData} options={barChartOptions} />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white shadow-md flex flex-col lg:flex-row p-3 mt-6 rounded-lg border border-gray-200 gap-6">
        <div className="flex-1 overflow-x-auto">
          <table className="w-full table-auto border-collapse border border-gray-300">
            <thead>
              <tr className="bg-[#70161E] text-white">
                <th className="border border-gray-300 p-2 text-xs">Hospital ID</th>
                <th className="border border-gray-300 p-2 text-xs">Time</th>
                <th className="border border-gray-300 p-2 text-xs">Cause</th>
                <th className="border border-gray-300 p-2 text-xs">Age Group</th>
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
                    {row.cause}
                  </td>
                  <td className="border border-gray-300 p-2 text-center text-xs">
                    {row.ageGroup}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex text-xs justify-between items-center mt-4">
            <span className="text-xs text-gray-600">
              Page {currentPage} of {totalPages}
            </span>
            <div className="flex space-x-2">
              <button
                className={`px-3 py-1 border rounded ${
                  currentPage === 1 ? "cursor-not-allowed opacity-50" : ""
                }`}
                onClick={() => handlePageChange("prev")}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <button
                className={`px-3 py-1 border rounded ${
                  currentPage === totalPages ? "cursor-not-allowed opacity-50" : ""
                }`}
                onClick={() => handlePageChange("next")}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </div>
        </div>

        {/* Insights Section */}
        <div className="bg-white shadow-md p-6 rounded-lg border border-gray-200 flex flex-col flex-[0.4]">
          <h2 className="text-sm font-semibold text-gray-800 mb-4">
            Insights & Recommendations
          </h2>
          <ul className="flex flex-col space-y-4">
            <li className="flex items-center space-x-3">
              <FaChartLine size={20} color="#9A031E" />
              <span className="text-sm text-gray-800">
                Death rates peak in winter months.
              </span>
            </li>
            <li className="flex items-center space-x-3">
              <FaUserShield size={20} color="#FB8B24" />
              <span className="text-sm text-gray-800">
                Most deaths occur in the elderly population.
              </span>
            </li>
            <li className="flex items-center space-x-3">
              <FaCogs size={20} color="#E36414" />
              <span className="text-sm text-gray-800">
                Accidents are a significant cause in the 19-60 age group.
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DeathDashboard;
