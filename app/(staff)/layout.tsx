
"use client"

import "../globals.css";
import StaffMobileNav from "@/components/navigation/StaffMobileNav";
import StaffSideNav from "@/components/navigation/StaffSideNav";
import StaffDashboardNavbar from "@/components/navigation/StaffDashboardNav";

export default function StaffLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="poppins-regular">
        <StaffMobileNav />
        <div className="pt-16 flex md:pt-0 w-full h-screen ">
          <div className="hidden bg-transparent border-none md:flex w-[15vw] h-full fixed">
            <StaffSideNav />
          </div>
          <div className="flex md:overflow-y-auto flex-1 w-full flex-col ml-0 md:ml-[15vw] h-full">
            <StaffDashboardNavbar />
            <div className="poppins-regular md:pt-16 pb-5">{children}</div>
          </div>
        </div>
      </body>
    </html>
  );
}

