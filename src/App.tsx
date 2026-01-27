import {BrowserRouter, Route, Routes} from "react-router-dom";

// Import halaman-halaman kamu
import Home from "./pages/public/Home.tsx";
import LoginPage from "./pages/auth/LoginPage.tsx";
// Import Satpam tadi
import ProtectedRoute from "./components/common/ProtectedRoute";
import DashboardLayout from "@/components/layout/admin/DashboardLayout.tsx"; // Kita buat habis ini
import ProjectList from "@/features/projects/admin/ProjectList.tsx"; // Halaman CRUD nanti
import TechStackList from "./features/tech-stacks/admin/TechStackList.tsx";
import TagList from "./features/tags/admin/TagList.tsx";
import CategoryList from "./features/categories/admin/CategoryList.tsx";
import SetTokenPage from "./pages/auth/SetTokenPage.tsx";
import ProfileForm from "./features/profile/admin/ProfileForm.tsx";
import WorkExperiencesList from "@/features/work-experiences/admin/WorkExperiencesList.tsx";

if (import.meta.env.PROD) {
    console.log = () => {
    };
    console.error = () => {
    };
    console.debug = () => {
    };
    console.warn = () => {
    };
}

function App() {
    return (
        <BrowserRouter>
            {/* Navbar bisa ditaruh di sini kalau mau muncul di semua halaman */}
            <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Home/>}/>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/set-token" element={<SetTokenPage/>}/>

                {/* ADMIN ROUTES (Diproteksi) */}
                <Route element={<ProtectedRoute/>}>
                    <Route path="/admin" element={<DashboardLayout/>}>
                        {/* Index = default ketika akses /admin */}
                        <Route index element={<ProjectList/>}/>
                        <Route path="work-experiences" element={<WorkExperiencesList/>}/>
                        <Route path="tech-stacks" element={<TechStackList/>}/>
                        <Route path="tags" element={<TagList/>}/>
                        <Route path="categories" element={<CategoryList/>}/>
                        <Route path="profile" element={<ProfileForm/>}/>
                        {/* Nanti tambah route lain di sini: Create, Edit, dll */}
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
