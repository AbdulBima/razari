"use client"


import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const StaffAuthWrapper = ({ children }: { children: React.ReactNode }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const verifyToken = () => {
      const token = localStorage.getItem("stf");
      if (!token) {
        router.push("/"); // Redirect to login if no token
        return;
      }

      axios
        .post(`http://127.0.0.1:8000/api/staff/verify-token`, { stf: token })
        .then((response) => {
          if (response.data.valid) {
            setIsAuthenticated(true); // Token is valid
          } else {
            setError("Invalid token");
            router.push("/"); // Redirect to login if token is invalid
          }
        })
        .catch((error) => {
          console.log("Token verification failed:", error);
          setError("Token verification failed");
          router.push("/"); // Redirect to login on error
        })
        .finally(() => {
          setIsLoading(false); // Hide loading after verification
        });
    };

    verifyToken();
    const intervalId = setInterval(verifyToken, 20 * 60 * 1000);

    return () => clearInterval(intervalId);
  }, [router]);

  if (isLoading) {
    return (
      <div className="h-[100vh] w-[100vw] flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-orange-700"></div>
      </div>
    );
  }

  return <>{children}</>;
};

export default StaffAuthWrapper;
