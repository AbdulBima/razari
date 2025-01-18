"use client";

import React, { useEffect, useState } from "react";
import { Line, Pie } from "react-chartjs-2";
import "chart.js/auto";
import Link from "next/link";
import Breadcrumb from "@/components/navigation/Breadcrumb";

// Type Definitions
interface Admission {
  hospitalId: string;
  time: string;
  gender: string;
  ageGroup: string;
  reason: string;
}

interface Demographics {
  adults: {
    male: number;
    female: number;
  };
  children: {
    male: number;
    female: number;
  };
}

interface APIData {
  admissionData: Admission[];
  monthlyAdmissions: number[];
  demographics: Demographics;
}

// Mock API fetch function for real API integration
const fetchHospitalData = async (hospitalId: string): Promise<APIData> => {
  // Replace this mock API call with a real one
  // Example: `fetch('/api/hospitals/${hospitalId}/admissions')`
  return new Promise<APIData>((resolve) => {
    setTimeout(() => {
      const mockData: APIData = {
        admissionData: [
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
            hospitalId: "HSP003",
            time: "2024-12-05 11:30",
            gender: "Male",
            ageGroup: "Adult",
            reason: "Cough",
          },
        ],
        monthlyAdmissions: [12, 19, 3, 5, 2, 3, 7, 10, 15, 8, 9, 6],
        demographics: {
          adults: { male: 50, female: 40 },
          children: { male: 30, female: 35 },
        },
      };

      // Simulate a data return based on hospitalId
      const filteredData = mockData.admissionData.filter(
        (admission) => admission.hospitalId === hospitalId
      );
      resolve({
        admissionData: filteredData,
        monthlyAdmissions: mockData.monthlyAdmissions,
        demographics: mockData.demographics,
      });
    }, 1000); // Simulating an API delay
  });
};

const AdmissionDashboard = () => {
  const [admissionData, setAdmissionData] = useState<Admission[]>([]);
  const [filteredData, setFilteredData] = useState<Admission[]>([]);
  const [sortOption, setSortOption] = useState<keyof Admission>("time");
  const [monthlyAdmissions, setMonthlyAdmissions] = useState<number[]>([]);
  const [demographics, setDemographics] = useState<Demographics | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedHospital, setSelectedHospital] = useState("HSP001");
  const [loading, setLoading] = useState(false);

  const rowsPerPage = 7;

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

  // Fetch data when the selected hospital changes
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Set loading state to true
      const data = await fetchHospitalData(selectedHospital);
      setAdmissionData(data.admissionData);
      setMonthlyAdmissions(data.monthlyAdmissions);
      setDemographics(data.demographics);
      setLoading(false); // Set loading state to false when data is fetched
    };

    fetchData();
  }, [selectedHospital]);

  // Filter and sort admission data based on the selected hospital and sort option
  useEffect(() => {
    filterData();
  }, [admissionData, sortOption]);

  const filterData = () => {
    const data = [...admissionData];

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

  // Chart Data
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
          demographics?.adults.male || 0,
          demographics?.adults.female || 0,
          demographics?.children.male || 0,
          demographics?.children.female || 0,
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
    <div className="poppins-regular px-8 pt-2 w-full bg-gray-50 h-full overscroll-y-none overflow-y-hidden">
      <Breadcrumb secondLink={{ href: "/admission", label: "Admissions" }} />

      <select
        className="border border-gray-300 px-2 py-1 mt-4  rounded-md mb-4 md:mb-2 text-lg"
        value={selectedHospital}
        onChange={(e) => setSelectedHospital(e.target.value)}
      >
        <option value="HSP001">Hospital 1</option>
        <option value="HSP002">Hospital 2</option>
        <option value="HSP003">Hospital 3</option>
        <option value="HSP004">Hospital 4</option>
      </select>

      {loading ? (
        <div className=" text-gray-500 h-screen  flex items-center justify-center">
          <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-orange-700"></div>
          </div>
        </div>
      ) : (
        <>
          <div className="flex flex-col mt-3 lg:flex-row justify-between w-full gap-4 mb-4">
            {/* Line Chart with Total Admissions */}
            <div className="bg-white shadow-md p-2 rounded-lg border border-gray-200 flex-1">
              <h2 className="text-xs font-semibold text-gray-800 mb-1">
                Admissions Per Month
              </h2>
              <div
                className="mx-auto"
                style={{ width: "100%", height: "200px" }}
              >
                <Line data={lineChartData} options={lineChartOptions} />
              </div>
              <div className="mt-2 text-xs text-gray-700">
                <strong>Total Admissions:</strong> {totalAdmissions}
              </div>
            </div>

            {/* Pie Chart */}
            <div className="bg-white shadow-md p-2 rounded-lg border border-gray-200 flex-1">
              <h2 className="text-xs font-semibold text-gray-800 mb-1">
                Demographics
              </h2>
              <div
                className="mx-auto"
                style={{ width: "100%", height: "220px" }}
              >
                <Pie data={pieChartData} options={pieChartOptions} />
              </div>
            </div>

            {/* Insights and Recommendations */}
            <div className="bg-white shadow-md p-4 rounded-lg border border-gray-200 flex flex-col flex-1">
              <h2 className="text-xs font-semibold text-gray-800 mb-3">
                Insights & Recommendations
              </h2>
              <ul className="flex flex-col space-y-2">
                {recommendations.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-center space-x-2 text-sm cursor-pointer hover:underline"
                  >
                    <Link href={`/recommendation/${index + 1}`}>
                      <div
                        className="flex items-center space-x-2"
                        title={item.title}
                      >
                        {" "}
                        {/* SEO-friendly title */}
                        <div className="bg-gray-100 text-xs p-1  rounded-full">
                          {item.icon} {/* Display the SVG icon */}
                        </div>
                        <span>{item.title}</span> {/* Display the title */}
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white shadow-md p-2 mt-4 rounded-lg border border-gray-200">
            <div className="flex items-center space-x-2">
              <select
                className="border flex md:hidden border-gray-300 px-2 py-1 rounded-md mb-2 text-sm"
                value={sortOption}
                onChange={(e) =>
                  setSortOption(e.target.value as keyof Admission)
                }
              >
                <option value="time" disabled>
                  Sort by
                </option>
                <option value="time">Time</option>
                <option value="gender">Gender</option>
                <option value="ageGroup">Age Group</option>
                <option value="reason">Reason</option>
              </select>

              <span className="text-xs hidden md:block font-medium text-gray-700">
                Sort by:
              </span>
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
                  <th className="border border-gray-300 p-1 text-xs">
                    Hospital ID
                  </th>
                  <th className="border border-gray-300 p-1 text-xs">Time</th>
                  <th className="border border-gray-300 p-1 text-xs">Gender</th>
                  <th className="border border-gray-300 p-1 text-xs">
                    Age Group
                  </th>
                  <th className="border border-gray-300 p-1 text-xs">Reason</th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.map((row, index) => (
                  <tr key={index} className="even:bg-gray-100">
                    <td className="border border-gray-300 p-1 text-center text-xs">
                      {row.hospitalId}
                    </td>
                    <td className="border border-gray-300 p-1 text-center text-xs">
                      {row.time}
                    </td>
                    <td className="border border-gray-300 p-1 text-center text-xs">
                      {row.gender}
                    </td>
                    <td className="border border-gray-300 p-1 text-center text-xs">
                      {row.ageGroup}
                    </td>
                    <td className="border border-gray-300 p-1 text-center text-xs">
                      {row.reason}
                    </td>
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
        </>
      )}
    </div>
  );
};

export default AdmissionDashboard;
