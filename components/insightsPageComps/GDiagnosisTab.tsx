"use client";

import React, { useState, useEffect } from "react";
import Loader from "@/utils/loader";
import GDiagnosisTabChart from "../insightsPageCompsCharts/GDiagnosisTabChart";
import companyApi from "@/utils/apiCompany";

interface Diagnosis {
  time: string;
  category: string;
  diagnosis: string;
  ageGroup: string;
  submitterId: string;
  clinicId: string;
}

const GDDiagnosisTab = () => {
  const [diagnosis, setDiagnosis] = useState<Diagnosis[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(7);
  const [sortColumn, setSortColumn] = useState<keyof Diagnosis | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [totalDiagnosis, setTotalDiagnosis] = useState(0);
 // New state for recommendation modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [recommendation, setRecommendation] = useState("");
  const [loadingRecommendation, setLoadingRecommendation] = useState(false);
  // Fetch diagnosis data

  const companyId = localStorage.getItem("cmpx");

  const fetchDiagnosis = async () => {
    const companyId = localStorage.getItem("cmpx");

    if (!companyId) {
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const skip = (currentPage - 1) * rowsPerPage;
      const limit = rowsPerPage;
      const url = `/diagnosis/get/${companyId}/all?skip=${skip}&limit=${limit}`;
      const response = await companyApi.get(url);
      setDiagnosis(response.data.diagnosis);
      setTotalDiagnosis(response.data.total); // Store total diagnosis count
    } catch (error) {
      console.log("Error fetching admissions:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    const companyId = localStorage.getItem("cmpx");
    if (companyId) {
      fetchDiagnosis();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, rowsPerPage]); // Trigger fetch on clinicId or currentPage change

  // Sorting functionality
  const handleSort = (column: keyof Diagnosis) => {
    const order = sortColumn === column && sortOrder === "asc" ? "desc" : "asc";
    setSortColumn(column);
    setSortOrder(order);
    const sortedDiagnosis = [...diagnosis].sort((a, b) => {
      if (a[column] < b[column]) return order === "asc" ? -1 : 1;
      if (a[column] > b[column]) return order === "asc" ? 1 : -1;
      return 0;
    });
    setDiagnosis(sortedDiagnosis);
  };

  // Handle page changes
  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return; // Prevent invalid page numbers
    setCurrentPage(newPage); // Update current page, triggers re-fetch
  };

  const fetchRecommendation = async () => {
    setLoadingRecommendation(true);
    setRecommendation(""); // Clear any previous recommendation
    try {
      const url = `/diagnosis/company/${companyId}/diagnosis-recommendation`;
      const response = await companyApi.get(url);
      // Assuming the response returns a "recommendations" field
      setRecommendation(response.data.recommendations);
    } catch (error) {
      console.log("Error fetching recommendation:", error);
      setRecommendation("An error occurred while fetching the recommendation.");
    }
    setLoadingRecommendation(false);
  };

   // Handler for button click that opens the modal and fetches recommendation
   const handleRecommendationClick = () => {
    setIsModalOpen(true);
    fetchRecommendation();
  };
  const totalPages = Math.ceil(totalDiagnosis / rowsPerPage);

  return (
    <div className="poppins-regular md:px-2 pt-2 w-full bg-gray-50 h-full md:overscroll-y-none md:overflow-y-hidden">
    
      {localStorage.getItem("cmpx") && (
        <GDiagnosisTabChart
          companyId={localStorage.getItem("cmpx") as string}
        />
      )}
      {loading ? (
        <Loader />
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
                  onClick={() => handleSort("category")}
                >
                  Category{" "}
                  {sortColumn === "category" &&
                    (sortOrder === "asc" ? "▲" : "▼")}
                </button>
                <button
                  className="p-2 text-xs bg-gray-200 rounded"
                  onClick={() => handleSort("diagnosis")}
                >
                  Diagnosis{" "}
                  {sortColumn === "diagnosis" &&
                    (sortOrder === "asc" ? "▲" : "▼")}
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
                  onClick={() => handleSort("submitterId")}
                >
                  Submitter{" "}
                  {sortColumn === "submitterId" &&
                    (sortOrder === "asc" ? "▲" : "▼")}
                </button>
              </div>

              <div>
              <button
                onClick={handleRecommendationClick}
                className="w-full p-2 text-xs bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                AI Recommendation
              </button>
              </div>
            </div>

            {/* Dropdown for sorting on mobile devices */}
            <div className="block md:hidden mb-4">
              <select
                className="p-2 text-xs mb-4 bg-gray-100 rounded w-full"
                onChange={(e) => handleSort(e.target.value as keyof Diagnosis)}
                value={sortColumn || ""}
              >
                <option value="">Sort by</option>
                <option value="time">Time</option>
                <option value="category">Category</option>
                <option value="diagnosis">Diagnosis</option>
                <option value="ageGroup">Age Group</option>
                <option value="submitterId">Submitter</option>
              </select>

             <button
                onClick={handleRecommendationClick}
                className="w-full p-2 text-xs bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                AI Recommendation
              </button>
            </div>

            {/* Table */}
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
                      Category
                    </th>
                    <th className="border border-gray-300 p-1 text-xs text-center">
                      Diagnosis
                    </th>
                    <th className="border border-gray-300 p-1 text-xs text-center">
                      Age Group
                    </th>
                    <th className="border border-gray-300 p-1 text-xs text-center">
                      Submitter
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {diagnosis.map((diagnosis, index) => (
                    <tr key={index} className="even:bg-gray-100">
                      <td className="border uppercase border-gray-300 p-1 text-center text-xs">
                        {diagnosis.clinicId}
                      </td>
                      <td className="border border-gray-300 p-1 text-center text-xs">
                        {new Date(diagnosis.time).toLocaleString()}
                      </td>
                      <td className="border border-gray-300 p-1 text-center text-xs">
                        {diagnosis.category}
                      </td>
                      <td className="border border-gray-300 p-1 text-center text-xs">
                        {diagnosis.diagnosis}
                      </td>
                      <td className="border whitespace-nowrap border-gray-300 p-1 text-center text-xs">
                        {diagnosis.ageGroup}
                      </td>
                      <td className="border border-gray-300 p-1 text-center text-xs">
                        {diagnosis.submitterId}
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

         {/* Recommendation Modal */}
         {isModalOpen && (
  <div className="fixed inset-0 flex items-center justify-center z-50">
    {/* Modal overlay */}
    <div
      className="absolute inset-0 bg-black opacity-50"
      onClick={() => setIsModalOpen(false)}
    ></div>
    {/* Modal content */}
    <div className="relative bg-white rounded-lg shadow-xl p-6 max-w-3xl w-full z-10 overflow-y-auto max-h-[90vh]">
      <button
        className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
        onClick={() => setIsModalOpen(false)}
      >
        ✕
      </button>
      <h2 className="text-xl font-semibold mb-4">AI Recommendations</h2>
      <div className="text-sm text-gray-700 whitespace-pre-line">
        {loadingRecommendation ? (
          <div className="flex justify-center items-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-4 border-blue-600"></div>
          </div>
        ) : (
          recommendation
        )}
      </div>
    </div>
  </div>
)}
    </div>
  );
};

export default GDDiagnosisTab;
