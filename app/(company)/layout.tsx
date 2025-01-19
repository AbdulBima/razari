"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import "../globals.css";
import MobileNavbar from "@/components/navigation/MobileNav";
import SideNavbar from "@/components/navigation/SideNav";
import DashboardNavbar from "@/components/navigation/DashboardNav";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Loading state
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [error, setError] = useState<string | null>(null); // Error handling
  const router = useRouter();

  useEffect(() => {
    const verifyToken = () => {
      const token = localStorage.getItem("cpm"); // Retrieve token from localStorage
      if (!token) {
        router.push("/"); // Redirect to login if no token
        return;
      }

      // Verify token via API call to your backend
      axios
        .post(`http://127.0.0.1:8000/api/company/verify-token`, { cpm: token }) // API endpoint for token verification
        .then((response) => {
          if (response.data.valid) {
            setIsAuthenticated(true); // Token is valid
          } else {
            setError("Invalid token"); // Token verification failed
            router.push("/"); // Redirect to login page
          }
        })
        .catch((error) => {
          console.log("Token verification failed:", error);
          setError("Token verification failed");
          router.push("/"); // Redirect to login page on error
        })
        .finally(() => {
          setIsLoading(false); // Hide loading after token check
        });
    };

    // Perform the initial check
    verifyToken();

    // Set up an interval to perform the check every 20 minutes
    const intervalId = setInterval(verifyToken, 20 * 60 * 1000);

    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [router]);

  if (isLoading) {
    return (
      <html lang="en">
        <body>
          <div className="h-[100vh] w-[100vw] flex items-center justify-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-orange-700"></div>
          </div>
        </body>
      </html>
    );
  }

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
          <div className="flex md:overflow-hidden flex-1 w-full flex-col ml-0 md:ml-[15vw] h-full">
            <DashboardNavbar />
            <div className="poppins-regular md:pt-16 pb-5">
              {children} {/* Render the protected content here */}
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
