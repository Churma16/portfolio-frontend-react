import { Outlet, useNavigate } from "react-router-dom";
import { HiOutlineHome, HiOutlineCube, HiArrowRightOnRectangle } from "react-icons/hi2";

export default function DashboardLayout() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
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
                    <a href="/dashboard" className="flex items-center gap-3 px-4 py-3 bg-white/5 rounded-lg text-white">
                        <HiOutlineCube className="w-5 h-5 text-lara-blue" />
                        Projects
                    </a>
                    {/* Menu lain bisa ditambah disini (Tech Stack, Tags) */}
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