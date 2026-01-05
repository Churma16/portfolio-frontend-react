import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
    // 1. Cek apakah ada token di kantong (LocalStorage)
    const token = localStorage.getItem("token");

    // 2. Logika Satpam
    if (!token) {
        // Kalau gak ada token, paksa pindah ke halaman Login
        return <Navigate to="/login" replace />;
    }

    // 3. Kalau ada token, silakan masuk (Render halaman anak/Outlet)
    return <Outlet />;
}
