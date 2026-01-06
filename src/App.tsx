import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import halaman-halaman kamu
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard"; // Halaman Admin

// Import Satpam tadi
import ProtectedRoute from "./components/common/ProtectedRoute";
import DashboardLayout from "./components/layout/DashboardLayout"; // Kita buat habis ini
import ProjectList from "./pages/admin/ProjectList"; // Halaman CRUD nanti

function App() {
    return (
        <BrowserRouter>
            {/* Navbar bisa ditaruh di sini kalau mau muncul di semua halaman */}
            <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />

                {/* ADMIN ROUTES (Diproteksi) */}
                <Route element={<ProtectedRoute />}>
                    <Route path="/dashboard" element={<DashboardLayout />}>
                        {/* Halaman Default Dashboard */}
                        <Route index element={<ProjectList />} />
                        {/* Nanti tambah route lain di sini: Create, Edit, dll */}
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
