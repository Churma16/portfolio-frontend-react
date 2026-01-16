import {useState} from "react"; // Tambah useState
import {Outlet, useLocation} from "react-router-dom";
import {HiBars3,} from "react-icons/hi2";
import Sidebar from "@/components/layout/admin/components/Sidebar.tsx";

export default function DashboardLayout() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State untuk mobile menu
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


    return (
        <div className="flex h-screen bg-[#050914] text-white font-sans relative overflow-hidden">
            {/* Background Glows */}
            <div
                className={`absolute top-0 right-0 w-96 h-96 bg-gradient-to-br ${getGlowColor()} to-transparent rounded-full blur-3xl opacity-20 animate-[pulse_4s_cubic-bezier(0.4,0,0.6,1)_infinite] pointer-events-none`}
            />
            <div
                className={`absolute bottom-1/4 left-1/3 w-96 h-96 bg-gradient-to-br ${getGlowColor()} to-transparent rounded-full blur-3xl opacity-10 animate-[pulse_4s_cubic-bezier(0.4,0,0.6,1)_infinite] pointer-events-none`}
                style={{animationDelay: "2s"}}
            />

            {/* --- MOBILE HEADER (Visible only on mobile) --- */}
            <div
                className="md:hidden fixed top-0 left-0 right-0 h-16 bg-[#050914]/90 backdrop-blur-md border-b border-white/10 flex items-center justify-between px-4 z-50">
                <span className="text-lg font-bold font-heading text-primary">
                    Admin<span className="text-white">Panel</span>
                </span>
                <button
                    onClick={() => setIsSidebarOpen(true)}
                    className="p-2 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg"
                >
                    <HiBars3 className="w-6 h-6"/>
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
            <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}/>

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

                <Outlet/>
            </main>
        </div>
    );
}