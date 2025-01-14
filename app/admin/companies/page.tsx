"use client";

import React, { useState } from "react";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";

type Company = {
  companyName: string;
  companyEmail: string;
  companyPassword: string;
  answer1: string;
  answer2: string;
  contactPerson: string;
  cac: string;
  phone: string;
  country: string;
  state: string;
  active: boolean;
  dateAdded: string;
};

const mockCompanies: Company[] = [
  {
    companyName: "TechCorp",
    companyEmail: "contact@techcorp.com",
    companyPassword: "password123",
    answer1: "Blue",
    answer2: "Dog",
    contactPerson: "John Doe",
    cac: "12345678",
    phone: "+123456789",
    country: "US",
    state: "CA",
    active: true,
    dateAdded: "2023-12-01",
  },
  {
    companyName: "Innovate Inc.",
    companyEmail: "info@innovate.com",
    companyPassword: "securepass",
    answer1: "Red",
    answer2: "Cat",
    contactPerson: "Jane Smith",
    cac: "87654321",
    phone: "+987654321",
    country: "US",
    state: "NY",
    active: true,
    dateAdded: "2023-11-15",
  },
  // Additional mock data...
];

const ITEMS_PER_PAGE = 5;

const CompanyTable: React.FC = () => {
  const [companies, setCompanies] = useState(mockCompanies);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState<keyof Company>("dateAdded");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [showModal, setShowModal] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);

  const totalPages = Math.ceil(companies.length / ITEMS_PER_PAGE);

  // Calculate the total active companies
  const totalActiveCompanies = companies.filter((company) => company.active).length;

  const handlePageChange = (direction: "prev" | "next") => {
    setCurrentPage((prev) =>
      direction === "prev"
        ? Math.max(prev - 1, 1)
        : Math.min(prev + 1, totalPages)
    );
  };

  const handleSort = (field: keyof Company) => {
    const order = sortField === field && sortOrder === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortOrder(order);

    const sorted = [...companies].sort((a, b) => {
      if (a[field] < b[field]) return order === "asc" ? -1 : 1;
      if (a[field] > b[field]) return order === "asc" ? 1 : -1;
      return 0;
    });
    setCompanies(sorted);
  };

  const paginatedCompanies = companies.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const toggleActiveStatus = (company: Company) => {
    setCompanies((prevCompanies) =>
      prevCompanies.map((c) =>
        c.companyName === company.companyName ? { ...c, active: !c.active } : c
      )
    );
    setShowModal(false);
  };

  const handleToggleModal = (company: Company) => {
    setSelectedCompany(company);
    setShowModal(true);
  };

  const getSortIcon = (field: keyof Company) => {
    if (sortField !== field) return <FaSort className="inline ml-1 text-xs" />;
    return sortOrder === "asc" ? (
      <FaSortUp className="inline ml-1 text-xs" />
    ) : (
      <FaSortDown className="inline ml-1 text-xs" />
    );
  };

  return (
    <div className="p-6 poppins-regular bg-gray-50 min-h-screen">
      <h1 className="text-lg font-normal text-gray-600 mb-4">Companies</h1>

      {/* Display Total Active Companies */}
      <div className="text-sm mb-4 text-gray-600">
        <strong>Total Active Companies: </strong>{totalActiveCompanies}
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full mt-4 bg-white shadow-md rounded-lg table-auto border-collapse text-sm">
          <thead>
            <tr className="bg-[#356966] text-white text-left">
              <th
                className="p-2 cursor-pointer whitespace-nowrap"
                onClick={() => handleSort("companyName")}
              >
                Name {getSortIcon("companyName")}
              </th>
              <th
                className="p-2 cursor-pointer"
                onClick={() => handleSort("companyEmail")}
              >
                Email {getSortIcon("companyEmail")}
              </th>
              <th
                className="p-2 cursor-pointer"
                onClick={() => handleSort("cac")}
              >
                CAC {getSortIcon("cac")}
              </th>
              <th
                className="p-2 cursor-pointer"
                onClick={() => handleSort("phone")}
              >
                Phone {getSortIcon("phone")}
              </th>
              <th
                className="p-2 cursor-pointer whitespace-nowrap"
                onClick={() => handleSort("active")}
              >
                Active {getSortIcon("active")}
              </th>
              <th
                className="p-2 cursor-pointer whitespace-nowrap"
                onClick={() => handleSort("dateAdded")}
              >
                Date Added {getSortIcon("dateAdded")}
              </th>
              <th className="p-2 whitespace-nowrap">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedCompanies.map((company) => (
              <tr
                key={company.companyName}
                className="even:bg-gray-100 border-t border-gray-200 hover:bg-gray-100"
              >
                <td className="px-2 py-2 whitespace-nowrap">{company.companyName}</td>
                <td className="px-2 py-2">{company.companyEmail}</td>
                <td className="px-2 py-2">{company.cac}</td>

                <td className="px-2 py-2">{company.phone}</td>
                <td className="px-2 py-2">
                  {company.active ? "Active" : "Inactive"}
                </td>
                <td className="px-2 py-2">{company.dateAdded}</td>
                <td className="px-2 py-2 space-x-4 flex">
                  <button
                    className={`${
                      company.active
                        ? "text-green-600 bg-[#e6f7ea]"
                        : "text-gray-400 bg-[#f0f0f0]"
                    } hover:bg-green-100 text-sm py-1 px-2 rounded`}
                    onClick={() => handleToggleModal(company)}
                  >
                    {company.active ? "Deactivate" : "Activate"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-4 text-xs">
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <div className="flex space-x-2">
          <button
            className="px-4 py-2 bg-gray-300 rounded-md disabled:opacity-50 hover:bg-gray-400"
            onClick={() => handlePageChange("prev")}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <button
            className="px-4 py-2 bg-[#356966] text-white rounded-md disabled:opacity-50 hover:bg-gray-400"
            onClick={() => handlePageChange("next")}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>

      {showModal && selectedCompany && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen">
            <div className="bg-white w-96 p-8 rounded-lg shadow-lg space-y-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Confirm Action
              </h2>
              <p className="text-sm text-gray-600">
                Are you sure you want to{" "}
                <strong>
                  {selectedCompany.active ? "deactivate" : "activate"}
                </strong>{" "}
                the company <strong>{selectedCompany.companyName}</strong>?
              </p>
              <div className="flex justify-end space-x-4 mt-6">
                <button
                  className="px-6 py-2 bg-gray-200 text-gray-800 rounded-md font-semibold hover:bg-gray-300 transition duration-200"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-6 py-2 bg-[#356966] text-white rounded-md font-semibold hover:bg-[#2a4d46] transition duration-200"
                  onClick={() => toggleActiveStatus(selectedCompany)}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanyTable;
