"use client"

import React, { useEffect, useState } from "react";
import axios from "axios";
import { DiagnosisRecord } from "@/types/types";

const DiagnosisTable: React.FC = () => {
  const [diagnosisData, setDiagnosisData] = useState<DiagnosisRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(5);  // You can modify this if needed

  // Fetch data when currentPage or itemsPerPage changes
  useEffect(() => {
    const fetchDiagnosisData = async () => {
      setLoading(true);
      setError(null);
      const companyId = localStorage.getItem("cmpx");

      if (!companyId) {
        setError("Company ID not found in local storage.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/diagnosis/company/${companyId}`, {
            params: {
              skip: (currentPage - 1) * itemsPerPage,
              limit: itemsPerPage,
            },
          }
        );
        setDiagnosisData(response.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : String(err));
      } finally {
        setLoading(false);
      }
    };

    fetchDiagnosisData();
  }, [currentPage, itemsPerPage]);

  const paginatedData = diagnosisData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="bg-white shadow-sm p-4 rounded-lg mt-4 overflow-x-auto">
      <h2 className="text-xs font-semibold text-gray-800 mb-2">Diagnosis Data</h2>
     
      {error && <div className="text-red-500 text-center">{error}</div>}
      {!loading && !error && (
        <>
          <table className="w-full table-auto border-collapse border border-gray-300">
            <thead>
              <tr className="bg-[#356966] text-white">
                <th className="border border-gray-300 p-2 text-xs">Clinic ID</th>
                <th className="border border-gray-300 p-2 text-xs">Time</th>
                <th className="border border-gray-300 p-2 text-xs">Diagnosis</th>
                <th className="border border-gray-300 p-2 text-xs">Age Group</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((row, index) => (
                <tr key={index} className="even:bg-gray-100">
                  <td className="border border-gray-300 p-2 text-center text-xs">{row.clinicId}</td>
                  <td className="border border-gray-300 p-2 text-center text-xs">{new Date(row.time).toLocaleString()}</td>
                  <td className="border border-gray-300 p-2 text-center text-xs">{row.diagnosis}</td>
                  <td className="border border-gray-300 p-2 text-center text-xs">{row.ageGroup}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex text-xs justify-between items-center mt-4">
            <span className="text-xs text-gray-600">Page {currentPage}</span>
            <div className="flex space-x-2">
              <button
                className={`px-3 py-1 border rounded ${currentPage === 1 ? "cursor-not-allowed opacity-50" : ""}`}
                onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <button
                className={`px-3 py-1 border rounded ${diagnosisData.length < itemsPerPage ? "cursor-not-allowed opacity-50" : ""}`}
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={diagnosisData.length < itemsPerPage}
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

export default DiagnosisTable;
