import type { Metadata } from "next";
import "../../globals.css";
import DashboardNavbar from "@/components/navigation/DashboardNav";
import AdminMobileNav from "@/components/navigation/AdminMobileNav";
import AdminSideNav from "@/components/navigation/AdminSideNav";

export const metadata: Metadata = {
  title: "Clinic",
  description: "",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="poppins-regular">
        <AdminMobileNav />
        <div className="pt-16 flex md:pt-0 w-full h-screen overflow-x-auto">
          {/* Fixed Sidebar */}
          <div className="hidden bg-transparent overflow-y-hidden border-none md:flex w-[15vw] h-full fixed">
            <AdminSideNav/>
          </div>

          {/* Scrollable Content */}
          <div className="flex  flex-1 w-full flex-col ml-0 md:ml-[15vw]  h-full">
            <DashboardNavbar />
            <div className="poppins-regular md:pt-16 pb-5">{children}</div> {/* Add padding top to avoid overlap with fixed navbar */}
          </div>
        </div>
      </body>
    </html>
  );
}
