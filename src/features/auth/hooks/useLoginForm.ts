// src/hooks/useLoginForm.ts
import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "@/api/axios.ts";
import { setAdminToken } from "@/lib/auth.ts";

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

            const abilities = response.data.abilities || response.data.data?.abilities || response.data.user?.abilities || ["admin"];

            console.log("Storing abilities:", abilities);
            setAdminToken(token, abilities);

            console.log("After setAdminToken:");
            console.log("Token in localStorage:", localStorage.getItem("token"));
            console.log("Abilities in localStorage:", localStorage.getItem("abilities"));

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