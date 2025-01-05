"use client";

import Breadcrumb from "@/components/navigation/Breadcrumb";
import React, { useState, useEffect } from "react";
import { FaSort } from "react-icons/fa";

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

const fetchStaffList = (): Promise<Staff[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          name: "Dr. Ayo Adewale",
          role: "Admission Staff",
          email: "ayo.adewale@lagosmed.com",
          password: "secure123",
          hospital: "Lagos General Hospital",
        },
        {
          id: 2,
          name: "Dr. Fatima Hassan",
          role: "Health Record Officer",
          email: "fatima.hassan@abujahospital.com",
          password: "children123",
          hospital: "Abuja National Hospital",
        },
        {
          id: 3,
          name: "Dr. Kwame Mensah",
          role: "Neurologist",
          email: "kwame.mensah@accrahospital.com",
          password: "brainy456",
          hospital: "Accra Specialist Clinic",
        },
        {
          id: 4,
          name: "Dr. Zanele Ndlovu",
          role: "Orthopedic Surgeon",
          email: "zanele.ndlovu@capetownmed.com",
          password: "strongbones",
          hospital: "Cape Town Medical Center",
        },
      ]);
    }, 2000);
  });
};

const StaffManagement: React.FC = () => {
  const [staffList, setStaffList] = useState<Staff[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [newStaff, setNewStaff] = useState<Partial<Staff>>({
    name: "",
    role: roles[0],
    email: "",
    password: "",
    hospital: hospitals[0],
  });
  const [editingStaff, setEditingStaff] = useState<Staff | null>(null);
  const [deletingStaff, setDeletingStaff] = useState<Staff | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 3;

  const totalPages = Math.ceil(staffList.length / rowsPerPage);

  useEffect(() => {
    const loadStaffData = async () => {
      setIsLoading(true);
      const staffData = await fetchStaffList();
      setStaffList(staffData);
      setIsLoading(false);
    };
    loadStaffData();
  }, []);

  const handleSort = (key: keyof Staff) => {
    setStaffList((prev) => {
      const sortedList = [...prev].sort((a, b) => {
        if (a[key] < b[key]) return -1;
        if (a[key] > b[key]) return 1;
        return 0;
      });
      return sortedList;
    });
  };

  const handleAddOrUpdateStaff = () => {
    if (editingStaff) {
      setStaffList((prev) =>
        prev.map((staff) =>
          staff.id === editingStaff.id ? { ...staff, ...newStaff } : staff
        )
      );
    } else {
      setStaffList((prev) => [
        ...prev,
        { id: Date.now(), ...newStaff } as Staff,
      ]);
    }

    setShowModal(false);
    resetNewStaff();
  };

  const handleEditStaff = (staff: Staff) => {
    setEditingStaff(staff);
    setNewStaff(staff);
    setShowModal(true);
  };

  const handleDeleteStaff = (staff: Staff) => {
    setDeletingStaff(staff);
    setShowDeleteModal(true);
  };

  const confirmDeleteStaff = () => {
    if (deletingStaff) {
      setStaffList((prev) =>
        prev.filter((staff) => staff.id !== deletingStaff.id)
      );
      setShowDeleteModal(false);
      setDeletingStaff(null);
    }
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setDeletingStaff(null);
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

  const resetNewStaff = () => {
    setNewStaff({
      name: "",
      role: roles[0],
      email: "",
      password: "",
      hospital: hospitals[0],
    });
    setEditingStaff(null);
  };

  return (
    <div className="poppins-regular px-6 pt-2 w-full bg-gray-50 h-full overflow-y-hidden">
      
     <Breadcrumb secondLink = {{href: "/staffs",label: "Staff Management" }} />
      <div className="mb-2 flex justify-between">
        <button
          className="bg-[#356966] text-white px-4 py-2 mt-4 rounded-md shadow-md hover:bg-orange-700"
          onClick={() => setShowModal(true)}
        >
          Add Staff
        </button>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center">
          <div className="w-8 h-8 border-4 border-t-4 border-gray-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <table className="w-full mt-4 bg-white shadow-md rounded-lg table-auto border-collapse  text-sm">
          <thead>
            <tr className="bg-[#356966] text-white text-left">
              <th
                className=" p-2 cursor-pointer"
                onClick={() => handleSort("name")}
              >
                Name <FaSort className="inline ml-2" />
              </th>
              <th
                className=" p-2 cursor-pointer"
                onClick={() => handleSort("role")}
              >
                Role <FaSort className="inline ml-2" />
              </th>
              <th
                className=" hidden md:block border-gray-300 p-2 cursor-pointer"
                onClick={() => handleSort("email")}
              >
                Email <FaSort className="inline ml-2" />
              </th>
              <th
                className=" p-2 cursor-pointer"
                onClick={() => handleSort("hospital")}
              >
                Hospital <FaSort className="inline ml-2" />
              </th>
              <th className=" p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentRows.map((staff) => (
              <tr key={staff.id} 
              className="even:bg-gray-100 border-t border-gray-200 hover:bg-gray-100"

              >
                <td className=" px-2 py-2">{staff.name}</td>
                <td className=" px-2 py-2">{staff.role}</td>
                <td className=" px-2 hidden md:block">{staff.email}</td>
                <td className=" px-2 py-2">{staff.hospital}</td>
                <td className=" px-2 text-center py-2 space-x-4 flex ">
                  <button
                    className="text-[#356966] hover:text-green-900"
                    onClick={() => handleEditStaff(staff)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 100 100"
                    >
                      <path
                        fill="#356966"
                        d="M28.135 33.154a3.5 3.5 0 0 0-2.668 1.235L.832 63.404c-1.93 2.275-.313 5.767 2.67 5.766l93-.065c2.981-.002 4.595-3.492 2.666-5.765l-20.291-23.9l-4.73 5.244L88.94 62.11l-77.873.053l18.686-22.01H45.71c.418-1.27.788-2.537.98-3.795a43 43 0 0 1 2.164-3.205zM89.91 74.11l-9.178.008l8.211 9.67l-77.875.053l8.22-9.682l-9.188.008L.832 85.08c-1.93 2.274-.313 5.767 2.67 5.766l93-.065c2.981-.002 4.595-3.492 2.666-5.765z"
                        color="#356966"
                      />
                      <path
                        fill="#356966"
                        d="M90.361.872a2.977 2.977 0 0 0-4.209 0l-34.81 34.81c-.29.29-.508.626-.653.985L45.934 53.29c-.218.687.117.98.858.753l16.541-4.732c.359-.145.695-.362.985-.653l34.81-34.81a2.977 2.977 0 0 0 0-4.21zm-7.576 11.786l4.557 4.557l-25.128 25.13l-4.558-4.559z"
                        color="#356966"
                      />
                    </svg>
                  </button>
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleDeleteStaff(staff)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="none"
                        stroke="red"
                        strokeLinecap="round"
                        strokeWidth="1.5"
                        d="M9.17 4a3.001 3.001 0 0 1 5.66 0m5.67 2h-17m14.874 9.4c-.177 2.654-.266 3.981-1.131 4.79s-2.195.81-4.856.81h-.774c-2.66 0-3.99 0-4.856-.81c-.865-.809-.953-2.136-1.13-4.79l-.46-6.9m13.666 0l-.2 3M9.5 11l.5 5m4.5-5l-.5 5"
                      />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div className="flex justify-between items-center mt-4 text-xs">
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <div className="flex space-x-2">
          <button
            className="px-4 py-2 bg-gray-300 rounded-md disabled:opacity-50 hover:bg-gray-400"
            onClick={() => handlePageChange("prev")}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <button
            className="px-4 py-2 bg-[#356966] text-white rounded-md disabled:opacity-50 hover:bg-gray-400"
            onClick={() => handlePageChange("next")}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>

      {showModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen">
            <div className="bg-white w-96 p-6 rounded-lg shadow-lg">
              <h2 className="text-lg font-bold mb-4">
                {editingStaff ? "Edit Staff" : "Add Staff"}
              </h2>
              <input
                type="text"
                placeholder="Name"
                value={newStaff.name || ""}
                onChange={(e) =>
                  setNewStaff({ ...newStaff, name: e.target.value })
                }
                className="w-full mb-2 p-2  rounded"
              />
              <select
                value={newStaff.role || roles[0]}
                onChange={(e) =>
                  setNewStaff({ ...newStaff, role: e.target.value })
                }
                className="w-full mb-2 p-2  rounded"
              >
                {roles.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
              <input
                type="email"
                placeholder="Email"
                value={newStaff.email || ""}
                onChange={(e) =>
                  setNewStaff({ ...newStaff, email: e.target.value })
                }
                className="w-full mb-2 p-2  rounded"
              />
              <input
                type="password"
                placeholder="Password"
                value={newStaff.password || ""}
                onChange={(e) =>
                  setNewStaff({ ...newStaff, password: e.target.value })
                }
                className="w-full mb-2 p-2  rounded"
              />
              <select
                value={newStaff.hospital || hospitals[0]}
                onChange={(e) =>
                  setNewStaff({ ...newStaff, hospital: e.target.value })
                }
                className="w-full mb-4 p-2  rounded"
              >
                {hospitals.map((hospital) => (
                  <option key={hospital} value={hospital}>
                    {hospital}
                  </option>
                ))}
              </select>
              <div className="flex justify-end space-x-2">
                <button
                  className="px-4 py-2 bg-gray-300 rounded-md"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-[#356966] text-white rounded-md"
                  onClick={handleAddOrUpdateStaff}
                >
                  {editingStaff ? "Update" : "Add"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showDeleteModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen">
            <div className="bg-white w-96 p-6 rounded-lg shadow-lg">
              <h2 className="text-lg font-bold mb-4">Confirm Delete</h2>
              <p>Are you sure you want to delete this staff member?</p>
              <div className="flex justify-end space-x-2 mt-4">
                <button
                  className="px-4 py-2 bg-gray-300 rounded-md"
                  onClick={cancelDelete}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-red-500 text-white rounded-md"
                  onClick={confirmDeleteStaff}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StaffManagement;
