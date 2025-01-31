"use client";

import React, { useState, useEffect } from "react";
import { FaUserAlt } from "react-icons/fa"; // Importing icons
import Link from "next/link"; // Importing Link for navigation
import { usePathname, useRouter } from "next/navigation"; // Importing usePathname to get current path
import { motion } from "framer-motion"; // Importing Framer Motion for animations

const StaffMobileNav = () => {
  const pathname = usePathname(); // Get the current pathname
  const router = useRouter();
  const [activeLink, setActiveLink] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Add state for the menu visibility

  // Set the active link to the current pathname on component mount
  useEffect(() => {
    setActiveLink(pathname);
  }, [pathname]); 

  // Handle menu link click (to update the active link)
  const handleLinkClick = (link: string) => {
    setActiveLink(link);
    setIsMenuOpen(false); // Close the menu when a link is clicked
  };

  const handleLogout = () => {
    // Clear specific keys from localStorage
    const keysToRemove = ["stf", "sttx", "sttxci", "sttxcm", "sttxe", "sttxr"];
    keysToRemove.forEach((key) => localStorage.removeItem(key));

    // Redirect to the root page
    router.push("/");
  };

  const navItems = [
    {
      href: "/sttx/recent-upload",
      label: "Recent Upload",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M13.5 8H12v5l4.28 2.54l.72-1.21l-3.5-2.08zM13 3a9 9 0 0 0-9 9H1l3.96 4.03L9 12H6a7 7 0 0 1 7-7a7 7 0 0 1 7 7a7 7 0 0 1-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42A8.9 8.9 0 0 0 13 21a9 9 0 0 0 9-9a9 9 0 0 0-9-9"
          />
        </svg>
      ),
    },
    {
      href: "/sttx/profile",
      label: "Profile",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <g fill="currentColor" stroke="currentColor">
            <path
              fill="currentColor"
              d="M4 18a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2"
              opacity="0.16"
            />
            <path
              stroke="currentColor"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 18a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2Z"
            />
            <circle
              cx="12"
              cy="7"
              r="3"
              stroke="currentColor"
              strokeWidth="2"
            />
          </g>
        </svg>
      ),
    },

    {
      href: "/sttx/addrecord",
      label: "Add Record",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <g
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="2"
          >
            <path
              strokeLinejoin="round"
              d="M19 21H7a4 4 0 0 1-4-4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v13c0 1.657.343 3 2 3"
            />
            <path
              strokeLinejoin="round"
              d="M21 10a2 2 0 0 0-2-2h-2v10.5c0 1.38.62 2.5 2 2.5s2-1.12 2-2.5z"
            />
            <path d="M13 11H7m6-4H7m3 8H7" />
          </g>
        </svg>
      ),
    },
  ];



  return (
    <header className="w-full bg-[#356966] h-12 shadow-md px-4 py-1 md:hidden flex items-center justify-between fixed top-0 z-50">
      {/* Burger Icon */}
      <motion.button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="text-gray-800 text-base focus:outline-none"
        aria-label="Menu"
        initial={{ rotate: 0 }}
        animate={{ rotate: isMenuOpen ? 180 : 0 }}
        transition={{ duration: 0.3 }}
      >
        {isMenuOpen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              fill="none"
              stroke="white"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 5L12 5L19 5M5 12H19M5 19L12 19L19 19"
            >
              <animate
                fill="freeze"
                attributeName="d"
                dur="0.4s"
                values="M5 5L12 5L19 5M5 12H19M5 19L12 19L19 19;M5 5L12 12L19 5M12 12H12M5 19L12 12L19 19"
              />
            </path>
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="-5 -7 24 24"
          >
            <path
              fill="white"
              d="M1 0h5a1 1 0 1 1 0 2H1a1 1 0 1 1 0-2m7 8h5a1 1 0 0 1 0 2H8a1 1 0 1 1 0-2M1 4h12a1 1 0 0 1 0 2H1a1 1 0 1 1 0-2"
            />
          </svg>
        )}
      </motion.button>

      {/* Logo Section */}
      <div className="absolute left-1/2 transform -translate-x-1/2 flex flex-row items-center">
        <h2 className="zen text-base text-white font-bold">Razari</h2>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          className="ml-1"
        >
          <path
            fill="#ff8552"
            d="M8.47 9.353a5.88 5.88 0 0 1 5.883-5.882V2.294a7.06 7.06 0 0 0-7.059 7.059zm5.883-4.118a4.12 4.12 0 0 0-4.118 4.118H9.06a5.294 5.294 0 0 1 5.294-5.294zm0 1.765A2.353 2.353 0 0 0 12 9.353h-1.177a3.53 3.53 0 0 1 3.53-3.53zm-5.294 8.235a5.88 5.88 0 0 1-5.883-5.882H2a7.06 7.06 0 0 0 7.059 7.059zM4.94 9.353a4.12 4.12 0 0 0 4.118 4.118v1.176a5.294 5.294 0 0 1-5.294-5.294zm1.765 0a2.353 2.353 0 0 0 2.353 2.353v1.176a3.53 3.53 0 0 1-3.53-3.529zm8.235-.588a5.88 5.88 0 0 1 5.882 5.882H22a7.06 7.06 0 0 0-7.059-7.059zm4.118 5.882a4.117 4.117 0 0 0-4.118-4.118V9.353a5.294 5.294 0 0 1 5.294 5.294zm-1.765 0a2.353 2.353 0 0 0-2.353-2.353v-1.176a3.53 3.53 0 0 1 3.53 3.53zm-5.882 0A2.353 2.353 0 0 1 9.059 17v1.177a3.53 3.53 0 0 0 3.53-3.53zm1.764 0a4.12 4.12 0 0 1-4.117 4.118v1.176a5.294 5.294 0 0 0 5.294-5.294zM9.06 20.53a5.88 5.88 0 0 0 5.882-5.882h1.177a7.06 7.06 0 0 1-7.06 7.059z"
          />
        </svg>
      </div>

      {/* Notification & Settings */}
      <div className="flex items-center space-x-2">
        <Link href={"/sttx/profile"} aria-label="Settings">
          <FaUserAlt className="text-white text-base" />
        </Link>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          className="fixed top-12 left-0 w-3/4 h-full border-t-2 border-double border-r-2 border-[#ff8552] bg-[#356966] z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: isMenuOpen ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex  ml-3 flex-col p-2 mt-6 space-y-1">
            {navItems.map(({ href, label, icon }) => (
              <Link href={href} key={href}>
                <motion.div
                  onClick={() => handleLinkClick(href)}
                  className={`flex w-52 items-center px-2 py-2 text-lg rounded-lg transition-colors duration-300 ${
                    activeLink === href
                      ? "bg-white text-gray-900"
                      : "text-white hover:bg-gray-100 hover:text-gray-900"
                  }`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isMenuOpen ? 1 : 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <span>{icon}</span>
                  <span className="ml-3 whitespace-nowrap">{label}</span>
                </motion.div>
              </Link>
            ))}
          </div>

          <div className="flex ml-4 mt-24 mb-6">
        <button
          className="flex items-center p-2 text-lg font-normal text-white rounded-lg hover:bg-[#ff8552]"
          onClick={handleLogout}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              fill="white"
              d="M12 3.25a.75.75 0 0 1 0 1.5a7.25 7.25 0 0 0 0 14.5a.75.75 0 0 1 0 1.5a8.75 8.75 0 1 1 0-17.5"
            />
            <path
              fill="white"
              d="M16.47 9.53a.75.75 0 0 1 1.06-1.06l3 3a.75.75 0 0 1 0 1.06l-3 3a.75.75 0 1 1-1.06-1.06l1.72-1.72H10a.75.75 0 0 1 0-1.5h8.19z"
            />
          </svg>
          <span className="ml-4 text-lg">Logout</span>
        </button>
      </div>
        </motion.div>
      )}
    </header>
  );
};

export default StaffMobileNav;
