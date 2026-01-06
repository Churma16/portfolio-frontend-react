import { Outlet, useNavigate, Link } from "react-router-dom";
import { logout } from "@/lib/auth";
import {
    HiOutlineHome,
    HiOutlineCube,
    HiArrowRightOnRectangle,
    HiCommandLine,
    HiTag,
    HiList,

} from "react-icons/hi2";

export default function DashboardLayout() {
    const handleLogout = () => {
        logout();
    };

    return (
        <div className="flex h-screen bg-[#050914] text-white font-sans">
            {/* SIDEBAR */}
            <aside className="w-64 border-r border-white/10 flex flex-col">
                <div className="p-6">
                    <h1 className="text-xl font-bold font-heading text-lara-blue">
                        Admin<span className="text-white">Panel</span>
                    </h1>
                </div>
                <nav className="flex-1 px-4 space-y-2">
                    <Link
                        to="/admin"
                        className="flex items-center gap-3 px-4 py-3 bg-white/5 rounded-lg text-white hover:bg-white/10"
                    >
                        <HiOutlineCube className="w-5 h-5 text-lara-blue" />
                        Projects
                    </Link>
                    <Link
                        to="/admin/tech-stacks"
                        className="flex items-center gap-3 px-4 py-3 bg-transparent rounded-lg text-slate-400 hover:text-white hover:bg-white/5"
                    >
                        <HiCommandLine className="w-5 h-5" />
                        Tech Stacks
                    </Link>
                    <Link
                        to="/admin/tags"
                        className="flex items-center gap-3 px-4 py-3 bg-transparent rounded-lg text-slate-400 hover:text-white hover:bg-white/5"
                    >
                        <HiTag className="w-5 h-5" />
                        Tags
                    </Link>
                    <Link
                        to="/admin/categories"
                        className="flex items-center gap-3 px-4 py-3 bg-transparent rounded-lg text-slate-400 hover:text-white hover:bg-white/5"
                    >
                        {/* <HiList className="w-5 h-5" /> */}
                        Categories
                    </Link>
                </nav>

                <div className="p-4 border-t border-white/10">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-3 w-full text-left text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                    >
                        <HiArrowRightOnRectangle className="w-5 h-5" />
                        Logout
                    </button>
                </div>
            </aside>

            {/* MAIN CONTENT AREA */}
            <main className="flex-1 overflow-y-auto bg-black/20 p-8">
                {/* Di sinilah halaman-halaman admin akan dirender */}
                <Outlet />
            </main>
        </div>
    );
}
