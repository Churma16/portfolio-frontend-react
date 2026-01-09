import { Navigate, Outlet } from "react-router-dom";
import { isAdmin } from "@/lib/auth";

export default function ProtectedRoute() {
    // Hanya admin yang bisa akses protected route
    const adminStatus = isAdmin();
    console.log("ProtectedRoute - isAdmin():", adminStatus);
    console.log(
        "ProtectedRoute - localStorage.abilities:",
        localStorage.getItem("abilities")
    );
    console.log(
        "ProtectedRoute - localStorage.token:",
        localStorage.getItem("token")
    );

    if (!adminStatus) {
        console.log("Redirecting to /dashboard because isAdmin() is false");
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
}
