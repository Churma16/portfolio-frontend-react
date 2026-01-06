import { Navigate, Outlet } from "react-router-dom";
import { isAdmin } from "@/lib/auth";

export default function ProtectedRoute() {
    // Hanya admin yang bisa akses protected route
    if (!isAdmin()) {
        return <Navigate to="/set-token" replace />;
    }

    return <Outlet />;
}
