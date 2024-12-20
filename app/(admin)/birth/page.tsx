"use client";

import React, { useEffect, useState } from "react";
import { Line, Pie, Bar } from "react-chartjs-2";
import "chart.js/auto";
import { FaChartLine, FaCogs, FaExclamationTriangle, FaLeaf, FaUserShield } from "react-icons/fa";

type BirthData = {
  hospitalId: string;
  time: string;
  gender: string;
  mode: string; // "CS" or "Natural"
};

const BirthDashboard = () => {
  const [birthData, setBirthData] = useState<BirthData[]>([]);
  const [filteredData, setFilteredData] = useState<BirthData[]>([]);
  const [selectedHospital, setSelectedHospital] = useState("Overall");
  const [currentPage, setCurrentPage] = useState(1);

  const rowsPerPage = 5; // Rows per page

  const monthlyBirths = [20, 25, 18, 30, 35, 40, 45, 50, 38, 42, 55, 60];
  const genderDistribution = { male: 120, female: 130 };
  const modeDistribution = { cs: 80, natural: 170 };

  const tableData = [
    { hospitalId: "HSP001", time: "2024-12-01 14:35", gender: "Male", mode: "CS" },
    { hospitalId: "HSP002", time: "2024-12-02 09:15", gender: "Female", mode: "Natural" },
    { hospitalId: "HSP001", time: "2024-12-03 10:10", gender: "Male", mode: "CS" },
    { hospitalId: "HSP003", time: "2024-12-04 11:45", gender: "Female", mode: "Natural" },
  ];

  

  

  useEffect(() => {
    // Initialize birth data and filter it based on the default selection
    setBirthData(tableData);
  
    // Ensure "Overall" (default selection) filters all data initially
    setFilteredData(tableData); 
  }, []);
  
  useEffect(() => {
    // Filter data whenever the selected hospital changes
    if (selectedHospital === "Overall") {
      setFilteredData(birthData); // Show all data for "Overall"
    } else {
      const filtered = birthData.filter((row) => row.hospitalId === selectedHospital);
      setFilteredData(filtered);
    }
  }, [selectedHospital, birthData]);
  

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
        label: "Births Per Month",
        data: monthlyBirths,
        fill: false,
        backgroundColor: "#356966",
        borderColor: "#ff8552",
      },
    ],
  };

  const pieChartData = {
    labels: ["Male", "Female"],
    datasets: [
      {
        label: "Gender Distribution",
        data: [genderDistribution.male, genderDistribution.female],
        backgroundColor: ["#356966", "#ff8552"],
      },
    ],
  };

  const barChartData = {
    labels: ["CS", "Natural"],
    datasets: [
      {
        label: "Mode of Birth",
        data: [modeDistribution.cs, modeDistribution.natural],
        backgroundColor: ["#8d8741", "#bc986a"],
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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
        {/* Line Chart for Birth Rates */}
        <div className="bg-white shadow-md p-3 rounded-lg border border-gray-200 flex-1">
          <h2 className="text-sm font-semibold text-gray-800 mb-2">
            Births Per Month
          </h2>
          <div
            className="poppins-regular mx-auto"
            style={{ width: "100%", height: "220px" }}
          >
            <Line data={lineChartData} options={lineChartOptions}/>
            
          </div>
        </div>

        {/* Pie Chart for Gender Distribution */}
        <div className="bg-white shadow-md p-3 rounded-lg border border-gray-200 flex-1">
          <h2 className="text-sm font-semibold text-gray-800 mb-2">
            Gender Distribution
          </h2>
          <div
            className="poppins-regular mx-auto"
            style={{ width: "100%", height: "220px" }}
          >
            <Pie data={pieChartData} options={{ maintainAspectRatio: false }} />
          </div>
        </div>

        {/* Bar Chart for Mode of Birth */}
        <div className="bg-white shadow-md p-3 rounded-lg border border-gray-200 flex-1">
          <h2 className="text-sm font-semibold text-gray-800 mb-2">
            Mode of Birth
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
  {/* Table Section */}
  <div className="flex-1 overflow-x-auto">
    <table className="w-full table-auto border-collapse border border-gray-300">
      <thead>
        <tr className="bg-[#356966] text-white">
          <th className="border border-gray-300 p-2 text-xs">Hospital ID</th>
          <th className="border border-gray-300 p-2 text-xs">Time</th>
          <th className="border border-gray-300 p-2 text-xs">Gender</th>
          <th className="border border-gray-300 p-2 text-xs">Mode</th>
        </tr>
      </thead>
      <tbody>
        {filteredData.map((row, index) => (
          <tr key={index} className="even:bg-gray-100">
            <td className="border border-gray-300 p-2 text-center text-xs">
              {row.hospitalId}
            </td>
            <td className="border border-gray-300 p-2 text-center text-xs">
              {row.time}
            </td>
            <td className="border border-gray-300 p-2 text-center text-xs">
              {row.gender}
            </td>
            <td className="border border-gray-300 p-2 text-center text-xs">
              {row.mode}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
      {/* Pagination */}
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

  {/* Insights and Recommendations Section */}
  <div className="bg-white shadow-md p-6 rounded-lg border border-gray-200 flex flex-col flex-[0.4]">
    <h2 className="text-sm font-semibold text-gray-800 mb-4 flex items-center">
      Insights & Recommendations
    </h2>
    <ul className="flex flex-col space-y-4">
      {/* Insight: Monthly Trends */}
      <li className="flex items-center space-x-3 cursor-pointer hover:underline">
        <FaChartLine size={20} color="#8D8741" />
        <span className="text-sm text-gray-800">
          Birth rates peak 
        </span>
      </li>

      {/* Insight: Gender Distribution */}
      <li className="flex items-center space-x-3 cursor-pointer hover:underline">
        <FaUserShield size={20} color="#BC986A" />
        <span className="text-sm text-gray-800">
          Gender ratio  </span>
      </li>

      {/* Insight: Birth Mode */}
      <li className="flex items-center space-x-3 cursor-pointer hover:underline">
        <FaCogs size={20} color="#B4975A" />
        <span className="text-sm text-gray-800">
          <strong>60%</strong> of births are natural, while <strong>40%</strong> 
        </span>
      </li>

      {/* Insight: Hospital Utilization */}
      <li className="flex items-center space-x-3 cursor-pointer hover:underline">
        <FaLeaf size={20} color="#A2836E" />
        <span className="text-sm text-gray-800">
          Hospital reports 
        </span>
      </li>

      {/* Insight: Yearly Trends */}
      <li className="flex items-center space-x-3 cursor-pointer hover:underline">
        <FaExclamationTriangle size={20} color="#C9A66B" />
        <span className="text-sm text-gray-800">
          Birth rates 
        </span>
      </li>
    </ul>
  </div>
</div>

    </div>
  );
};

export default BirthDashboard;
