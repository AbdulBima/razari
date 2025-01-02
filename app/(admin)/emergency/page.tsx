"use client";

import React, { useEffect, useState } from "react";
import { Line, Pie, Bar } from "react-chartjs-2";
import "chart.js/auto";
import { FaAmbulance,  FaExclamationTriangle,  } from "react-icons/fa";

type EmergencyData = {
  hospitalId: string;
  time: string;
  type: string; // e.g., "Accident", "Heart Attack", "Burns", etc.
  severity: string; // e.g., "Critical", "Moderate", "Mild"
};

const EmergencyDashboard = () => {
  const [emergencyData, setEmergencyData] = useState<EmergencyData[]>([]);
  const [filteredData, setFilteredData] = useState<EmergencyData[]>([]);
  const [selectedHospital, setSelectedHospital] = useState("Overall");
  const [currentPage, setCurrentPage] = useState(1);

  const rowsPerPage = 5;

  const monthlyEmergencies = [15, 22, 30, 28, 40, 50, 45, 55, 38, 42, 60, 70];
  const typeDistribution = { Accident: 50, "Medical Emergency": 30, Burns: 20 };
  const severityDistribution = { Critical: 40, Moderate: 60, Mild: 80 };

  const tableData = [
    { hospitalId: "HSP001", time: "2024-12-01 14:35", type: "Accident", severity: "Critical" },
    { hospitalId: "HSP002", time: "2024-12-02 09:15", type: "Heart Attack", severity: "Critical" },
    { hospitalId: "HSP001", time: "2024-12-03 10:10", type: "Burns", severity: "Moderate" },
    { hospitalId: "HSP003", time: "2024-12-04 11:45", type: "Accident", severity: "Mild" },
  ];

  useEffect(() => {
    setEmergencyData(tableData);
    setFilteredData(tableData);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (selectedHospital === "Overall") {
      setFilteredData(emergencyData);
    } else {
      const filtered = emergencyData.filter((row) => row.hospitalId === selectedHospital);
      setFilteredData(filtered);
    }
  }, [selectedHospital, emergencyData]);

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
        label: "Emergencies Per Month",
        data: monthlyEmergencies,
        fill: false,
        backgroundColor: "#FF6F61",
        borderColor: "#4ECDC4",
      },
    ],
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

  const pieChartData = {
    labels: Object.keys(typeDistribution),
    datasets: [
      {
        label: "Type Distribution",
        data: Object.values(typeDistribution),
        backgroundColor: ["#FF6F61", "#FFB400", "#35A79C"],
      },
    ],
  };

  const barChartData = {
    labels: Object.keys(severityDistribution),
    datasets: [
      {
        label: "Severity Distribution",
        data: Object.values(severityDistribution),
        backgroundColor: ["#FF6F61", "#FFB400", "#35A79C"],
      },
    ],
  };

  const barChartOptions = {
    indexAxis: "x" as const,
    maintainAspectRatio: false,
    scales: {
      x: { grid: { display: false } },
      y: { grid: { display: false } },
    },
    plugins: {
      legend: { display: false },
    },
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
        {/* Line Chart for Emergencies Per Month */}
        <div className="bg-white shadow-md p-3 rounded-lg border border-gray-200 flex-1">
          <h2 className="text-sm font-semibold text-gray-800 mb-2">
            Emergencies Per Month
          </h2>
          <div style={{ width: "100%", height: "220px" }}>
                  <Line data={lineChartData} options={lineChartOptions}/>
      
          </div>
        </div>

        {/* Pie Chart for Emergency Types */}
        <div className="bg-white shadow-md p-3 rounded-lg border border-gray-200 flex-1">
          <h2 className="text-sm font-semibold text-gray-800 mb-2">
            Emergency Type Distribution
          </h2>
          <div style={{ width: "100%", height: "220px" }}>
            <Pie data={pieChartData}  options={{
          plugins: {
            legend: { position: "top" },
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

        {/* Bar Chart for Severity */}
        <div className="bg-white shadow-md p-3 rounded-lg border border-gray-200 flex-1">
          <h2 className="text-sm font-semibold text-gray-800 mb-2">
            Severity Levels
          </h2>
          <div style={{ width: "100%", height: "220px" }}>
            <Bar data={barChartData} options={barChartOptions} />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white shadow-md flex flex-col lg:flex-row p-3 mt-6 rounded-lg border border-gray-200 gap-6">
        <div className="flex-1 overflow-x-auto">
          <table className="w-full table-auto border-collapse border border-gray-300">
            <thead>
              <tr className="bg-[#FF6F61] text-white">
                <th className="border border-gray-300 p-2 text-xs">Hospital ID</th>
                <th className="border border-gray-300 p-2 text-xs">Time</th>
                <th className="border border-gray-300 p-2 text-xs">Type</th>
                <th className="border border-gray-300 p-2 text-xs">Severity</th>
              </tr>
            </thead>
            <tbody>
              {currentRows.map((row, index) => (
                <tr key={index} className="even:bg-gray-100">
                  <td className="border border-gray-300 p-2 text-center text-xs">{row.hospitalId}</td>
                  <td className="border border-gray-300 p-2 text-center text-xs">{row.time}</td>
                  <td className="border border-gray-300 p-2 text-center text-xs">{row.type}</td>
                  <td className="border border-gray-300 p-2 text-center text-xs">{row.severity}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex text-xs justify-between items-center mt-4">
            <span>Page {currentPage} of {totalPages}</span>
            <div className="flex space-x-2">
              <button onClick={() => handlePageChange("prev")} disabled={currentPage === 1}>
                Previous
              </button>
              <button onClick={() => handlePageChange("next")} disabled={currentPage === totalPages}>
                Next
              </button>
            </div>
          </div>
        </div>
        <div className="bg-white shadow-md p-6 rounded-lg border border-gray-200 flex-[0.4]">
          <h2 className="text-sm font-semibold text-gray-800 mb-4">Insights & Recommendations</h2>
          <ul className="flex text-sm flex-col space-y-4">
            <li className="flex items-center space-x-3">
              <FaAmbulance size={20} />
              <span>Accidents account for the majority of emergencies.</span>
            </li>
            <li className="flex items-center space-x-3">
              <FaExclamationTriangle size={20} />
              <span>Critical cases peak during weekends.</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default EmergencyDashboard;
