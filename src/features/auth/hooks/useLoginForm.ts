import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BackendType, setToken } from "@/lib/auth.ts";
import { useApi } from "@/contexts/useApi.ts";
import { authService, backendLoginStrategies } from "../api/authService.ts";

export const useLoginForm = () => {
    const navigate = useNavigate();
    const { activeBackend } = useApi();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState("");

    const syncSecondaryBackends = async (
        currentBackend: BackendType,
        userCredentials: { email: string; password: string }
    ) => {
        const allBackends = Object.keys(backendLoginStrategies) as BackendType[];
        const secondaryBackends = allBackends.filter((backend) => backend !== currentBackend);

        const loginPromises = secondaryBackends.map(async (backend) => {
            try {
                const { token } = await authService.loginToBackend(backend, userCredentials);
                if (token) {
                    setToken(token, backend);
                }
            } catch (error) {
                console.warn(`Could not automatically login to secondary backend (${backend}):`, error);
            }
        });

        await Promise.allSettled(loginPromises);
    };

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        setStatus("loading");
        setErrorMessage("");

        try {
            const responseData = await authService.login({ email, password });
            const activeStrategy = backendLoginStrategies[activeBackend];
            const token = activeStrategy.extractToken(responseData as Record<string, unknown>);

            if (!token) {
                setStatus("error");
                setErrorMessage("Login Gagal: Token tidak diterima");
                return;
            }

            setToken(token, activeBackend);

            // Authenticate with remaining backends in parallel
            await syncSecondaryBackends(activeBackend, { email, password });

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

    return { email, setEmail, password, setPassword, status, errorMessage, handleSubmit };
};