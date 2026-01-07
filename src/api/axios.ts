import axios from "axios";
import { getToken } from "@/lib/auth";

const apiClient = axios.create({
    // URL ini harus sesuai dengan alamat server Laravel kamu (biasanya localhost:8000)
    baseURL: import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api/",
    headers: {
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

    // Jangan set Content-Type jika data adalah FormData
    // Biarkan axios dan browser auto-detect sebagai multipart/form-data
    if (config.data instanceof FormData) {
        delete config.headers["Content-Type"];
    }

    return config;
});

export default apiClient;
