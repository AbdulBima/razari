"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const DashboardNavbar = () => {
  const [userName, setUserName] = useState("");
  const router = useRouter();

  useEffect(() => {
    const storedData = localStorage.getItem("cmpxn");
    if (storedData) {
      setUserName(storedData);
    } else {
      setUserName("Company");
    }
  }, [router]);

  return (
    <div className="bg-gray-50 py-6 border-b border-opacity-50 px-6 h-16 hidden md:flex items-center justify-between ml-[15vw] fixed top-0 left-0 right-0 z-40">
      {/* Welcome Message */}
      <div className="flex items-center space-x-3">
        <div className="relative">
          <h1 className="text-sm font-medium">Welcome Back</h1>
        </div>
      </div>

      {/* Right-side icons and user profile */}
      <div className="flex items-center space-x-6">
        {/* Settings Icon */}

        {/* User Profile */}
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-[#356966] text-white flex items-center justify-center rounded-full text-sm font-bold">
            {userName ? userName.charAt(0).toUpperCase() : "?"}
          </div>
          <span className="text-gray-600 text-sm font-medium">{userName}</span>
        </div>
      </div>
    </div>
  );
};

export default DashboardNavbar;
