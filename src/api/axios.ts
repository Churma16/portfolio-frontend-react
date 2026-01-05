import axios from "axios";

const apiClient = axios.create({
    // URL ini harus sesuai dengan alamat server Laravel kamu (biasanya localhost:8000)
    baseURL: import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api/",
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
    // withCredentials wajib true jika kamu menggunakan Laravel Sanctum untuk autentikasi
    withCredentials: true,
});

// Interceptor untuk menangani error secara global
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        // Jika token kadaluarsa (401), kamu bisa arahkan ke halaman login di sini
        if (error.response && error.response.status === 401) {
            console.error("Unauthorized, please login.");
        }
        return Promise.reject(error);
    }
);

export default apiClient;
