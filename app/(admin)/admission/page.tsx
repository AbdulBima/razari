"use client";

import React, { useEffect, useState } from "react";
import { Line, Pie } from "react-chartjs-2";
import "chart.js/auto";
import {
  FaUserShield,
  FaHospitalAlt,
  FaBrain,
  FaHeartbeat,
  FaStethoscope,
  FaSyringe,
} from "react-icons/fa";
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
      title: "Best General Hospitals",
      icon: <FaHospitalAlt size={15} color="green" />,
    },
    {
      title: "Top Cancer Treatment Hospitals",
      icon: <FaHeartbeat size={15} color="green" />,
    },
    {
      title: "Leading Cardiology Centers",
      icon: <FaStethoscope size={15} color="green" />,
    },
    {
      title: "Reputable Surgical Hospitals",
      icon: <FaSyringe size={15} color="green" />,
    },
    {
      title: "Expert Pediatric Care Hospitals",
      icon: <FaUserShield size={15} color="green" />,
    },
    {
      title: "Advanced Mental Health Hospitals",
      icon: <FaBrain size={15} color="green" />,
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
      <Breadcrumb secondLink = {{href: "/admission",label: "Admissions" }} />

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
                    className="flex items-center space-x-2 text-xs cursor-pointer hover:underline"
                  >
                    <Link href={`/recommendation/${index + 1}`}>
                      <div
                        className="flex items-center space-x-2"
                        title={item.title}
                      >
                        {" "}
                        {/* SEO-friendly title */}
                        <div className="bg-gray-100 text-xs p-2  rounded-full">
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
