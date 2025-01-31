"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";

interface Clinic {
  id: string;
  clinicId: string;
  name: string;
  country: string;
  state: string;
  status: boolean;
}

const ClinicsTab = () => {
  const [clinics, setClinics] = useState<Clinic[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [rowsPerPage] = useState<number>(10);
  const [sortedField, setSortedField] = useState<null | keyof Clinic>(null);
  const [ascending, setAscending] = useState<boolean>(true);

  useEffect(() => {
    const fetchClinics = async () => {
      try {
        const companyId = localStorage.getItem("cmpx");
        if (!companyId) {
          console.log("Company ID not found in local storage.");
          setLoading(false);
          return;
        }

        const response = await axios.get<Clinic[]>(
          `http://127.0.0.1:8000/api/clinic/${companyId}/clinic-list`
        );
        setClinics(response.data);
      } catch (error) {
        console.log("Failed to fetch clinics:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchClinics();
  }, []);

  const handleSort = (field: keyof Clinic) => {
    const isAscending = sortedField === field ? !ascending : true;
    setSortedField(field);
    setAscending(isAscending);

    const sortedData = [...clinics].sort((a, b) => {
      if (a[field] < b[field]) return isAscending ? -1 : 1;
      if (a[field] > b[field]) return isAscending ? 1 : -1;
      return 0;
    });

    setClinics(sortedData);
  };

  const handlePageChange = (direction: "prev" | "next") => {
    setCurrentPage((prevPage) =>
      direction === "prev" ? Math.max(prevPage - 1, 1) : prevPage + 1
    );
  };

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = clinics.slice(indexOfFirstRow, indexOfLastRow);

  const totalPages = Math.ceil(clinics.length / rowsPerPage);

  return (
    <div className="poppins-regular   w-full  h-screen overflow-y-hidden">
     

      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-orange-700"></div>
        </div>
      ) : (
        <>
          {/* Sorting Options */}
          <div className="mb-4 flex mt-6 flex-col md:flex-row md:space-x-4">
            <span className="hidden md:block">Sort by:</span>
            {/* Buttons for Desktop */}
            <div className="hidden md:flex space-x-4">
              <button
                className="px-4 py-1 bg-gray-300 rounded-lg text-sm hover:bg-gray-400 transition"
                onClick={() => handleSort("clinicId")}
              >
                Clinic ID
              </button>
              <button
                className="px-4 py-1 bg-gray-300 rounded-lg text-sm hover:bg-gray-400 transition"
                onClick={() => handleSort("name")}
              >
                Name
              </button>
              <button
                className="px-4 py-1 bg-gray-300 rounded-lg text-sm hover:bg-gray-400 transition"
                onClick={() => handleSort("country")}
              >
                Country
              </button>
              <button
                className="px-4 py-1 bg-gray-300 rounded-lg text-sm hover:bg-gray-400 transition"
                onClick={() => handleSort("state")}
              >
                State
              </button>
            </div>
            {/* Dropdown for Mobile */}
            <select
              className="block md:hidden w-full my-1 px-4 py-2 bg-gray-200 rounded-lg text-sm"
              onChange={(e) => handleSort(e.target.value as keyof Clinic)}
            >
              <option value="">Sort by</option>
              <option value="clinicId">Clinic ID</option>
              <option value="name">Name</option>
              <option value="country">Country</option>
              <option value="state">State</option>
            </select>
          </div>

          {/* Table */}
          <div className="overflow-x-auto md:mt-6">
            <table className="w-full table-auto text-sm bg-white rounded-lg shadow-sm">
              <thead>
                <tr className="bg-[#356966] rounded-lg text-white text-left">
                  <th className="px-4 py-1">Clinic ID</th>
                  <th className="px-4 py-1">Name</th>
                  <th className="px-4 py-1">Country</th>
                  <th className="px-4 py-1">State</th>
                  <th className="px-4 py-1"></th>
                </tr>
              </thead>
              <tbody>
                {currentRows.map((clinic) => (
                  <tr
                    key={clinic.id}
                    className="even:bg-gray-50 border-t  border-gray-200 hover:bg-gray-100"
                  >
                    <td className="px-4 py-2 uppercase">{clinic.clinicId}</td>
                    <td className="px-4 py-2 whitespace-nowrap">{clinic.name}</td>
                    <td className="px-4 py-2">{clinic.country}</td>
                    <td className="px-4 py-2">{clinic.state}</td>
                    <td className="px-4 py-2 flex space-x-4 text-left">
                      <Link
                        href={`/cmpx/insights/overview/admission-insight/${clinic.clinicId}`}
                        className="text-blue-600 bg-blue-100 hover:bg-blue-200 text-sm py-1 px-2 rounded-xl flex items-center"
                      >
                        <FontAwesomeIcon icon={faEye} className="mr-2" />
                        Admissions
                      </Link>
                      <Link
                        href={`/cmpx/insights/overview/diagnosis-insight/${clinic.clinicId}`}
                        className="text-green-600 bg-green-100 hover:bg-green-200 text-sm py-1 px-2 rounded-xl flex items-center"
                      >
                        <FontAwesomeIcon icon={faEye} className="mr-2" />
                        Diagnosis
                      </Link>
                      <Link
                        href={`/cmpx/insights/overview/birth-insight/${clinic.clinicId}`}
                        className="text-purple-600 bg-purple-100 hover:bg-purple-200 text-sm py-1 px-2 rounded-xl flex items-center"
                      >
                        <FontAwesomeIcon icon={faEye} className="mr-2" />
                        Birth
                      </Link>
                      <Link
                        href={`/cmpx/insights/overview/emergency-insight/${clinic.clinicId}`}
                        className="text-orange-600 bg-orange-100 hover:bg-orange-200 text-sm py-1 px-2 rounded-xl flex items-center"
                      >
                        <FontAwesomeIcon icon={faEye} className="mr-2" />
                        Emergency
                      </Link>
                      <Link
                        href={`/cmpx/insights/overview/death-insight/${clinic.clinicId}`}
                        className="text-red-600 bg-red-100 hover:bg-red-200 text-sm py-1 px-2 rounded-xl flex items-center"
                      >
                        <FontAwesomeIcon icon={faEye} className="mr-2" />
                        Death
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-between items-center mt-6">
            <span className="text-sm">
              Page {currentPage} of {totalPages}
            </span>
            <div className="flex space-x-4">
              <button
                className={`px-2 text-sm py-1 rounded-lg ${
                  currentPage === 1
                    ? "bg-gray-300 text-gray-600"
                    : "bg-gray-400 text-white hover:bg-green-700"
                }`}
                onClick={() => handlePageChange("prev")}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <button
                className={`px-2 py-1 text-sm rounded-lg ${
                  currentPage === totalPages
                    ? "bg-gray-300 text-gray-600"
                    : "bg-[#356966] text-white hover:bg-green-700"
                }`}
                onClick={() => handlePageChange("next")}
                disabled={currentPage === totalPages}
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

export default ClinicsTab;
