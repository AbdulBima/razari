"use client";

import { FC, useState, useEffect } from "react";
import companyApi from "@/utils/apiCompany";

interface AddStaffModalProps {
  isVisible: boolean;
  onClose: () => void;
  onAddStaff: (staffData: { 
    name: string; 
    email: string; 
    phoneNumber: string;
    role: string; 
    password: string; 
    clinicId: string; 
  }) => void; // Callback function to handle new staff data
}

const ROLE_OPTIONS = [
  { value: "superstaff", label: "Super Staff" },
  { value: "birth officer", label: "Birth Officer" },
  { value: "consultant", label: "Consultant" },
  { value: "admission officer", label: "Admission Officer" },
  { value: "emergency officer", label: "Emergency Officer" },
  { value: "record officer", label: "Record Officer" },
];

const AddStaffModal: FC<AddStaffModalProps> = ({
  isVisible,
  onClose,
  onAddStaff,
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(""); // Added phone number state
  const [role, setRole] = useState(ROLE_OPTIONS[0].value); // Default to first role
  const [password, setPassword] = useState("");
  const [clinics, setClinics] = useState<{ id: string; name: string; clinicId: string }[]>([]);
  const [selectedClinicId, setSelectedClinicId] = useState<string | null>(null);

  // Fetch the clinic list using the companyId stored in localStorage
  useEffect(() => {
    const companyId = localStorage.getItem("cmpx");
    if (!companyId) {
      console.log("Company ID not found in localStorage");
      return;
    }

    companyApi
      .get(`/clinic/${companyId}/clinic-list`)
      .then((response) => {
        setClinics(response.data);
        if (response.data.length > 0) {
          setSelectedClinicId(response.data[0].clinicId); // Default selection
        }
      })
      .catch((error) => console.log("Error fetching clinics:", error));
  }, []);

  const handleSubmit = () => {
    if (!selectedClinicId) {
      alert("Please select a clinic.");
      return;
    }

    const newStaff = { name, email, phoneNumber, role, password, clinicId: selectedClinicId };
    onAddStaff(newStaff); // Send data to the parent component
    onClose(); // Close modal after submission
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-xl w-96">
        <h2 className="text-xl font-semibold">Add New Staff</h2>
        
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
          <label className="block text-sm">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
          />
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
            Add Staff
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddStaffModal;
