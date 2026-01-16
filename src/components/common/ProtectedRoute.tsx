import {Navigate, Outlet} from "react-router-dom";
import {hasToken} from "@/lib/auth";

export default function ProtectedRoute() {
    return hasToken() ? <Outlet/> : <Navigate to="/" replace/>;
}
