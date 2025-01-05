"use client";

import React, { useEffect, useState } from "react";
import { Line, Pie, Bar } from "react-chartjs-2";
import "chart.js/auto";
import {

  FaUserMd as FaHeartbeat,
  FaHospitalAlt,
  FaStethoscope,
  FaSyringe,

} from "react-icons/fa";
import Link from "next/link";
import Breadcrumb from "@/components/navigation/Breadcrumb";

type DiagnosisData = {
  doctorId: string;
  time: string;
  diagnosis: string;
  ageGroup: string;
};

const DiagnosisDashboard = () => {
  const [diagnosisData, setDiagnosisData] = useState<DiagnosisData[]>([]);
  const [filteredData, setFilteredData] = useState<DiagnosisData[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState("HSP1");

  const [currentPage, setCurrentPage] = useState(1);

  const [monthlyDiagnoses, setMonthlyDiagnoses] = useState<number[]>([]);
  const [diagnosisDistribution, setDiagnosisDistribution] = useState<{
    [key: string]: number;
  }>({});
  const [ageDistribution, setAgeDistribution] = useState<{
    [key: string]: number;
  }>({});
  const [isLoading, setIsLoading] = useState(false); // Loading state

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
    
   
  ];

  const rowsPerPage = 5;

  const tableData = [
    {
      doctorId: "HSP1",
      time: "2024-12-01 14:35",
      diagnosis: "Infectious Diseases",
      ageGroup: "19-35",
    },
    {
      doctorId: "HSP2",
      time: "2024-12-02 09:15",
      diagnosis: "Chronic Conditions",
      ageGroup: "36-60",
    },
    {
      doctorId: "HSP3",
      time: "2024-12-03 10:10",
      diagnosis: "Respiratory Issues",
      ageGroup: "0-18",
    },
    {
      doctorId: "HSP4",
      time: "2024-12-04 11:45",
      diagnosis: "Mental Health Issues",
      ageGroup: "60+",
    },
  ];

  useEffect(() => {
    setDiagnosisData(tableData);
    setFilteredData(tableData);
  }, []);

  useEffect(() => {
    setIsLoading(true); // Show loading state
    const timeout = setTimeout(() => {
      fetchDoctorData(selectedDoctor);
      setIsLoading(false); // Hide loading state
    }, 500); // Simulated delay for fetching data

    return () => clearTimeout(timeout); // Cleanup timeout
  }, [selectedDoctor]);

  const fetchDoctorData = (doctor: string) => {
    if (doctor === "HSP1") {
      setMonthlyDiagnoses([25, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85]);
      setDiagnosisDistribution({
        "Infectious Diseases": 40,
        "Chronic Conditions": 30,
        "Respiratory Issues": 20,
        "Mental Health Issues": 10,
      });
      setAgeDistribution({
        "Adult Male": 25,
        "Adult Female": 30,
        "Child Male": 20,
        "Child Female": 25,
      });
      setFilteredData(tableData.filter((data) => data.doctorId === "HSP1"));
    } else if (doctor === "HSP2") {
      setMonthlyDiagnoses([
        30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140,
      ]);
      setDiagnosisDistribution({
        "Chronic Conditions": 50,
        "Infectious Diseases": 20,
        "Respiratory Issues": 10,
        "Mental Health Issues": 20,
      });
      setAgeDistribution({
        "Adult Male": 30,
        "Adult Female": 35,
        "Child Male": 15,
        "Child Female": 20,
      });
      setFilteredData(tableData.filter((data) => data.doctorId === "HSP2"));
    } else if (doctor === "HSP3") {
      setMonthlyDiagnoses([15, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75]);
      setDiagnosisDistribution({
        "Respiratory Issues": 60,
        "Infectious Diseases": 20,
        "Chronic Conditions": 10,
        "Mental Health Issues": 10,
      });
      setAgeDistribution({
        "Adult Male": 20,
        "Adult Female": 25,
        "Child Male": 25,
        "Child Female": 30,
      });
      setFilteredData(tableData.filter((data) => data.doctorId === "HSP3"));
    } else if (doctor === "HSP4") {
      setMonthlyDiagnoses([20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130]);
      setDiagnosisDistribution({
        "Mental Health Issues": 70,
        "Chronic Conditions": 10,
        "Infectious Diseases": 10,
        "Respiratory Issues": 10,
      });
      setAgeDistribution({
        "Adult Male": 30,
        "Adult Female": 40,
        "Child Male": 10,
        "Child Female": 20,
      });
      setFilteredData(tableData.filter((data) => data.doctorId === "HSP4"));
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
        label: "Diagnoses",
        data: monthlyDiagnoses,
        borderColor: "#6B8E23",
        backgroundColor: "rgba(107, 142, 35, 0.2)",
      },
    ],
  };

  const pieChartData = {
    labels: Object.keys(diagnosisDistribution),
    datasets: [
      {
        data: Object.values(diagnosisDistribution),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
      },
    ],
  };

  const barChartData = {
    labels: Object.keys(ageDistribution),
    datasets: [
      {
        data: Object.values(ageDistribution),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
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
     
     <Breadcrumb secondLink = {{href: "/diagnosis",label: "Diagnosis" }} />

     
     <select
        className="border border-gray-300 px-2 py-1 mt-4  rounded-md mb-4 md:mb-2 text-lg"
     value={selectedDoctor}
        onChange={(e) => setSelectedDoctor(e.target.value)}
      >
        <option value="HSP1">HSP1</option>
        <option value="HSP2">HSP2</option>
        <option value="HSP3">HSP3</option>
        <option value="HSP4">HSP4</option>
      </select>

      {isLoading ? (
        <div className=" text-gray-500 h-screen  flex items-center justify-center">
          <svg
            className="pl w-16 h-16 mr-20"
            viewBox="0 0 128 128"
            width="128px"
            height="128px"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="pl-grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(193,90%,55%)"></stop>
                <stop offset="100%" stopColor="hsl(223,90%,55%)"></stop>
              </linearGradient>
            </defs>
            <circle
              className="pl__ring"
              r="56"
              cx="64"
              cy="64"
              fill="none"
              stroke="hsla(0,10%,10%,0.1)"
              strokeWidth="16"
              strokeLinecap="round"
            ></circle>
            <path
              className="pl__worm"
              d="M92,15.492S78.194,4.967,66.743,16.887c-17.231,17.938-28.26,96.974-28.26,96.974L119.85,59.892l-99-31.588,57.528,89.832L97.8,19.349,13.636,88.51l89.012,16.015S81.908,38.332,66.1,22.337C50.114,6.156,36,15.492,36,15.492a56,56,0,1,0,56,0Z"
              fill="none"
              stroke="url(#pl-grad)"
              strokeWidth="16"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="44 1111"
              strokeDashoffset="10"
            ></path>
          </svg>
        </div>
      ) : (
        <>
          {/* Chart Components */}
          <div className=" mt-2 poppins-regular flex flex-col lg:flex-row justify-between w-full gap-6 mb-6">
            <div className="bg-white shadow-md p-3 rounded-lg border border-gray-200 flex-1">
              <h2 className="text-sm font-semibold text-gray-800 mb-2">
                Diagnoses Per Month
              </h2>
              <Line data={lineChartData} options={lineChartOptions} />
            </div>

            <div className="bg-white shadow-md p-3 rounded-lg border border-gray-200 flex-1">
              <h2 className="text-sm font-semibold text-gray-800 mb-2">
                Diagnosis Type Distribution
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
              </div>{" "}
            </div>

            <div className="bg-white shadow-md p-3 rounded-lg border border-gray-200 flex-1">
              <h2 className="text-sm font-semibold text-gray-800 mb-2">
                Age Group Distribution
              </h2>
              <Bar data={barChartData} options={barChartOptions} />
            </div>
          </div>

          {/* Table and Recommendations */}
          <div className="bg-white shadow-md flex flex-col lg:flex-row p-3 mt-6 rounded-lg border border-gray-200 gap-6 w-full">
            <div className="flex-1 w-full overflow-x-auto">
              <table className="w-full table-auto border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-[#6B8E23] text-white">
                    <th className="border border-gray-300 p-2 text-xs">
                      Doctor ID
                    </th>
                    <th className="border border-gray-300 p-2 text-xs">Time</th>
                    <th className="border border-gray-300 p-2 text-xs">
                      Diagnosis
                    </th>
                    <th className="border border-gray-300 p-2 text-xs">
                      Age Group
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentRows.map((row, index) => (
                    <tr key={index} className="even:bg-gray-100">
                      <td className="border border-gray-300 p-2 text-center text-xs">
                        {row.doctorId}
                      </td>
                      <td className="border border-gray-300 p-2 text-center text-xs">
                        {row.time}
                      </td>
                      <td className="border border-gray-300 p-2 text-center text-xs">
                        {row.diagnosis}
                      </td>
                      <td className="border border-gray-300 p-2 text-center text-xs">
                        {row.ageGroup}
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

export default DiagnosisDashboard;
