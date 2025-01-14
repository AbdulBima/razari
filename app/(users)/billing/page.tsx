"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Import Next.js router
import Breadcrumb from "@/components/navigation/Breadcrumb";

const Billing = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  interface BillingRecord {
    date: string;
    orderType: string;
    amount: string;
    status: string;
  }

  const [billingData, setBillingData] = useState<BillingRecord[]>([]);
  interface PlanData {
    planName: string;
    status: string;
    expiryDate: string;
  }

  const [planData, setPlanData] = useState<PlanData | null>(null);

  const recordsPerPage = 5; // Number of records per page
  const totalRecords = 20; // Total records to simulate
  const router = useRouter();

  useEffect(() => {
    // Simulate an API call
    setTimeout(() => {
      const fetchedData = [
        {
          date: "2025-01-06",
          orderType: "Subscription",
          amount: "$49.99",
          status: "Paid",
        },
        {
          date: "2025-01-05",
          orderType: "Upgrade",
          amount: "$99.99",
          status: "Paid",
        },
        // More mock records can be added here
      ];

      const fetchedPlanData = {
        planName: "Pro Annual",
        status: "Active",
        expiryDate: "2025-12-31",
      };

      setBillingData(fetchedData);
      setPlanData(fetchedPlanData);
      setIsLoading(false);
    }, 2000); // Simulate API delay (2 seconds)
  }, []);

  // Logic for pagination
  const totalPages = Math.ceil(totalRecords / recordsPerPage);
  const currentRecords = billingData.slice(
    (currentPage - 1) * recordsPerPage,
    currentPage * recordsPerPage
  );

  const handleDownloadReceipt = () => {
    // This is a placeholder logic for downloading the receipt
    alert("Receipt downloaded!");
  };

  const handlePageChange = (action: "prev" | "next") => {
    if (action === "prev" && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    } else if (action === "next" && currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Handle redirect to subscription page
  const handleNewSubscription = () => {
    router.push("/subscription"); // Redirect to subscription page (change path if needed)
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-orange-700"></div>
      </div>
    );
  }

  return (
    <>
      <div className="poppins-regular hidden md:flex flex-col md:flex-row w-full py-10 px-8">
     

        {/* Billing Section */}
        <div className="flex-1 pr-10">
          <h1 className="text-2xl text-black font-bold mb-2">
            Billing Details
          </h1>
          <p className="text-sm text-gray-700 mb-6">
            View your order history, download receipts, and manage your billing
            preferences.
          </p>

          {/* Table with scrollable overflow on mobile */}
          <div className="overflow-x-auto mb-6">
            <table className="w-full table-auto bg-white text-white text-left">
              <thead>
                <tr className="bg-[#356966]">
                  <th className="px-4 py-2 text-xs">Date</th>
                  <th className="px-4 py-2 text-xs">Order Type</th>
                  <th className="px-4 py-2 text-xs">Amount</th>
                  <th className="px-4 py-2 text-xs">Status</th>
                  <th className="px-4 py-2 text-xs">Action</th>
                </tr>
              </thead>
              <tbody>
                {currentRecords.map((record, index) => (
                  <tr
                    key={index}
                    className={`even:bg-white text-gray-900 odd:bg-[#f9f9f9] shadow-lg rounded-lg mb-4`}
                  >
                    <td className="px-4 py-3 text-xs">{record.date}</td>
                    <td className="px-4 py-3 text-xs">{record.orderType}</td>
                    <td className="px-4 py-3 text-xs">{record.amount}</td>
                    <td className="px-4 py-3 text-xs">{record.status}</td>
                    <td className="px-4 py-3 text-xs">
                      <button
                        onClick={handleDownloadReceipt}
                        className=" px-4 py-2 rounded border text-gray-900 text-xs"
                      >
                        Download
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-between items-center mt-4 text-xs">
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <div className="flex space-x-2">
              <button
                className="px-4 py-2 bg-gray-300 rounded-md disabled:opacity-50 hover:bg-gray-400 text-xs"
                onClick={() => handlePageChange("prev")}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <button
                className="px-4 py-2 bg-[#356966] text-white rounded-md disabled:opacity-50 hover:bg-gray-400 text-xs"
                onClick={() => handlePageChange("next")}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </div>

          {/* Button to Start New Subscription */}
          <div className="mt-6">
            <button
              onClick={handleNewSubscription}
              className="bg-orange-700 text-white py-2 px-4 rounded text-sm"
            >
              New Subscription
            </button>
          </div>
        </div>

           {/* Sidebar Section (on mobile, above the table) */}
           <div className="w-full md:w-1/3 bg-orange-700 rounded-3xl shadow-lg text-white p-6 mb-6 md:mb-0">
          <h2 className="text-xl font-bold mb-4">Current Active Plan</h2>
          <div className="mb-6">
            <p className="text-lg">Plan: {planData?.planName}</p>
            <p className="text-lg">Status: {planData?.status}</p>
            <p className="text-lg">Expiry Date: {planData?.expiryDate}</p>
          </div>
          <p className="text-sm">
            You are currently on the {planData?.planName} Plan. Your
            subscription will renew on the date specified above. Thank you for
            being a loyal member!
          </p>
        </div>
      </div>
      <div className="poppins-regular md:hidden flex flex-col md:flex-row w-full py-10 px-8">
      <Breadcrumb secondLink = {{href: "/billing",label: "Billing" }} />

        {/* Sidebar Section (on mobile, above the table) */}
        <div className="w-full md:w-1/3 bg-orange-700 rounded-3xl shadow-lg text-white p-6 mb-6 md:mb-0">
          <h2 className="text-xl font-bold mb-4">Current Active Plan</h2>
          <div className="mb-6">
            <p className="text-lg">Plan: {planData?.planName}</p>
            <p className="text-lg">Status: {planData?.status}</p>
            <p className="text-lg">Expiry Date: {planData?.expiryDate}</p>
          </div>
          <p className="text-sm">
            You are currently on the {planData?.planName} Plan. Your
            subscription will renew on the date specified above. Thank you for
            being a loyal member!
          </p>
        </div>

        {/* Billing Section */}
        <div className="flex-1 mt-6  ">
        

          {/* Table with scrollable overflow on mobile */}
          <div className="overflow-x-auto mb-6">
            <table className="w-full table-auto bg-white text-white text-left">
              <thead>
                <tr className="bg-[#356966]">
                  <th className="px-4 py-2 text-xs">Date</th>
                  <th className="px-4 py-2 text-xs">Order Type</th>
                  <th className="px-4 py-2 text-xs">Amount</th>
                  <th className="px-4 py-2 text-xs">Status</th>
                  <th className="px-4 py-2 text-xs">Action</th>
                </tr>
              </thead>
              <tbody>
                {currentRecords.map((record, index) => (
                  <tr
                    key={index}
                    className={`even:bg-white text-gray-900 odd:bg-[#f9f9f9] shadow-lg rounded-lg mb-4`}
                  >
                    <td className="px-4 py-3 text-xs">{record.date}</td>
                    <td className="px-4 py-3 text-xs">{record.orderType}</td>
                    <td className="px-4 py-3 text-xs">{record.amount}</td>
                    <td className="px-4 py-3 text-xs">{record.status}</td>
                    <td className="px-4 py-3 text-xs">
                      <button
                        onClick={handleDownloadReceipt}
                        className=" px-4 py-2 rounded border text-gray-900 text-xs"
                      >
                        Download
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-between items-center mt-4 text-xs">
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <div className="flex space-x-2">
              <button
                className="px-4 py-2 bg-gray-300 rounded-md disabled:opacity-50 hover:bg-gray-400 text-xs"
                onClick={() => handlePageChange("prev")}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <button
                className="px-4 py-2 bg-[#356966] text-white rounded-md disabled:opacity-50 hover:bg-gray-400 text-xs"
                onClick={() => handlePageChange("next")}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </div>

          {/* Button to Start New Subscription */}
          <div className="mt-6">
            <button
              onClick={handleNewSubscription}
              className="bg-orange-700 text-white py-2 px-4 rounded text-sm"
            >
              New Subscription
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Billing;
