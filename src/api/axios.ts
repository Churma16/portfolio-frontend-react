import axios from "axios";
import { getToken } from "@/lib/auth";

const apiClient = axios.create({
    // URL ini harus sesuai dengan alamat server Laravel kamu (biasanya localhost:8000)
    baseURL: import.meta.env.VITE_API_URL || "https://churma.codes/api/",
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

// Response interceptor untuk handle error 401 (Unauthorized)
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            console.error("❌ 401 Unauthorized - Token mungkin invalid/expired");
            console.log("Token saat ini:", getToken());
            console.log("Response error:", error.response?.data);

            // Optional: Clear token dan redirect ke login
            // localStorage.removeItem("token");
            // localStorage.removeItem("abilities");
            // window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);

export default apiClient;
