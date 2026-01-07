import { Outlet, useNavigate, Link, useLocation } from "react-router-dom";
import { logout } from "@/lib/auth";
import {
    HiOutlineCube,
    HiArrowRightOnRectangle,
    HiCommandLine,
    HiTag,
    HiListBullet,
    HiMiniUser,
} from "react-icons/hi2";

export default function DashboardLayout() {
    const handleLogout = () => {
        logout();
    };

    const location = useLocation();

    // Determine glow color based on current route
    const getGlowColor = () => {
        if (location.pathname === "/admin") return "from-lara-blue";
        if (location.pathname === "/admin/tech-stacks") return "from-cyan-500";
        if (location.pathname === "/admin/tags") return "from-green-500";
        if (location.pathname === "/admin/categories") return "from-purple-500";
        if (location.pathname === "/admin/profile") return "from-pink-500";
        return "from-lara-blue";
    };

    const isActive = (path: string) => location.pathname === path;

    return (
        <div className="flex h-screen bg-[#050914] text-white font-sans relative overflow-hidden">
            <div
                className={`absolute top-0 right-0 w-96 h-96 bg-gradient-to-br ${getGlowColor()} to-transparent rounded-full blur-3xl opacity-20 animate-[pulse_4s_cubic-bezier(0.4,0,0.6,1)_infinite] pointer-events-none`}
            />

            <div
                className={`absolute bottom-1/4 left-1/3 w-96 h-96 bg-gradient-to-br ${getGlowColor()} to-transparent rounded-full blur-3xl opacity-10 animate-[pulse_4s_cubic-bezier(0.4,0,0.6,1)_infinite] pointer-events-none`}
                style={{ animationDelay: "2s" }} // Jeda 2 detik (setengah dari durasi 4 detik)
            />

            {/* SIDEBAR */}
            <aside className="w-64 border-r border-white/10 flex flex-col relative z-10 backdrop-blur-sm bg-[#050914]/80">
                <div className="p-6">
                    <h1 className="text-xl font-bold font-heading text-lara-blue">
                        Admin<span className="text-white">Panel</span>
                    </h1>
                </div>
                <nav className="flex-1 px-4 space-y-2">
                    <Link
                        to="/admin"
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                            isActive("/admin")
                                ? "bg-gradient-to-r from-lara-blue/30 to-lara-blue/10 text-white border border-lara-blue/50 shadow-lg shadow-lara-blue/20"
                                : "bg-transparent text-slate-400 hover:text-white hover:bg-white/5 hover:border hover:border-white/10"
                        }`}
                    >
                        <HiOutlineCube
                            className={`w-5 h-5 ${
                                isActive("/admin") ? "text-lara-blue" : ""
                            }`}
                        />
                        Projects
                    </Link>
                    <Link
                        to="/admin/tech-stacks"
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                            isActive("/admin/tech-stacks")
                                ? "bg-gradient-to-r from-cyan-500/30 to-cyan-500/10 text-white border border-cyan-500/50 shadow-lg shadow-cyan-500/20"
                                : "bg-transparent text-slate-400 hover:text-white hover:bg-white/5 hover:border hover:border-white/10"
                        }`}
                    >
                        <HiCommandLine
                            className={`w-5 h-5 ${
                                isActive("/admin/tech-stacks")
                                    ? "text-cyan-400"
                                    : ""
                            }`}
                        />
                        Tech Stacks
                    </Link>
                    <Link
                        to="/admin/tags"
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                            isActive("/admin/tags")
                                ? "bg-gradient-to-r from-green-500/30 to-green-500/10 text-white border border-green-500/50 shadow-lg shadow-green-500/20"
                                : "bg-transparent text-slate-400 hover:text-white hover:bg-white/5 hover:border hover:border-white/10"
                        }`}
                    >
                        <HiTag
                            className={`w-5 h-5 ${
                                isActive("/admin/tags") ? "text-green-400" : ""
                            }`}
                        />
                        Tags
                    </Link>
                    <Link
                        to="/admin/categories"
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                            isActive("/admin/categories")
                                ? "bg-gradient-to-r from-purple-500/30 to-purple-500/10 text-white border border-purple-500/50 shadow-lg shadow-purple-500/20"
                                : "bg-transparent text-slate-400 hover:text-white hover:bg-white/5 hover:border hover:border-white/10"
                        }`}
                    >
                        <HiListBullet
                            className={`w-5 h-5 ${
                                isActive("/admin/categories")
                                    ? "text-purple-400"
                                    : ""
                            }`}
                        />
                        Categories
                    </Link>
                    <Link
                        to="/admin/profile"
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                            isActive("/admin/profile")
                                ? "bg-gradient-to-r from-pink-500/30 to-pink-500/10 text-white border border-pink-500/50 shadow-lg shadow-pink-500/20"
                                : "bg-transparent text-slate-400 hover:text-white hover:bg-white/5 hover:border hover:border-white/10"
                        }`}
                    >
                        <HiMiniUser
                            className={`w-5 h-5 ${
                                isActive("/admin/profile")
                                    ? "text-pink-400"
                                    : ""
                            }`}
                        />
                        Edit Profile
                    </Link>
                </nav>

                <div className="p-4 border-t border-white/10">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-3 w-full text-left text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors hover:border hover:border-red-500/30"
                    >
                        <HiArrowRightOnRectangle className="w-5 h-5" />
                        Logout
                    </button>
                </div>
            </aside>

            {/* MAIN CONTENT AREA */}
            <main
                className={`flex-1 overflow-y-auto bg-gradient-to-br from-black/40 to-black/60 p-8 relative z-10 backdrop-blur-sm`}
            >
                {/* Content Glow Border */}
                <div
                    className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${getGlowColor()} to-transparent opacity-30`}
                />

                {/* Outlet */}
                <Outlet />
            </main>
        </div>
    );
}
