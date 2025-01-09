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
  isActive: boolean; // New property
};


const hospitals = [
  "Lagos General Hospital",
  "Abuja National Hospital",
  "Accra Specialist Clinic",
  "Cape Town Medical Center",
];

const roles = [
  "Daily Admissions Record Officer",
  "Consultant",
  "Emergency  Record Officer",
  "Death Record Officer",
  "Birth Record Officer",
  "Health Record Officer",
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
          isActive: true, // Set as active initially
        },
        {
          id: 2,
          name: "Dr. Fatima Hassan",
          role: "Health Record Officer",
          email: "fatima.hassan@abujahospital.com",
          password: "children123",
          hospital: "Abuja National Hospital",
          isActive: true, // Set as active initially
        },
        {
          id: 3,
          name: "Dr. Kwame Mensah",
          role: "Neurologist",
          email: "kwame.mensah@accrahospital.com",
          password: "brainy456",
          hospital: "Accra Specialist Clinic",
          isActive: true, // Set as active initially
        },
        {
          id: 4,
          name: "Dr. Zanele Ndlovu",
          role: "Orthopedic Surgeon",
          email: "zanele.ndlovu@capetownmed.com",
          password: "strongbones",
          hospital: "Cape Town Medical Center",
          isActive: true, // Set as active initially
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

  const handleToggleStatus = (staff: Staff) => {
    setStaffList((prev) =>
      prev.map((s) =>
        s.id === staff.id ? { ...s, isActive: !s.isActive } : s
      )
    );
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
       <div className="flex justify-center items-center h-screen">
       <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-orange-700"></div>
     </div>
      ) : (
        <div className="overflow-x-auto">
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
                <td className="px-2 text-center py-2 space-x-4 flex">
  <button
    className="text-[#356966] bg-[#e0f7f3] hover:bg-[#c1d9d2] text-sm py-1 px-2 rounded"
    onClick={() => handleEditStaff(staff)}
  >
    Edit 
  </button>

  <button
    className={`${
      staff.isActive ? "text-green-600 bg-[#e6f7ea]" : "text-gray-400 bg-[#f0f0f0]"
    } hover:bg-green-100 text-sm py-1 px-2 rounded`}
    onClick={() => handleToggleStatus(staff)}
  >
    {staff.isActive ? "Deactivate" : "Activate"}
  </button>

  <button
    className="text-red-500 bg-[#fce4e4] hover:bg-[#f8d7da] text-sm py-1 px-2 rounded"
    onClick={() => handleDeleteStaff(staff)}
  >
    Delete 
  </button>
</td>

              </tr>
            ))}
          </tbody>
        </table>
        </div>
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
      <div className="bg-white w-96 p-8 rounded-lg shadow-lg space-y-4">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          {editingStaff ? "Edit Staff" : "Add Staff"}
        </h2>
        
        <input
          type="text"
          placeholder="Name"
          value={newStaff.name || ""}
          onChange={(e) => setNewStaff({ ...newStaff, name: e.target.value })}
          className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#356966] focus:border-[#356966] transition duration-300"
        />

        <select
          value={newStaff.role || roles[0]}
          onChange={(e) => setNewStaff({ ...newStaff, role: e.target.value })}
          className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#356966] focus:border-[#356966] transition duration-300"
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
          onChange={(e) => setNewStaff({ ...newStaff, email: e.target.value })}
          className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#356966] focus:border-[#356966] transition duration-300"
        />

        <input
          type="password"
          placeholder="Password"
          value={newStaff.password || ""}
          onChange={(e) => setNewStaff({ ...newStaff, password: e.target.value })}
          className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#356966] focus:border-[#356966] transition duration-300"
        />

        <select
          value={newStaff.hospital || hospitals[0]}
          onChange={(e) => setNewStaff({ ...newStaff, hospital: e.target.value })}
          className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#356966] focus:border-[#356966] transition duration-300"
        >
          {hospitals.map((hospital) => (
            <option key={hospital} value={hospital}>
              {hospital}
            </option>
          ))}
        </select>

        <div className="flex justify-end space-x-4 mt-6">
          <button
            className="px-6 py-2 bg-gray-200 text-gray-800 rounded-md font-semibold hover:bg-gray-300 transition duration-200"
            onClick={() => setShowModal(false)}
          >
            Cancel
          </button>
          <button
            className="px-6 py-2 bg-[#356966] text-white rounded-md font-semibold hover:bg-[#2a4d46] transition duration-200"
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
      <div className="bg-white w-96 p-8 rounded-lg shadow-lg space-y-4">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Confirm Delete</h2>
        <p className="text-gray-700">Are you sure you want to delete this staff member?</p>
        <div className="flex justify-end space-x-4 mt-6">
          <button
            className="px-6 py-2 bg-gray-200 text-gray-800 rounded-md font-semibold hover:bg-gray-300 transition duration-200"
            onClick={cancelDelete}
          >
            Cancel
          </button>
          <button
            className="px-6 py-2 bg-red-500 text-white rounded-md font-semibold hover:bg-red-600 transition duration-200"
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
