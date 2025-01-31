"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import Breadcrumb from "@/components/navigation/Breadcrumb";

const Billing = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [billingData, setBillingData] = useState<BillingRecord[]>([]);
  const [planData, setPlanData] = useState<PlanData | null>(null);
  const [totalRecords, setTotalRecords] = useState(0);

  interface BillingRecord {
    date: string;
    amount: string;
    status: string;
    billingCycle: string;
    startDate: string;
    endDate: string;
  }

  interface PlanData {
    planName: string;
    status: string;
    expiryDate: string;
  }

  const recordsPerPage = 5;
  useEffect(() => {
    const fetchBillingData = async () => {
      try {
        const companyId = localStorage.getItem("cmpx");
        if (!companyId) {
          console.log("No company ID found in localStorage");
          setIsLoading(false);
          return;
        }
  
        const skip = (currentPage - 1) * recordsPerPage;
  
        const { data } = await axios.get(
          `http://localhost:8000/api/billing/${companyId}/billing-records?skip=${skip}&limit=${recordsPerPage}`
        );
  
        setBillingData(data.billingRecords);
        setTotalRecords(data.totalRecords);  // Set total record count from API response
  
        if (data.billingRecords.length > 0) {
          const latestPlan = data.billingRecords[0];
          setPlanData({
            planName: latestPlan.billingCycle,
            status: latestPlan.status,
            expiryDate: latestPlan.endDate,
          });
        }
      } catch (error) {
        console.log("Error fetching billing data:", error);
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchBillingData();
  }, [currentPage]);
  
  const totalPages = Math.ceil(totalRecords / recordsPerPage);


  const handlePageChange = (action: "prev" | "next") => {
    if (action === "prev" && currentPage > 1) setCurrentPage(currentPage - 1);
    if (action === "next" && currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-orange-700"></div>
      </div>
    );
  }

  return (
    <div className="poppins-regular px-6 md:px-10  pt-2 md:pt-0 w-full bg-gray-50 h-full overflow-y-hidden">
     
       <Breadcrumb secondLink={{ href: "/billing", label: "Billing" }} />
      
       <div className="poppins-regular flex flex-col md:flex-row w-full py-4 md:py-10  ">
      
      <div className="flex-1 md:pr-10">
        <h1 className="text-2xl text-black font-bold mb-2">Billing Details</h1>
        <p className="text-sm text-gray-700 mb-6">
          View your order history, download receipts, and manage your billing preferences.
        </p>

        <div className="overflow-x-auto mb-6">
          <table className="w-full table-auto bg-white text-left">
            <thead>
              <tr className="bg-[#356966] text-white">
                <th className="px-4 py-2 text-xs">Date</th>
                <th className="px-4 py-2 text-xs">Amount</th>
                <th className="px-4 py-2 text-xs">Billing Cycle</th>
                <th className="px-4 py-2 text-xs">Status</th>
              </tr>
            </thead>
            <tbody>
              {billingData.length > 0 ? (
                billingData.map((record, index) => (
                  <tr key={index} className="even:bg-white text-gray-900 odd:bg-[#f9f9f9]">
                    <td className="px-3 py-3 text-xs whitespace-nowrap">{record.date}</td>
                    <td className="px-4 py-3 text-xs">${record.amount}</td>
                    <td className="px-4 py-3 text-xs">{record.billingCycle}</td>
                    <td className="px-4 py-3 text-xs">{record.status}</td>
                    
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center py-4 text-gray-500">
                    No billing records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {billingData.length > 0 && (
          <div className="flex justify-between items-center mt-4 text-xs">
            <span>Page {currentPage} of {totalPages} </span>
            <div className="flex space-x-2">
              <button className="px-4 py-2 bg-gray-300 rounded-md disabled:opacity-50 hover:bg-gray-400"
                onClick={() => handlePageChange("prev")} disabled={currentPage === 1}>
                Previous
              </button>
              <button className="px-4 py-2 bg-[#356966] text-white rounded-md disabled:opacity-50 hover:bg-gray-400"
                onClick={() => handlePageChange("next")} disabled={currentPage === totalPages}>
                Next
              </button>
            </div>
          </div>
        )}

      
      </div>

      <div className="w-full md:w-1/3 bg-orange-700  mt-8 rounded-3xl shadow-lg text-white p-6">
        <h2 className="text-xl font-bold mb-4">
          {planData ? "Current Active Plan" : "No Active Subscription"}
        </h2>
        {planData ? (
          <>
            <p className="text-lg">Plan: {planData.planName}</p>
            <p className="text-lg">Status: {planData.status}</p>
            <p className="text-lg">Expiry Date: {planData.expiryDate}</p>
          </>
        ) : (
          <p className="text-sm">No active subscription found. Please choose a plan to get started.</p>
        )}
      </div>

    </div>
    </div>
  );
};

export default Billing;
