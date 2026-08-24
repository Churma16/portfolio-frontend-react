// src/hooks/useLoginForm.ts
import {FormEvent, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import apiClient from "@/api/axios.ts";
import {BackendType, setToken} from "@/lib/auth.ts";
import {useApi} from "@/contexts/useApi.ts";

interface BackendLoginStrategy {
    getBaseUrl: () => string;
    extractToken: (responseData: any) => string | undefined;
}

const backendLoginStrategies: Record<BackendType, BackendLoginStrategy> = {
    laravel: {
        getBaseUrl: () => import.meta.env.VITE_LARAVEL_URL || "http://localhost:8000/api",
        extractToken: (responseData) => responseData.access_token || responseData.token || responseData.data?.access_token,
    },
    go: {
        getBaseUrl: () => import.meta.env.VITE_GO_URL || "http://localhost:8080/api",
        extractToken: (responseData) => responseData.token || responseData.access_token || responseData.data?.token,
    },
    express: {
        getBaseUrl: () => import.meta.env.VITE_EXPRESS_URL || "http://localhost:4000/api",
        extractToken: (responseData) => responseData.token || responseData.access_token || responseData.data?.token,
    },
    spring: {
        getBaseUrl: () => import.meta.env.VITE_SPRING_URL || "http://localhost:8081/api",
        extractToken: (responseData) => responseData.token || responseData.access_token || responseData.data?.token,
    },
};

export const useLoginForm = () => {
    const navigate = useNavigate();
    const {activeBackend} = useApi();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState("");

    const syncSecondaryBackends = async (currentBackend: BackendType, userCredentials: { email: string; password: string }) => {
        const allBackends = Object.keys(backendLoginStrategies) as BackendType[];
        const secondaryBackends = allBackends.filter((backend) => backend !== currentBackend);

        const loginPromises = secondaryBackends.map(async (backend) => {
            const strategy = backendLoginStrategies[backend];
            const targetUrl = `${strategy.getBaseUrl()}/login`;

            try {
                const response = await axios.post(targetUrl, userCredentials, {
                    headers: { Accept: "application/json" }
                });
                const token = strategy.extractToken(response.data);
                if (token) {
                    setToken(token, backend);
                    console.log(`Token automatically saved to secondary backend: ${backend}_token`);
                }
            } catch (err) {
                console.warn(`Could not automatically login to secondary backend (${backend}):`, err);
            }
        });

        await Promise.allSettled(loginPromises);
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setStatus("loading");
        setErrorMessage("");

        try {
            // Primary backend login via configured axios client
            const response = await apiClient.post("/login", {email, password});
            console.log(`Response Login (${activeBackend}):`, response.data);

            const activeStrategy = backendLoginStrategies[activeBackend];
            const token = activeStrategy.extractToken(response.data);

            if (!token) {
                setStatus("error");
                setErrorMessage("Login Gagal: Token tidak diterima");
                return;
            }

            setToken(token, activeBackend);
            console.log(`Token saved to ${activeBackend}_token`);

            // Authenticate with remaining backends in parallel
            await syncSecondaryBackends(activeBackend, {email, password});

            setStatus("success");
            setTimeout(() => navigate("/admin"), 1500);
        } catch (error: any) {
            console.error("Login Error:", error);
            setStatus("error");
            setErrorMessage(
                "Login Gagal: " + (error.response?.data?.message || error.message || "Unknown error")
            );
        }
    };

    return {email, setEmail, password, setPassword, status, errorMessage, handleSubmit};
};