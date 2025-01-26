"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import companySideNavItems from "@/utils/companySideNavBar";

const SideNavbar = () => {
  const pathname = usePathname();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [activeLink, setActiveLink] = useState("");

  useEffect(() => {
    setActiveLink(pathname);
  }, [pathname]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleLinkClick = (link: string) => {
    setActiveLink(link);
  };



  return (
    <aside className="poppins-regular hidden md:flex flex-col w-full h-screen px-4 py-8 overflow-y-hidden bg-[#356966] border-r rounded-r-[50px]">
      <div>
        <Link href="/cmpx/dashboard">
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

      <div className="flex flex-col space-y-2 justify-between flex-1 ">
        <nav className="">
        <ul className="flex flex-col">
          {companySideNavItems.map((item) => {
            const isActive = pathname.includes(item.href); // Check if pathname includes href
            return (
              <li key={item.href} className={`mb-1`}>
                <Link
                  href={item.href}
                  className={`flex items-center px-6 py-1 text-sm font-medium transition-colors duration-200 transform rounded-lg ${
                    isActive
                      ? "bg-gray-100 text-[#356966]"
                      : "text-white hover:bg-gray-100 hover:text-[#356966]"
                  }`}
                >
                  {item.icon}
                  <span className="mx-4">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
        </nav>
      </div>

      <div className="flex  mt-8  mb-6">
        <button
          className="flex items-center p-2 text-sm font-normal text-white rounded-lg hover:bg-[#ff8552]"
          onClick={() => {
            localStorage.removeItem("cmpx");
            localStorage.removeItem("cmpxn");
            localStorage.removeItem("cpm");
            window.location.href = "/";
          }}
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

export default SideNavbar;
