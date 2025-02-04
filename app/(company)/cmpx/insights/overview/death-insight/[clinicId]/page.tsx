"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Breadcrumb from "@/components/navigation/Breadcrumb";
import DeathCharts from "@/components/insightPageCharts/DeathCharts";
import companyApi from "@/utils/apiCompany";

interface Death {
  time: string;
  category: string;  // 'category' used instead of 'gender'
  cause: string;
  submitterId: string;
  companyId: string;
  clinicId: string;
}

const DeathInsight = () => {
  const params = useParams();
  const clinicId = Array.isArray(params.clinicId)
    ? params.clinicId[0]
    : params.clinicId || "defaultClinicId";

  const [deaths, setDeaths] = useState<Death[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(7);
  const [sortColumn, setSortColumn] = useState<keyof Death | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [totalRecords, setTotalRecords] = useState(0);

  // Fetch death data
  const fetchDeaths = async () => {
    setLoading(true);
    try {
      const skip = (currentPage - 1) * rowsPerPage;
      const limit = rowsPerPage;
      const url = `/death-records/get/${clinicId}?skip=${skip}&limit=${limit}`;
      const response = await companyApi.get(url);
      setDeaths(response.data.records); // Use the "records" field from API
      setTotalRecords(response.data.total); // Use the "total" field from API
    } catch (error) {
      console.log("Error fetching deaths:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (clinicId) {
      fetchDeaths();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clinicId, currentPage]);

  // Sorting functionality
  const handleSort = (column: keyof Death) => {
    const order = sortColumn === column && sortOrder === "asc" ? "desc" : "asc";
    setSortColumn(column);
    setSortOrder(order);
    const sortedDeaths = [...deaths].sort((a, b) => {
      if (a[column] < b[column]) return order === "asc" ? -1 : 1;
      if (a[column] > b[column]) return order === "asc" ? 1 : -1;
      return 0;
    });
    setDeaths(sortedDeaths);
  };

  // Handle page changes
  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    setCurrentPage(newPage);
  };

  const totalPages = Math.ceil(totalRecords / rowsPerPage);

  return (
    <div className="poppins-regular px-8 md:pt-2 w-full bg-gray-50 h-full md:overscroll-y-none md:overflow-y-hidden">
      <Breadcrumb secondLink={{ href: "/cmpx/insights", label: "Death Insight" }} />
      <DeathCharts clinicId={clinicId} />

      {loading ? (
     <div className="flex justify-center items-center mt-8">
     <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-orange-700"></div>
   </div>
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
                  onClick={() => handleSort("category")}
                >
                  Category {sortColumn === "category" && (sortOrder === "asc" ? "▲" : "▼")}
                </button>
                <button
                  className="p-2 text-xs bg-gray-200 rounded"
                  onClick={() => handleSort("cause")}
                >
                  Cause {sortColumn === "cause" && (sortOrder === "asc" ? "▲" : "▼")}
                </button>
                <button
                  className="p-2 text-xs bg-gray-200 rounded"
                  onClick={() => handleSort("submitterId")}
                >
                  Submitter {sortColumn === "submitterId" && (sortOrder === "asc" ? "▲" : "▼")}
                </button>
              </div>
              <div>
                 </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full table-auto border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-[#356966] text-white">
                    <th className="border border-gray-300 p-1 text-xs text-center">Time</th>
                    <th className="border border-gray-300 p-1 text-xs text-center">Category</th>
                    <th className="border border-gray-300 p-1 text-xs text-center">Cause</th>
                    <th className="border border-gray-300 p-1 text-xs text-center">Submitter</th>
                  </tr>
                </thead>
                <tbody>
                  {deaths.map((death, index) => (
                    <tr key={index} className="even:bg-gray-100">
                      <td className="border border-gray-300 p-1 text-center text-xs">
                        {new Date(death.time).toLocaleString()}
                      </td>
                      <td className="border border-gray-300 p-1 text-center text-xs">
                        {death.category}
                      </td>
                      <td className="border border-gray-300 p-1 text-center text-xs">
                        {death.cause}
                      </td>
                      <td className="border border-gray-300 p-1 text-center text-xs">
                        {death.submitterId}
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

export default DeathInsight;

export const runtime = 'edge';