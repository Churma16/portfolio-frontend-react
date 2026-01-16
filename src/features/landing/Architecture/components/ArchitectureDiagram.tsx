import {motion} from "framer-motion";
import {HiShieldCheck} from "react-icons/hi2";
import {SiCloudflare, SiDigitalocean, SiLaravel, SiMysql, SiReact, SiUbuntu,} from "react-icons/si";

// 1. Komponen Kotak Stack (Tidak Berubah)
const StackBox = ({title, icon, items}: {
    title: string;
    icon: React.ReactNode;
    items: string[];
}) => (
    <motion.div
        whileHover={{y: -5}}
        className="flex-1 bg-[#0a101f] border border-white/10 p-5 rounded-xl relative z-10 w-full min-w-[200px] shadow-2xl shadow-black/50"
    >
        <div className="flex items-center gap-3 mb-4 border-b border-white/5 pb-3">
            <div className="p-2 bg-blue-500/10 rounded-lg text-lara-accent-blue-light">
                {icon}
            </div>
            <h4 className="font-heading font-bold text-white text-md">
                {title}
            </h4>
        </div>
        <ul className="space-y-2">
            {items.map((item: string, i: number) => (
                <li
                    key={i}
                    className="text-slate-400 text-xs font-mono flex items-center gap-2"
                >
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500/50"/>
                    {item}
                </li>
            ))}
        </ul>
    </motion.div>
);

const DataFlow = ({
                      label,
                      width = "w-24",
                  }: {
    label: string;
    width?: string;
}) => {
    // 1. Pecah kalimat menjadi array kata
    const words = label.split(" ");

    return (
        <div
            className={`hidden md:flex flex-col items-center justify-center ${width} relative mx-2`}
        >
            {/* 2. Container Label */}
            <div className="absolute -top-8 flex flex-col items-center justify-center gap-1.5">
                {words.map((word, i) => (
                    <span
                        key={i}
                        className="text-[9px] font-bold text-slate-500 uppercase tracking-widest leading-none"
                    >
                        {word}
                    </span>
                ))}
            </div>

            {/* Garis (Tidak Berubah) */}
            <div className="relative w-full h-[2px] bg-slate-800 flex items-center">
                <div
                    className="absolute top-1/2 -translate-y-1/2 left-0 w-0 h-0 border-y-[5px] border-y-transparent border-r-[8px] border-r-slate-800"/>

                <div className="relative w-full h-full overflow-hidden">
                    <motion.div
                        animate={{x: ["-100%", "400%"]}}
                        transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                        className="absolute top-0 left-0 w-1/4 h-full bg-gradient-to-r from-transparent via-blue-500 to-transparent"
                    />
                </div>

                <div
                    className="absolute top-1/2 -translate-y-1/2 right-0 w-0 h-0 border-y-[5px] border-y-transparent border-l-[8px] border-l-slate-800"/>
            </div>
        </div>
    );
};

const VerticalDataFlow = ({label, height = "h-12"}: { label: string; height?: string }) => {
    return (
        <div className={`md:hidden ${height} w-full flex items-center justify-center relative my-2`}>
            {/* Label di samping garis */}
            <span
                className="absolute left-[calc(50%+10px)] text-[9px] font-bold text-slate-500 uppercase tracking-widest origin-left max-w-[100px] break-words">
                {label}
            </span>

            <div className="relative h-full w-[2px] bg-slate-800 flex flex-col items-center">
                {/* Arrow Top */}
                <div
                    className="absolute left-1/2 -translate-x-1/2 top-0 w-0 h-0 border-x-[5px] border-x-transparent border-b-[8px] border-b-slate-800"/>

                <div className="relative h-full w-full overflow-hidden">
                    <motion.div
                        animate={{y: ["-100%", "400%"]}} // Animasi ke bawah (Y axis)
                        transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                        className="absolute top-0 left-0 h-1/4 w-full bg-gradient-to-b from-transparent via-blue-500 to-transparent"
                    />
                </div>

                {/* Arrow Bottom */}
                <div
                    className="absolute left-1/2 -translate-x-1/2 bottom-0 w-0 h-0 border-x-[5px] border-x-transparent border-t-[8px] border-t-slate-800"/>
            </div>
        </div>
    );
};

