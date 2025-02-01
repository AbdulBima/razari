import axios from "axios";

const staffApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add an interceptor to set Authorization headers dynamically
staffApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("stf"); // Or get from cookies/session
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default staffApi;
