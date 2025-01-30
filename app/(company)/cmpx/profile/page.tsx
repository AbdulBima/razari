"use client";

import Breadcrumb from "@/components/navigation/Breadcrumb";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "@/utils/loader";
import Modal from "@/components/PopAlert";

// Define types for company data
type CompanyProfile = {
  companyId: string;
  companyName: string;
  companyEmail: string;
  contactPerson: string;
  cac: string;
  phone: string;
  country: string;
  state: string;
  active: boolean;
  dateCreated: string;
};

type CompanyUpdateRequest = {
  companyName: string;
  companyEmail: string;
  contactPerson: string;
  phone: string;
};

const ModalT: React.FC<{
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  onConfirm: () => void;
  confirmText?: string;
  cancelText?: string;
}> = ({
  title,
  children,
  onClose,
  onConfirm,
  confirmText = "Confirm",
  cancelText = "Cancel",
}) => (
  <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-sm">
      <h2 className="text-lg font-bold mb-4">{title}</h2>
      {children}
      <div className="flex justify-end mt-4">
        <button
          className="bg-gray-500 text-white px-4 py-2 rounded-md mr-2"
          onClick={onClose}
        >
          {cancelText}
        </button>
        <button
          className="bg-[#356966] text-white px-4 py-2 rounded-md"
          onClick={onConfirm}
        >
          {confirmText}
        </button>
      </div>
    </div>
  </div>
);

