"use client";

import React, { useEffect, useState } from "react";
import { Line, Pie, Bar } from "react-chartjs-2";
import "chart.js/auto";
import { FaUserMd as FaDoctor, FaStethoscope, FaUserAlt } from "react-icons/fa";

type DiagnosisData = {
  doctorId: string;
  time: string;
  diagnosis: string; // e.g., "Infectious Diseases", "Chronic Conditions", "Respiratory Issues", etc.
  ageGroup: string; // e.g., "0-18", "19-35", "36-60", "60+"
};

const DiagnosisDashboard = () => {
  const [diagnosisData, setDiagnosisData] = useState<DiagnosisData[]>([]);
  const [filteredData, setFilteredData] = useState<DiagnosisData[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState("Overall");
  const [currentPage, setCurrentPage] = useState(1);

  const rowsPerPage = 5;

  const monthlyDiagnoses = [25, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85];
  const diagnosisDistribution = {
    "Infectious Diseases": 40,
    "Chronic Conditions": 30,
    "Respiratory Issues": 20,
    "Mental Health Issues": 10,
  };
  const ageDistribution = {
    "0-18": 20,
    "19-35": 40,
    "36-60": 30,
    "60+": 10,
  };

  const tableData = [
    { doctorId: "DOC001", time: "2024-12-01 14:35", diagnosis: "Infectious Diseases", ageGroup: "19-35" },
    { doctorId: "DOC002", time: "2024-12-02 09:15", diagnosis: "Chronic Conditions", ageGroup: "36-60" },
    { doctorId: "DOC001", time: "2024-12-03 10:10", diagnosis: "Respiratory Issues", ageGroup: "0-18" },
    { doctorId: "DOC003", time: "2024-12-04 11:45", diagnosis: "Mental Health Issues", ageGroup: "60+" },
  ];

  useEffect(() => {
    setDiagnosisData(tableData);
    setFilteredData(tableData);
  }, []);

  useEffect(() => {
    if (selectedDoctor === "Overall") {
      setFilteredData(diagnosisData);
    } else {
      const filtered = diagnosisData.filter((row) => row.doctorId === selectedDoctor);
      setFilteredData(filtered);
    }
  }, [selectedDoctor, diagnosisData]);

  const lineChartData = {
    labels: [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ],
    datasets: [
      {
        label: "Diagnoses Per Month",
        data: monthlyDiagnoses,
        fill: false,
        backgroundColor: "#6B8E23",
        borderColor: "#9ACD32",
      },
    ],
  };

  const lineChartOptions = {
    maintainAspectRatio: false,
    scales: {
      x: { grid: { display: false } },
      y: { grid: { color: "#e0e0e0", lineWidth: 1 }, ticks: { stepSize: 10 } },
    },
    plugins: { legend: { display: false } },
  };

  const pieChartData = {
    labels: Object.keys(diagnosisDistribution),
    datasets: [
      {
        label: "Diagnosis Type Distribution",
        data: Object.values(diagnosisDistribution),
        backgroundColor: ["#6B8E23", "#FFD700", "#87CEEB", "#FF6347"],
      },
    ],
  };

  const barChartData = {
    labels: Object.keys(ageDistribution),
    datasets: [
      {
        label: "Age Group Distribution",
        data: Object.values(ageDistribution),
        backgroundColor: ["#6B8E23", "#FFD700", "#87CEEB", "#FF6347"],
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
      {/* Doctor Selection */}
      <select
        className="border border-gray-300 px-2 py-1 rounded-md mb-6 md:mb-2"
        value={selectedDoctor}
        onChange={(e) => setSelectedDoctor(e.target.value)}
      >
        <option value="Overall">Overall</option>
        <option value="DOC001">Doctor 1</option>
        <option value="DOC002">Doctor 2</option>
        <option value="DOC003">Doctor 3</option>
        <option value="DOC004">Doctor 4</option>
      </select>

      <div className="flex flex-col lg:flex-row justify-between w-full gap-6 mb-6">
        {/* Line Chart for Diagnoses Per Month */}
        <div className="bg-white shadow-md p-3 rounded-lg border border-gray-200 flex-1">
          <h2 className="text-sm font-semibold text-gray-800 mb-2">
            Diagnoses Per Month
          </h2>
          <div style={{ width: "100%", height: "220px" }}>
            <Line data={lineChartData} options={lineChartOptions} />
          </div>
        </div>

        {/* Pie Chart for Diagnosis Types */}
        <div className="bg-white shadow-md p-3 rounded-lg border border-gray-200 flex-1">
          <h2 className="text-sm font-semibold text-gray-800 mb-2">
            Diagnosis Type Distribution
          </h2>
          <div style={{ width: "100%", height: "220px" }}>
            <Pie data={pieChartData} options={{ maintainAspectRatio: false }} />
          </div>
        </div>

        {/* Bar Chart for Age Groups */}
        <div className="bg-white shadow-md p-3 rounded-lg border border-gray-200 flex-1">
          <h2 className="text-sm font-semibold text-gray-800 mb-2">
            Age Group Distribution
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
              <tr className="bg-[#6B8E23] text-white">
                <th className="border border-gray-300 p-2 text-xs">Doctor ID</th>
                <th className="border border-gray-300 p-2 text-xs">Time</th>
                <th className="border border-gray-300 p-2 text-xs">Diagnosis</th>
                <th className="border border-gray-300 p-2 text-xs">Age Group</th>
              </tr>
            </thead>
            <tbody>
              {currentRows.map((row, index) => (
                <tr key={index} className="even:bg-gray-100">
                  <td className="border border-gray-300 p-2 text-center text-xs">{row.doctorId}</td>
                  <td className="border border-gray-300 p-2 text-center text-xs">{row.time}</td>
                  <td className="border border-gray-300 p-2 text-center text-xs">{row.diagnosis}</td>
                  <td className="border border-gray-300 p-2 text-center text-xs">{row.ageGroup}</td>
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
              <FaDoctor size={20} />
              <span>Infectious Diseases are the most common diagnoses.</span>
            </li>
            <li className="flex items-center space-x-3">
              <FaStethoscope size={20} />
              <span>The majority of diagnoses occur in the 19-35 age group.</span>
            </li>
            <li className="flex items-center space-x-3">
              <FaUserAlt size={20} />
              <span>There is a significant number of Respiratory Issues in children (0-18).</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DiagnosisDashboard;
