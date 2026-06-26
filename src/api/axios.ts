// src/api/axios.ts
import axios from "axios";

// 1. Read the preference IMMEDIATELY (Before React even loads)
const savedBackend = localStorage.getItem('preferred_backend');
const isGo = savedBackend === 'go';
const isExpress = savedBackend === 'express';

// 2. Define the URLs here (so they are available instantly)
// You can also use import.meta.env.VITE_LARAVEL_URL if you prefer
const LARAVEL_URL = import.meta.env.VITE_LARAVEL_URL;
const GO_URL = import.meta.env.VITE_GO_URL;
const EXPRESS_URL = import.meta.env.VITE_LARAVEL_URL || "http://localhost:8000/api"; // Placeholder

// Create a blank instance. 
// The Base URL and Headers will be injected dynamically by ApiContext.
const apiClient = axios.create({
    // If 'go' or 'express' was saved, use their URL. Otherwise default to Laravel.
    baseURL: isGo ? GO_URL : isExpress ? EXPRESS_URL : LARAVEL_URL,
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

import { getToken } from '@/lib/auth';

export const requestBothBackends = async (
    method: 'post' | 'put' | 'delete',
    url: string,
    data?: any,
    config?: any
) => {
    const backends = ['laravel', 'go', 'express'] as const;
    const activeBackend = localStorage.getItem('preferred_backend') || 'laravel';
    
    let activeResult: any = null;
    let activeError: any = null;

    const promises = backends.map(async (backend) => {
        const baseURL = backend === 'laravel' 
            ? (import.meta.env.VITE_LARAVEL_URL || "http://localhost:8000/api")
            : backend === 'express'
                ? (import.meta.env.VITE_LARAVEL_URL || "http://localhost:8000/api") // Placeholder
                : (import.meta.env.VITE_GO_URL || "http://localhost:8080/api");
            
        const token = getToken(backend);
        
        const headers: any = {
            Accept: "application/json",
            ...(config?.headers || {})
        };
        if (token) {
            headers.Authorization = `Bearer ${token}`;
        }

        let finalMethod = method;
        let finalUrl = url;
        let finalData = data;

        // Laravel PUT with files trick: convert to POST and add _method=PUT
        const isUpdate = method === 'put';
        
        // If data is FormData, we need to handle it per-backend
        if (data instanceof FormData) {
            // We must clone or create a new FormData for each backend to avoid cross-modifying it
            const fd = new FormData();
            for (const [key, value] of data.entries()) {
                fd.append(key, value);
            }
            
            if (isUpdate && backend === 'laravel') {
                finalMethod = 'post';
                if (!fd.has('_method')) {
                    fd.append('_method', 'PUT');
                }
            }
            finalData = fd;
        } else if (data && typeof data === 'object' && !(data instanceof File)) {
            // If data is a plain object, check if it contains any File objects
            const hasFile = Object.values(data).some(
                (value) => value instanceof File || (Array.isArray(value) && value.some(v => v instanceof File))
            );

            if (hasFile) {
                // Convert to FormData
                const formData = new FormData();
                Object.entries(data).forEach(([key, value]) => {
                    if (value === null || value === undefined) return;
                    if (Array.isArray(value)) {
                        formData.append(key, JSON.stringify(value));
                        return;
                    }
                    if (typeof value === 'string' && value.trim() === '') return;
                    if (value instanceof File) {
                        formData.append(key, value);
                        return;
                    }
                    formData.append(key, String(value));
                });

                if (isUpdate && backend === 'laravel') {
                    finalMethod = 'post';
                    formData.append('_method', 'PUT');
                }
                finalData = formData;
            }
        }

        try {
            const res = await axios({
                method: finalMethod,
                url: `${baseURL}${finalUrl}`.replace(/([^:])\/\/+/g, "$1/"),
                data: finalData,
                headers,
                ...config
            });
            
            if (backend === activeBackend) {
                activeResult = res;
            }
            return res;
        } catch (err) {
            console.error(`Error requesting ${backend}:`, err);
            if (backend === activeBackend) {
                activeError = err;
            }
            throw err;
        }
    });

    await Promise.allSettled(promises);

    if (activeError) {
        throw activeError;
    }
    return activeResult;
};