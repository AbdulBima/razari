"use client";

import React, { useState } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

type Staff = {
  id: number;
  name: string;
  role: string;
  email: string;
  password: string;
  hospital: string;
};

const hospitals = [
  "Lagos General Hospital",
  "Abuja National Hospital",
  "Accra Specialist Clinic",
  "Cape Town Medical Center",
];

const roles = [
  "Admission Staff",
  "Health Record Officer",
  "Neurologist",
  "Orthopedic Surgeon",
  "General Practitioner",
];

const StaffManagement = () => {
  const [staffList, setStaffList] = useState<Staff[]>([
    { id: 1, name: "Dr. Ayo Adewale", role: "Admission Staf", email: "ayo.adewale@lagosmed.com", password: "secure123", hospital: "Lagos General Hospital" },
    { id: 2, name: "Dr. Fatima Hassan", role: "Health Record Officer", email: "fatima.hassan@abujahospital.com", password: "children123", hospital: "Abuja National Hospital" },
    { id: 3, name: "Dr. Kwame Mensah", role: "Neurologist", email: "kwame.mensah@accrahospital.com", password: "brainy456", hospital: "Accra Specialist Clinic" },
    { id: 4, name: "Dr. Zanele Ndlovu", role: "Orthopedic Surgeon", email: "zanele.ndlovu@capetownmed.com", password: "strongbones", hospital: "Cape Town Medical Center" },
    // Add more staff data for pagination demonstration
  ]);

  const [showModal, setShowModal] = useState(false);
  const [newStaff, setNewStaff] = useState<Partial<Staff>>({
    name: "",
    role: roles[0],
    email: "",
    password: "",
    hospital: hospitals[0],
  });
  const [editingStaff, setEditingStaff] = useState<Staff | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 3;

  const totalPages = Math.ceil(staffList.length / rowsPerPage);

  const handleAddOrUpdateStaff = () => {
    if (editingStaff) {
      // Update existing staff
      setStaffList((prev) =>
        prev.map((staff) =>
          staff.id === editingStaff.id ? { ...staff, ...newStaff } : staff
        )
      );
    } else {
      // Add new staff
      setStaffList((prev) => [
        ...prev,
        { id: Date.now(), ...newStaff } as Staff, // Use unique ID
      ]);
    }
    setShowModal(false);
    setNewStaff({ name: "", role: roles[0], email: "", password: "", hospital: hospitals[0] });
    setEditingStaff(null);
  };

  const handleEditStaff = (staff: Staff) => {
    setEditingStaff(staff);
    setNewStaff(staff);
    setShowModal(true);
  };

  const handleDeleteStaff = (id: number) => {
    setStaffList((prev) => prev.filter((staff) => staff.id !== id));
  };

  const handlePageChange = (direction: "next" | "prev") => {
    setCurrentPage((prevPage) =>
      direction === "next"
        ? Math.min(prevPage + 1, totalPages)
        : Math.max(prevPage - 1, 1)
    );
  };

  const currentRows = staffList.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <div className="poppins-regular px-8 pt-6 w-full bg-gray-50 h-full overscroll-y-none overflow-y-hidden">
      <h1 className="text-lg font-semibold mb-4">Staffs</h1>
      <div className="mb-2 flex justify-between">
        <button
          className="bg-blue-500 text-white px-3 py-1 rounded"
          onClick={() => setShowModal(true)}
        >
          Add Medical Staff
        </button>
      </div>
      <table className="w-full table-auto border-collapse border border-gray-300 text-xs">
        <thead>
          <tr className="bg-[#4CAF50] text-white">
            <th className="border border-gray-300 p-1">Name</th>
            <th className="border border-gray-300 p-1">Role</th>
            <th className="border border-gray-300 p-1">Email</th>
            <th className="border border-gray-300 p-1">Hospital</th>
            <th className="border border-gray-300 p-1">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentRows.map((staff) => (
            <tr key={staff.id} className="even:bg-gray-100">
              <td className="border border-gray-300 p-1">{staff.name}</td>
              <td className="border border-gray-300 p-1">{staff.role}</td>
              <td className="border border-gray-300 p-1">{staff.email}</td>
              <td className="border border-gray-300 p-1">{staff.hospital}</td>
              <td className="border border-gray-300 p-1 text-center">
                <button
                  className="text-blue-500 mr-2"
                  onClick={() => handleEditStaff(staff)}
                >
                  <FaEdit />
                </button>
                <button
                  className="text-red-500"
                  onClick={() => handleDeleteStaff(staff.id)}
                >
                  <FaTrashAlt />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4 text-xs">
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <div className="flex space-x-2">
          <button
            className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
            onClick={() => handlePageChange("prev")}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <button
            className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
            onClick={() => handlePageChange("next")}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>

      {/* Modal for Adding/Editing Staff */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-lg shadow-md w-40 text-xs">
            <h2 className="text-sm font-bold mb-2">
              {editingStaff ? "Edit Medical Staff" : "Add Medical Staff"}
            </h2>
            <div className="mb-2">
              <label className="block mb-1">Name</label>
              <input
                type="text"
                value={newStaff.name || ""}
                onChange={(e) => setNewStaff({ ...newStaff, name: e.target.value })}
                className="w-full border border-gray-300 p-1 rounded"
              />
            </div>
            <div className="mb-2">
              <label className="block mb-1">Role</label>
              <select
                value={newStaff.role}
                onChange={(e) => setNewStaff({ ...newStaff, role: e.target.value })}
                className="w-full border border-gray-300 p-1 rounded"
              >
                {roles.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-2">
              <label className="block mb-1">Email</label>
              <input
                type="email"
                value={newStaff.email || ""}
                onChange={(e) => setNewStaff({ ...newStaff, email: e.target.value })}
                className="w-full border border-gray-300 p-1 rounded"
              />
            </div>
            <div className="mb-2">
              <label className="block mb-1">Password</label>
              <input
                type="password"
                value={newStaff.password || ""}
                onChange={(e) =>
                  setNewStaff({ ...newStaff, password: e.target.value })
                }
                className="w-full border border-gray-300 p-1 rounded"
              />
            </div>
            <div className="mb-2">
              <label className="block mb-1">Hospital</label>
              <select
                value={newStaff.hospital}
                onChange={(e) =>
                  setNewStaff({ ...newStaff, hospital: e.target.value })
                }
                className="w-full border border-gray-300 p-1 rounded"
              >
                {hospitals.map((hospital) => (
                  <option key={hospital} value={hospital}>
                    {hospital}
                  </option>
                ))}
              </select>
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
                onClick={handleAddOrUpdateStaff}
              >
                {editingStaff ? "Update" : "Add"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StaffManagement;
