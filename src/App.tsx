import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import halaman-halaman kamu
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard"; // Halaman Admin

// Import Satpam tadi
import ProtectedRoute from "./components/common/ProtectedRoute";
import DashboardLayout from "./components/layout/DashboardLayout"; // Kita buat habis ini
import ProjectList from "./pages/admin/ProjectList"; // Halaman CRUD nanti
import TechStackList from "./pages/admin/masters/TechStackList";
import TagList from "./pages/admin/masters/TagList";
import CategoryList from "./pages/admin/masters/CategoryList";
import SetToken from "./pages/SetToken";
import ProfileForm from "./pages/admin/ProfileForm";

function App() {
    return (
        <BrowserRouter>
            {/* Navbar bisa ditaruh di sini kalau mau muncul di semua halaman */}
            <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/set-token" element={<SetToken />} />

                {/* ADMIN ROUTES (Diproteksi) */}
                <Route element={<ProtectedRoute />}>
                    <Route path="/admin" element={<DashboardLayout />}>
                        {/* Index = default ketika akses /admin */}
                        <Route index element={<ProjectList />} />
                        <Route path="tech-stacks" element={<TechStackList />} />
                        <Route path="tags" element={<TagList />} />
                        <Route path="categories" element={<CategoryList />} />
                        <Route path="profile" element={<ProfileForm />} />
                        {/* Nanti tambah route lain di sini: Create, Edit, dll */}
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
