// src/hooks/useLoginForm.ts
import {FormEvent, useState} from "react";
import {useNavigate} from "react-router-dom";
import apiClient from "@/api/axios.ts";
import {setToken} from "@/lib/auth.ts";
import {useApi} from "@/contexts/ApiContext.tsx";

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