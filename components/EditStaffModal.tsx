"use client";

import { FC, useState, useEffect } from "react";
import axios from "axios";

interface EditStaffModalProps {
  isVisible: boolean;
  onClose: () => void;
  staffData: { name: string; email: string; role: string;   phoneNumber: string; clinicId: string }; // Include clinicId here
  onUpdateStaff: (staffData: { name: string; email: string; role: string; clinicId: string; phoneNumber: string; }) => void;
}

const ROLE_OPTIONS = [
  { value: "superstaff", label: "Super Staff" },
  { value: "birth officer", label: "Birth Officer" },
  { value: "consultant", label: "Consultant" },
  { value: "admission officer", label: "Admission Officer" },
  { value: "emergency officer", label: "Emergency Officer" },
  { value: "record officer", label: "Record Officer" },
];

const EditStaffModal: FC<EditStaffModalProps> = ({
  isVisible,
  onClose,
  staffData,
  onUpdateStaff,
}) => {
  const [name, setName] = useState(staffData?.name || "");
  const [email, setEmail] = useState(staffData?.email || "");
  
  const [phoneNumber, setPhoneNumber] = useState(staffData?.phoneNumber || "");
  const [role, setRole] = useState(staffData?.role || ROLE_OPTIONS[0].value); // Default to first role
  const [clinics, setClinics] = useState<{ id: string; name: string; clinicId: string }[]>([]);
  const [selectedClinicId, setSelectedClinicId] = useState(staffData?.clinicId || "");

  // Fetch the clinic list when modal opens
  useEffect(() => {
    const companyId = localStorage.getItem("cmpx");
    if (!companyId) {
      console.log("Company ID not found in localStorage");
      return;
    }

    axios
      .get(`http://127.0.0.1:8000/api/clinic/${companyId}/clinic-list`)
      .then((response) => {
        setClinics(response.data);
        if (response.data.length > 0 && !staffData?.clinicId) {
          setSelectedClinicId(response.data[0].clinicId); // Default selection if staff doesn't have a clinicId
        }
      })
      .catch((error) => console.log("Error fetching clinics:", error));
  }, [staffData]);

  const handleSubmit = () => {
    if (!selectedClinicId) {
      alert("Please select a clinic.");
      return;
    }

    const updatedStaff = { name, email, role, phoneNumber, clinicId: selectedClinicId };
    onUpdateStaff(updatedStaff); // Update staff info
    onClose(); // Close modal after update
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-xl w-96">
        <h2 className="text-xl font-semibold">Edit Staff</h2>
        <div className="mt-4">
          <label className="block text-sm">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>
        <div className="mt-4">
          <label className="block text-sm">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>
        <div className="mt-4">
          <label className="block text-sm">Phone Number</label>
          <input
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>
        <div className="mt-4">
          <label className="block text-sm">Role</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
          >
            {ROLE_OPTIONS.map((r) => (
              <option key={r.value} value={r.value}>
                {r.label}
              </option>
            ))}
          </select>
        </div>
        <div className="mt-4">
          <label className="block text-sm">Clinic</label>
          <select
            value={selectedClinicId || ""}
            onChange={(e) => setSelectedClinicId(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
          >
            {clinics.length > 0 ? (
              clinics.map((clinic) => (
                <option key={clinic.id} value={clinic.clinicId}>
                  {clinic.name}
                </option>
              ))
            ) : (
              <option disabled>No clinics available</option>
            )}
          </select>
        </div>
        <div className="mt-6 flex justify-end space-x-4">
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-[#356966] text-white px-4 py-2 rounded"
            onClick={handleSubmit}
          >
            Update Staff
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditStaffModal;