export default function ArchitectureDiagram() {
    return (
        <div
            className="flex flex-col lg:flex-row items-center justify-center gap-4 mt-12 w-full max-w-7xl mx-auto px-4 overflow-x-auto py-10">
            {/* 1. ZONA CLIENT (USER) */}
            <div className="flex flex-col items-center gap-2 shrink-0">
                <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">
                    Client Side
                </span>
                <StackBox
                    title="Frontend"
                    icon={<SiReact className="w-6 h-6"/>}
                    items={["React SPA", "Browser Runtime", "Axios Http"]}
                />
            </div>

            {/* Panah 1: Request Keluar */}
            <DataFlow label="HTTPS Request" width="w-24"/>
            <VerticalDataFlow label="HTTPS Request"/> {/* Mobile */}


            {/* 2. ZONA EDGE (CLOUDFLARE) - NEW! 🟧 */}
            <div className="relative flex flex-col items-center gap-2 shrink-0 z-20">
                <span className="text-[10px] text-[#F38020] uppercase tracking-widest font-bold">
                    Edge Network
                </span>

                <motion.div
                    whileHover={{scale: 1.05}}
                    className="w-48 bg-[#0a101f] border border-[#F38020]/30 p-4 rounded-2xl flex flex-col items-center text-center shadow-[0_0_30px_rgba(243,128,32,0.1)] relative"
                >
                    {/* Efek Glow Orange */}
                    <div className="absolute inset-0 bg-[#F38020]/5 rounded-2xl blur-xl -z-10"/>

                    <SiCloudflare className="text-[#F38020] text-5xl mb-3"/>

                    <h4 className="font-bold text-white text-sm mb-2">
                        Cloudflare CDN
                    </h4>

                    <div className="flex flex-wrap justify-center gap-2">
                        <span
                            className="px-2 py-1 bg-[#F38020]/10 text-[#F38020] text-[10px] rounded-md font-mono flex items-center gap-1">
                            <HiShieldCheck/> DDoS Guard
                        </span>
                        <span className="px-2 py-1 bg-[#F38020]/10 text-[#F38020] text-[10px] rounded-md font-mono">
                            SSL / TLS
                        </span>
                        <span className="px-2 py-1 bg-[#F38020]/10 text-[#F38020] text-[10px] rounded-md font-mono">
                            Cache
                        </span>
                    </div>
                </motion.div>
            </div>

            {/* Panah 2: Request diteruskan ke Server */}
            <DataFlow label="Proxied Traffic" width="w-24"/>
            <VerticalDataFlow label="Proxied Traffic"/> {/* Mobile */}
            {/* 3. ZONA SERVER (DIGITAL OCEAN) */}
            <div
                className="relative border-2 border-dashed border-blue-500/20 bg-blue-500/5 rounded-3xl p-6 pt-10 flex flex-col items-center gap-4 shrink-0">
                {/* Label Server */}
                <div
                    className="absolute -top-4 left-6 bg-[#050914] px-4 py-1.5 border border-blue-500/30 rounded-full flex items-center gap-3 shadow-lg shadow-blue-500/10">
                    <SiDigitalocean className="text-[#0080FF] text-xl"/>
                    <div className="h-4 w-[1px] bg-white/10"></div>
                    <div className="flex items-center gap-2 text-xs font-mono text-lara-accent-blue-lighter">
                        <SiUbuntu className="text-orange-500"/>
                        <span>VPS (Docker)</span>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-4">
                    <StackBox
                        title="API Engine"
                        icon={<SiLaravel className="w-6 h-6"/>}
                        items={[
                            "Laravel API",
                            "Docker Container",
                            "Queue Worker",
                        ]}
                    />
                    {/* Local Connection */}
                    <DataFlow label="" width="w-10"/>
                    <VerticalDataFlow label="Query & Hydrate" height="h-7"/> {/* Mobile */}
                    <StackBox
                        title="Storage & Cache"
                        icon={<SiMysql className="w-6 h-6"/>}
                        items={["MySQL 8", "Redis Cache", "Volume Storage"]}
                    />
                </div>
            </div>
        </div>
    );
}
