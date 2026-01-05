import { useState } from "react";
import apiClient from "../api/axios.ts";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            // 1. Hit API Login Laravel
            const response = await apiClient.post("/login", {
                email,
                password,
            });

            console.log("Response Login:", response.data);

            // 2. Ambil token dari response JSON
            const token =
                response.data.access_token ||
                response.data.token ||
                response.data.data?.access_token;

            if (!token) {
                alert("Login Gagal: Token tidak diterima dari server");
                console.error("Response structure:", response.data);
                return;
            }

            // 3. Simpan ke LocalStorage
            localStorage.setItem("token", token);

            // 4. Redirect ke halaman admin/dashboard
            alert("Login Berhasil!");
            navigate("/admin/dashboard");
        } catch (error: any) {
            console.error("Login Error:", error);
            alert(
                "Login Gagal: " +
                    (error.response?.data?.message ||
                        error.message ||
                        "Unknown error")
            );
        }
    };

    return (
        <form onSubmit={handleLogin} className="p-10 bg-dark-card text-white">
            {/* Input Email & Password biasa di sini */}
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="block mb-4 text-black"
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="block mb-4 text-black"
            />
            <button className="bg-brand px-4 py-2">Login</button>
        </form>
    );
}
