// DiagnosisTable.tsx
import { DiagnosisRecord } from "@/types/types";
import React from "react";

type DiagnosisTableProps = {
  diagnosisData: DiagnosisRecord[];
  currentPage: number;
  itemsPerPage: number;
  onPageChange: (newPage: number) => void;
};

const DiagnosisTable: React.FC<DiagnosisTableProps> = ({ diagnosisData = [], currentPage, itemsPerPage, onPageChange }) => {
    const paginatedData = diagnosisData.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
  
    return (
      <div className="bg-white shadow-sm p-4 rounded-lg mt-4 overflow-x-auto">
        <h2 className="text-xs font-semibold text-gray-800 mb-2">Diagnosis Data</h2>
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
              onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <button
              className={`px-3 py-1 border rounded ${currentPage === 2 ? "cursor-not-allowed opacity-50" : ""}`}
              onClick={() => onPageChange(Math.min(currentPage + 1, 2))}
              disabled={currentPage === 2}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default DiagnosisTable;
  
