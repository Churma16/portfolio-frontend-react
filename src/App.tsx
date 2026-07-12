import {BrowserRouter, Route, Routes} from "react-router-dom";

// Import halaman-halaman kamu
import Home from "./pages/public/Home.tsx";
import LoginPage from "./pages/auth/LoginPage.tsx";
import NotFoundPage from "./pages/public/NotFoundPage.tsx";
import ProtectedRoute from "./components/common/ProtectedRoute";
import DashboardLayout from '@/components/layout/admin/DashboardLayout.tsx'
import ProjectList from "@/features/projects/admin/ProjectList.tsx";
import TechStackList from "./features/tech-stacks/admin/TechStackList.tsx";
import TagList from "./features/tags/admin/TagList.tsx";
import CategoryList from "./features/categories/admin/CategoryList.tsx";
import SetTokenPage from "./pages/auth/SetTokenPage.tsx";
import PrivacyPolicy from "./pages/public/PrivacyPolicy.tsx";
import ProfileForm from "./features/profile/admin/ProfileForm.tsx";
import WorkExperiencesList from "@/features/work-experiences/admin/WorkExperiencesList.tsx";
import ChangePasswordForm from "@/features/auth/Public/ChangePasswordForm.tsx";

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

import TechStackCategoryList from "./features/tech-stacks/admin/TechStackCategoryList.tsx";

function App() {
    return (
        <BrowserRouter>
            {/* Navbar bisa ditaruh di sini kalau mau muncul di semua halaman */}
            <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Home/>}/>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/set-token" element={<SetTokenPage/>}/>
                <Route path="/privacy-policy" element={<PrivacyPolicy/>}/>

                {/* ADMIN ROUTES (Diproteksi) */}
                <Route element={<ProtectedRoute/>}>
                    <Route path="/admin" element={<DashboardLayout/>}>
                        {/* Index = default ketika akses /admin */}
                        <Route index element={<ProjectList/>}/>
                        <Route path="work-experiences" element={<WorkExperiencesList/>}/>
                        <Route path="tech-stacks" element={<TechStackList/>}/>
                        <Route path="tech-stack-categories" element={<TechStackCategoryList/>}/>
                        <Route path="tags" element={<TagList/>}/>
                        <Route path="categories" element={<CategoryList/>}/>
                        <Route path="profile" element={<ProfileForm/>}/>
                        <Route path="change-password" element={<ChangePasswordForm/>}/>
                        {/* Nanti tambah route lain di sini: Create, Edit, dll */}
                    </Route>
                </Route>

                {/* 404 - Catch all undefined routes */}
                <Route path="*" element={<NotFoundPage/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
