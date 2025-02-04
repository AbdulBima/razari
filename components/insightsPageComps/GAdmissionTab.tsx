"use client";

import React, { useState, useEffect } from "react";

import Loader from "@/utils/loader";
import GAdmissionTabChart from "../insightsPageCompsCharts/GAdmissionTabChart";
import companyApi from "@/utils/apiCompany";

interface Admission {
  time: string;
  gender: string;
  ageGroup: string;
  reason: string;
  submitterId: string;
  clinicId: string;
}

const GAdmissionTab = () => {
  const [admissions, setAdmissions] = useState<Admission[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [rowsPerPage, setRowsPerPage] = useState(7); // State for rows per page
  const [sortColumn, setSortColumn] = useState<keyof Admission | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [totalAdmissions, setTotalAdmissions] = useState(0);

  const fetchAdmissions = async () => {
    const companyId = localStorage.getItem("cmpx");

    if (!companyId) {
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const skip = (currentPage - 1) * rowsPerPage;
      const limit = rowsPerPage;
      const url = `/admissions/get/${companyId}/all?skip=${skip}&limit=${limit}`;
      const response = await companyApi.get(url);
      setAdmissions(response.data.admissions);
      setTotalAdmissions(response.data.total);
    } catch (error) {
      console.log("Error fetching admissions:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    const companyId = localStorage.getItem("cmpx");
    if (companyId) {
      fetchAdmissions();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, rowsPerPage]); // Re-fetch data when currentPage or rowsPerPage changes

  const handleSort = (column: keyof Admission) => {
    const order = sortColumn === column && sortOrder === "asc" ? "desc" : "asc";
    setSortColumn(column);
    setSortOrder(order);
    const sortedAdmissions = [...admissions].sort((a, b) => {
      if (a[column] < b[column]) return order === "asc" ? -1 : 1;
      if (a[column] > b[column]) return order === "asc" ? 1 : -1;
      return 0;
    });
    setAdmissions(sortedAdmissions);
  };

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    setCurrentPage(newPage);
  };

  const totalPages = Math.ceil(totalAdmissions / rowsPerPage);

  return (
    <div className="poppins-regular md:px-2 pt-2 w-full bg-gray-50 h-full md:overscroll-y-none md:overflow-y-hidden">

      {localStorage.getItem("cmpx") && (
        <GAdmissionTabChart companyId={localStorage.getItem("cmpx") as string} />
      )}

      {loading ? (
        <div className="mt-6">
          <Loader />
        </div>
      ) : (
        <div className="bg-white grid grid-cols-4 gap-4 shadow-md p-2 mt-6 rounded-lg border border-gray-200">
          <div className="col-span-4">
            <div className="hidden px-4 lg:flex items-center justify-between w-full space-x-4">
              <div className="flex items-center space-x-4 mb-4">
                <span className="text-sm font-medium">Sort by:</span>
                {["time", "gender", "ageGroup", "reason", "submitterId"].map(
                  (column) => (
                    <button
                      key={column}
                      className="p-2 text-xs bg-gray-200 rounded"
                      onClick={() => handleSort(column as keyof Admission)}
                    >
                      {column.charAt(0).toUpperCase() + column.slice(1)}{" "}
                      {sortColumn === column &&
                        (sortOrder === "asc" ? "▲" : "▼")}
                    </button>
                  )
                )}
              </div>

            
            </div>

            <div className="block md:hidden mb-4">
              <select
                className="p-2 text-xs mb-4 bg-gray-100 rounded w-full"
                onChange={(e) => handleSort(e.target.value as keyof Admission)}
                value={sortColumn || ""}
              >
                <option value="">Sort by</option>
                <option value="time">Time</option>
                <option value="gender">Gender</option>
                <option value="ageGroup">Age Group</option>
                <option value="reason">Reason</option>
                <option value="submitterId">Submitter</option>
              </select>

            </div>

            <div className="overflow-x-auto">
              <table className="w-full table-auto border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-[#356966] text-white">
                  <th className="border border-gray-300 p-1 text-xs text-center">
                      Clinic Id
                    </th>
                    <th className="border border-gray-300 p-1 text-xs text-center">
                      Time
                    </th>
                    <th className="border border-gray-300 p-1 text-xs text-center">
                      Gender
                    </th>
                    <th className="border border-gray-300 p-1 text-xs text-center">
                      Age
                    </th>
                    <th className="border border-gray-300 p-1 text-xs text-center">
                      Reason
                    </th>
                    <th className="border border-gray-300 p-1 text-xs text-center">
                      Submitter
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {admissions.map((admission, index) => (
                    <tr key={index} className="even:bg-gray-100">
                     
                     <td className="border uppercase border-gray-300 p-1 text-center text-xs">
                        {admission.clinicId}
                      </td>
                      <td className="border border-gray-300 p-1 text-center text-xs">
                        {new Date(admission.time).toLocaleString()}
                      </td>
                      <td className="border border-gray-300 p-1 text-center text-xs">
                        {admission.gender}
                      </td>
                      <td className="border border-gray-300 p-1 text-center text-xs">
                        {admission.ageGroup}
                      </td>
                      <td className="whitespace-nowrap border border-gray-300 p-1 text-center text-xs">
                        {admission.reason}
                      </td>
                      <td className="border border-gray-300 p-1 text-center text-xs">
                        {admission.submitterId}
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

export default GAdmissionTab;
