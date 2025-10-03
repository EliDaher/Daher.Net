import axios from "axios";

// Create axios instance with default config
export const apiClient = axios.create({
  baseURL:
    import.meta.env.VITE_API_BASE_URL || "https://daherserver-zgmy.onrender.com",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const googleClient = axios.create({
  baseURL:
    import.meta.env.VITE_API_BASE_URL || "https://daherserver-zgmy.onrender.com",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const invoiceClient = axios.create({
  baseURL:
    import.meta.env.VITE_API_BASE_URL || "https://paynet-1.onrender.com",
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem("auth_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle common errors
    /*if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem("auth_token");
      window.location.href = "/Daher.Net/#/login";
    }*/

    return Promise.reject(error);
  },
);

export default apiClient;
