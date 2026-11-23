// src/api/axios.ts
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { getToken, BackendType } from "@/lib/auth";
import { buildFormData, hasFilePayload } from "@/lib/formDataUtils";

// 1. Read the preference IMMEDIATELY (Before React even loads)
const savedBackend = localStorage.getItem("preferred_backend");
const isGo = savedBackend === "go";
const isExpress = savedBackend === "express";
const isSpring = savedBackend === "spring";

// 2. Define the URLs here (so they are available instantly)
const LARAVEL_URL = import.meta.env.VITE_LARAVEL_URL;
const GO_URL = import.meta.env.VITE_GO_URL;
const EXPRESS_URL = import.meta.env.VITE_EXPRESS_URL || "http://localhost:4000/api";
const SPRING_URL = import.meta.env.VITE_SPRING_URL || "https://api-java.churma.codes/api";

// Create a blank instance.
// The Base URL and Headers will be injected dynamically by ApiContext.
const apiClient = axios.create({
    baseURL: isGo ? GO_URL : isExpress ? EXPRESS_URL : isSpring ? SPRING_URL : LARAVEL_URL,
    headers: {
        Accept: "application/json",
    },
    withCredentials: false,
});

// Auto-detect File objects and convert to FormData
apiClient.interceptors.request.use((config) => {
    if (config.data instanceof FormData) {
        delete config.headers["Content-Type"];
        return config;
    }

    if (config.data && typeof config.data === "object" && hasFilePayload(config.data)) {
        config.data = buildFormData(config.data as Record<string, unknown>);
        delete config.headers["Content-Type"];
    }

    return config;
});

// Global Error Handling & Response Normalization
apiClient.interceptors.response.use(
    (response) => {
        // Standardize 204 No Content and empty DELETE responses to transparently provide { success: true }
        if (response.status === 204 || (response.config.method?.toLowerCase() === "delete" && !response.data)) {
            response.data = { success: true };
        }
        return response;
    },
    (error) => {
        if (error.response?.status === 401) {
            console.error("401 Unauthorized - Token Invalid/Expired");
        }
        return Promise.reject(error);
    }
);

export default apiClient;

export const requestBothBackends = async <T = unknown>(
    method: "post" | "put" | "delete",
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
): Promise<AxiosResponse<T> | null> => {
    const backends: readonly BackendType[] = ["laravel", "go", "express", "spring"];
    const activeBackend = (localStorage.getItem("preferred_backend") as BackendType) || "laravel";

    let activeResult: AxiosResponse<T> | null = null;
    let activeError: unknown = null;

    const promises = backends.map(async (backend) => {
        const baseURL =
            backend === "laravel"
                ? import.meta.env.VITE_LARAVEL_URL || "http://localhost:8000/api"
                : backend === "express"
                ? import.meta.env.VITE_EXPRESS_URL || "http://localhost:4000/api"
                : backend === "go"
                ? import.meta.env.VITE_GO_URL || "http://localhost:8080/api"
                : import.meta.env.VITE_SPRING_URL || "https://api-java.churma.codes/api";

        const token = getToken(backend);

        const headers: Record<string, string> = {
            Accept: "application/json",
            ...((config?.headers as Record<string, string>) || {}),
        };
        if (token) {
            headers.Authorization = `Bearer ${token}`;
        }

        let finalMethod = method;
        const finalUrl = url;
        let finalData = data;

        const isUpdate = method === "put";

        if (data instanceof FormData) {
            // Clone FormData for each backend
            const clonedFormData = new FormData();
            for (const [key, value] of data.entries()) {
                clonedFormData.append(key, value);
            }

            if (isUpdate && backend === "laravel") {
                finalMethod = "post";
                if (!clonedFormData.has("_method")) {
                    clonedFormData.append("_method", "PUT");
                }
            }
            finalData = clonedFormData;
        } else if (data && typeof data === "object" && !(data instanceof File) && hasFilePayload(data)) {
            finalData = buildFormData(data as Record<string, unknown>, {
                activeBackend: backend,
                isUpdate,
            });

            if (isUpdate && backend === "laravel") {
                finalMethod = "post";
            }
        }

        try {
            const res = await axios({
                method: finalMethod,
                url: `${baseURL}${finalUrl}`.replace(/([^:])\/\/+/g, "$1/"),
                data: finalData,
                headers,
                ...config,
            });

            if (res.status === 204 || (finalMethod === "delete" && !res.data)) {
                res.data = { success: true } as T;
            }

            if (backend === activeBackend) {
                activeResult = res;
            }
            return res;
        } catch (error) {
            console.error(`Error requesting ${backend}:`, error);
            if (backend === activeBackend) {
                activeError = error;
            }
            throw error;
        }
    });

    await Promise.allSettled(promises);

    if (activeError) {
        throw activeError;
    }
    return activeResult;
};