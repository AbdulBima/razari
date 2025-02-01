import axios from "axios";

const companyApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add an interceptor to set Authorization headers dynamically
companyApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("cpm"); // Or get from cookies/session
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default companyApi;
