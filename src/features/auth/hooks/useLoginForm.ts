// src/hooks/useLoginForm.ts
import {FormEvent, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import apiClient from "@/api/axios.ts";
import {setToken} from "@/lib/auth.ts";
import {useApi} from "@/contexts/useApi.ts";

export const useLoginForm = () => {
    const navigate = useNavigate();
    const {activeBackend} = useApi(); // Get current backend

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setStatus("loading");
        setErrorMessage("");

        try {
            // This will automatically go to Laravel OR Go based on Context
            const response = await apiClient.post("/login", {email, password});
            console.log(`Response Login (${activeBackend}):`, response.data);

            const token = response.data.access_token || response.data.token || response.data.data?.access_token;

            if (!token) {
                setStatus("error");
                setErrorMessage("Login Gagal: Token tidak diterima");
                return;
            }

            // PASS THE BACKEND TYPE to setToken!
            setToken(token, activeBackend);
            console.log(`Token saved to ${activeBackend}_token`);

            // Attempt to login to the other backends in parallel/background so all stay logged in
            const allBackends = ["laravel", "go", "express"] as const;
            const otherBackends = allBackends.filter(b => b !== activeBackend);

            for (const backend of otherBackends) {
                const url = backend === "laravel"
                    ? (import.meta.env.VITE_LARAVEL_URL || "http://localhost:8000/api")
                    : backend === "express"
                        ? (import.meta.env.VITE_EXPRESS_URL || "http://localhost:4000/api")
                        : (import.meta.env.VITE_GO_URL || "http://localhost:8080/api");

                try {
                    const otherResponse = await axios.post(`${url}/login`, {email, password}, {
                        headers: { Accept: "application/json" }
                    });
                    const otherToken = otherResponse.data.access_token || otherResponse.data.token || otherResponse.data.data?.access_token;
                    if (otherToken) {
                        setToken(otherToken, backend);
                        console.log(`Token automatically saved to secondary backend: ${backend}_token`);
                    }
                } catch (err) {
                    console.warn(`Could not automatically login to secondary backend (${backend}):`, err);
                }
            }

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