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

// KEEP: Auto-detect File objects and convert to FormData
apiClient.interceptors.request.use((config) => {
    // Check if data is already FormData
    if (config.data instanceof FormData) {
        delete config.headers["Content-Type"];
        return config;
    }

    // Check if data contains File object
    if (config.data && typeof config.data === 'object') {
        const hasFile = Object.values(config.data).some(
            (value) => value instanceof File || (Array.isArray(value) && value.some(v => v instanceof File))
        );

        if (hasFile) {
            // Convert object with File to FormData
            const formData = new FormData();

            Object.entries(config.data).forEach(([key, value]) => {
                // Skip null/undefined/empty values
                if (value === null || value === undefined) {
                    return;
                }

                // Handle arrays - stringify them
                if (Array.isArray(value)) {
                    formData.append(key, JSON.stringify(value));
                    return;
                }

                // Skip empty strings
                if (typeof value === 'string' && value.trim() === '') {
                    return;
                }

                // Handle File objects
                if (value instanceof File) {
                    formData.append(key, value);
                    return;
                }

                // Handle all other values - convert to string
                formData.append(key, String(value));
            });

            console.log("📦 FormData Payload:", Array.from(formData.entries()));

            config.data = formData;
            delete config.headers["Content-Type"];
            return config;
        }
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