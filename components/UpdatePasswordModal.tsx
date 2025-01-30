"use client";

import React, { useState } from "react";

type UpdatePasswordModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (staffId: string, newPassword: string) => void;
  onSaveSuccess?: () => void;  // Added onSaveSuccess
  staffId: string | null;
};

const UpdatePasswordModal: React.FC<UpdatePasswordModalProps> = ({
  isOpen,
  onClose,
  onSave,
  onSaveSuccess,  // Added this prop
  staffId,
}) => {
  const [newPassword, setNewPassword] = useState("");

  const handleSave = () => {
    if (staffId && newPassword) {
      onSave(staffId, newPassword);
      setNewPassword(""); // Clear input after saving
      onClose();

      // Call the success callback if it's provided
      if (onSaveSuccess) {
        onSaveSuccess();  // Trigger success notification or other actions
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
          Update Password
        </h2>
        <div className="mb-6">
          <label
            htmlFor="new-password"
            className="block text-sm font-medium text-gray-600 mb-2"
          >
            New Password
          </label>
          <input
            id="new-password"
            type="password"
            className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#356966] focus:border-transparent text-sm text-gray-700"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <div className="flex justify-end space-x-3">
          <button
            className="px-4 py-2 bg-gray-200 text-gray-600 rounded-lg hover:bg-gray-300 transition duration-150"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-[#356966] text-white rounded-lg hover:bg-[#2a544e] transition duration-150"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdatePasswordModal;
