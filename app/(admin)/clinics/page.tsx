"use client";

import Breadcrumb from "@/components/navigation/Breadcrumb";
import React, { useState, useEffect } from "react";
import { FaSort } from "react-icons/fa";

// Simulating an API call to fetch hospitals
const fetchHospitals = (): Promise<Hospital[]> =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          hospitalId: "HSP001",
          name: "Lagos General Hospital",
          country: "NG",
          state: "Lagos",
          active: true,
        },
        {
          id: 2,
          hospitalId: "HSP002",
          name: "Accra Specialist Clinic",
          country: "GH",
          state: "Greater Accra",
          active: false
        },
        {
          id: 3,
          hospitalId: "HSP003",
          name: "Cape Town Medical Center",
          country: "ZA",
          state: "Western Cape",
          active: false
        },
        {
          id: 4,
          hospitalId: "HSP004",
          name: "Nairobi Regional Hospital",
          country: "KE",
          state: "Nairobi",
          active: false
        },
      ]);
    }, 1000); // Simulate a 1-second delay
  });

// Country and state data (simulated for demonstration)
const countries = [
  { code: "NG", name: "Nigeria", states: ["Lagos", "Abuja", "Kaduna", "Kano"] },
  {
    code: "GH",
    name: "Ghana",
    states: ["Greater Accra", "Ashanti", "Western"],
  },
  {
    code: "ZA",
    name: "South Africa",
    states: ["Western Cape", "KwaZulu-Natal", "Gauteng"],
  },
  { code: "KE", name: "Kenya", states: ["Nairobi", "Mombasa", "Kisumu"] },
];

type Hospital = {
  id: number;
  hospitalId: string;
  name: string;
  country: string;
  state: string;
  active: boolean;
};

