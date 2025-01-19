"use client"

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export const useAuthGuard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        router.replace("/login"); // Redirect to login if no token
        return;
      }

      try {
        const response = await axios.post("http://127.0.0.1:8000/api/verify-token", { token });
        if (response.data.valid) {
          setIsAuthenticated(true);
        } else {
          setError("Invalid token");
          router.replace("/login"); // Redirect to login if token is invalid
        }
      } catch (err) {
        console.error("Token verification failed:", err);
        setError("Token verification failed");
        router.replace("/login");
      } finally {
        setIsLoading(false);
      }
    };

    verifyToken();
  }, [router]);

  return { isAuthenticated, isLoading, error };
};
