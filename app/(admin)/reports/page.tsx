"use client";

import Breadcrumb from "@/components/navigation/Breadcrumb";
import React, { useEffect, useState } from "react";
import { FaDownload } from "react-icons/fa";

// Define the Report type
type Report = {
  name: string;
  date: string;
  link: string;
};

// Helper function to format the date
const formatDate = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "2-digit",
  };
  return new Date(dateString).toLocaleDateString("en-US", options);
};

const ReportsPage: React.FC = () => {
  const [reports, setReports] = useState<Report[]>([]); // State for reports
  const [sortBy, setSortBy] = useState<keyof Report>("name"); // Default sorting by name
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc"); // Default ascending order
  const [currentPage, setCurrentPage] = useState(1); // Pagination state
  const [loading, setLoading] = useState(true); // Loading state

  const reportsPerPage = 5; // Number of reports per page

  // Simulate API call
  useEffect(() => {
    setLoading(true); // Set loading to true
    const fetchData = () => {
      setTimeout(() => {
        const mockReports: Report[] = [
          { name: "Admissions", date: "2025-01-01", link: "/reports/admissions.pdf" },
          { name: "Diagnosis", date: "2025-01-02", link: "/reports/diagnosis.pdf" },
          { name: "Emergency", date: "2025-01-03", link: "/reports/emergency.pdf" },
          { name: "Birth", date: "2025-01-04", link: "/reports/birth.pdf" },
          { name: "Death", date: "2025-01-05", link: "/reports/death.pdf" },
          { name: "Outpatient", date: "2025-01-06", link: "/reports/outpatient.pdf" },
          { name: "Inpatient", date: "2025-01-07", link: "/reports/inpatient.pdf" },
        ];
        setReports(mockReports); // Update the state with mock data
        setLoading(false); // Set loading to false
      }, 2000); // Simulate a 2-second API call delay
    };
    fetchData();
  }, []);

  // Sorting mechanism
  const sortedReports = [...reports].sort((a, b) => {
    const valueA = a[sortBy].toLowerCase();
    const valueB = b[sortBy].toLowerCase();

    if (sortOrder === "asc") return valueA > valueB ? 1 : -1;
    return valueA < valueB ? 1 : -1;
  });

  // Pagination logic
  const totalPages = Math.ceil(sortedReports.length / reportsPerPage);
  const paginatedReports = sortedReports.slice(
    (currentPage - 1) * reportsPerPage,
    currentPage * reportsPerPage
  );

  // Handle sorting changes
  const handleSort = (key: keyof Report) => {
    if (sortBy === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(key);
      setSortOrder("asc");
    }
  };

  return (
    <div className="px-6 pt-2 mt:pt-6 poppins-regular bg-gray-50 min-h-screen">
        <Breadcrumb secondLink = {{href: "/reports",label: "Reports" }} />

      {/* Sorting options */}
      <div className="flex justify-end items-center md:mt-6 mt-2  space-x-4 mb-6">
        <button
          onClick={() => handleSort("name")}
          className={`px-4 py-2 rounded-full text-sm font-medium ${
            sortBy === "name"
              ? "bg-[#356966] text-white"
              : "bg-gray-200 text-gray-600 hover:bg-green-900 hover:text-white"
          }`}
        >
          Sort by Type
        </button>
        <button
          onClick={() => handleSort("date")}
          className={`px-4 py-2 rounded-full text-sm font-medium ${
            sortBy === "date"
              ? "bg-[#356966] text-white"
              : "bg-gray-200 text-gray-600 hover:bg-green-900 hover:text-white"
          }`}
        >
          Sort by Date
        </button>
      </div>

      {/* Loading state */}
      {loading ? (
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
          {/* Report list */}
          <div className="space-y-4">
            {paginatedReports.map((report, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-white shadow-sm p-4 rounded-lg border border-gray-200"
              >
                <div className="flex items-center space-x-4">
                  {/* SVG Icon */}
                  <div className="flex items-center justify-center w-10 h-10 bg-blue-100 text-[#356966] rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12h6m-6 4h6m-6-8h6m2-5H7a2 2 0 00-2 2v16a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-800">
                      {report.name}{" "}
                      <span className="text-xs text-gray-500">
                        ({formatDate(report.date)})
                      </span>
                    </h3>
                  </div>
                </div>

                {/* Download link */}
                <a
                  href={report.link}
                  download
                  className="flex items-center space-x-2 text-sm text-orange-600 hover:underline"
                >
                  <FaDownload className="w-4 h-4" />
                  <span className="hidden md:flex">Download</span>
                </a>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-between items-center mt-6">
            <span className="text-sm text-gray-600">
              Page {currentPage} of {totalPages}
            </span>
            <div className="flex  text-sm space-x-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`px-4 py-1 rounded-lg ${
                  currentPage === 1
                    ? "bg-gray-200 text-gray-400"
                    : "bg-[#356966] text-white"
                }`}
              >
                Previous
              </button>
              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className={`px-4 py-1 rounded-lg ${
                  currentPage === totalPages
                    ? "bg-gray-200 text-gray-400"
                    : "bg-[#356966] text-white"
                }`}
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

export default ReportsPage;
