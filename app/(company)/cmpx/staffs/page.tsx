"use client";

import AddStaffModal from "@/components/AddStaffModal";
import DeleteConfirmationModal from "@/components/DeleteConfirmationModal";
import EditStaffModal from "@/components/EditStaffModal";
import Breadcrumb from "@/components/navigation/Breadcrumb";
import {
  createStaff,
  deleteStaff,
  getStaffList,
  updateStaff,
  activateStaff,
  deactivateStaff,
} from "@/services/staffApi";
import { FC, useState, useEffect } from "react";
import axios from "axios"; // Import axios for clinic data fetching
import Loader from "@/utils/loader";
import Modal from "@/components/PopAlert";

const StaffManagement: FC = () => {
  interface Staff {
    staffId: string;
    name: string;
    email: string;
    clinicId: string;
    companyId: string;
    status: string;
    role: string;
    phoneNumber: string;
  }

  interface Clinic {
    clinicId: string;
    name: string;
    country: string;
    state: string;
    status: boolean;
  }

  const [staffList, setStaffList] = useState<Staff[]>([]);
  const [clinics, setClinics] = useState<Clinic[]>([]); // New state to store clinics
  const [modalVisible, setModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [currentStaff, setCurrentStaff] = useState<Staff | null>(null);
  const [staffToDelete, setStaffToDelete] = useState<Staff | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [companyId, setCompanyId] = useState<string | null>(null);
  const [passwordModalVisible, setPasswordModalVisible] = useState(false);
  const [newPassword, setNewPassword] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [notification, setNotification] = useState<{ message: string; type: "success" | "error" } | null>(null);


  useEffect(() => {
    const storedCompanyId = localStorage.getItem("cmpx");
    if (storedCompanyId) {
      setCompanyId(storedCompanyId);
    }
  }, []);

  // Fetch clinics when companyId is available
  useEffect(() => {
    if (companyId) {
      axios
        .get(`http://127.0.0.1:8000/api/clinic/${companyId}/clinic-list`)
        .then((response) => {
          setClinics(response.data);
        })
        .catch((error) => console.log("Error fetching clinics:", error));
    }
  }, [companyId]);

  // Fetch staff list with pagination
  useEffect(() => {
    if (companyId) {
      setLoading(true);
      getStaffList(companyId, (currentPage - 1) * itemsPerPage, itemsPerPage)
        .then((response) => {
          setStaffList(response.data);
        })
        .catch((error) => console.log("Error fetching staff list:", error))
        .finally(() => setLoading(false));
    }
  }, [companyId, currentPage]);

  // Toggle staff status between active and inactive
  const handleToggleStatus = (staff: Staff) => {
    if (companyId) {
      const action =
        staff.status === "active" ? deactivateStaff : activateStaff;
  
      action(companyId, staff.staffId)
        .then(() => {
          setNotification({ message: `${staff.status === "active" ? "Deactivated" : "Activated"} staff successfully!`, type: "success" });
          getStaffList(companyId, (currentPage - 1) * itemsPerPage, itemsPerPage)
            .then((response) => {
              setStaffList(response.data);
            })
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            .catch((error) => {
              setNotification({ message: "Error fetching staff list after status toggle.", type: "error" });
            });
        })
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .catch((error) => {
          setNotification({ message: "Error toggling staff status.", type: "error" });
        });
    }
  };
  
  const handleAddStaff = (staffData: { name: string; email: string; role: string; phoneNumber: string; password: string; clinicId: string; }) => {
    if (companyId) {
      createStaff(companyId, staffData)
        .then(() => {
          setNotification({ message: "Staff added successfully!", type: "success" });
          // Refetch staff list after adding staff
          getStaffList(companyId, (currentPage - 1) * itemsPerPage, itemsPerPage)
            .then((response) => {
              setStaffList(response.data);
            })
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            .catch((error) => {
              setNotification({ message: "Error fetching staff list after adding.", type: "error" });
            });
        })
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .catch((error) => {
          setNotification({ message: "Error adding staff.", type: "error" });
        });
    }
  };
  

  const handleUpdateStaff = (updatedData: { name: string; email: string; role: string; clinicId: string; phoneNumber: string; }) => {
    if (companyId && currentStaff) {
      updateStaff(companyId, currentStaff.staffId, updatedData)
        .then(() => {
          setNotification({ message: "Staff updated successfully!", type: "success" });
          getStaffList(companyId, (currentPage - 1) * itemsPerPage, itemsPerPage)
            .then((response) => {
              setStaffList(response.data);
            })
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            .catch((error) => {
              setNotification({ message: "Error fetching staff list after updating.", type: "error" });
            });
        })
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .catch((error) => {
          setNotification({ message: "Error updating staff.", type: "error" });
        });
    }
  };
  

  const handleDeleteStaff = () => {
    if (companyId && staffToDelete) {
      deleteStaff(companyId, staffToDelete.staffId)
        .then(() => {
          setNotification({ message: "Staff deleted successfully!", type: "success" });
          getStaffList(companyId, (currentPage - 1) * itemsPerPage, itemsPerPage)
            .then((response) => {
              setStaffList(response.data);
              setDeleteModalVisible(false);
            })
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            .catch((error) => {
              setNotification({ message: "Error fetching staff list after deleting.", type: "error" });
            });
        })
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .catch((error) => {
          setNotification({ message: "Error deleting staff.", type: "error" });
        });
    }
  };
  

const handleChangePassword = () => {
  if (companyId && currentStaff && newPassword) {
    const passwordData = { newPassword };

    axios
      .put(`http://127.0.0.1:8000/api/staff/${companyId}/${currentStaff.staffId}/update-password`, passwordData)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .then((response) => {
        setNotification({ message: "Password updated successfully!", type: "success" });
        setPasswordModalVisible(false);
        setNewPassword(""); // Clear the input field
      })
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .catch((error) => {
        setNotification({ message: "Failed to update password.", type: "error" });
      });
  } else {
    setNotification({ message: "Please provide a new password.", type: "error" });
  }
};


  const sortedStaffList = [...staffList].sort((a, b) => {
    if (!sortField) return 0;

    const fieldA = a[sortField as keyof Staff].toLowerCase();
    const fieldB = b[sortField as keyof Staff].toLowerCase();

    if (fieldA < fieldB) return sortOrder === "asc" ? -1 : 1;
    if (fieldA > fieldB) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  // Function to get clinic name by clinicId
  const getClinicNameById = (clinicId: string): string => {
    const clinic = clinics.find((clinic) => clinic.clinicId === clinicId);
    return clinic ? clinic.name : "Unknown Clinic"; // Return "Unknown Clinic" if not found
  };

  return (
    <div className="poppins-regular  px-6  pt-2 md:pt-0 w-full bg-gray-50 h-full overflow-y-hidden">
      <Breadcrumb
        secondLink={{ href: "/clinics", label: "Staff Management" }}
      />
      <div className="mb-4 flex flex-wrap items-center mt-4 justify-between">
        {/* Sorting Buttons */}
        <div className="hidden text-gray-500 md:flex items-center space-x-4">
          <h1>Sort by:</h1>
          <button
            className={`px-4 py-1 rounded-lg shadow-sm ${
              sortField === "name" ? "bg-orange-800 text-white" : "bg-gray-300"
            }`}
            onClick={() => {
              setSortField("name");
              setSortOrder(sortOrder === "asc" ? "desc" : "asc");
            }}
          >
            Name
          </button>
          <button
            className={`px-4 py-1 rounded-lg shadow-sm ${
              sortField === "role" ? "bg-orange-500 text-white" : "bg-gray-300"
            }`}
            onClick={() => {
              setSortField("role");
              setSortOrder(sortOrder === "asc" ? "desc" : "asc");
            }}
          >
            Role
          </button>
        </div>

        {/* Mobile Sorting Dropdown */}
        <div className="block md:hidden ">
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
            <option value="role-asc">Role (Asc)</option>
            <option value="role-desc">Role (Desc)</option>
          </select>
        </div>

        {/* Add Staff Button */}
        <button
          className="bg-[#356966] text-white px-3 py-1.5 mt-2 rounded-lg shadow-md hover:bg-green-700 transition-all"
          onClick={() => setModalVisible(true)}
        >
          Add Staff
        </button>
      </div>

      {loading && <Loader />}

      <DeleteConfirmationModal
        isVisible={deleteModalVisible}
        onClose={() => setDeleteModalVisible(false)}
        onConfirmDelete={handleDeleteStaff}
        staffName={staffToDelete?.name || ""}
      />

{notification && (
  <Modal
    message={notification.message}
    type={notification.type}
    onClose={() => setNotification(null)} // Close after 3 seconds
  />
)}


      {!loading && staffList.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full  text-xs table-auto  bg-white rounded-lg shadow-sm">
            <thead>
              <tr className="bg-[#356966] text-white text-left">
                <th className="px-3 py-1.5">Staff ID</th>
                <th className="px-3 py-1.5">Name</th>
                <th className="px-3 py-1.5">Contact</th>
                <th className="px-3 py-1.5">Email</th>
                <th className="px-3 py-1.5">Hospital</th>
                <th className="px-3 py-1.5">Role</th>
                <th className="px-3 py-1.5">Status</th>
                <th className="px-3 py-1.5">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedStaffList.map((staff) => (
                <tr
                  key={staff.staffId}
                  className="border-t whitespace-nowrap border-gray-200 hover:bg-gray-50 odd:bg-gray-100 even:bg-white"
                >
                  <td className="px-3 py-1.5 uppercase">{staff.staffId}</td>
                  <td className="px-3 py-1.5">{staff.name}</td>
                  <td className="px-3 py-1.5">{staff.phoneNumber ?? "N/A"}</td>

                  <td className="px-3 py-1.5">{staff.email}</td>
                  <td className="px-3 py-1.5">
                    {getClinicNameById(staff.clinicId)}
                  </td>
                  <td className="px-3 py-1.5 uppercase">{staff.role}</td>
                  <td className="px-3 py-1.5">
                    <span
                      className={`py-1 px-2 rounded-lg cursor-pointer transition-all duration-200 ${
                        staff.status === "active"
                          ? "text-white bg-[#ff761bde] hover:bg-[#FF9F3D] hover:shadow-md"
                          : "text-white bg-[#6FBF73] hover:bg-[#5DAA64] hover:shadow-md"
                      }`}
                      onClick={() => handleToggleStatus(staff)}
                    >
                      {staff.status === "active" ? "Deactivate" : "Activate"}
                    </span>
                  </td>
                  <td className="px-3 py-1.5 text-xs flex space-x-4">
                    <button
                      className="text-[#2C5D56] bg-[#e4f1f0] py-1 px-2 rounded-lg hover:bg-[#d1e6e2] hover:shadow-md transition-all duration-200"
                      onClick={() => {
                        setCurrentStaff(staff);
                        setEditModalVisible(true);
                      }}
                    >
                      Edit
                    </button>

                    <button
                      className="text-[#2C5D56] bg-[#e4f1f0] py-1 px-2 rounded-lg hover:bg-[#d1e6e2] hover:shadow-md transition-all duration-200"
                      onClick={() => {
                        setCurrentStaff(staff);
                        setPasswordModalVisible(true);
                      }}
                    >
                      Change Password
                    </button>

                    <button
                      className="text-[#9B3D3D] bg-[#F9D9D9] py-1 px-2 rounded-lg hover:bg-[#F5C5C5] hover:shadow-md transition-all duration-200"
                      onClick={() => {
                        setStaffToDelete(staff);
                        setDeleteModalVisible(true);
                      }}
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

      <div className="flex justify-between text-sm items-center mt-4">
        {/* Page Indicator on the Left */}
        <span className="text-gray-700 font-normal">Page {currentPage}</span>

        {/* Pagination Buttons on the Right */}
        <div className="flex space-x-4">
          <button
            className="bg-gray-300 px-2.5 py-1 rounded-lg disabled:opacity-50"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Previous
          </button>
          <button
            className="bg-gray-300 px-2.5 py-1 rounded-lg"
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next
          </button>
        </div>
      </div>

      {modalVisible && (
        <AddStaffModal
          isVisible={modalVisible}
          onClose={() => setModalVisible(false)}
          onAddStaff={handleAddStaff}
        />
      )}
      {editModalVisible && (
        <EditStaffModal
          isVisible={editModalVisible}
          onClose={() => setEditModalVisible(false)}
          staffData={
            currentStaff || { name: "", email: "", role: "", clinicId: "", phoneNumber: "" }
          }
          onUpdateStaff={handleUpdateStaff}
        />
      )}

      {passwordModalVisible && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-70 z-50">
          <div className="bg-white text-gray-900 p-8 rounded-xl shadow-2xl w-96 max-w-lg">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">
              Change Password
            </h2>
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full p-4 bg-gray-50 border border-gray-300 rounded-xl text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-[#356966] focus:border-[#356966] transition duration-300"
            />
            <div className="mt-8 flex justify-end space-x-4">
              <button
                className="bg-gray-300 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-400 transition"
                onClick={() => setPasswordModalVisible(false)}
              >
                Cancel
              </button>
              <button
                className="bg-[#356966] text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
                onClick={handleChangePassword}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StaffManagement;
