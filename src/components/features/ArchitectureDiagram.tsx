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
}) => {
    // Style panah (segitiga)
    const arrowStyles =
        "absolute top-1/2 -translate-y-1/2 w-0 h-0 border-y-[5px] border-y-transparent";

    return (
        <div className="hidden lg:flex flex-col items-center justify-center w-32 relative mx-2">
            <span className="absolute -top-6 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                {label}
            </span>

            <div className="relative w-full h-[2px] bg-slate-800 flex items-center">
                {/* Panah Kiri */}
                <div
                    className={`${arrowStyles} left-0 border-r-[8px] border-r-slate-800`}
                />

                {/* Container Sinar (Overflow Hidden agar sinar muncul/hilang pas di ujung) */}
                <div className="relative w-full h-full overflow-hidden">
                    <motion.div
                        // PERBAIKAN DI SINI:
                        // Kita ubah jarak tempuhnya menjadi jauh lebih besar (400%)
                        // Karena lebar elemen ini cuma 25% (w-1/4), dia butuh travel 400% untuk sampai ujung.
                        animate={{
                            x:
                                direction === "right"
                                    ? ["-100%", "400%"]
                                    : ["400%", "-100%"],
                        }}
                        transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                        // Kita kecilkan juga lebarnya jadi w-1/4 biar sinarnya lebih tajam/cepat
                        className="absolute top-0 left-0 w-1/4 h-full bg-gradient-to-r from-transparent via-lara-blue to-transparent"
                    />
                </div>

                {/* Panah Kanan */}
                <div
                    className={`${arrowStyles} right-0 border-l-[8px] border-l-slate-800`}
                />
            </div>
        </div>
    );
};

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
