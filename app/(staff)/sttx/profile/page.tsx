
"use client";

import { useState, useEffect } from "react";

import Modal from "@/components/PopAlert";
import Loader from "@/utils/loader";
import Link from "next/link";
import staffApi from "@/utils/apiStaff";

const StaffDetails = () => {
  interface Staff {
    staffId: string;
    name: string;
    email: string;
    phoneNumber?: string;
    companyId: string;
    clinicId: string;
    status: string;
    role: string;
    companyName: string;
    clinicName: string;
  }

  const [staff, setStaff] = useState<Staff | null>(null);
  const [passwords, setPasswords] = useState({ current: "", new: "" });
  const [companyId, setCompanyId] = useState<string | null>(null);
  const [staffId, setStaffId] = useState<string | null>(null);
  const [isPasswordModalOpen, setIsPasswordModalOpen] =
    useState<boolean>(false);
  const [alert, setAlert] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  useEffect(() => {
    const storedCompanyId = localStorage.getItem("sttxcm");
    const storedStaffId = localStorage.getItem("sttx");
    setCompanyId(storedCompanyId);
    setStaffId(storedStaffId);
  }, []);

  useEffect(() => {
    if (companyId && staffId) {
      fetchStaffDetails();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [companyId, staffId]);

  const fetchStaffDetails = async () => {
    try {
      const { data } = await staffApi.get(
        `/staff/stxi/${companyId}/${staffId}`
      );
      setStaff(data);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setAlert({ message: "Error fetching staff details", type: "error" });
    }
  };

  const updatePassword = async () => {
    try {
      await staffApi.put(
        `/staff/upd/${companyId}/${staffId}/update-password`,
        {
          currentPassword: passwords.current,
          newPassword: passwords.new,
        }
      );
      setPasswords({ current: "", new: "" });
      setIsPasswordModalOpen(false);
      setAlert({ message: "Password updated successfully", type: "success" });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setAlert({ message: "Error updating password", type: "error" });
    }
  };

  return (
    <div className="poppins-regular px-6 md:px-20 w-full bg-gray-50 h-screen overscroll-y-none overflow-y-hidden">
      {alert && (
        <Modal
          message={alert.message}
          type={alert.type}
          onClose={() => setAlert(null)}
        />
      )}
      <div className="md:hidden flex text-sm items-center opacity-30  mt-2 md:mb-2 overflow-x-auto whitespace-nowrap">
        {/* Fixed Home Link */}
        <Link href="/sttx/addrecord" className="text-gray-900">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
          </svg>
        </Link>

        {/* Divider */}
        <span className="mx-5 text-gray-900">/</span>

        {/* Dynamic Second Link */}
        <h1 className="text-gray-900 hover:underline">Profile</h1>
      </div>
      {staff ? (
        <div className="flex flex-col md:flex-row bg-white w-full mt-4 md:mt-16 space-y-6 md:space-y-0 md:space-x-8 p-8 rounded-xl shadow-lg">
          <div className="w-full md:w-2/5 h-64 rounded-lg shadow-sm border p-4 flex flex-col items-center">
            <div className="w-24 h-24 rounded-full bg-[#356966] text-[#ff8552] flex items-center justify-center text-3xl font-bold">
              <h1>{staff.name.charAt(0).toUpperCase()}</h1>
            </div>
            <div className="flex text-center mt-6 flex-col">
              <h2 className="text-lg font-semibold text-gray-800">
                {staff.name}
              </h2>
              <p className="text-gray-600">{staff.email}</p>
            </div>
          </div>
          <div className="w-full md:w-3/5 text-sm shadow-lg rounded-xl bg-white p-4 md:p-8 flex flex-col space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-800">
                  Phone
                </label>
                <input
                  type="text"
                  value={staff.phoneNumber || "N/A"}
                  className="w-full mt-2 p-2 bg-gray-100 border rounded-lg"
                  readOnly
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-800">
                  Company
                </label>
                <input
                  type="text"
                  value={staff.companyName}
                  className="w-full mt-2 p-2 bg-gray-100 border rounded-lg"
                  readOnly
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-800">
                  Clinic
                </label>
                <input
                  type="text"
                  value={staff.clinicName}
                  className="w-full mt-2 p-2 bg-gray-100 border rounded-lg"
                  readOnly
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-800">
                  Status
                </label>
                <input
                  type="text"
                  value={staff.status}
                  className="w-full mt-2 p-2 bg-gray-100 border rounded-lg"
                  readOnly
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-800">
                  Role
                </label>
                <input
                  type="text"
                  value={staff.role}
                  className="w-full mt-2 p-2 bg-gray-100 border rounded-lg"
                  readOnly
                />
              </div>
            </div>
            <button
              className="bg-[#ff8552] w-44 text-white py-3 px-6 rounded-xl shadow-lg hover:bg-[#e74c3c] mt-6"
              onClick={() => setIsPasswordModalOpen(true)}
            >
              Change Password
            </button>
          </div>
        </div>
      ) : (
        <Loader />
      )}

      {isPasswordModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-2xl shadow-2xl w-[350px] md:w-96">
            <h2 className="text-xl font-medium text-gray-900 mb-4 text-center">
              Change Password
            </h2>
            <input
              type="password"
              placeholder="Current Password"
              className="w-full px-4 py-3 border rounded-lg"
              value={passwords.current}
              onChange={(e) =>
                setPasswords({ ...passwords, current: e.target.value })
              }
            />
            <input
              type="password"
              placeholder="New Password"
              className="w-full px-4 py-3 border rounded-lg mt-4"
              value={passwords.new}
              onChange={(e) =>
                setPasswords({ ...passwords, new: e.target.value })
              }
            />
            <button
              className="w-full py-3 bg-[#356966] text-white rounded-lg mt-4"
              onClick={updatePassword}
            >
              Update Password
            </button>
            <button
              className="w-full py-3 bg-gray-100 text-gray-600 rounded-lg mt-2"
              onClick={() => setIsPasswordModalOpen(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StaffDetails;
