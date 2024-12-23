"use client";

import React, { useState } from "react";
import { FaEdit, FaTrashAlt, FaSort } from "react-icons/fa";

type Hospital = {
  id: number;
  hospitalId: string;
  name: string;
  state: string;
  capital: string;
};

const HospitalManagement = () => {
  const [hospitalList, setHospitalList] = useState<Hospital[]>([
    { id: 1, hospitalId: "HSP001", name: "Lagos General Hospital", state: "Lagos", capital: "Ikeja" },
    { id: 2, hospitalId: "HSP002", name: "Accra Specialist Clinic", state: "Greater Accra", capital: "Accra" },
    { id: 3, hospitalId: "HSP003", name: "Cape Town Medical Center", state: "Western Cape", capital: "Cape Town" },
    { id: 4, hospitalId: "HSP004", name: "Nairobi Regional Hospital", state: "Nairobi County", capital: "Nairobi" },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [newHospital, setNewHospital] = useState<Partial<Hospital>>({
    hospitalId: "",
    name: "",
    state: "",
    capital: "",
  });
  const [editingHospital, setEditingHospital] = useState<Hospital | null>(null);
  const [sortConfig, setSortConfig] = useState<{ key: keyof Hospital; direction: "asc" | "desc" } | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 3;

  const totalPages = Math.ceil(hospitalList.length / rowsPerPage);

  const sortedHospitals = React.useMemo(() => {
    let sortableHospitals = [...hospitalList];
    if (sortConfig) {
      sortableHospitals.sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];
        if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }
    return sortableHospitals;
  }, [hospitalList, sortConfig]);

  const currentRows = sortedHospitals.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handleSort = (key: keyof Hospital) => {
    setSortConfig((prev) => ({
      key,
      direction: prev?.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const handleAddOrUpdateHospital = () => {
    if (editingHospital) {
      setHospitalList((prev) =>
        prev.map((hospital) =>
          hospital.id === editingHospital.id ? { ...hospital, ...newHospital } : hospital
        )
      );
    } else {
      setHospitalList((prev) => [
        ...prev,
        { id: Date.now(), ...newHospital } as Hospital,
      ]);
    }
    setShowModal(false);
    setNewHospital({ hospitalId: "", name: "", state: "", capital: "" });
    setEditingHospital(null);
  };

  const handleEditHospital = (hospital: Hospital) => {
    setEditingHospital(hospital);
    setNewHospital(hospital);
    setShowModal(true);
  };

  const handleDeleteHospital = (id: number) => {
    setHospitalList((prev) => prev.filter((hospital) => hospital.id !== id));
  };

  const handlePageChange = (direction: "next" | "prev") => {
    setCurrentPage((prev) =>
      direction === "next" ? Math.min(prev + 1, totalPages) : Math.max(prev - 1, 1)
    );
  };

  return (
    <div className="p-4 bg-gray-50 min-h-screen overscroll-y-none overflow-hidden  text-sm">

      <h1 className="text-lg font-bold mb-4">Hospital Management</h1>
      <div className="mb-2 flex justify-between">
        <button
          className="bg-blue-500 text-white px-3 py-1 rounded"
          onClick={() => setShowModal(true)}
        >
          Add Hospital
        </button>
      </div>
      <table className="w-full table-auto border-collapse border border-gray-300 text-xs">
        <thead>
          <tr className="bg-[#4CAF50] text-white">
            <th className="border border-gray-300 p-1 cursor-pointer" onClick={() => handleSort("hospitalId")}>
              Hospital ID <FaSort className="inline ml-1" />
            </th>
            <th className="border border-gray-300 p-1 cursor-pointer" onClick={() => handleSort("name")}>
              Name <FaSort className="inline ml-1" />
            </th>
            <th className="border border-gray-300 p-1 cursor-pointer" onClick={() => handleSort("state")}>
              State <FaSort className="inline ml-1" />
            </th>
            <th className="border border-gray-300 p-1 cursor-pointer" onClick={() => handleSort("capital")}>
              Capital <FaSort className="inline ml-1" />
            </th>
            <th className="border border-gray-300 p-1">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentRows.map((hospital) => (
            <tr key={hospital.id} className="even:bg-gray-100">
              <td className="border border-gray-300 p-1 text-center">{hospital.hospitalId}</td>
              <td className="border border-gray-300 p-1">{hospital.name}</td>
              <td className="border border-gray-300 p-1">{hospital.state}</td>
              <td className="border border-gray-300 p-1">{hospital.capital}</td>
              <td className="border border-gray-300 p-1 text-center">
                <button
                  className="text-blue-500 mr-2"
                  onClick={() => handleEditHospital(hospital)}
                >
                  <FaEdit />
                </button>
                <button
                  className="text-red-500"
                  onClick={() => handleDeleteHospital(hospital.id)}
                >
                  <FaTrashAlt />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between items-center mt-4 text-xs">
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <div className="flex space-x-2">
          <button
            className={`px-3 py-1 rounded ${currentPage === 1 ? "bg-gray-300 text-gray-600" : "bg-blue-500 text-white"}`}
            onClick={() => handlePageChange("prev")}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <button
            className={`px-3 py-1 rounded ${currentPage === totalPages ? "bg-gray-300 text-gray-600" : "bg-blue-500 text-white"}`}
            onClick={() => handlePageChange("next")}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>

      {/* Modal for Adding/Editing Hospital */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-lg shadow-md w-2/3 text-xs">
            <h2 className="text-sm font-bold mb-2">
              {editingHospital ? "Edit Hospital" : "Add Hospital"}
            </h2>
            <div className="mb-2">
              <label className="block mb-1">Hospital ID</label>
              <input
                type="text"
                value={newHospital.hospitalId || ""}
                onChange={(e) =>
                  setNewHospital({ ...newHospital, hospitalId: e.target.value })
                }
                className="w-full border border-gray-300 p-1 rounded"
              />
            </div>
            <div className="mb-2">
              <label className="block mb-1">Hospital Name</label>
              <input
                type="text"
                value={newHospital.name || ""}
                onChange={(e) => setNewHospital({ ...newHospital, name: e.target.value })}
                className="w-full border border-gray-300 p-1 rounded"
              />
            </div>
            <div className="mb-2">
              <label className="block mb-1">State</label>
              <input
                type="text"
                value={newHospital.state || ""}
                onChange={(e) => setNewHospital({ ...newHospital, state: e.target.value })}
                className="w-full border border-gray-300 p-1 rounded"
              />
            </div>
            <div className="mb-2">
              <label className="block mb-1">Capital</label>
              <input
                type="text"
                value={newHospital.capital || ""}
                onChange={(e) =>
                  setNewHospital({ ...newHospital, capital: e.target.value })
                }
                className="w-full border border-gray-300 p-1 rounded"
              />
            </div>
            <div className="flex justify-end">
              <button
                className="bg-gray-500 text-white px-3 py-1 rounded mr-2"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 text-white px-3 py-1 rounded"
                onClick={handleAddOrUpdateHospital}
              >
                {editingHospital ? "Update" : "Add"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HospitalManagement;
