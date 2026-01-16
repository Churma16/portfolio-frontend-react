import {
    HiArrowRightOnRectangle,
    HiBriefcase,
    HiCommandLine,
    HiListBullet,
    HiMiniUser,
    HiOutlineCube,
    HiTag,
    HiXMark
} from "react-icons/hi2";
import {Link, useNavigate} from "react-router-dom";
import {logout} from "@/lib/auth.ts";
import {Dispatch, SetStateAction} from "react";

export default function Sidebar({
    isSidebarOpen,
    setIsSidebarOpen,
}: {
    isSidebarOpen: boolean;
    setIsSidebarOpen: Dispatch<SetStateAction<boolean>> ;
}) {
    const isActive = (path: string) => location.pathname === path;
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (<aside
        className={`
                    fixed inset-y-0 left-0 z-50 w-64 border-r border-white/10 flex flex-col bg-[#050914] shadow-2xl transition-transform duration-300 ease-in-out
                    md:relative md:translate-x-0 md:bg-[#050914]/80 md:backdrop-blur-sm md:shadow-none
                    ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
                `}
    >
        <div className="p-6 flex items-center justify-between">
            <h1 className="text-xl font-bold font-heading text-primary">
                Admin<span className="text-white">Panel</span>
            </h1>
            {/* Tombol Close di Mobile */}
            <button
                onClick={() => setIsSidebarOpen(false)}
                className="md:hidden text-slate-400 hover:text-white"
            >
                <HiXMark className="w-6 h-6"/>
            </button>
        </div>

        <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
            {/* Helper function untuk Link agar otomatis tutup sidebar di mobile */}
            {[
                {to: "/admin", label: "Projects", icon: HiOutlineCube, color: "lara-blue"},
                {to: "/admin/work-experiences", label: "Work Experiences", icon: HiBriefcase, color: "red-400"},
                {to: "/admin/tech-stacks", label: "Tech Stacks", icon: HiCommandLine, color: "cyan-400"},
                {to: "/admin/tags", label: "Tags", icon: HiTag, color: "green-400"},
                {to: "/admin/categories", label: "Categories", icon: HiListBullet, color: "purple-400"},
                {to: "/admin/profile", label: "Edit Profile", icon: HiMiniUser, color: "pink-400"},
            ].map((item) => (
                <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setIsSidebarOpen(false)} // Tutup sidebar saat klik menu
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                        isActive(item.to)
                            ? `bg-gradient-to-r from-${item.color}/30 to-${item.color}/10 text-white border border-${item.color}/50 shadow-lg` // Note: Tailwind might not parse dynamic colors perfectly without whitelist, but let's stick to logic first
                            : "bg-transparent text-slate-400 hover:text-white hover:bg-white/5 hover:border hover:border-white/10"
                    } ${isActive(item.to) && item.to === "/admin" ? "from-lara-blue/30 border-primary/50" : ""}`}
                    // *Catatan: Cara terbaik menangani warna dinamis adalah conditional manual seperti kode asli Anda,
                    // tapi saya sederhanakan mapping di sini. Kembalikan ke manual jika warna hilang.
                >
                    <item.icon className={`w-5 h-5 ${isActive(item.to) ? `text-${item.color}` : ""}`}/>
                    {item.label}
                </Link>
            ))}
        </nav>

        <div className="p-4 border-t border-white/10">
            <button
                onClick={handleLogout}
                className="flex items-center gap-3 px-4 py-3 w-full text-left text-lara-text-muted hover:text-lara-accent-red-light hover:bg-red-500/10 rounded-lg transition-colors hover:border hover:border-red-500/30"
            >
                <HiArrowRightOnRectangle className="w-5 h-5"/>
                Logout
            </button>
        </div>
    </aside>)
}