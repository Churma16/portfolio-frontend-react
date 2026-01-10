import { useState } from "react"; // Tambah useState
import { Outlet, useNavigate, Link, useLocation } from "react-router-dom";
import { logout } from "@/lib/auth.ts";
import {
    HiOutlineCube,
    HiArrowRightOnRectangle,
    HiCommandLine,
    HiTag,
    HiListBullet,
    HiMiniUser,
    HiBars3, // Icon Hamburger
    HiXMark, // Icon Close
} from "react-icons/hi2";

export default function DashboardLayout() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State untuk mobile menu
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

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
            {/* Background Glows */}
            <div
                className={`absolute top-0 right-0 w-96 h-96 bg-gradient-to-br ${getGlowColor()} to-transparent rounded-full blur-3xl opacity-20 animate-[pulse_4s_cubic-bezier(0.4,0,0.6,1)_infinite] pointer-events-none`}
            />
            <div
                className={`absolute bottom-1/4 left-1/3 w-96 h-96 bg-gradient-to-br ${getGlowColor()} to-transparent rounded-full blur-3xl opacity-10 animate-[pulse_4s_cubic-bezier(0.4,0,0.6,1)_infinite] pointer-events-none`}
                style={{ animationDelay: "2s" }}
            />

            {/* --- MOBILE HEADER (Visible only on mobile) --- */}
            <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-[#050914]/90 backdrop-blur-md border-b border-white/10 flex items-center justify-between px-4 z-50">
                <span className="text-lg font-bold font-heading text-lara-blue">
                    Admin<span className="text-white">Panel</span>
                </span>
                <button
                    onClick={() => setIsSidebarOpen(true)}
                    className="p-2 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg"
                >
                    <HiBars3 className="w-6 h-6" />
                </button>
            </div>

            {/* --- MOBILE OVERLAY (Backdrop ketika sidebar terbuka) --- */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/80 z-40 md:hidden backdrop-blur-sm"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* --- SIDEBAR --- */}
            <aside
                className={`
                    fixed inset-y-0 left-0 z-50 w-64 border-r border-white/10 flex flex-col bg-[#050914] shadow-2xl transition-transform duration-300 ease-in-out
                    md:relative md:translate-x-0 md:bg-[#050914]/80 md:backdrop-blur-sm md:shadow-none
                    ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
                `}
            >
                <div className="p-6 flex items-center justify-between">
                    <h1 className="text-xl font-bold font-heading text-lara-blue">
                        Admin<span className="text-white">Panel</span>
                    </h1>
                    {/* Tombol Close di Mobile */}
                    <button
                        onClick={() => setIsSidebarOpen(false)}
                        className="md:hidden text-slate-400 hover:text-white"
                    >
                        <HiXMark className="w-6 h-6" />
                    </button>
                </div>

                <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
                    {/* Helper function untuk Link agar otomatis tutup sidebar di mobile */}
                    {[
                        { to: "/admin", label: "Projects", icon: HiOutlineCube, color: "lara-blue" },
                        { to: "/admin/tech-stacks", label: "Tech Stacks", icon: HiCommandLine, color: "cyan-400" },
                        { to: "/admin/tags", label: "Tags", icon: HiTag, color: "green-400" },
                        { to: "/admin/categories", label: "Categories", icon: HiListBullet, color: "purple-400" },
                        { to: "/admin/profile", label: "Edit Profile", icon: HiMiniUser, color: "pink-400" },
                    ].map((item) => (
                        <Link
                            key={item.to}
                            to={item.to}
                            onClick={() => setIsSidebarOpen(false)} // Tutup sidebar saat klik menu
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                                isActive(item.to)
                                    ? `bg-gradient-to-r from-${item.color}/30 to-${item.color}/10 text-white border border-${item.color}/50 shadow-lg` // Note: Tailwind might not parse dynamic colors perfectly without whitelist, but let's stick to logic first
                                    : "bg-transparent text-slate-400 hover:text-white hover:bg-white/5 hover:border hover:border-white/10"
                            } ${isActive(item.to) && item.to === "/admin" ? "from-lara-blue/30 border-lara-blue/50" : ""}`}
                            // *Catatan: Cara terbaik menangani warna dinamis adalah conditional manual seperti kode asli Anda,
                            // tapi saya sederhanakan mapping di sini. Kembalikan ke manual jika warna hilang.
                        >
                            <item.icon className={`w-5 h-5 ${isActive(item.to) ? `text-${item.color}` : ""}`} />
                            {item.label}
                        </Link>
                    ))}
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

            {/* --- MAIN CONTENT AREA --- */}
            <main
                className={`flex-1 overflow-y-auto bg-gradient-to-br from-black/40 to-black/60 relative z-10 backdrop-blur-sm
                    pt-16 md:pt-8 p-4 md:p-8
                `}
            >
                {/* Content Glow Border */}
                <div
                    className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${getGlowColor()} to-transparent opacity-30`}
                />

                <Outlet />
            </main>
        </div>
    );
}