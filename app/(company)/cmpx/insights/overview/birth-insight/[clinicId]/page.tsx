"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import Breadcrumb from "@/components/navigation/Breadcrumb";
import RecommendationModal from "@/components/RecommendationModal";
import Loader from "@/utils/loader";
import BirthCharts from "@/components/dataCharts/BirthCharts";

interface Birth {
  time: string;
  gender: string;
  mode: string;
  submitterId: string;
  companyId: string;
  clinicId: string;
}

const BirthInsight = () => {
  const params = useParams();
  const clinicId = Array.isArray(params.clinicId)
    ? params.clinicId[0]
    : params.clinicId || "defaultClinicId";

  const [births, setBirths] = useState<Birth[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(7);
  const [sortColumn, setSortColumn] = useState<keyof Birth | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [totalRecords, setTotalRecords] = useState(0);

  // Fetch birth data
  const fetchBirths = async () => {
    setLoading(true);
    try {
      const skip = (currentPage - 1) * rowsPerPage;
      const limit = rowsPerPage;
      const url = `http://127.0.0.1:8000/api/birth-records/get/${clinicId}?skip=${skip}&limit=${limit}`;
      const response = await axios.get(url);
      setBirths(response.data.records); // Use the "records" field from API
      setTotalRecords(response.data.total); // Use the "total" field from API
    } catch (error) {
      console.log("Error fetching births:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (clinicId) {
      fetchBirths();
    }
  }, [clinicId, currentPage]);

  // Sorting functionality
  const handleSort = (column: keyof Birth) => {
    const order = sortColumn === column && sortOrder === "asc" ? "desc" : "asc";
    setSortColumn(column);
    setSortOrder(order);
    const sortedBirths = [...births].sort((a, b) => {
      if (a[column] < b[column]) return order === "asc" ? -1 : 1;
      if (a[column] > b[column]) return order === "asc" ? 1 : -1;
      return 0;
    });
    setBirths(sortedBirths);
  };

  // Handle page changes
  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    setCurrentPage(newPage);
  };

  const totalPages = Math.ceil(totalRecords / rowsPerPage);

  return (
    <div className="poppins-regular px-8 md:pt-2 w-full bg-gray-50 h-full md:overscroll-y-none md:overflow-y-hidden">
      <Breadcrumb secondLink={{ href: "/cmpx/insights", label: "Birth Insight" }} />
      <BirthCharts clinicId={clinicId} />

      {loading ? (
        <Loader />
      ) : (
        <div className="bg-white grid grid-cols-4 gap-4 shadow-md p-2 mt-6 rounded-lg border border-gray-200">
          <div className="col-span-4">
            {/* Sort buttons for larger devices */}
            <div className="hidden px-4 lg:flex items-center justify-between w-full space-x-4">
              <div className="flex items-center space-x-4 mb-4">
                <span className="text-sm font-medium">Sort by:</span>
                <button
                  className="p-2 text-xs bg-gray-200 rounded"
                  onClick={() => handleSort("time")}
                >
                  Time {sortColumn === "time" && (sortOrder === "asc" ? "▲" : "▼")}
                </button>
                <button
                  className="p-2 text-xs bg-gray-200 rounded"
                  onClick={() => handleSort("gender")}
                >
                  Gender {sortColumn === "gender" && (sortOrder === "asc" ? "▲" : "▼")}
                </button>
                <button
                  className="p-2 text-xs bg-gray-200 rounded"
                  onClick={() => handleSort("mode")}
                >
                  Mode {sortColumn === "mode" && (sortOrder === "asc" ? "▲" : "▼")}
                </button>
                <button
                  className="p-2 text-xs bg-gray-200 rounded"
                  onClick={() => handleSort("submitterId")}
                >
                  Submitter {sortColumn === "submitterId" && (sortOrder === "asc" ? "▲" : "▼")}
                </button>
              </div>
              <div>
                <RecommendationModal route="birth" clinicId={clinicId} companyId="394974ea" />
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full table-auto border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-[#356966] text-white">
                    <th className="border border-gray-300 p-1 text-xs text-center">Time</th>
                    <th className="border border-gray-300 p-1 text-xs text-center">Gender</th>
                    <th className="border border-gray-300 p-1 text-xs text-center">Mode</th>
                    <th className="border border-gray-300 p-1 text-xs text-center">Submitter</th>
                  </tr>
                </thead>
                <tbody>
                  {births.map((birth, index) => (
                    <tr key={index} className="even:bg-gray-100">
                      <td className="border border-gray-300 p-1 text-center text-xs">
                        {new Date(birth.time).toLocaleString()}
                      </td>
                      <td className="border border-gray-300 p-1 text-center text-xs">
                        {birth.gender}
                      </td>
                      <td className="border border-gray-300 p-1 text-center text-xs">
                        {birth.mode}
                      </td>
                      <td className="border border-gray-300 p-1 text-center text-xs">
                        {birth.submitterId}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-between items-center mt-4">
              <div className="text-xs">
                Page {currentPage} of {totalPages}
              </div>
              <div className="flex space-x-2">
                <button
                  className="px-2 py-1 text-xs bg-gray-200 rounded"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                <button
                  className="px-2 py-1 text-xs bg-gray-200 rounded"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BirthInsight;
