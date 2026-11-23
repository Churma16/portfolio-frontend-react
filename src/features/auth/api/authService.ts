import axios from "axios";
import apiClient from "@/api/axios.ts";
import { BackendType } from "@/lib/auth.ts";

export interface BackendLoginStrategy {
    getBaseUrl: () => string;
    extractToken: (responseData: Record<string, unknown>) => string | undefined;
}

export const backendLoginStrategies: Record<BackendType, BackendLoginStrategy> = {
    laravel: {
        getBaseUrl: () => import.meta.env.VITE_LARAVEL_URL || "http://localhost:8000/api",
        extractToken: (responseData) =>
            (responseData.access_token as string) ||
            (responseData.token as string) ||
            ((responseData.data as Record<string, unknown>)?.access_token as string),
    },
    go: {
        getBaseUrl: () => import.meta.env.VITE_GO_URL || "http://localhost:8080/api",
        extractToken: (responseData) =>
            (responseData.token as string) ||
            (responseData.access_token as string) ||
            ((responseData.data as Record<string, unknown>)?.token as string),
    },
    express: {
        getBaseUrl: () => import.meta.env.VITE_EXPRESS_URL || "http://localhost:4000/api",
        extractToken: (responseData) =>
            (responseData.token as string) ||
            (responseData.access_token as string) ||
            ((responseData.data as Record<string, unknown>)?.token as string),
    },
    spring: {
        getBaseUrl: () => import.meta.env.VITE_SPRING_URL || "http://localhost:8081/api",
        extractToken: (responseData) =>
            (responseData.token as string) ||
            (responseData.access_token as string) ||
            ((responseData.data as Record<string, unknown>)?.token as string),
    },
};

export const authService = {
    async login(credentials: { email: string; password: string }) {
        const response = await apiClient.post("/login", credentials);
        return response.data;
    },

    async loginToBackend(backend: BackendType, credentials: { email: string; password: string }) {
        const strategy = backendLoginStrategies[backend];
        const targetUrl = `${strategy.getBaseUrl()}/login`;
        const response = await axios.post(targetUrl, credentials, {
            headers: { Accept: "application/json" },
        });
        return {
            data: response.data,
            token: strategy.extractToken(response.data as Record<string, unknown>),
        };
    },

    async changePassword(payload: { old_password: string; new_password: string }) {
        try {
            const response = await apiClient.post("/change-password", payload);
            return response.data;
        } catch (error: unknown) {
            if (axios.isAxiosError(error) && error.response?.status === 404) {
                (error as Record<string, unknown>).isUnsupportedBackend = true;
            }
            throw error;
        }
    },
};
