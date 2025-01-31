"use client";

import { useState, useEffect, SetStateAction } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

const StaffSideNav = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [activeLink, setActiveLink] = useState("");

  useEffect(() => {
    setActiveLink(pathname);
  }, [pathname]);

  const handleLinkClick = (link: SetStateAction<string>) => {
    setActiveLink(link);
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
  ];

  return (
    <aside className="poppins-regular hidden md:flex flex-col w-full h-screen px-4 py-8 overflow-y-hidden bg-[#356966] border-r rounded-r-[50px]">
      <div>
        <Link href="/dashboard">
          <div className="flex justify-center items-center mb-12">
            <h2 className="zen text-2xl text-white font-bold">Razari</h2>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="50"
              height="50"
              viewBox="0 0 24 24"
              className="ml-2"
            >
              <path
                fill="#ff8552"
                d="M8.47 9.353a5.88 5.88 0 0 1 5.883-5.882V2.294a7.06 7.06 0 0 0-7.059 7.059zm5.883-4.118a4.12 4.12 0 0 0-4.118 4.118H9.06a5.294 5.294 0 0 1 5.294-5.294zm0 1.765A2.353 2.353 0 0 0 12 9.353h-1.177a3.53 3.53 0 0 1 3.53-3.53zm-5.294 8.235a5.88 5.88 0 0 1-5.883-5.882H2a7.06 7.06 0 0 0 7.059 7.059zM4.94 9.353a4.12 4.12 0 0 0 4.118 4.118v1.176a5.294 5.294 0 0 1-5.294-5.294zm1.765 0a2.353 2.353 0 0 0 2.353 2.353v1.176a3.53 3.53 0 0 1-3.53-3.529zm8.235-.588a5.88 5.88 0 0 1 5.882 5.882H22a7.06 7.06 0 0 0-7.059-7.059zm4.118 5.882a4.117 4.117 0 0 0-4.118-4.118V9.353a5.294 5.294 0 0 1 5.294 5.294zm-1.765 0a2.353 2.353 0 0 0-2.353-2.353v-1.176a3.53 3.53 0 0 1 3.53 3.53zm-5.882 0A2.353 2.353 0 0 1 9.059 17v1.177a3.53 3.53 0 0 0 3.53-3.53zm1.764 0a4.12 4.12 0 0 1-4.117 4.118v1.176a5.294 5.294 0 0 0 5.294-5.294zM9.06 20.53a5.88 5.88 0 0 0 5.882-5.882h1.177a7.06 7.06 0 0 1-7.06 7.059z"
              />
            </svg>
          </div>
        </Link>
      </div>

      <div className="flex flex-col space-y-2 justify-between flex-1">
        <nav className="space-y-1">
          {navItems.map(({ href, label, icon }) => (
            <Link href={href} key={href} className="w-full">
              <div
                onClick={() => handleLinkClick(href)}
                className={`flex w-full items-center px-3 py-1 mt-1.5 text-sm font-medium rounded-xl transition-colors duration-300 ${
                  activeLink === href
                    ? "bg-white text-gray-900"
                    : "text-white hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                {icon}
                <span className="ml-2 text-sm">{label}</span>
              </div>
            </Link>
          ))}
        </nav>
      </div>

      <div className="flex mt-8 mb-6">
        <button
          className="flex items-center p-2 text-sm font-normal text-white rounded-lg hover:bg-[#ff8552]"
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
          <span className="ml-4 text-sm">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default StaffSideNav;
