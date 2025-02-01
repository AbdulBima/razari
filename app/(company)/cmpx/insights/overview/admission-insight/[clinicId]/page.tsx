"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Breadcrumb from "@/components/navigation/Breadcrumb";
import AdmissionCharts from "@/components/insightPageCharts/AdmissionCharts";

import RecommendationModal from "@/components/RecommendationModal";
import Loader from "@/utils/loader";
import companyApi from "@/utils/apiCompany";

interface Admission {
  time: string;
  gender: string;
  ageGroup: string;
  reason: string;
  submitterId: string;
}

const AdmissionPage = () => {
  const params = useParams();
  const clinicId = Array.isArray(params.clinicId)
    ? params.clinicId[0]
    : params.clinicId || "defaultClinicId";

  const [admissions, setAdmissions] = useState<Admission[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(7);
  const [sortColumn, setSortColumn] = useState<keyof Admission | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [totalAdmissions, setTotalAdmissions] = useState(0); // State for total admissions count

  const fetchAdmissions = async () => {
    setLoading(true);
    try {
      const skip = (currentPage - 1) * rowsPerPage;
      const limit = rowsPerPage;
      const url = `/admissions/get/${clinicId}?skip=${skip}&limit=${limit}`;
      const response = await companyApi.get(url);
      setAdmissions(response.data.admissions);
      setTotalAdmissions(response.data.total); // Store total admissions count
    } catch (error) {
      console.log("Error fetching admissions:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (clinicId) {
      fetchAdmissions();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clinicId, currentPage]);

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
    if (newPage < 1 || newPage > totalPages) return; // Prevent invalid page numbers
    setCurrentPage(newPage); // Update current page
  };

  const paginatedAdmissions = admissions.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const totalPages = Math.ceil(totalAdmissions / rowsPerPage); // Use totalAdmissions
  return (
    <div className="poppins-regular px-8 md:pt-2 w-full bg-gray-50 h-full md:overscroll-y-none md:overflow-y-hidden">
      <Breadcrumb secondLink={{ href: "/admission", label: "Admissions" }} />
      <AdmissionCharts clinicId={clinicId} />

      {loading ? (
        <div className="mt-6"><Loader /></div>
      ) : (
        <div className="bg-white grid grid-cols-4 gap-4 shadow-md p-2 mt-6 rounded-lg border border-gray-200">
          <div className="col-span-4">
            {/* Sort buttons for larger devices */}
            <div className="hidden px-4 lg:flex items-center justify-between w-full space-x-4 ">
              <div className="flex items-center space-x-4 mb-4">
                <span className="text-sm font-medium">Sort by:</span>
                <button
                  className="p-2 text-xs bg-gray-200 rounded"
                  onClick={() => handleSort("time")}
                >
                  Time{" "}
                  {sortColumn === "time" && (sortOrder === "asc" ? "▲" : "▼")}
                </button>
                <button
                  className="p-2 text-xs bg-gray-200 rounded"
                  onClick={() => handleSort("gender")}
                >
                  Gender{" "}
                  {sortColumn === "gender" && (sortOrder === "asc" ? "▲" : "▼")}
                </button>
                <button
                  className="p-2 text-xs bg-gray-200 rounded"
                  onClick={() => handleSort("ageGroup")}
                >
                  Age Group{" "}
                  {sortColumn === "ageGroup" &&
                    (sortOrder === "asc" ? "▲" : "▼")}
                </button>
                <button
                  className="p-2 text-xs bg-gray-200 rounded"
                  onClick={() => handleSort("reason")}
                >
                  Reason{" "}
                  {sortColumn === "reason" && (sortOrder === "asc" ? "▲" : "▼")}
                </button>
                <button
                  className="p-2 text-xs bg-gray-200 rounded"
                  onClick={() => handleSort("submitterId")}
                >
                  Submitter{" "}
                  {sortColumn === "submitterId" &&
                    (sortOrder === "asc" ? "▲" : "▼")}
                </button>
              </div>

              <div>
                <RecommendationModal
                  route="admissions"
                  clinicId="12345"
                  companyId="67890"
                />
              </div>
            </div>

            {/* Dropdown for sorting on mobile devices */}
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

              <RecommendationModal
                  route="admissions"
                  clinicId="12345"
                  companyId="67890"
                />
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
            <table className="w-full table-auto border-collapse border border-gray-300">
              <thead>
                <tr className="bg-[#356966] text-white">
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
                {paginatedAdmissions.map((admission, index) => (
                  <tr key={index} className="even:bg-gray-100">
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
            {/* Pagination */}
            <div className="flex justify-between items-center mt-4">
              <div className="text-xs">
                Page {currentPage} of {totalPages}
              </div>
              <div className="flex space-x-2">
                <button
                  className="px-2 py-1 text-xs bg-gray-200 rounded"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1} // Disable if on first page
                >
                  Previous
                </button>
                <button
                  className="px-2 py-1 text-xs bg-gray-200 rounded"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages} // Disable if on last page
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

export default AdmissionPage;
