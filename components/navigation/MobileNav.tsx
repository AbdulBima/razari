"use client";

import React, { useState, useEffect } from "react";
import { FaCog, FaUserAlt } from "react-icons/fa"; // Importing icons
import Link from "next/link"; // Importing Link for navigation
import { usePathname } from "next/navigation"; // Importing usePathname to get current path
import { motion } from "framer-motion"; // Importing Framer Motion for animations

const MobileNavbar = () => {
  const pathname = usePathname(); // Get the current pathname
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

  const navItems = [
    { href: "/dashboard", label: "Dashboard", icon:   <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 48 48"
    >
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="4"
        d="M6 17v22m36-14v14M26 15h12m-27 7h6M6 28h36M6 34h36M32 9v12"
      />
    </svg> },
    { href: "/admissions", label: "Admissions", icon: <FaUserAlt className="text-white" /> },
    { href: "/settings", label: "Settings", icon: <FaCog className="text-white" /> },
    // Add more nav items with their respective icons
  ];

  return (
    <header className="w-full bg-[#356966] h-14 shadow-md px-4 py-2 md:hidden flex items-center justify-between fixed top-0 z-50">
      {/* Burger Icon */}
      <motion.button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="text-gray-800 text-2xl focus:outline-none"
        aria-label="Menu"
        initial={{ rotate: 0 }}
        animate={{ rotate: isMenuOpen ? 180 : 0 }}
        transition={{ duration: 0.3 }}
      >
        {isMenuOpen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
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
            width="40"
            height="40"
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
        <h2 className="zen text-2xl text-white font-bold">Razari</h2>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          viewBox="0 0 24 24"
          className="ml-2"
        >
          <path
            fill="#ff8552"
            d="M8.47 9.353a5.88 5.88 0 0 1 5.883-5.882V2.294a7.06 7.06 0 0 0-7.059 7.059zm5.883-4.118a4.12 4.12 0 0 0-4.118 4.118H9.06a5.294 5.294 0 0 1 5.294-5.294zm0 1.765A2.353 2.353 0 0 0 12 9.353h-1.177a3.53 3.53 0 0 1 3.53-3.53zm-5.294 8.235a5.88 5.88 0 0 1-5.883-5.882H2a7.06 7.06 0 0 0 7.059 7.059zM4.94 9.353a4.12 4.12 0 0 0 4.118 4.118v1.176a5.294 5.294 0 0 1-5.294-5.294zm1.765 0a2.353 2.353 0 0 0 2.353 2.353v1.176a3.53 3.53 0 0 1-3.53-3.529zm8.235-.588a5.88 5.88 0 0 1 5.882 5.882H22a7.06 7.06 0 0 0-7.059-7.059zm4.118 5.882a4.117 4.117 0 0 0-4.118-4.118V9.353a5.294 5.294 0 0 1 5.294 5.294zm-1.765 0a2.353 2.353 0 0 0-2.353-2.353v-1.176a3.53 3.53 0 0 1 3.53 3.53zm-5.882 0A2.353 2.353 0 0 1 9.059 17v1.177a3.53 3.53 0 0 0 3.53-3.53zm1.764 0a4.12 4.12 0 0 1-4.117 4.118v1.176a5.294 5.294 0 0 0 5.294-5.294zM9.06 20.53a5.88 5.88 0 0 0 5.882-5.882h1.177a7.06 7.06 0 0 1-7.06 7.059z"
          />
        </svg>
      </div>

      {/* Notification & Settings */}
      <div className="flex items-center space-x-4">
       
        <button aria-label="Settings">
          <FaCog className="text-white text-lg" />
        </button>
      </div>

      {/* Mobile Menu */}
      <motion.div
        className="fixed top-14 left-0 w-4/5 h-full border-t-4 border-double border-r-4 border-[#ff8552] bg-[#356966] z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: isMenuOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex flex-col p-4 mt-6 space-y-2">
          {navItems.map(({ href, label, icon }) => (
            <Link href={href} key={href}>
              <motion.div
                onClick={() => handleLinkClick(href)}
                className={`flex w-40 items-center px-2 py-2 text-lg rounded-xl transition-colors duration-300 ${
                  activeLink === href
                    ? "bg-white text-gray-900"
                    : "text-white hover:bg-gray-100 hover:text-gray-900"
                }`}
                initial={{ opacity: 0 }}
                animate={{ opacity: isMenuOpen ? 1 : 0 }}
                transition={{ delay: 0.2 }}
              >
                {icon}
                <span className="ml-2">{label}</span>
              </motion.div>
            </Link>
          ))}
        </div>
      </motion.div>
    </header>
  );
};

export default MobileNavbar;
