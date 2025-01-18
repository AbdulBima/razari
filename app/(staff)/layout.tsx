import type { Metadata } from "next";
import "../globals.css";
import MobileNavbar from "@/components/navigation/MobileNav";
import SideNavbar from "@/components/navigation/SideNav";
import DashboardNavbar from "@/components/navigation/DashboardNav";

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
        <MobileNavbar />
        <div className="pt-16 flex md:pt-0 w-full h-screen ">
          {/* Fixed Sidebar */}
          <div className="hidden bg-transparent border-none md:flex w-[15vw] h-full fixed">
            <SideNavbar />
          </div>

          {/* Scrollable Content */}
          <div className="flex md:overflow-hidden flex-1 w-full flex-col ml-0 md:ml-[15vw]  h-full">
            <DashboardNavbar />
            <div className="poppins-regular md:pt-16 pb-5">{children}</div> {/* Add padding top to avoid overlap with fixed navbar */}
          </div>
        </div>
      </body>
    </html>
  );
}
