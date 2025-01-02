import type { Metadata } from "next";
import "../globals.css";
import MobileNavbar from "@/components/navigation/MobileNav";
import SideNavbar from "@/components/navigation/SideNav";
import DashboardNavbar from "@/components/navigation/DashboardNav";

export const metadata: Metadata = {
  title: "Clinic",
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
        <MobileNavbar />
        <div className="pt-16 flex md:pt-0 w-full h-screen overflow-x-hidden">
          {/* Fixed Sidebar */}
          <div className="hidden bg-transparent overflow-y-hidden border-none md:flex w-[15vw] h-full fixed">
            <SideNavbar />
          </div>

          {/* Scrollable Content */}
          <div className="flex  flex-1 w-full flex-col ml-0 md:ml-[15vw] overflow-y-auto h-full">
            <DashboardNavbar />
            <div className="poppins-regular pt-16">{children}</div> {/* Add padding top to avoid overlap with fixed navbar */}
          </div>
        </div>
      </body>
    </html>
  );
}
