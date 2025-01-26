
import "../globals.css";
import MobileNavbar from "@/components/navigation/MobileNav";
import SideNavbar from "@/components/navigation/SideNav";
import DashboardNavbar from "@/components/navigation/DashboardNav";
import AuthWrapper from "@/components/AuthWrapper";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="poppins-regular bg-gray-50">
        <MobileNavbar />
        <div className="pt-16 flex md:pt-0 w-full h-screen ">
          <div className="hidden bg-transparent border-none md:flex w-[15vw] h-full fixed">
            <SideNavbar />
          </div>
          <div className="flex md:overflow-hidden flex-1 w-full flex-col ml-0 md:ml-[15vw] h-full">
            <DashboardNavbar />
            <div className="poppins-regular md:pt-16 pb-5">
              <AuthWrapper>{children}</AuthWrapper> {/* Apply authentication only to this layout */}
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
