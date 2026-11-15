import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/common/ProtectedRoute";
import LoadingSpinner from "./components/common/LoadingSpinner.tsx";

// Eager load critical landing page
import Home from "./pages/public/Home.tsx";

// Lazy load secondary public pages
const LoginPage = lazy(() => import("./pages/auth/LoginPage.tsx"));
const SetTokenPage = lazy(() => import("./pages/auth/SetTokenPage.tsx"));
const PrivacyPolicy = lazy(() => import("./pages/public/PrivacyPolicy.tsx"));
const NotFoundPage = lazy(() => import("./pages/public/NotFoundPage.tsx"));

// Lazy load admin pages & layouts
const DashboardLayout = lazy(() => import("@/components/layout/admin/DashboardLayout.tsx"));
const ProjectList = lazy(() => import("@/features/projects/admin/ProjectList.tsx"));
const WorkExperiencesList = lazy(() => import("@/features/work-experiences/admin/WorkExperiencesList.tsx"));
const TechStackList = lazy(() => import("./features/tech-stacks/admin/TechStackList.tsx"));
const TechStackCategoryList = lazy(() => import("./features/tech-stacks/admin/TechStackCategoryList.tsx"));
const TagList = lazy(() => import("./features/tags/admin/TagList.tsx"));
const CategoryList = lazy(() => import("./features/categories/admin/CategoryList.tsx"));
const ProfileForm = lazy(() => import("./features/profile/admin/ProfileForm.tsx"));
const ChangePasswordForm = lazy(() => import("@/features/auth/Public/ChangePasswordForm.tsx"));

if (import.meta.env.PROD) {
    console.log = () => {};
    console.debug = () => {};
}

function PageLoadingFallback() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-background">
            <LoadingSpinner />
        </div>
    );
}

function App() {
    return (
        <BrowserRouter>
            <Suspense fallback={<PageLoadingFallback />}>
                <Routes>
                    {/* Public Routes */}
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/set-token" element={<SetTokenPage />} />
                    <Route path="/privacy-policy" element={<PrivacyPolicy />} />

                    {/* ADMIN ROUTES (Diproteksi) */}
                    <Route element={<ProtectedRoute />}>
                        <Route path="/admin" element={<DashboardLayout />}>
                            <Route index element={<ProjectList />} />
                            <Route path="work-experiences" element={<WorkExperiencesList />} />
                            <Route path="tech-stacks" element={<TechStackList />} />
                            <Route path="tech-stack-categories" element={<TechStackCategoryList />} />
                            <Route path="tags" element={<TagList />} />
                            <Route path="categories" element={<CategoryList />} />
                            <Route path="profile" element={<ProfileForm />} />
                            <Route path="change-password" element={<ChangePasswordForm />} />
                        </Route>
                    </Route>

                    {/* 404 - Catch all undefined routes */}
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </Suspense>
        </BrowserRouter>
    );
}

export default App;
