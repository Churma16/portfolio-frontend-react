import { motion } from "framer-motion";
import {
    SiReact,
    SiLaravel,
    SiMysql,
    SiDigitalocean,
    SiUbuntu,
    SiNginx,
} from "react-icons/si";

// 1. Komponen Kotak Stack (Tidak Berubah)
const StackBox = ({
    title,
    icon,
    items,
}: {
    title: string;
    icon: any;
    items: string[];
}) => (
    <motion.div
        whileHover={{ y: -5 }}
        className="flex-1 bg-[#0a101f] border border-white/10 p-6 rounded-xl relative z-10 w-full min-w-[240px] shadow-2xl shadow-black/50"
    >
        <div className="flex items-center gap-3 mb-4 border-b border-white/5 pb-3">
            <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400">
                {icon}
            </div>
            <h4 className="font-heading font-bold text-white text-lg">
                {title}
            </h4>
        </div>
        <ul className="space-y-2">
            {items.map((item, i) => (
                <li
                    key={i}
                    className="text-slate-400 text-sm font-mono flex items-center gap-2"
                >
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500/50" />
                    {item}
                </li>
            ))}
        </ul>
    </motion.div>
);

// 2. Komponen Panah (Sedikit disesuaikan agar fleksibel)
const DataFlow = ({
    label,
    width = "w-24", // Default width
}: {
    label: string;
    width?: string;
}) => {
    return (
        <div
            className={`hidden lg:flex flex-col items-center justify-center ${width} relative mx-2`}
        >
            <span className="absolute -top-6 text-[10px] font-bold text-slate-500 uppercase tracking-widest whitespace-nowrap">
                {label}
            </span>

            <div className="relative w-full h-[2px] bg-slate-800 flex items-center">
                <div className="absolute top-1/2 -translate-y-1/2 left-0 w-0 h-0 border-y-[5px] border-y-transparent border-r-[8px] border-r-slate-800" />

                <div className="relative w-full h-full overflow-hidden">
                    <motion.div
                        animate={{ x: ["-100%", "400%"] }}
                        transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                        className="absolute top-0 left-0 w-1/4 h-full bg-gradient-to-r from-transparent via-blue-500 to-transparent"
                    />
                </div>

                <div className="absolute top-1/2 -translate-y-1/2 right-0 w-0 h-0 border-y-[5px] border-y-transparent border-l-[8px] border-l-slate-800" />
            </div>
        </div>
    );
};

export default function ArchitectureDiagram() {
    return (
        <div className="flex flex-col lg:flex-row items-center justify-center gap-6 mt-12 w-full max-w-6xl mx-auto px-4">
            {/* ========================================== */}
            {/* AREA 1: CLIENT SIDE (Browser User)         */}
            {/* ========================================== */}
            <div className="flex flex-col items-center gap-2">
                <span className="text-xs text-slate-500 uppercase tracking-widest font-bold mb-2">
                    Client Side
                </span>
                <StackBox
                    title="Frontend"
                    icon={<SiReact className="w-6 h-6" />}
                    items={[
                        "React 18",
                        "Tailwind CSS",
                        "Framer Motion",
                        "Vite",
                    ]}
                />
            </div>

            {/* KONEKSI INTERNET (Jarak Jauh) */}
            <DataFlow label="HTTPS / JSON" width="w-32" />

            {/* ========================================== */}
            {/* AREA 2: SERVER SIDE (DigitalOcean VPS)     */}
            {/* ========================================== */}

            {/* Container Putus-Putus (Wrapper) */}
            <div className="relative border-2 border-dashed border-blue-500/20 bg-blue-500/5 rounded-3xl p-8 pt-10 flex flex-col lg:flex-row items-center gap-4">
                {/* LABEL FLOATING DI ATAS */}
                <div className="absolute -top-4 left-6 bg-[#050914] px-4 py-1.5 border border-blue-500/30 rounded-full flex items-center gap-3 shadow-lg shadow-blue-500/10">
                    <SiDigitalocean className="text-[#0080FF] text-xl" />
                    <div className="h-4 w-[1px] bg-white/10"></div>
                    <div className="flex items-center gap-2 text-xs font-mono text-blue-100">
                        <SiUbuntu className="text-orange-500" />
                        <span>Ubuntu 24.04</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-mono text-green-400 ml-1">
                        <SiNginx />
                        <span>Nginx</span>
                    </div>
                </div>

                {/* SERVER CONTENT */}

                {/* 1. API Layer */}
                <StackBox
                    title="API Layer"
                    icon={<SiLaravel className="w-6 h-6" />}
                    items={[
                        "Laravel 11",
                        "Sanctum Auth",
                        "API Resources",
                        "Queue Workers",
                    ]}
                />

                {/* Koneksi Lokal (Internal Server) */}
                <DataFlow label="Local Socket" width="w-16" />

                {/* 2. Database */}
                <StackBox
                    title="Database"
                    icon={<SiMysql className="w-6 h-6" />}
                    items={[
                        "MySQL 8",
                        "Redis Caching",
                        "Storage Link",
                        "Backup Cron",
                    ]}
                />
            </div>
        </div>
    );
}
