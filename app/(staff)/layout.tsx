import type { Metadata } from "next";
import "../globals.css";
import StaffSideNav from "@/components/navigation/StaffSideNav";
import StaffDashboardNavbar from "@/components/navigation/StaffDashboardNav";
import StaffMobileNav from "@/components/navigation/StaffMobileNav";

export const metadata: Metadata = {
  title: "Razari Analytics",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="poppins-regular">
        <StaffMobileNav />
        <div className="pt-16 flex md:pt-0 w-full h-screen ">
          {/* Fixed Sidebar */}
          <div className="hidden bg-transparent border-none md:flex w-[15vw] h-full fixed">
            <StaffSideNav />
          </div>

          {/* Scrollable Content */}
          <div className="flex md:overflow-y-auto  flex-1 w-full flex-col ml-0 md:ml-[15vw]  h-full">
            <StaffDashboardNavbar />
            <div className="poppins-regular md:pt-16 pb-5">{children}</div> {/* Add padding top to avoid overlap with fixed navbar */}
          </div>
        </div>
      </body>
    </html>
  );
}
