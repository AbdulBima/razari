"use client";

import React, { useEffect, useState } from "react";
import { Line, Pie, Bar } from "react-chartjs-2";
import "chart.js/auto";
import Link from "next/link";
import Breadcrumb from "@/components/navigation/Breadcrumb";

type BirthData = {
  hospitalId: string;
  time: string;
  gender: string;
  mode: string;
};

const BirthDashboard = () => {
  const [birthData, setBirthData] = useState<BirthData[]>([]);
  const [filteredData, setFilteredData] = useState<BirthData[]>([]);
  const [selectedHospital, setSelectedHospital] = useState("HSP1");

  const [currentPage, setCurrentPage] = useState(1);

  const [monthlyBirths, setMonthlyBirths] = useState<number[]>([]);
  const [genderDistribution, setGenderDistribution] = useState<{
    [key: string]: number;
  }>({});
  const [modeDistribution, setModeDistribution] = useState<{
    [key: string]: number;
  }>({});
  const [isLoading, setIsLoading] = useState(false); // Loading state

  const recommendations = [
    {
      title: "Operations",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="26"
          height="26"
          viewBox="0 0 32 32"
        >
          <path
            fill="#000"
            d="M20 20h10v2H20zm0 4h10v2H20zm0 4h10v2H20zm-4-8a3.91 3.91 0 0 1-4-4a3.91 3.91 0 0 1 4-4a3.91 3.91 0 0 1 4 4h2a6 6 0 1 0-6 6z"
          />
          <path
            fill="green"
            d="m29.305 11.044l-2.36-4.088a2 2 0 0 0-2.374-.895l-2.434.824a11 11 0 0 0-1.312-.758l-.504-2.52A2 2 0 0 0 18.36 2h-4.72a2 2 0 0 0-1.961 1.608l-.504 2.519a11 11 0 0 0-1.327.753l-2.42-.819a2 2 0 0 0-2.372.895l-2.36 4.088a2 2 0 0 0 .411 2.502l1.931 1.697C5.021 15.495 5 15.745 5 16q0 .387.028.766l-1.92 1.688a2 2 0 0 0-.413 2.502l2.36 4.088a2 2 0 0 0 2.374.895l2.434-.824a11 11 0 0 0 1.312.759l.503 2.518A2 2 0 0 0 13.64 30H16v-2h-2.36l-.71-3.55a9.1 9.1 0 0 1-2.695-1.572l-3.447 1.166l-2.36-4.088l2.725-2.395a8.9 8.9 0 0 1-.007-3.128l-2.718-2.39l2.36-4.087l3.427 1.16A9 9 0 0 1 12.93 7.55L13.64 4h4.72l.71 3.55a9.1 9.1 0 0 1 2.695 1.572l3.447-1.166l2.36 4.088l-2.798 2.452L26.092 16l2.8-2.454a2 2 0 0 0 .413-2.502"
          />
        </svg>
      ),
    },
    {
      title: "Health  ",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="26"
          height="26"
          viewBox="0 0 48 48"
        >
          <defs>
            <mask id="ipSCategoryManagement0">
              <g fill="none">
                <rect
                  width="36"
                  height="14"
                  x="6"
                  y="28"
                  stroke="#fff"
                  strokeWidth="4"
                  rx="4"
                />
                <path
                  stroke="#fff"
                  strokeLinecap="round"
                  strokeWidth="4"
                  d="M20 7H10a4 4 0 0 0-4 4v6a4 4 0 0 0 4 4h10"
                />
                <circle
                  cx="34"
                  cy="14"
                  r="8"
                  fill="#fff"
                  stroke="#fff"
                  strokeWidth="4"
                />
                <circle cx="34" cy="14" r="3" fill="#000" />
              </g>
            </mask>
          </defs>
          <path
            fill="green"
            d="M0 0h48v48H0z"
            mask="url(#ipSCategoryManagement0)"
          />
        </svg>
      ),
    },
    {
      title: "Patient",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="26"
          height="26"
          viewBox="0 0 24 24"
        >
          <path
            fill="green"
            d="M12 10c2.21 0 4-1.79 4-4s-1.79-4-4-4s-4 1.79-4 4s1.79 4 4 4m0-6c1.1 0 2 .9 2 2s-.9 2-2 2s-2-.9-2-2s.9-2 2-2m6.39 8.56C16.71 11.7 14.53 11 12 11s-4.71.7-6.39 1.56A2.97 2.97 0 0 0 4 15.22V22h2v-6.78c0-.38.2-.72.5-.88C7.71 13.73 9.63 13 12 13c.76 0 1.47.07 2.13.2l-1.55 3.3H9.75C8.23 16.5 7 17.73 7 19.25S8.23 22 9.75 22H18c1.1 0 2-.9 2-2v-4.78c0-1.12-.61-2.15-1.61-2.66M10.94 20H9.75c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h1.89zM18 20h-4.85l2.94-6.27c.54.2 1.01.41 1.41.61c.3.16.5.5.5.88z"
          />
        </svg>
      ),
    },
    {
      title: "Finance",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="26"
          height="26"
          viewBox="0 0 32 32"
        >
          <path
            fill="green"
            d="M2 28h28v2H2zm25-17a1 1 0 0 0 1-1V7a1 1 0 0 0-.66-.94l-11-4a1 1 0 0 0-.68 0l-11 4A1 1 0 0 0 4 7v3a1 1 0 0 0 1 1h1v13H4v2h24v-2h-2V11zM6 7.7l10-3.64L26 7.7V9H6zM18 24h-4V11h4zM8 11h4v13H8zm16 13h-4V11h4z"
          />
        </svg>
      ),
    },
    
  ];

  const rowsPerPage = 5;

  const tableData = [
    {
      hospitalId: "HSP1",
      time: "2024-12-01 14:35",
      gender: "Female",
      mode: "Normal",
    },
    {
      hospitalId: "HSP2",
      time: "2024-12-02 09:15",
      gender: "Male",
      mode: "Cesarean",
    },
    {
      hospitalId: "HSP3",
      time: "2024-12-03 10:10",
      gender: "Female",
      mode: "Normal",
    },
    {
      hospitalId: "HSP4",
      time: "2024-12-04 11:45",
      gender: "Male",
      mode: "Cesarean",
    },
  ];

  useEffect(() => {
    setBirthData(tableData);
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
      setMonthlyBirths([30, 40, 35, 50, 45, 60, 70, 65, 80, 75, 90, 85]);
      setGenderDistribution({
        Female: 60,
        Male: 40,
      });
      setModeDistribution({
        Normal: 70,
        Cesarean: 30,
      });
      setFilteredData(tableData.filter((data) => data.hospitalId === "HSP1"));
    } else if (hospital === "HSP2") {
      setMonthlyBirths([40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150]);
      setGenderDistribution({
        Female: 50,
        Male: 50,
      });
      setModeDistribution({
        Normal: 40,
        Cesarean: 60,
      });
      setFilteredData(tableData.filter((data) => data.hospitalId === "HSP2"));
    } else if (hospital === "HSP3") {
      setMonthlyBirths([20, 30, 25, 35, 45, 55, 65, 75, 85, 95, 105, 115]);
      setGenderDistribution({
        Female: 55,
        Male: 45,
      });
      setModeDistribution({
        Normal: 50,
        Cesarean: 50,
      });
      setFilteredData(tableData.filter((data) => data.hospitalId === "HSP3"));
    } else if (hospital === "HSP4") {
      setMonthlyBirths([25, 35, 40, 45, 50, 60, 70, 80, 90, 100, 110, 120]);
      setGenderDistribution({
        Female: 65,
        Male: 35,
      });
      setModeDistribution({
        Normal: 60,
        Cesarean: 40,
      });
      setFilteredData(tableData.filter((data) => data.hospitalId === "HSP4"));
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
        label: "Births",
        data: monthlyBirths,
        borderColor: "#007bff",
        backgroundColor: "rgba(0, 123, 255, 0.2)",
      },
    ],
  };

  const pieChartData = {
    labels: Object.keys(genderDistribution),
    datasets: [
      {
        data: Object.values(genderDistribution),
        backgroundColor: ["#FF6384", "#36A2EB"],
      },
    ],
  };

  const barChartData = {
    labels: Object.keys(modeDistribution),
    datasets: [
      {
        data: Object.values(modeDistribution),
        backgroundColor: ["#FF6384", "#4BC0C0"],
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
     
     
     <Breadcrumb secondLink = {{href: "/birth",label: "Birth" }} />
     
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
          <div className="flex flex-col mt-2 lg:flex-row justify-between w-full gap-6 mb-6">
            <div className="bg-white shadow-md p-3 rounded-lg border border-gray-200 flex-1">
              <h2 className="text-sm font-semibold text-gray-800 mb-2">
                Births Per Month
              </h2>
              <Line data={lineChartData} options={lineChartOptions} />
            </div>

            <div className="bg-white shadow-md p-3 rounded-lg border border-gray-200 flex-1">
              <h2 className="text-sm font-semibold text-gray-800 mb-2">
                Gender Distribution
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
                Mode of Birth Distribution
              </h2>
              <Bar data={barChartData} options={barChartOptions} />
            </div>
          </div>

          {/* Table and Recommendations */}
          <div className="bg-white shadow-md flex flex-col lg:flex-row p-3 mt-6 rounded-lg border border-gray-200 gap-6 w-full">
            <div className="flex-1 w-full overflow-x-auto">
              <table className="w-full table-auto border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-[#007bff] text-white">
                    <th className="border border-gray-300 p-2 text-xs">
                      Hospital ID
                    </th>
                    <th className="border border-gray-300 p-2 text-xs">Time</th>
                    <th className="border border-gray-300 p-2 text-xs">
                      Gender
                    </th>
                    <th className="border border-gray-300 p-2 text-xs">Mode</th>
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
                        {row.gender}
                      </td>
                      <td className="border border-gray-300 p-2 text-center text-xs">
                        {row.mode}
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
                        <div className="bg-gray-100 text-sm p-2 rounded-full">
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

export default BirthDashboard;
