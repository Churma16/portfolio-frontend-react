// src/api/axios.ts
import axios from "axios";

// 1. Read the preference IMMEDIATELY (Before React even loads)
const savedBackend = localStorage.getItem('preferred_backend');
const isGo = savedBackend === 'go';

// 2. Define the URLs here (so they are available instantly)
// You can also use import.meta.env.VITE_LARAVEL_URL if you prefer
const LARAVEL_URL = import.meta.env.VITE_LARAVEL_URL;
const GO_URL = import.meta.env.VITE_GO_URL;

// Create a blank instance. 
// The Base URL and Headers will be injected dynamically by ApiContext.
const apiClient = axios.create({
    // If 'go' was saved, use Go URL. Otherwise default to Laravel.
    baseURL: isGo ? GO_URL : LARAVEL_URL,
    headers: {
        Accept: "application/json",
    },
    withCredentials: false,
});

// KEEP: Auto-detect FormData (don't break file uploads)
apiClient.interceptors.request.use((config) => {
    if (config.data instanceof FormData) {
        delete config.headers["Content-Type"];
    }
    return config;
});

// KEEP: Global Error Handling
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            console.error("❌ 401 Unauthorized - Token Invalid/Expired");
        }
        return Promise.reject(error);
    }
);

export default apiClient;