const HospitalManagement = () => {
  const [hospitalList, setHospitalList] = useState<Hospital[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [newHospital, setNewHospital] = useState<Partial<Hospital>>({
    hospitalId: "",
    name: "",
    country: "",
    state: "",
    active: true,
  });
  const [editingHospital, setEditingHospital] = useState<Hospital | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletingHospital, setDeletingHospital] = useState<Hospital | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const rowsPerPage = 3;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(hospitalList.length / rowsPerPage);

  useEffect(() => {
    setLoading(true);
    fetchHospitals().then((data) => {
      setHospitalList(data);
      setLoading(false);
    });
  }, []);

  const handleAddOrUpdateHospital = () => {
    const hospitalId = `HSP${Date.now()}`;
    setLoading(true);

    if (editingHospital) {
      setHospitalList((prev) =>
        prev.map((hospital) =>
          hospital.id === editingHospital.id
            ? { ...hospital, ...newHospital }
            : hospital
        )
      );
    } else {
      setHospitalList((prev) => [
        ...prev,
        { id: Date.now(), hospitalId, ...newHospital, active: true } as Hospital,
      ]);
    }

    setLoading(false);
    setShowModal(false);
    setNewHospital({ hospitalId: "", name: "", country: "", state: "", active: true });
    setEditingHospital(null);
  };

  const handleDeleteHospital = (hospital: Hospital) => {
    setDeletingHospital(hospital);
    setShowDeleteModal(true);
  };

  const confirmDeleteHospital = () => {
    if (deletingHospital) {
      setHospitalList((prev) =>
        prev.filter((hospital) => hospital.id !== deletingHospital.id)
      );
      setShowDeleteModal(false);
      setDeletingHospital(null);
    }
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setDeletingHospital(null);
  };

  const handleDeactivateHospital = (hospital: Hospital) => {
    setHospitalList((prev) =>
      prev.map((h) =>
        h.id === hospital.id ? { ...h, active: false } : h
      )
    );
  };

  const handleSort = (key: keyof Hospital) => {
    setHospitalList((prev) => {
      const sortedList = [...prev].sort((a, b) => {
        if (a[key] < b[key]) return -1;
        if (a[key] > b[key]) return 1;
        return 0;
      });
      return sortedList;
    });
  };

  const handlePageChange = (direction: "next" | "prev") => {
    setCurrentPage((prev) =>
      direction === "next"
        ? Math.min(prev + 1, totalPages)
        : Math.max(prev - 1, 1)
    );
  };

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setNewHospital({ ...newHospital, country: e.target.value, state: "" });
  };

  const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setNewHospital({ ...newHospital, state: e.target.value });
  };

  const filteredStates =
    countries.find((c) => c.code === newHospital.country)?.states || [];

  const currentRows = hospitalList.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <div className="poppins-regular px-6 pt-2 w-full bg-gray-50 h-full overflow-y-hidden">
      <Breadcrumb secondLink={{ href: "/clinics", label: "Clinic Management" }} />

      <div className="mb-4 flex justify-between">
        <button
          className="bg-[#356966] text-white px-4 py-2 mt-2 rounded-lg shadow-md hover:bg-green-700 transition-all"
          onClick={() => setShowModal(true)}
        >
          Add Clinic
        </button>
      </div>

      {loading && (
        <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-orange-700"></div>
      </div>
      )}

      {/* Only show the table when loading is complete */}
      {!loading && (
       <div className="overflow-x-auto">
       <table className="w-full table-auto text-sm bg-white rounded-lg shadow-sm">
         <thead>
           <tr className="bg-[#356966] rounded-lg text-white text-left">
             <th
               className="px-4 py-2 hidden text-white md:block cursor-pointer"
               onClick={() => handleSort("hospitalId")}
             >
               Hospital ID <FaSort className="inline ml-2" />
             </th>
             <th
               className="px-4 py-2 cursor-pointer"
               onClick={() => handleSort("name")}
             >
               Name <FaSort className="inline ml-2" />
             </th>
             <th
               className="px-4 hidden md:block py-2 cursor-pointer"
               onClick={() => handleSort("country")}
             >
               Country <FaSort className="inline ml-2" />
             </th>
             <th
               className="px-4 py-2 cursor-pointer"
               onClick={() => handleSort("state")}
             >
               State <FaSort className="inline ml-2" />
             </th>
             <th className="px-4 py-2">Actions</th>
           </tr>
         </thead>
         <tbody>
           {currentRows.map((hospital) => (
             <tr
               key={hospital.id}
               className={`even:bg-gray-50 border-t border-gray-200 hover:bg-gray-50 ${
                 hospital.active ? "" : "bg-gray-100"
               }`}
             >
               <td className="px-4 py-2 hidden md:block">{hospital.hospitalId}</td>
               <td className="px-4 py-2">{hospital.name}</td>
               <td className="px-4 py-2 hidden md:block">{hospital.country}</td>
               <td className="px-4 py-2">{hospital.state}</td>
               <td className="px-4 py-2 flex space-x-4 text-left">
                 <button
                   className="text-[#356966] bg-[#e0f7f3] hover:bg-[#c1d9d2] text-sm py-1 px-2 rounded-xl"
                   onClick={() => setEditingHospital(hospital)}
                 >
                   Edit
                 </button>
     
                 {!hospital.active ? (
                   <span className="text-gray-500 bg-[#f0f0f0] text-sm py-1 px-2 rounded-xl">
                     Deactivated
                   </span>
                 ) : (
                   <button
                     className="text-orange-600 bg-[#ffe6cc] hover:bg-[#ffdb99] text-sm py-1 px-2 rounded-xl"
                     onClick={() => handleDeactivateHospital(hospital)}
                   >
                     Deactivate
                   </button>
                 )}
     
                 <button
                   className="text-red-600 bg-[#fce4e4] hover:bg-[#f8d7da] text-sm py-1 px-2 rounded-xl"
                   onClick={() => handleDeleteHospital(hospital)}
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

      {/* Add/Edit Hospital Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-xl w-96 space-y-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
              {editingHospital ? "Edit Hospital" : "Add Hospital"}
            </h2>
            <div className="mb-6">
              <label className="block text-sm text-gray-600 mb-2">Hospital Name</label>
              <input
                type="text"
                value={newHospital.name || ""}
                onChange={(e) =>
                  setNewHospital({ ...newHospital, name: e.target.value })
                }
                className="w-full border border-gray-300 p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#356966] focus:border-[#356966] transition duration-300"
              />
            </div>
            <div className="mb-6">
              <label className="block text-sm text-gray-600 mb-2">Country</label>
              <select
                value={newHospital.country}
                onChange={handleCountryChange}
                className="w-full border border-gray-300 p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#356966] focus:border-[#356966] transition duration-300"
              >
                <option value="">Select Country</option>
                {countries.map((country) => (
                  <option key={country.code} value={country.code}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-6">
              <label className="block text-sm text-gray-600 mb-2">State</label>
              <select
                value={newHospital.state}
                onChange={handleStateChange}
                className="w-full border border-gray-300 p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#356966] focus:border-[#356966] transition duration-300"
              >
                <option value="">Select State</option>
                {filteredStates.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex justify-end space-x-6 mt-6">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-gray-600 transition duration-200"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="bg-[#356966] text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition duration-200"
                onClick={handleAddOrUpdateHospital}
              >
                {editingHospital ? "Update" : "Add"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-lg w-96 text-sm space-y-4">
            <h2 className="text-lg font-semibold text-red-600 mb-4">
              Confirm Deletion
            </h2>
            <p className="text-gray-700">
              Are you sure you want to delete the hospital{" "}
              <strong>{deletingHospital?.name}</strong>?
            </p>
            <div className="flex justify-end space-x-4 mt-6">
              <button
                className="bg-gray-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-gray-600 transition duration-200"
                onClick={cancelDelete}
              >
                Cancel
              </button>
              <button
                className="bg-red-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-700 transition duration-200"
                onClick={confirmDeleteHospital}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HospitalManagement;
