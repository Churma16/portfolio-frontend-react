import axios from "axios";
import { getToken } from "@/lib/auth";

const apiClient = axios.create({
    // URL ini harus sesuai dengan alamat server Laravel kamu (biasanya localhost:8000)
    baseURL: import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api/",
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
    // Disable withCredentials untuk login (akan enable setelah login)
    withCredentials: false,
});

apiClient.interceptors.request.use((config) => {
    // Ambil token dari localStorage atau gunakan guest token
    const token = getToken();

    if (token) {
        // Tempelkan ke header: "Authorization: Bearer 12345abcde..."
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export default apiClient;
