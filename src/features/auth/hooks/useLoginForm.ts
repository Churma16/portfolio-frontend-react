// src/hooks/useLoginForm.ts
import {FormEvent, useState} from "react";
import {useNavigate} from "react-router-dom";
import apiClient from "@/api/axios.ts";
import {setToken} from "@/lib/auth.ts";

export const useLoginForm = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setStatus("loading");
        setErrorMessage("");

        try {
            const response = await apiClient.post("/login", { email, password });
            console.log("Response Login:", response.data);

            const token = response.data.access_token || response.data.token || response.data.data?.access_token;

            if (!token) {
                setStatus("error");
                setErrorMessage("Login Gagal: Token tidak diterima dari server");
                console.error("Response structure:", response.data);
                return;
            }

            setToken(token);
            console.log("Token saved to localStorage:", token);

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