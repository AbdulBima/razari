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
        },
        {
          id: 2,
          hospitalId: "HSP002",
          name: "Accra Specialist Clinic",
          country: "GH",
          state: "Greater Accra",
        },
        {
          id: 3,
          hospitalId: "HSP003",
          name: "Cape Town Medical Center",
          country: "ZA",
          state: "Western Cape",
        },
        {
          id: 4,
          hospitalId: "HSP004",
          name: "Nairobi Regional Hospital",
          country: "KE",
          state: "Nairobi",
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
};

const HospitalManagement = () => {
  const [hospitalList, setHospitalList] = useState<Hospital[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [newHospital, setNewHospital] = useState<Partial<Hospital>>({
    hospitalId: "",
    name: "",
    country: "",
    state: "",
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
        { id: Date.now(), hospitalId, ...newHospital } as Hospital,
      ]);
    }

    setLoading(false);
    setShowModal(false);
    setNewHospital({ hospitalId: "", name: "", country: "", state: "" });
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
      
     <Breadcrumb secondLink = {{href: "/clinics",label: "Clinic Management" }} />

      <div className="mb-4 flex justify-between">
        <button
          className="bg-[#356966] text-white px-4 py-2 mt-2 rounded-lg shadow-md hover:bg-green-700 transition-all"
          onClick={() => setShowModal(true)}
        >
          Add Clinic
        </button>
      </div>

      {loading && (
        <div className="flex justify-center items-center">
          <div className="w-8 h-8 border-4 border-t-4 border-gray-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {/* Only show the table when loading is complete */}
      {!loading && (
        <table className="w-full table-auto text-sm bg-white rounded-lg  shadow-sm">
          <thead>
            <tr className="bg-[#356966] rounded-lg text-white text-left">
              <th
                className="px-4 py-2 hidden md:block cursor-pointer"
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
                className="even:bg-gray-100 border-t border-gray-200 hover:bg-gray-100"
              >
                <td className="px-4 py-2 hidden md:block">{hospital.hospitalId}</td>
                <td className="px-4 py-2">{hospital.name}</td>
                <td className="px-4 py-2 hidden md:block">{hospital.country}</td>
                <td className="px-4 py-2">{hospital.state}</td>
                <td className="px-4 py-2 flex space-x-4 text-left">
                  <button
                    className="text-[#356966] hover:text-green-800 mx-2"
                    onClick={() => setEditingHospital(hospital)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 2048 2048"
                    >
                      <path
                        fill="#356966"
                        d="M1747 290q14 8 23 23t9 32q0 8-2 15t-5 14l-707 1415q-9 19-28 28l-173 87q-32 16-69 16h-9q-4 0-10-1l-47 94q-8 16-23 25t-34 10q-26 0-45-19t-19-45q0-12 7-30t16-37t20-37t15-28q-26-40-26-87v-165q0-16 7-29l576-1152l-65-32l-237 474q-8 16-23 25t-34 10q-26 0-45-19t-19-45q0-13 7-29l239-478q16-32 43-50t63-19q35 0 66 17t62 32l71-142q8-17 23-26t34-9q13 0 22 4q12-24 23-47t26-43t36-30t53-12q32 0 61 15l94 47q32 16 50 42t19 64q0 34-15 63t-30 59m-202-101l87 43l29-58l-87-43zm84 185l-192-96l-669 1337v150q0 11 8 19t19 8q4 0 16-5t29-13t35-17t36-19t30-16t19-10zm163 394q53 0 99 20t82 55t55 81t20 100q0 53-20 99t-55 82t-81 55t-100 20h-288l64-128h224q27 0 50-10t40-27t28-41t10-50q0-27-10-50t-27-40t-41-28t-50-10q-26 0-45-19t-19-45t19-45t45-19M128 1600q0 66 25 124t68 102t102 69t125 25h44q-5 15-8 31t-4 33q0 17 3 33t9 31h-44q-93 0-174-35t-142-96t-96-142t-36-175q0-93 35-174t96-142t142-96t175-36h224l-64 128H448q-66 0-124 25t-102 69t-69 102t-25 124"
                      />
                    </svg>
                  </button>
                  <button
                    className="text-red-600 hover:text-red-800"
                    onClick={() => handleDeleteHospital(hospital)}
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

      <div className="flex justify-between items-center mt-6">
        <span className="text-sm">
          Page {currentPage} of {totalPages}
        </span>
        <div className="flex space-x-4">
          <button
            className={`px-4 py-2 rounded-lg ${
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
            className={`px-4 py-2 rounded-lg ${
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
          <div className="bg-white p-8 rounded-lg shadow-xl w-96">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              {editingHospital ? "Edit Hospital" : "Add Hospital"}
            </h2>
            <div className="mb-4">
              <label className="block text-sm text-gray-600 mb-2">
                Hospital Name
              </label>
              <input
                type="text"
                value={newHospital.name || ""}
                onChange={(e) =>
                  setNewHospital({ ...newHospital, name: e.target.value })
                }
                className="w-full border border-gray-300 p-2 rounded-lg"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm text-gray-600 mb-2">
                Country
              </label>
              <select
                value={newHospital.country}
                onChange={handleCountryChange}
                className="w-full border border-gray-300 p-2 rounded-lg"
              >
                <option value="">Select Country</option>
                {countries.map((country) => (
                  <option key={country.code} value={country.code}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm text-gray-600 mb-2">State</label>
              <select
                value={newHospital.state}
                onChange={handleStateChange}
                className="w-full border border-gray-300 p-2 rounded-lg"
              >
                <option value="">Select State</option>
                {filteredStates.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex justify-end space-x-4">
              <button
                className="bg-gray-500 text-white px-6 py-2 rounded-lg"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-600 text-white px-6 py-2 rounded-lg"
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
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-sm">
            <h2 className="text-lg font-bold text-red-600 mb-4">
              Confirm Deletion
            </h2>
            <p>Are you sure you want to delete {deletingHospital?.name}?</p>
            <div className="flex justify-end mt-4 space-x-4">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded-md"
                onClick={cancelDelete}
              >
                Cancel
              </button>
              <button
                className="bg-red-600 text-white px-4 py-2 rounded-md"
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
