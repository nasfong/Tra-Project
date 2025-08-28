import React from "react";
import ReactDOM from "react-dom/client";
import axios from "axios";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import App from "./App.tsx";
import "./index.css";
import { scan } from "react-scan";
import { useAuthStore } from "./store/useStore.ts";
import { Constant } from './lib/constant';

scan({
  enabled: false
});

const queryClient = new QueryClient();

// 🔧 AXIOS GLOBAL SETUP
axios.defaults.baseURL = Constant.API_URL;
axios.defaults.withCredentials = true; // ✅ send cookies (important for sessions)
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers.post["Accept"] = "application/json";

// Attach Authorization header if token exists (used for optional JWT API)
axios.interceptors.request.use(
  (config) => {
    const { token } = useAuthStore.getState()

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle token expiry
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response?.status === 401 &&
      error.response.data?.message?.toLowerCase().includes("token expired")
    ) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// 🔧 BOOTSTRAP
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);
