"use client";

import Breadcrumb from "@/components/navigation/Breadcrumb";
import React from "react";

type SupportContact = {
  department: string;
  email: string;
};

const SupportContactList: React.FC = () => {
  const supportContacts: SupportContact[] = [
    {
      department: "Technical Support",
      email: "techsupport@razari.com",
    },
    {
      department: "Customer Service",
      email: "customerservice@razari.com",
    },
    {
      department: "Billing",
      email: "billing@razari.com",
    },
    {
      department: "Data Requests",
      email: "datarequests@razari.com",
    },
  ];

  return (
    <div className="font-sans px-6 md:px-16  md:pt-16 w-full bg-gray-50">
      <Breadcrumb secondLink={{ href: "/support", label: "Support" }} />
      

      <div className="bg-white shadow-xl rounded-lg p-6 mt-10 md:mt-0 md:p-10 space-y-8 max-w-3xl mx-auto">
        {supportContacts.map((contact, index) => (
          <div
            key={index}
            className="flex justify-between items-center border-b border-gray-200 pb-4 last:pb-0"
          >
            <span className="text-lg font-medium text-gray-800">{contact.department}</span>
            <a
              href={`mailto:${contact.email}`}
              className="text-orange-600 hover:text-gray-900 transition duration-300 ease-in-out"
            >
              {contact.email}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SupportContactList;
