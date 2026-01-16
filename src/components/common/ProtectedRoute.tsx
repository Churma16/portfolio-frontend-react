// src/components/ProtectedRoute.tsx
import {Navigate, Outlet} from "react-router-dom";
import {hasToken} from "@/lib/auth";
import {useApi} from "@/contexts/ApiContext";

export default function ProtectedRoute() {
    const {activeBackend} = useApi();

    // Check if we have a token specifically for the active backend
    return hasToken(activeBackend) ? <Outlet/> : <Navigate to="/" replace/>;
}