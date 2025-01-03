"use client";

import React, { useEffect, useState } from "react";
import { Line,  Pie } from "react-chartjs-2";
import "chart.js/auto";
import {
  FaUserShield,
  FaChartLine,
  FaCogs,
  FaLeaf,
  FaExclamationTriangle,
} from "react-icons/fa";
import Link from "next/link";

type Admission = {
  hospitalId: string;
  time: string;
  gender: string;
  ageGroup: string;
  reason: string;
};

const AdmissionDashboard = () => {
  const [admissionData, setAdmissionData] = useState<Admission[]>([]);
  const [filteredData, setFilteredData] = useState<Admission[]>([]);
  const [sortOption, setSortOption] = useState<keyof Admission>("time");

  const monthlyAdmissions = [12, 19, 3, 5, 2, 3, 7, 10, 15, 8, 9, 6];
  const demographics = {
    adults: { male: 50, female: 40 },
    children: { male: 30, female: 35 },
  };
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedHospital, setSelectedHospital] = useState("Overall");

  const rowsPerPage = 7;

  const tableData = [
    {
      hospitalId: "HSP001",
      time: "2024-12-01 14:35",
      gender: "Male",
      ageGroup: "Adult",
      reason: "Fever",
    },
    {
      hospitalId: "HSP002",
      time: "2024-12-02 09:15",
      gender: "Female",
      ageGroup: "Child",
      reason: "Injury",
    },
    {
      hospitalId: "HSP002",
      time: "2024-12-02 09:15",
      gender: "Female",
      ageGroup: "Child",
      reason: "Injury",
    },
    // ... (rest of the table data)
  ];

  useEffect(() => {
    setAdmissionData(tableData);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    filterData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [admissionData, sortOption, selectedHospital]);

  const filterData = () => {
    let data = [...admissionData];

    // Apply hospital filtering
    if (selectedHospital !== "Overall") {
      data = data.filter((row) => row.hospitalId === selectedHospital);
    }

    // Sorting logic
    if (sortOption) {
      data.sort((a, b) =>
        a[sortOption].localeCompare(b[sortOption], undefined, { numeric: true })
      );
    }

    setFilteredData(data);
    setCurrentPage(1); // Reset to first page when filtering/sorting
  };

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

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
        label: "Admissions Per Month",
        data: monthlyAdmissions,
        fill: false,
        backgroundColor: "#356966",
        borderColor: "#ff8552",
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
    labels: [
      "Adults - Male",
      "Adults - Female",
      "Children - Male",
      "Children - Female",
    ],
    datasets: [
      {
        label: "Demographics",
        data: [
          demographics.adults.male,
          demographics.adults.female,
          demographics.children.male,
          demographics.children.female,
        ],
        backgroundColor: ["#899d78", "#da4167", "#f7ec59", "#f0bcd4"],
        hoverBackgroundColor: ["#728a63", "#c53455", "#e6d54d", "#e3a1bf"],
      },
    ],
  };
  
  const pieChartOptions = {
    plugins: {
      legend: { position: "bottom" as const },
      
    },
    cutout: "60%",
    maintainAspectRatio: false,
  };
  

  const totalAdmissions = admissionData.length;

  return (
    <div className="poppins-regular px-6 pt-4 w-full bg-gray-50 h-full overscroll-y-none overflow-y-hidden">
      <div className="flex md:hidden items-center py-2 overflow-x-auto whitespace-nowrap mb-2">
        <span className="mx-2 text-gray-500">/</span>
        <Link href="#" className="text-gray-500">Admission Data</Link>
      </div>

      <select
        className="border border-gray-300 px-2 py-1 rounded-md mb-4 md:mb-2 text-sm"
        value={selectedHospital}
        onChange={(e) => setSelectedHospital(e.target.value)}
      >
        <option value="Overall">Overall</option>
        <option value="HSP001">Hospital 1</option>
        <option value="HSP002">Hospital 2</option>
        <option value="HSP003">Hospital 3</option>
        <option value="HSP004">Hospital 4</option>
      </select>

      <div className="flex flex-col lg:flex-row justify-between w-full gap-4 mb-4">
        {/* Line Chart with Total Admissions */}
        <div className="bg-white shadow-md p-2 rounded-lg border border-gray-200 flex-1">
          <h2 className="text-xs font-semibold text-gray-800 mb-1">Admissions Per Month</h2>
          <div className="mx-auto" style={{ width: "100%", height: "200px" }}>
            <Line data={lineChartData} options={lineChartOptions} />
          </div>
          <div className="mt-2 text-xs text-gray-700">
            <strong>Total Admissions:</strong> {totalAdmissions}
          </div>
        </div>

        {/* Bar Chart */}
        <div className="bg-white shadow-md p-2 rounded-lg border border-gray-200 flex-1">
  <h2 className="text-xs font-semibold text-gray-800 mb-1">Demographics</h2>
  <div className="mx-auto" style={{ width: "100%", height: "220px" }}>
    <Pie data={pieChartData} options={pieChartOptions} />
  </div>
</div>

        {/* Insights and Recommendations */}
        <div className="bg-white shadow-md p-4 rounded-lg border border-gray-200 flex flex-col flex-1">
          <h2 className="text-xs font-semibold text-gray-800 mb-3">Insights & Recommendations</h2>
          <ul className="flex flex-col space-y-2">
            <li className="flex items-center space-x-2 text-xs cursor-pointer hover:underline">
              <FaUserShield size={18} color="#8D8741" />
              <span>Averages Stats</span>
            </li>
            <li className="flex items-center space-x-2 text-xs cursor-pointer hover:underline">
              <FaChartLine size={18} color="#BC986A" />
              <span>Readmission Rate Analysis</span>
            </li>
            <li className="flex items-center space-x-2 text-xs cursor-pointer hover:underline">
              <FaCogs size={18} color="#B4975A" />
              <span>Resource Optimization Insights</span>
            </li>
            <li className="flex items-center space-x-2 text-xs cursor-pointer hover:underline">
              <FaLeaf size={18} color="#A2836E" />
              <span>Demographic-Based Trends</span>
            </li>
            <li className="flex items-center space-x-2 text-xs cursor-pointer hover:underline">
              <FaExclamationTriangle size={18} color="#C9A66B" />
              <span>Disease Outbreak Predictions</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white shadow-md p-2 mt-4 rounded-lg border border-gray-200">
        <div className="flex items-center space-x-2">
          <select
            className="border flex md:hidden border-gray-300 px-2 py-1 rounded-md mb-2 text-sm"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value as keyof Admission)}
          >
            <option value="time" disabled>Sort by</option>
            <option value="time">Time</option>
            <option value="gender">Gender</option>
            <option value="ageGroup">Age Group</option>
            <option value="reason">Reason</option>
          </select>

          <span className="text-xs hidden md:block font-medium text-gray-700">Sort by:</span>
          <div className="hidden md:flex space-x-3 border-b border-gray-200 pb-1">
            {["time", "gender", "ageGroup", "reason"].map((option) => (
              <button
                key={option}
                className={`py-1 px-3 text-xs font-medium ${
                  sortOption === option
                    ? "border-b-2 border-[#ff8552] text-[#ff8552]"
                    : "text-gray-600 hover:text-[#ff8552]"
                }`}
                onClick={() => setSortOption(option as keyof Admission)}
              >
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <table className="w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-[#356966] text-white">
              <th className="border border-gray-300 p-1 text-xs">Hospital ID</th>
              <th className="border border-gray-300 p-1 text-xs">Time</th>
              <th className="border border-gray-300 p-1 text-xs">Gender</th>
              <th className="border border-gray-300 p-1 text-xs">Age Group</th>
              <th className="border border-gray-300 p-1 text-xs">Reason</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((row, index) => (
              <tr key={index} className="even:bg-gray-100">
                <td className="border border-gray-300 p-1 text-center text-xs">{row.hospitalId}</td>
                <td className="border border-gray-300 p-1 text-center text-xs">{row.time}</td>
                <td className="border border-gray-300 p-1 text-center text-xs">{row.gender}</td>
                <td className="border border-gray-300 p-1 text-center text-xs">{row.ageGroup}</td>
                <td className="border border-gray-300 p-1 text-center text-xs">{row.reason}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-3">
        <span className="text-xs text-gray-600">
          Page {currentPage} of {totalPages}
        </span>
        <div className="space-x-2">
          <button
            className="px-2 py-1 border border-gray-300 rounded-md bg-gray-100 hover:bg-gray-200 text-xs"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          >
            Previous
          </button>
          <button
            className="px-2 py-1 border border-gray-300 rounded-md bg-gray-100 hover:bg-gray-200 text-xs"
            disabled={currentPage === totalPages}
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdmissionDashboard;
