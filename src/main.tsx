import React from "react";
import ReactDOM from "react-dom/client";
import axios from "axios";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import App from "./App.tsx";
import "./index.css";
import { scan } from "react-scan"

scan({
  enabled: false
})

const queryClient = new QueryClient();

axios.defaults.baseURL = import.meta.env.VITE_API_URL;
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers.post["Accept"] = "application/json";

const getToken = () => localStorage.getItem("token");

axios.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axios.interceptors.response.use(
  (response) => response, // Just return response if OK
  (error) => {
    if (
      error.response?.status === 401 &&
      error.response.data?.message?.toLowerCase().includes("token expired")
    ) {
      // Token expired - clear token and redirect to login page
      localStorage.removeItem("token");
      window.location.href = "/login"; // or use your router to redirect
    }
    return Promise.reject(error);
  }
);


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);
