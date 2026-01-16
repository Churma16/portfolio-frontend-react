import axios from "axios";
import {getToken} from "@/lib/auth";

// Buat instance axios khusus untuk API Laravel
const apiClient = axios.create({
    // URL ini harus sesuai dengan alamat server Laravel kamu (biasanya localhost:8000)
    baseURL: import.meta.env.VITE_API_URL || "https://churma.codes/api/",
    headers: {
        Accept: "application/json",
    },
    // Disable withCredentials untuk login (akan enable setelah login)
    withCredentials: false,
});

// Buat request interceptor untuk menambahkan token ke header Authorization
apiClient.interceptors.request.use((config) => {
    // Ambil token dari localStorage
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

// Response interceptor untuk handle error 401 (Unauthorized)
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            console.error("❌ 401 Unauthorized - Token mungkin invalid/expired");
            console.log("Token saat ini:", getToken());
            console.log("Response error:", error.response?.data);
        }
        return Promise.reject(error);
    }
);

export default apiClient;
