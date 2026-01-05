import { motion } from "framer-motion";
import {
    SiReact,
    SiLaravel,
    SiMysql,
    SiTailwindcss,
    SiFramer,
    SiRedis,
} from "react-icons/si";

// Komponen Kotak Stack
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
        className="flex-1 bg-[#0a101f] border border-lara-border p-6 rounded-xl relative z-10 w-full max-w-xs shadow-2xl shadow-black/50"
    >
        <div className="flex items-center gap-3 mb-4 border-b border-white/5 pb-3">
            <div className="p-2 bg-lara-blue/10 rounded-lg text-lara-blue">
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
                    <span className="w-1.5 h-1.5 rounded-full bg-lara-blue/50" />
                    {item}
                </li>
            ))}
        </ul>
    </motion.div>
);

// Komponen Panah Animasi (Data Flow)
const DataFlow = ({
    label,
    direction = "right",
}: {
    label: string;
    direction?: "right" | "left";
}) => (
    <div className="hidden lg:flex flex-col items-center justify-center w-32 relative mx-2">
        {/* Label (JSON / SQL) */}
        <span className="absolute -top-6 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
            {label}
        </span>

        {/* Garis */}
        <div className="w-full h-[2px] bg-slate-800 relative overflow-hidden">
            {/* Titik Jalan (Animasi Paket) */}
            <motion.div
                animate={{ x: direction === "right" ? [-20, 140] : [140, -20] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                className="absolute top-0 left-0 w-8 h-full bg-gradient-to-r from-transparent via-lara-blue to-transparent"
            />
        </div>

        {/* Panah Ujung */}
        <div className="absolute w-full flex justify-between px-0 text-slate-800">
            <span>◄</span>
            <span>►</span>
        </div>
    </div>
);

export default function ArchitectureDiagram() {
    return (
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-0 mt-12">
            {/* 1. FRONTEND */}
            <StackBox
                title="Frontend"
                icon={<SiReact className="w-6 h-6" />}
                items={["React 18", "Tailwind CSS", "Framer Motion", "Vite"]}
            />

            {/* Arrow Flow 1 */}
            <DataFlow label="JSON / REST" />

            {/* 2. API / MIDDLEWARE */}
            <StackBox
                title="API Layer"
                icon={<SiLaravel className="w-6 h-6" />}
                items={[
                    "Laravel 11",
                    "Sanctum Auth",
                    "API Resources",
                    "Rate Limiting",
                ]}
            />

            {/* Arrow Flow 2 */}
            <DataFlow label="Eloquent / SQL" />

            {/* 3. BACKEND & DB */}
            <StackBox
                title="Database"
                icon={<SiMysql className="w-6 h-6" />}
                items={[
                    "MySQL 8",
                    "Redis Caching",
                    "Storage Link",
                    "Queue Workers",
                ]}
            />
        </div>
    );
}
