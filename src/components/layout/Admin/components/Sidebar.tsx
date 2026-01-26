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
import React, {Dispatch, SetStateAction} from "react";
import {BackendToggle} from "@/components/common/BackendToggle.tsx";

// Define menu items with proper color mapping
const MENU_ITEMS = [
    {
        to: "/admin",
        label: "Projects",
        icon: HiOutlineCube,
        bgColor: "bg-blue-500/10",
        borderColor: "border-blue-500/30",
        textColor: "text-blue-400",
        hoverBg: "hover:bg-blue-500/15",
        hoverIcon: "group-hover:text-blue-400"
    },
    {
        to: "/admin/work-experiences",
        label: "Work Experiences",
        icon: HiBriefcase,
        bgColor: "bg-red-500/10",
        borderColor: "border-red-500/30",
        textColor: "text-red-400",
        hoverBg: "hover:bg-red-500/15",
        hoverIcon: "group-hover:text-red-400"
    },
    {
        to: "/admin/tech-stacks",
        label: "Tech Stacks",
        icon: HiCommandLine,
        bgColor: "bg-cyan-500/10",
        borderColor: "border-cyan-500/30",
        textColor: "text-cyan-400",
        hoverBg: "hover:bg-cyan-500/15",
        hoverIcon: "group-hover:text-cyan-400"
    },
    {
        to: "/admin/tags",
        label: "Tags",
        icon: HiTag,
        bgColor: "bg-green-500/10",
        borderColor: "border-green-500/30",
        textColor: "text-green-400",
        hoverBg: "hover:bg-green-500/15",
        hoverIcon: "group-hover:text-green-400"
    },
    {
        to: "/admin/categories",
        label: "Categories",
        icon: HiListBullet,
        bgColor: "bg-purple-500/10",
        borderColor: "border-purple-500/30",
        textColor: "text-purple-400",
        hoverBg: "hover:bg-purple-500/15",
        hoverIcon: "group-hover:text-purple-400"
    },
    {
        to: "/admin/profile",
        label: "Edit Profile",
        icon: HiMiniUser,
        bgColor: "bg-pink-500/10",
        borderColor: "border-pink-500/30",
        textColor: "text-pink-400",
        hoverBg: "hover:bg-pink-500/15",
        hoverIcon: "group-hover:text-pink-400"
    },
];

export default function Sidebar({
                                    isSidebarOpen,
                                    setIsSidebarOpen,
                                }: {
    isSidebarOpen: boolean;
    setIsSidebarOpen: Dispatch<SetStateAction<boolean>>;
}) {
    const isActive = (path: string) => location.pathname === path;
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <aside
            className={`
                fixed inset-y-0 left-0 z-50 w-64 border-r border-white/10 flex flex-col bg-gradient-to-b from-[#0a1428] to-[#050914] shadow-2xl transition-transform duration-300 ease-in-out
                md:relative md:translate-x-0 md:bg-gradient-to-b md:from-[#0a1428]/80 md:to-[#050914]/80 md:backdrop-blur-sm md:shadow-none
                ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
            `}
        >
            {/* Header */}
            <div className="p-6 flex items-center justify-between border-b border-white/5">
                <h1 className="text-xl font-bold font-heading text-primary">
                    Admin<span className="text-white">Panel</span>
                </h1>
                <button
                    onClick={() => setIsSidebarOpen(false)}
                    className="md:hidden text-slate-400 hover:text-white transition-colors"
                >
                    <HiXMark className="w-6 h-6"/>
                </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-3 py-4 space-y-2 overflow-y-auto">
                {MENU_ITEMS.map((item) => (
                    <Link
                        key={item.to}
                        to={item.to}
                        onClick={() => setIsSidebarOpen(false)}
                        className={`
                            flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group
                            ${isActive(item.to)
                            ? `${item.bgColor} ${item.borderColor} border text-white shadow-lg`
                            : `text-slate-400 hover:text-white ${item.hoverBg} border border-transparent hover:border-white/10`
                        }
                        `}
                    >
                        <item.icon
                            className={`w-5 h-5 transition-colors duration-200 ${isActive(item.to) ? item.textColor : item.hoverIcon}`}/>
                        <span className="font-medium text-sm">{item.label}</span>
                    </Link>
                ))}
            </nav>

            {/* Footer */}
            <div className="p-4 space-y-3 border-t border-white/5">
                <div className="flex items-center justify-between px-2">
                    <span className="text-xs font-semibold uppercase tracking-wider text-accent/60">
                        Backend
                    </span>
                    <BackendToggle/>
                </div>
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-4 py-3 w-full text-left text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all duration-200 border border-transparent hover:border-red-500/30 group"
                >
                    <HiArrowRightOnRectangle className="w-5 h-5 transition-colors group-hover:text-red-400"/>
                    <span className="font-medium text-sm">Logout</span>
                </button>
            </div>
        </aside>
    );
}