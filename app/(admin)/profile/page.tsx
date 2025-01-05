"use client";

import Breadcrumb from "@/components/navigation/Breadcrumb";
import React, { useState } from "react";

// Define types for user data
type UserProfile = {
  id: number;
  name: string;
  email: string;
  role: string;
  organization: string;
  phone: string;
};

const Modal: React.FC<{
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  onConfirm: () => void;
  confirmText?: string;
  cancelText?: string;
}> = ({ title, children, onClose, onConfirm, confirmText = "Confirm", cancelText = "Cancel" }) => (
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
          className="bg-green-600 text-white px-4 py-2 rounded-md"
          onClick={onConfirm}
        >
          {confirmText}
        </button>
      </div>
    </div>
  </div>
);

const UserProfileComponent: React.FC = () => {
  const [user, setUser] = useState<UserProfile>({
    id: 1,
    name: "Jane Doe",
    email: "jane.doe@example.com",
    role: "Clinician",
    organization: "Global Health Network",
    phone: "+1234567890",
  });

  const [showEditModal, setShowEditModal] = useState(false);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [showChangePhoneModal, setShowChangePhoneModal] = useState(false);

  const [editedUser, setEditedUser] = useState<Partial<UserProfile>>(user);
  const [passwords, setPasswords] = useState({ oldPassword: "", newPassword: "" });
  const [newPhoneNumber, setNewPhoneNumber] = useState("");

  const handleSavePassword = () => {
    if (!passwords.oldPassword || !passwords.newPassword) {
      alert("Both fields are required.");
      return;
    }
    alert("Password successfully changed!");
    setShowChangePasswordModal(false);
  };

  const handleSavePhone = () => {
    if (!newPhoneNumber) {
      alert("New phone number is required.");
      return;
    }
    setUser({ ...user, phone: newPhoneNumber });
    alert("Phone number successfully updated!");
    setShowChangePhoneModal(false);
  };

  // Split name into first and last name
  const [firstName, lastName] = user.name.split(" ");

  return (
    <div className="poppins-regular text-lg  px-10 md:px-20 pt-4 w-full bg-white h-full overflow-y-auto space-y-6">
   
         
         <Breadcrumb secondLink = {{href: "/profle",label: "Profile" }} />

    {/* Profile Card */}
    <div className="flex flex-col md:flex-row bg-white w-full space-y-6 md:space-y-0 md:space-x-4">
      <div className="w-full md:w-2/5 rounded-lg shadow-sm border p-6 flex flex-col items-center">
        <div className="w-24 h-24 rounded-full bg-[#356966] text-[#ff8552] flex items-center justify-center text-3xl font-bold">
          <h1>
            {user.name
              .split(" ")
              .map((word) => word[0])
              .join("")
              .toUpperCase()}
          </h1>
        </div>
        <div className="flex text-center mt-6 flex-col">
          <h2 className="text-lg font-semibold text-gray-800">{user.name}</h2>
          <p className="text-gray-600">{user.email}</p>
        </div>
      </div>
  
      <div className="w-full md:w-3/5 rounded-lg shadow-sm border p-6 flex flex-col space-y-6">
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6">
          <div className="flex flex-col w-full md:w-1/2">
            <label className="block text-sm font-medium text-gray-700">First Name</label>
            <input
              type="text"
              value={firstName || ""}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none"
              readOnly
            />
          </div>
          <div className="flex flex-col w-full md:w-1/2">
            <label className="block text-sm font-medium text-gray-700">Last Name</label>
            <input
              type="text"
              value={lastName || ""}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none"
              readOnly
            />
          </div>
        </div>
  
        <button
          className="bg-[#356966] text-sm w-full md:w-44 text-white py-2 px-4 rounded-md hover:bg-green-700"
          onClick={() => setShowEditModal(true)}
        >
          Edit Name
        </button>
      </div>
    </div>
  
    {/* Contact Info Card */}
    <div className="border rounded-lg flex flex-col shadow-sm bg-white p-6 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            value={user.email}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none"
            readOnly
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Phone</label>
          <input
            type="tel"
            value={user.phone}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none"
            readOnly
          />
        </div>
      </div>
  
      {/* Actions */}
      <div className="space-y-4 md:space-y-0 w-full md:space-x-6 flex flex-col md:flex-row pt-4">
      <button
          className="bg-[#356966] text-sm w-full md:w-44 text-white py-2 px-4 rounded-md hover:bg-green-700"
           onClick={() => setShowChangePasswordModal(true)}
  >
    Change Password
  </button>
  <button
          className="bg-[#356966] text-sm w-full md:w-44 text-white py-2 px-4 rounded-md hover:bg-green-700"
          onClick={() => setShowChangePhoneModal(true)}
  >
    Change Number
  </button>
</div>

    </div>
  
    {/* Edit Modal */}
    {showEditModal && (
      <Modal
        title="Edit Profile"
        onClose={() => setShowEditModal(false)}
        onConfirm={() => {
          setUser({ ...user, ...editedUser });
          setShowEditModal(false);
        }}
        confirmText="Save Changes"
      >
        <div className="mb-4">
          <label className="block mb-2 text-lg font-medium">Name</label>
          <input
            type="text"
            value={editedUser.name || ""}
            onChange={(e) => setEditedUser({ ...editedUser, name: e.target.value })}
            className="w-full border text-lg border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
      </Modal>
    )}
  
    {/* Change Password Modal */}
    {showChangePasswordModal && (
      <Modal
        title="Change Password"
        onClose={() => setShowChangePasswordModal(false)}
        onConfirm={handleSavePassword}
      >
        <div className="mb-4">
          <label className="block mb-2 text-lg font-medium">Old Password</label>
          <input
            type="password"
            value={passwords.oldPassword}
            onChange={(e) => setPasswords({ ...passwords, oldPassword: e.target.value })}
            className="w-full border text-lg border-gray-300 p-2 rounded-md focus:outline-none"
          />
        </div>
        <div className="mb-4 text-lg">
          <label className="block mb-2 font-medium">New Password</label>
          <input
            type="password"
            value={passwords.newPassword}
            onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
            className="w-full border text-lg border-gray-300 p-2 rounded-md focus:outline-none"
          />
        </div>
      </Modal>
    )}
  
    {/* Change Phone Number Modal */}
    {showChangePhoneModal && (
      <Modal
        title="Change Phone Number"
        onClose={() => setShowChangePhoneModal(false)}
        onConfirm={handleSavePhone}
      >
        <div className="mb-4">
          <label className="block mb-2 text-lg font-medium">New Phone Number</label>
          <input
            type="tel"
            value={newPhoneNumber}
            onChange={(e) => setNewPhoneNumber(e.target.value)}
            className="w-full border text-lg  border-gray-300 p-2 rounded-md focus:outline-none"
          />
        </div>
      </Modal>
    )}
  </div>
  
  );
};

export default UserProfileComponent;
