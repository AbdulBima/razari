"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import Breadcrumb from "@/components/navigation/Breadcrumb";
import Modal from "@/components/PopAlert";
import ConfirmationModal from "@/utils/ConfirmationModal";

const states = [
  "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue",
  "Borno", "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu", 
  "Gombe", "Imo", "Jigawa", "Kaduna", "Kano", "Katsina", "Kebbi", "Kogi", 
  "Kwara", "Lagos", "Nasarawa", "Niger", "Ogun", "Ondo", "Osun", "Oyo", 
  "Plateau", "Rivers", "Sokoto", "Taraba", "Yobe", "Zamfara", "FCT"
];

type Hospital = {
  id: number;
  clinicId: string;
  name: string;
  country: string;
  state: string;
  status: boolean;
};

const HospitalManagement = () => {
  const [hospitalList, setHospitalList] = useState<Hospital[]>([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [confirmationModalVisible, setConfirmationModalVisible] = useState(false);
  const [selectedHospitalId, setSelectedHospitalId] = useState<string | null>(null);
  const [modalType, setModalType] = useState<"success" | "error">("success");
  const [newHospital, setNewHospital] = useState<Partial<Hospital>>({
    clinicId: "",
    name: "",
    country: "Nigeria",
    state: "",
  });
  const [editingHospital, setEditingHospital] = useState<Hospital | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const rowsPerPage = 5;


  // Handle delete with confirmation
  const confirmDeleteHospital = (id: string) => {
    setSelectedHospitalId(id);
    setConfirmationModalVisible(true);
  };

  const companyId = localStorage.getItem("cmpx") || "";

  useEffect(() => {
    fetchHospitals(currentPage, rowsPerPage);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, sortField, sortOrder]);

  const fetchHospitals = async (page: number, limit: number) => {
    setLoading(true);
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/clinic/${companyId}/clinic-list`, {
        params: { page, limit, sortField, sortOrder },
        headers: { "X-Company-Id": companyId },
      });
      setHospitalList(response.data);
    } catch (error) {
      showNotification("Error fetching hospitals", "error");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const showNotification = (message: string, type: "success" | "error") => {
    setModalMessage(message);
    setModalType(type);
    setModalVisible(true);
    setTimeout(() => setModalVisible(false), 3000); // Auto-hide after 3 seconds
  };

  const handleAddOrUpdateHospital = async () => {
    try {
      setLoading(true);
      if (editingHospital) {
        await axios.put(`http://127.0.0.1:8000/api/clinic/${companyId}/${editingHospital.clinicId}/update`, {
          name: newHospital.name,
          country: newHospital.country,
          state: newHospital.state,
        });
        showNotification("Hospital updated successfully", "success");
      } else {
        await axios.post(`http://127.0.0.1:8000/api/clinic/${companyId}/create`, {
          name: newHospital.name,
          country: newHospital.country,
          state: newHospital.state,
        });
        showNotification("Hospital added successfully", "success");
      }
      fetchHospitals(currentPage, rowsPerPage);
      setShowModal(false);
      setNewHospital({ clinicId: "", name: "", country: "Nigeria", state: "" });
      setEditingHospital(null);
    } catch (error) {
      showNotification("Error saving hospital", "error");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (!selectedHospitalId) return;

    try {
      setLoading(true);
      await axios.delete(`http://127.0.0.1:8000/api/clinic/${companyId}/delete/${selectedHospitalId}`);
      fetchHospitals(currentPage, rowsPerPage);
      showNotification("Hospital deleted successfully", "success");
    } catch (error) {
      showNotification("Error deleting hospital", "error");
      console.log(error);
    } finally {
      setLoading(false);
      setConfirmationModalVisible(false);
      setSelectedHospitalId(null);
    }
  };

  const handleToggleHospitalStatus = async (id: string, isActive: boolean) => {
    try {
      setLoading(true);
      const endpoint = isActive
        ? `http://127.0.0.1:8000/api/clinic/${companyId}/${id}/deactivate`
        : `http://127.0.0.1:8000/api/clinic/${companyId}/${id}/activate`;
  
      await axios.patch(endpoint);
      fetchHospitals(currentPage, rowsPerPage);
      showNotification(
        `Hospital ${isActive ? "deactivated" : "activated"} successfully`,
        "success"
      );
    } catch (error) {
      showNotification(`Error ${isActive ? "deactivating" : "activating"} hospital`, "error");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (direction: "next" | "prev") => {
    setCurrentPage((prev) =>
      direction === "next" ? prev + 1 : Math.max(prev - 1, 1)
    );
  };

  return (
    <div className="poppins-regular px-6 md:px-10 pt-2 md:pt-0 w-full bg-gray-50 h-full overflow-y-hidden">
      <Breadcrumb secondLink={{ href: "/clinics", label: "Hospital(s) Management" }} />
      {modalVisible && (
        <Modal
          message={modalMessage}
          type={modalType}
          onClose={() => setModalVisible(false)}
        />
      )}
      <div className="mb-4 flex flex-wrap items-center mt-4 justify-between">
  <div className="hidden text-gray-500 md:flex items-center space-x-4 ">

    <h1> Sort by: </h1>
    <button
      className={`px-4 py-1 rounded-lg shadow-sm ${sortField === "name" ? "bg-orange-800 text-white" : "bg-gray-300"}`}
      onClick={() => {
        setSortField("name");
        setSortOrder(sortOrder === "asc" ? "desc" : "asc");
      }}
    >
      Name
    </button>
    <button
      className={`px-4 py-1 rounded-lg shadow-sm ${sortField === "state" ? "bg-orange-500 text-white" : "bg-gray-300"}`}
      onClick={() => {
        setSortField("state");
        setSortOrder(sortOrder === "asc" ? "desc" : "asc");
      }}
    >
      State
    </button>
  </div>
  <div className="block md:hidden mb-2">
    <select
      className="w-full border border-gray-300 p-2 rounded"
      onChange={(e) => {
        const [field, order] = e.target.value.split("-");
        setSortField(field);
        setSortOrder(order as "asc" | "desc");
      }}
    >
      <option value="name-asc">Name (Asc)</option>
      <option value="name-desc">Name (Desc)</option>
      <option value="state-asc">State (Asc)</option>
      <option value="state-desc">State (Desc)</option>
    </select>
  </div>
  <div className=" flex justify-end mb-2">
    <button
      className="bg-[#356966] text-white px-3 py-1.5 mt-2 rounded-lg shadow-md hover:bg-green-700 transition-all"
      onClick={() => {
        setShowModal(true);
        setNewHospital({ clinicId: "", name: "", country: "Nigeria", state: "" });
        setEditingHospital(null);
      }}
    >
      Add Clinic
    </button>
  </div>
</div>


      {loading && (
        <div className="flex justify-center items-center h-96">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-orange-700"></div>
        </div>
      )}

       {/* Confirmation Modal */}
       <ConfirmationModal
        isVisible={confirmationModalVisible}
        message="Are you sure you want to delete this hospital? This action cannot be undone."
        onConfirm={handleConfirmDelete}
        onCancel={() => setConfirmationModalVisible(false)}
      />

      {!loading && hospitalList.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full table-auto text-sm bg-white rounded-lg shadow-sm">
            <thead>
              <tr className="bg-[#356966] text-white text-left">
                <th className="px-3 py-1.5 hidden md:block">Hospital ID</th>
                <th className="px-3 py-1.5">Name</th>
                <th className="px-3 py-1.5">State</th>
                <th className="px-3 py-1.5">Actions</th>
              </tr>
            </thead>
            <tbody>
  {hospitalList.map((hospital) => (
    <tr key={hospital.id} className="border-t border-gray-200 hover:bg-gray-50 odd:bg-gray-100 even:bg-white">
      <td className="px-3 py-1.5 hidden uppercase md:block">{hospital.clinicId}</td>
      <td className="px-3 py-1.5">{hospital.name}</td>
      <td className="px-3 py-1.5">{hospital.state}</td>
      <td className="px-3 py-1.5 flex space-x-4">
        <button
          className="text-[#356966] bg-[#e0f7f3] text-sm py-1 px-2 rounded-xl"
          onClick={() => {
            setEditingHospital(hospital);
            setNewHospital(hospital);
            setShowModal(true);
          }}
        >
          Edit
        </button>
        <button
          className={`text-sm py-1 px-2 rounded-xl ${
            hospital.status ? "text-orange-600 bg-[#ffe6cc]" : "text-green-600 bg-[#e6ffe6]"
          }`}
          onClick={() => handleToggleHospitalStatus(hospital.clinicId, hospital.status)}
        >
          {hospital.status ? "Deactivate" : "Activate"}
        </button>
        <button
              className="text-red-600 bg-[#fce4e4] text-sm py-1 px-2 rounded-xl"
              onClick={() => confirmDeleteHospital(hospital.clinicId)}
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

      <div className="flex justify-between text-sm items-center mt-6">
        <span className="text-sm">
          Page {currentPage}
        </span>
        <div className="flex space-x-4">
          <button
            className={`px-2 py-1 rounded-lg ${currentPage === 1 ? "bg-gray-200" : "bg-gray-300 text-white"}`}
            onClick={() => handlePageChange("prev")}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <button
            className={`px-2 py-1 rounded-lg ${currentPage >= hospitalList.length / rowsPerPage ? "bg-gray-300" : "bg-[#356966] text-white"}`}
            onClick={() => handlePageChange("next")}
            disabled={currentPage >= hospitalList.length / rowsPerPage}
          >
            Next
          </button>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-xl w-96 space-y-6">
            <h2 className="text-xl font-semibold">
              {editingHospital ? "Edit Hospital" : "Add Hospital"}
            </h2>
            <div>
              <label className="block text-sm">Hospital Name</label>
              <input
                type="text"
                value={newHospital.name || ""}
                onChange={(e) => setNewHospital({ ...newHospital, name: e.target.value })}
                className="w-full border border-gray-300 p-2 rounded"
              />
            </div>
            <div>
              <label className="block text-sm">State</label>
              <select
                value={newHospital.state}
                onChange={(e) => setNewHospital({ ...newHospital, state: e.target.value })}
                className="w-full border border-gray-300 p-2 rounded"
              >
                <option value="">Select State</option>
                {states.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex justify-end space-x-4">
              <button
                className="bg-gray-500 text-white px-3 py-1.5 rounded"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="bg-[#356966] text-white px-3 py-1.5 rounded"
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