const CompanyProfileComponent: React.FC = () => {
  const [company, setCompany] = useState<CompanyProfile | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [editedCompany, setEditedCompany] = useState<Partial<CompanyProfile>>(
    {}
  );
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [showApiKeyModal, setShowApiKeyModal] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [showApiKey, setShowApiKey] = useState(false);
  const [modalMessage, setModalMessage] = useState<string>("");
  const [modalType, setModalType] = useState<"success" | "error" | "">(""); 


  // Fetch company data on component mount
useEffect(() => {
  const companyId = localStorage.getItem("cmpx");

  if (companyId) {
    axios
      .get(`http://127.0.0.1:8000/api/company/get/${companyId}`)
      .then((response) => {
        setCompany(response.data); // Set the company data in state
        setEditedCompany({
          companyName: response.data.companyName,
          companyEmail: response.data.companyEmail,
          contactPerson: response.data.contactPerson,
          phone: response.data.phone,
        });
      })
      .catch((error) => {
        console.log(error);
        setModalMessage("Error fetching company data.");
        setModalType("error"); // Show error modal
      });
  }
}, []);


const handleSaveChanges = () => {
  if (
    !editedCompany.companyName ||
    !editedCompany.companyEmail ||
    !editedCompany.contactPerson ||
    !editedCompany.phone
  ) {
    setModalMessage("All fields are required.");
    setModalType("error");
    return;
  }

  const companyId = company?.companyId;
  if (companyId) {
    const updatedData: CompanyUpdateRequest = {
      companyName: editedCompany.companyName || company.companyName,
      companyEmail: editedCompany.companyEmail || company.companyEmail,
      contactPerson: editedCompany.contactPerson || company.contactPerson,
      phone: editedCompany.phone || company.phone,
    };

    axios
      .put(`http://127.0.0.1:8000/api/company/${companyId}/update`, updatedData)
      .then((response) => {
        setModalMessage(response.data.message); // Show success message
        setModalType("success"); // Show success modal
        setCompany({ ...company, ...editedCompany });
        setShowEditModal(false);
      })
      .catch((error) => {
        console.log(error);
        setModalMessage("Error updating company data.");
        setModalType("error"); // Show error modal
      });
  }
};

  const handleChangePassword = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      setModalMessage("All fields are required.");
      setModalType("error"); // Show success modal
      return;
    }

    if (newPassword !== confirmPassword) {
      setModalMessage("New passwords do not match.");
      setModalType("error"); // Show success modal
      return;
    }

    const companyId = company?.companyId;
    if (companyId) {
      // Send password change request to server
      axios
        .post(
          `http://127.0.0.1:8000/api/company/${companyId}/change-password`,
          {
            currentPassword,
            newPassword,
          }
        )
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .then((response) => {
          setModalMessage("Password changed successfully!");
          setModalType("success"); // Show success modal
          setShowPasswordModal(false);
        })
        .catch((error) => {
        
          setModalMessage(error);
          setModalType("success"); // Show success modal
        });
    }
  };

  const fetchApiKey = async () => {
    try {
      const companyId = localStorage.getItem("cmpx");
      if (companyId) {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/company/${companyId}/api-key`
        );
        setApiKey(response.data.apiKey);
        setShowApiKeyModal(true);
      }
    } catch (error) {
      console.error("Error fetching API key:", error);
      
    }
  };


  const maskApiKey = (apiKey: string) => {
    const visibleLength = 4; // Show the first and last 4 characters
    const maskedLength = apiKey.length - visibleLength * 2; // Mask the middle part

    if (maskedLength > 0) {
      return `${apiKey.slice(0, visibleLength)}...${apiKey.slice(
        -visibleLength
      )}`;
    }

    return apiKey; // In case the API key is shorter than the visible part
  };

  if (!company) return <Loader />; // Show loading while data is being fetched

  return (
    <div className="poppins-regular px-6 md:px-16 pt-2 md:pt-0 w-full bg-gray-50 h-full overflow-y-hidden">
      <Breadcrumb secondLink={{ href: "/profile", label: "Company Profile" }} />
      <button
        className="bg-gray-600 hidden md:block text-sm w-full mt-10 md:w-44 text-white py-3 px-6 rounded-xl shadow-lg hover:bg-[#2a4d4d] transition-all duration-300 ease-in-out transform hover:scale-100 hover:shadow-md absolute top-10 right-32"
        onClick={fetchApiKey}
      >
        Show API Key
      </button>
      {/* Profile Card */}
      <div className="flex flex-col md:flex-row bg-white w-full mt-5 md:mt-20  space-y-6 md:space-y-0 md:space-x-8 p-8 rounded-xl shadow-lg">
        <div className="w-full md:w-2/5 h-64 rounded-lg shadow-sm border p-6 flex flex-col items-center">
          <div className="w-24 h-24 rounded-full bg-[#356966] text-[#ff8552] flex items-center justify-center text-3xl font-bold">
            <h1>{company.companyName.charAt(0).toUpperCase()}</h1>
          </div>
          <div className="flex text-center mt-6 flex-col">
            <h2 className="text-lg font-semibold text-gray-800">
              {company.companyName}
            </h2>
            <p className="text-gray-600">{company.companyEmail}</p>
          </div>
        </div>
        <div className="w-full md:w-3/5 text-sm shadow-lg rounded-xl bg-white p-8 flex flex-col space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-800">
                RC Number (CAC)
              </label>
              <input
                type="text"
                value={company.cac}
                className="w-full mt-2 p-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#356966] focus:outline-none"
                readOnly
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-800">
                Contact Person
              </label>
              <input
                type="text"
                value={company.contactPerson}
                className="w-full mt-2 p-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#356966] focus:outline-none"
                readOnly
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-800">
                Phone
              </label>
              <input
                type="tel"
                value={company.phone}
                className="w-full mt-2 p-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#356966] focus:outline-none"
                readOnly
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-800">
                Country
              </label>
              <input
                type="text"
                value={company.country}
                className="w-full mt-2 p-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#356966] focus:outline-none"
                readOnly
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-800">
                State
              </label>
              <input
                type="text"
                value={company.state}
                className="w-full mt-2 p-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#356966] focus:outline-none"
                readOnly
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-800">
                Date Created
              </label>
              <input
                type="text"
                value={new Date(company.dateCreated).toLocaleDateString()}
                className="w-full mt-2 p-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#356966] focus:outline-none"
                readOnly
              />
            </div>
          </div>

          <button
            className="bg-[#356966] text-sm w-full md:w-44 text-white py-3 px-6 rounded-xl shadow-lg hover:bg-[#2a4d4d] transition duration-300 ease-in-out transform hover:scale-105"
            onClick={() => setShowEditModal(true)}
          >
            Edit Details
          </button>
          <button
            className="bg-[#ff8552] text-sm w-full md:w-44 text-white py-3 px-6 rounded-xl shadow-lg hover:bg-[#e74c3c] transition duration-300 ease-in-out transform hover:scale-105"
            onClick={() => setShowPasswordModal(true)}
          >
            Change Password
          </button>
        </div>
      </div>

      {/* Edit Modal */}
      {showEditModal && (
        <ModalT
          title="Edit Company Profile"
          onClose={() => setShowEditModal(false)}
          onConfirm={handleSaveChanges}
          confirmText="Save Changes"
        >
          <div className="mb-6">
            <label className="block mb-2 text-lg font-medium text-gray-700">
              Company Name
            </label>
            <input
              type="text"
              value={editedCompany.companyName || company.companyName}
              onChange={(e) =>
                setEditedCompany({
                  ...editedCompany,
                  companyName: e.target.value,
                })
              }
              className="w-full border text-lg bg-gray-100 text-gray-700 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#356966]"
            />
          </div>

          <div className="mb-6">
            <label className="block mb-2 text-lg font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              value={editedCompany.companyEmail || company.companyEmail}
              onChange={(e) =>
                setEditedCompany({
                  ...editedCompany,
                  companyEmail: e.target.value,
                })
              }
              className="w-full border text-lg bg-gray-100 text-gray-700 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#356966]"
            />
          </div>

          <div className="mb-6">
            <label className="block mb-2 text-lg font-medium text-gray-700">
              Contact Person
            </label>
            <input
              type="text"
              value={editedCompany.contactPerson || company.contactPerson}
              onChange={(e) =>
                setEditedCompany({
                  ...editedCompany,
                  contactPerson: e.target.value,
                })
              }
              className="w-full border text-lg bg-gray-100 text-gray-700 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#356966]"
            />
          </div>

          <div className="mb-6">
            <label className="block mb-2 text-lg font-medium text-gray-700">
              Phone
            </label>
            <input
              type="tel"
              value={editedCompany.phone || company.phone}
              onChange={(e) =>
                setEditedCompany({ ...editedCompany, phone: e.target.value })
              }
              className="w-full border text-lg bg-gray-100 text-gray-700 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#356966]"
            />
          </div>
        </ModalT>
      )}

      {/* Change Password Modal */}
      {showPasswordModal && (
        <ModalT
          title="Change Company Password"
          onClose={() => setShowPasswordModal(false)}
          onConfirm={handleChangePassword}
          confirmText="Change Password"
        >
          <div className="mb-6">
            <label className="block mb-2 text-lg font-medium text-gray-700">
              Current Password
            </label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full border text-lg bg-gray-100 text-gray-700 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#356966]"
            />
          </div>

          <div className="mb-6">
            <label className="block mb-2 text-lg font-medium text-gray-700">
              New Password
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full border text-lg bg-gray-100 text-gray-700 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#356966]"
            />
          </div>

          <div className="mb-6">
            <label className="block mb-2 text-lg font-medium text-gray-700">
              Confirm New Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full border text-lg bg-gray-100 text-gray-700 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#356966]"
            />
          </div>
        </ModalT>
      )}

      {showApiKeyModal && (
        <ModalT
          title="API Key"
          onClose={() => {
            setShowApiKeyModal(false);
            setApiKey(null); // Clear API key on modal close
          }}
          onConfirm={() => setShowApiKeyModal(false)} // Just close the modal
          confirmText="Close"
        >
          <div className="flex items-center justify-between">
            {/* Masked API Key */}
            <input
              type={showApiKey ? "text" : "password"}
              value={apiKey ? maskApiKey(apiKey) : ""}
              readOnly
              className="w-full p-4 bg-gray-100 text-gray-700 border border-gray-300 rounded-lg"
            />
            <div className="ml-4 flex items-center">
              {/* Copy Button */}
              <button
                className="text-blue-500"
                onClick={() => {
                  if (apiKey) {
                    navigator.clipboard
                      .writeText(apiKey)
                      .then(() => {
                        setModalMessage("copied!");
                        setModalType("success"); // Show success modal
                      })
                      .catch((err) => {
                        console.error("Failed to copy API Key:", err);
                      });
                  }
                }}
              >
                {/* Copy Icon (SVG or FontAwesome) */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  viewBox="0 0 24 24"
                >
                  <g fill="none">
                    <path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" />
                    <path
                      fill="#6a6969"
                      d="M19 2a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-2v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h2V4a2 2 0 0 1 2-2zm-9 13H8a1 1 0 0 0-.117 1.993L8 17h2a1 1 0 0 0 .117-1.993zm9-11H9v2h6a2 2 0 0 1 2 2v8h2zm-7 7H8a1 1 0 1 0 0 2h4a1 1 0 1 0 0-2"
                    />
                  </g>
                </svg>
              </button>
            </div>
          </div>
        </ModalT>
      )}

      {modalMessage && modalType && (
  <Modal
    message={modalMessage}
    type={modalType}
    onClose={() => {
      setModalMessage("");
      setModalType(""); // Close the modal by clearing the message and type
    }}
  />
)}

    </div>
  );
};

export default CompanyProfileComponent;
