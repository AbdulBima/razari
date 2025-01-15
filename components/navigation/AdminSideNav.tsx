"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const AdminSideNav = () => {
  const pathname = usePathname();
  const [activeLink, setActiveLink] = useState("");

  // Set the active link to the current pathname on component mount
  useEffect(() => {
    setActiveLink(pathname);
  }, [pathname]);

  const handleLinkClick = (link: string) => {
    setActiveLink(link);
  };

  const navItems = [
    {
      href: "/admin/dashboard",
      label: "Dashboard",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <g fill="none" stroke="currentColor">
            <circle cx="19" cy="5" r="2.5" strokeWidth="1.5" />
            <path
              strokeLinecap="round"
              strokeWidth="1.5"
              d="M21.25 10v5.25a6 6 0 0 1-6 6h-6.5a6 6 0 0 1-6-6v-6.5a6 6 0 0 1 6-6H14"
            />
            <path
              strokeLinecap="round"
              strokeWidth="1.6"
              d="M8.276 16.036v-4.388m3.83 4.388V8.769m3.618 7.267v-5.51"
            />
          </g>
        </svg>
      ),
    },

    {
      href: "/admin/companies",
      label: "Companies",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M18 15h-2v2h2m0-6h-2v2h2m2 6h-8v-2h2v-2h-2v-2h2v-2h-2V9h8M10 7H8V5h2m0 6H8V9h2m0 6H8v-2h2m0 6H8v-2h2M6 7H4V5h2m0 6H4V9h2m0 6H4v-2h2m0 6H4v-2h2m6-10V3H2v18h20V7z"
          />
        </svg>
      ),
    },
    {
      href: "/admin/onboarding",
      label: "Onbaording",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M13 9v10h7a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2h7V9H8.76C8.34 9 8 8.68 8 8.285a.7.7 0 0 1 .128-.396l3.24-4.57a.79.79 0 0 1 1.054-.199a.7.7 0 0 1 .21.198l3.24 4.57a.69.69 0 0 1-.21.992a.8.8 0 0 1-.422.12zm7 4a1 1 0 0 1 0 2h-5v-2zM8 13h1v2H4a1 1 0 0 1 0-2z"
          />
        </svg>
      ),
    },
    {
      href: "/admin/staffs",
      label: "Staffs",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 640 512"
        >
          <path
            fill="currentColor"
            d="M72 88a56 56 0 1 1 112 0a56 56 0 1 1-112 0m-8 157.7c-10 11.2-16 26.1-16 42.3s6 31.1 16 42.3v-84.7zm144.4-49.3C178.7 222.7 160 261.2 160 304c0 34.3 12 65.8 32 90.5V416c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32v-26.8C26.2 371.2 0 332.7 0 288c0-61.9 50.1-112 112-112h32c24 0 46.2 7.5 64.4 20.3zM448 416v-21.5c20-24.7 32-56.2 32-90.5c0-42.8-18.7-81.3-48.4-107.7C449.8 183.5 472 176 496 176h32c61.9 0 112 50.1 112 112c0 44.7-26.2 83.2-64 101.2V416c0 17.7-14.3 32-32 32h-64c-17.7 0-32-14.3-32-32m8-328a56 56 0 1 1 112 0a56 56 0 1 1-112 0m120 157.7v84.7c10-11.3 16-26.1 16-42.3s-6-31.1-16-42.3zM320 32a64 64 0 1 1 0 128a64 64 0 1 1 0-128m-80 272c0 16.2 6 31 16 42.3v-84.7c-10 11.3-16 26.1-16 42.3zm144-42.3v84.7c10-11.3 16-26.1 16-42.3s-6-31.1-16-42.3zm64 42.3c0 44.7-26.2 83.2-64 101.2V448c0 17.7-14.3 32-32 32h-64c-17.7 0-32-14.3-32-32v-42.8c-37.8-18-64-56.5-64-101.2c0-61.9 50.1-112 112-112h32c61.9 0 112 50.1 112 112"
          />
        </svg>
      ),
    },
    {
      href: "/admin/disganosis",
      label: "Diagnosis",
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
            strokeLinejoin="round"
            strokeWidth="1.5"
          >
            <path d="M10.617 13.837a3.22 3.22 0 1 0 0-6.44a3.22 3.22 0 0 0 0 6.44m-.537-8.855h1.074m-.537 0v2.415m3.605-1.144l.759.76m-.38-.38L12.894 8.34m3.358 1.74v1.074m0-.537h-2.415m1.144 3.605l-.759.759m.379-.38l-1.707-1.707m-1.74 3.358H10.08m.537 0v-2.415m-3.605 1.144l-.759-.759m.38.379l1.707-1.707m-3.358-1.74V10.08m0 .537h2.415M6.253 7.012l.759-.759m-.379.38L8.34 8.34" />
            <path d="M10.617 20.484c5.45 0 9.867-4.418 9.867-9.867S16.066.75 10.617.75S.75 5.168.75 10.617s4.418 9.867 9.867 9.867M23.25 23.25l-5.656-5.656" />
          </g>
        </svg>
      ),
    },
    {
      href: "/admin/admission",
      label: "Adimission",
      icon: (
        <svg
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
        </svg>
      ),
    },
    {
      href: "/admin/birth",
      label: "Birth",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M12 17c-1.1 0-2-.9-2-2s.9-2 2-2s2 .9 2 2s-.9 2-2 2m0-7c2.34 0 7 1.16 7 3.5v5.13c0 .87-.69 1.61-1.66 2.16v-7.41c0-.56-2.74-1.84-5.34-1.84s-5.34 1.28-5.34 1.84v5.37c0 .25.65.71 1.62 1.1C9 19 10.93 18.56 12 18.56c1.33 0 4 .66 4 2v.83c-1.37.49-2.93.74-4 .74s-2.62-.25-4-.74c-1.63-.58-3-1.5-3-2.76V13.5c0-2.34 4.66-3.5 7-3.5m0-6.25c-.97 0-1.75.78-1.75 1.75s.78 1.75 1.75 1.75s1.75-.78 1.75-1.75s-.78-1.75-1.75-1.75M12 9c-1.93 0-3.5-1.57-3.5-3.5S10.07 2 12 2s3.5 1.57 3.5 3.5S13.93 9 12 9"
          />
        </svg>
      ),
    },
    {
      href: "/admin/emergrncy",
      label: "Emergency",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M5 20v-2h1.6L9 10h6l2.4 8H19v2zm3.7-2h6.6l-1.8-6h-3zM11 8V3h2v5zm5.95 2.475L15.525 9.05l3.55-3.525l1.4 1.4zM18 15v-2h5v2zM7.05 10.475l-3.525-3.55l1.4-1.4l3.55 3.525zM1 15v-2h5v2zm11 3"
          />
        </svg>
      ),
    },
    {
      href: "/admin/death",
      label: "Death",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            fillRule="evenodd"
            d="M21 12a9 9 0 1 1-18 0a9 9 0 0 1 18 0m-4.101 5A6.98 6.98 0 0 1 12 19a6.98 6.98 0 0 1-4.899-2zm1.427-2a7 7 0 1 0-12.653 0z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      href: "/admin/clinics",
      label: "Clinics",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 16 16"
        >
          <path
            fill="currentColor"
            fillRule="evenodd"
            d="M13.25 12a.75.75 0 1 0 0 1.5a.75.75 0 0 0 0-1.5m-.75-1.372a2.251 2.251 0 1 0 1.5 0v-.378a3 3 0 0 0-3-3H8.75V5.372a2.25 2.25 0 1 0-1.5 0V7.25H5a3 3 0 0 0-3 3v.378a2.251 2.251 0 1 0 1.5 0v-.378A1.5 1.5 0 0 1 5 8.75h2.25v1.878a2.251 2.251 0 1 0 1.5 0V8.75H11a1.5 1.5 0 0 1 1.5 1.5zM2.75 12a.75.75 0 1 0 0 1.5a.75.75 0 0 0 0-1.5m4.5.75a.75.75 0 1 1 1.5 0a.75.75 0 0 1-1.5 0M8 2.5A.75.75 0 1 0 8 4a.75.75 0 0 0 0-1.5"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      href: "/admin/billing",
      label: "Billing",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M7 15h3a1 1 0 0 0 0-2H7a1 1 0 0 0 0 2M19 5H5a3 3 0 0 0-3 3v9a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3m1 12a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-6h16Zm0-8H4V8a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1Z"
          />
        </svg>
      ),
    },
    {
      href: "/admin/plan",
      label: "Plan",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 14 14"
        >
          <path
            fill="currentColor"
            fillRule="evenodd"
            d="M10.213 2.538A5.499 5.499 0 0 0 1.595 8.01a.75.75 0 0 1-1.474.277a6.999 6.999 0 0 1 11.163-6.821l.612-.612a.5.5 0 0 1 .854.353V3.5a.5.5 0 0 1-.5.5H9.957a.5.5 0 0 1-.353-.853zm2.791 2.577a.75.75 0 0 1 .876.598a6.999 6.999 0 0 1-11.164 6.821l-.612.613a.5.5 0 0 1-.854-.354V10.5a.5.5 0 0 1 .5-.5h2.293a.5.5 0 0 1 .354.854l-.61.609a5.499 5.499 0 0 0 8.618-5.472a.75.75 0 0 1 .6-.876ZM7.627 3.657a.75.75 0 0 0-1.5 0V4a1.704 1.704 0 0 0-.085 3.346l1.26.275a.32.32 0 0 1-.068.63H6.52a.32.32 0 0 1-.3-.212a.75.75 0 0 0-1.415.5a1.82 1.82 0 0 0 1.321 1.17v.362a.75.75 0 0 0 1.5 0v-.362a1.82 1.82 0 0 0-.005-3.553l-1.26-.276a.204.204 0 0 1 .044-.403h.828a.32.32 0 0 1 .3.212a.75.75 0 0 0 1.415-.5a1.82 1.82 0 0 0-1.322-1.17v-.36Z"
            clipRule="evenodd"
          />
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

      <div className="flex flex-col space-y-2 justify-between flex-1 ">
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

      <div className="flex  mt-8  mb-6">
        <button
          className="flex items-center p-2 text-sm font-normal text-white rounded-lg hover:bg-[#ff8552]"
          onClick={() => console.log("Logout clicked")}
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

export default AdminSideNav;
