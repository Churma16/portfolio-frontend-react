import {motion} from "framer-motion";
import {HiShieldCheck} from "react-icons/hi2";
import {SiCloudflare, SiDigitalocean, SiGo, SiLaravel, SiMysql, SiPostgresql, SiReact, SiUbuntu, SiExpress} from "react-icons/si";

import {useApi} from "@/contexts/useApi.ts";

// 1. KOMPONEN KARTU (StackBox)
const StackBox = ({title, icon, items, themeColor = "text-blue-400", bgColor = "bg-blue-400"}: {
    title: string;
    icon: React.ReactNode;
    items: string[];
    themeColor?: string;
    bgColor?: string;
}) => (
    // Hapus motion.div di sini, kita pindahkan animasinya ke parent (ShuffleStack)
    // Gunakan div biasa agar tidak konflik dengan animasi parent
    <div className="flex-1 bg-card border border-white/10 p-5 rounded-xl w-full h-full shadow-2xl shadow-black/50">
        <div className="flex items-center gap-3 mb-4 border-b border-white/5 pb-3">
            <div className={`p-2 bg-white/5 rounded-lg ${themeColor}`}>
                {icon}
            </div>
            <h4 className="font-heading font-bold text-foreground text-md">
                {title}
            </h4>
        </div>
        <ul className="space-y-2">
            {items.map((item: string, i: number) => (
                <li
                    key={i}
                    className="text-muted-foreground text-xs font-mono flex items-center gap-2"
                >
                    <span className={`w-1.5 h-1.5 rounded-full ${bgColor}`}/>
                    {item}
                </li>
            ))}
        </ul>
    </div>
);

// 2. WRAPPER ANIMASI SHUFFLE (Grid Stacking)
const ShuffleStack = ({activeId, children}: { activeId: string; children: React.ReactNode[] }) => {
    const order = ['laravel', 'go', 'express'];

    return (
        // Grid trick: menumpuk semua anak di satu sel yang sama
        <div className="grid w-full min-w-[200px]" style={{gridTemplateAreas: "'stack'"}}>
            {children.map((child: any) => {
                // We use child.props.id because we spread {...card} which contains id
                const childId = child.props.id || child.key?.replace('.$', '');
                
                const activeIndex = order.indexOf(activeId) !== -1 ? order.indexOf(activeId) : 0;
                const childIndex = order.indexOf(childId) !== -1 ? order.indexOf(childId) : 0;
                
                // Hitung posisi relatif (0 = depan, 1 = tengah, 2 = belakang)
                const position = (childIndex - activeIndex + 3) % 3;

                let y = 0;
                let x = 0;
                let scale = 1;
                let zIndex = 30;
                let opacity = 1;
                let rotateZ = 0;
                let rotateX = 0;

                if (position === 1) {
                    // Item yang indeksnya "setelah" active (misal active Go, ini Express)
                    y = -20;
                    x = 25; // geser ke KANAN
                    scale = 0.9;
                    zIndex = 20;
                    opacity = 0.8;
                    rotateZ = 4; // miring kanan
                    rotateX = 5;
                } else if (position === 2) {
                    // Item yang indeksnya "sebelum" active (misal active Go, ini Laravel)
                    y = -40;
                    x = -25; // geser ke KIRI
                    scale = 0.8;
                    zIndex = 10;
                    opacity = 0.4;
                    rotateZ = -4; // miring kiri
                    rotateX = 10;
                }

                return (
                    <motion.div
                        key={child.key}
                        style={{gridArea: "stack"}} // Tumpuk di sini
                        initial={false} // Hindari animasi saat mount pertama
                        animate={{
                            y,
                            x,
                            scale,
                            zIndex,
                            opacity,
                            rotateZ,
                            rotateX
                        }}
                        transition={{
                            type: "spring",
                            stiffness: 260,
                            damping: 25
                        }}
                        className="w-full origin-bottom" // Origin bottom agar scale-nya rapi
                    >
                        {child}
                    </motion.div>
                );
            })}
        </div>
    );
};

// ... (DataFlow & VerticalDataFlow SAMA SEPERTI SEBELUMNYA - Copy Paste saja) ...
const DataFlow = ({label, width = "w-24"}: { label: string; width?: string }) => {
    const words = label.split(" ");
    return (
        <div className={`hidden md:flex flex-col items-center justify-center ${width} relative mx-2`}>
            <div className="absolute -top-8 flex flex-col items-center justify-center gap-1.5">
                {words.map((word, i) => (
                    <span key={i}
                          className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest leading-none">
                        {word}
                    </span>
                ))}
            </div>
            <div className="relative w-full h-[2px] bg-border flex items-center">
                <div
                    className="absolute top-1/2 -translate-y-1/2 left-0 w-0 h-0 border-y-[5px] border-y-transparent border-r-[8px] border-r-border"/>
                <div className="relative w-full h-full overflow-hidden">
                    <motion.div
                        animate={{x: ["-100%", "400%"]}}
                        transition={{duration: 1.5, repeat: Infinity, ease: "linear"}}
                        className="absolute top-0 left-0 w-1/4 h-full bg-gradient-to-r from-transparent via-primary to-transparent"
                    />
                </div>
                <div
                    className="absolute top-1/2 -translate-y-1/2 right-0 w-0 h-0 border-y-[5px] border-y-transparent border-l-[8px] border-l-border"/>
            </div>
        </div>
    );
};

const VerticalDataFlow = ({label, height = "h-12"}: { label: string; height?: string }) => {
    return (
        <div className={`md:hidden ${height} w-full flex items-center justify-center relative my-2`}>
            <span
                className="absolute left-[calc(50%+10px)] text-[9px] font-bold text-muted-foreground uppercase tracking-widest origin-left max-w-[100px] break-words">
                {label}
            </span>
            <div className="relative h-full w-[2px] bg-border flex flex-col items-center">
                <div
                    className="absolute left-1/2 -translate-x-1/2 top-0 w-0 h-0 border-x-[5px] border-x-transparent border-b-[8px] border-b-border"/>
                <div className="relative h-full w-full overflow-hidden">
                    <motion.div
                        animate={{y: ["-100%", "400%"]}}
                        transition={{duration: 1.5, repeat: Infinity, ease: "linear"}}
                        className="absolute top-0 left-0 h-1/4 w-full bg-gradient-to-b from-transparent via-primary to-transparent"
                    />
                </div>
                <div
                    className="absolute left-1/2 -translate-x-1/2 bottom-0 w-0 h-0 border-x-[5px] border-x-transparent border-t-[8px] border-t-border"/>
            </div>
        </div>
    );
};

export default function ArchitectureDiagram() {
    const {activeBackend} = useApi();
    const isGo = activeBackend === 'go';

    // KITA DEFINISIKAN SEMUA OPSI KARTU DI SINI
    // (Agar ShuffleStack bisa merender keduanya sekaligus)

    const apiCards = [
        {
            id: "laravel", // Key harus sesuai dengan activeBackend ('laravel')
            title: "API Engine",
            icon: <SiLaravel className="w-6 h-6"/>,
            items: ["Laravel API", "Docker Container", "Queue Worker"],
            themeColor: "text-red-500",
            bgColor: "bg-red-500"
        },
        {
            id: "go", // Key harus sesuai dengan activeBackend ('go')
            title: "API Engine",
            icon: <SiGo className="w-6 h-6"/>,
            items: ["Gin Framework", "Go Routines", "High Performance"],
            themeColor: "text-cyan-400",
            bgColor: "bg-cyan-400"
        },
        {
            id: "express",
            title: "API Engine",
            icon: <SiExpress className="w-6 h-6"/>,
            items: ["Express.js", "Node.js", "Sequelize ORM"],
            themeColor: "text-green-500",
            bgColor: "bg-green-500"
        }
    ];

    const dbCards = [
        {
            id: "laravel",
            title: "Storage & Cache",
            icon: <SiMysql className="w-6 h-6"/>,
            items: ["MySQL 8", "Redis Cache", "Volume Storage"],
            themeColor: "text-blue-500",
            bgColor: "bg-blue-500"
        },
        {
            id: "go",
            title: "Storage & Cache",
            icon: <SiPostgresql className="w-6 h-6"/>,
            items: ["PostgreSQL 15", "Redis Cache", "Volume Storage"],
            themeColor: "text-blue-500",
            bgColor: "bg-blue-500"
        },
        {
            id: "express",
            title: "Storage & Cache",
            icon: <SiMysql className="w-6 h-6"/>,
            items: ["MySQL 8", "Redis Cache", "Volume Storage"],
            themeColor: "text-green-500",
            bgColor: "bg-green-500"
        }
    ];

    return (
        <div
            className="flex flex-col lg:flex-row items-center justify-center gap-4 mt-12 w-full max-w-7xl mx-auto px-4 overflow-x-auto py-10">
            {/* 1. ZONA CLIENT */}
            <div className="flex flex-col items-center gap-2 shrink-0">
                <span
                    className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Client Side</span>
                <StackBox title="Frontend" icon={<SiReact className="w-6 h-6"/>}
                          items={["React SPA", "Browser Runtime", "Axios Http"]} themeColor="text-blue-500"/>
            </div>

            <DataFlow label="HTTPS Request" width="w-24"/>
            <VerticalDataFlow label="HTTPS Request"/>

            {/* 2. ZONA EDGE */}
            <div className="relative flex flex-col items-center gap-2 shrink-0 z-20">
                <span className="text-[10px] text-[#F38020] uppercase tracking-widest font-bold">Edge Network</span>
                <motion.div whileHover={{scale: 1.05}}
                            className="w-48 bg-card border border-[#F38020]/30 p-4 rounded-2xl flex flex-col items-center text-center shadow-[0_0_30px_rgba(243,128,32,0.1)] relative">
                    <div className="absolute inset-0 bg-[#F38020]/5 rounded-2xl blur-xl -z-10"/>
                    <SiCloudflare className="text-[#F38020] text-5xl mb-3"/>
                    <h4 className="font-bold text-foreground text-sm mb-2">Cloudflare CDN</h4>
                    <div className="flex flex-wrap justify-center gap-2">
                        <span
                            className="px-2 py-1 bg-[#F38020]/10 text-[#F38020] text-[10px] rounded-md font-mono flex items-center gap-1"><HiShieldCheck/> DDoS Guard</span>
                        <span className="px-2 py-1 bg-[#F38020]/10 text-[#F38020] text-[10px] rounded-md font-mono">SSL / TLS</span>
                        <span
                            className="px-2 py-1 bg-[#F38020]/10 text-[#F38020] text-[10px] rounded-md font-mono">Cache</span>
                    </div>
                </motion.div>
            </div>

            <DataFlow label="Proxied Traffic" width="w-24"/>
            <VerticalDataFlow label="Proxied Traffic"/>


            {/* 3. ZONA SERVER (SHUFFLE STACKS) */}
            <div
                className="relative border-2 border-dashed border-primary/20 bg-primary/5 rounded-3xl p-6 pt-10 flex flex-col items-center gap-4 shrink-0">
                <div
                    className="absolute -top-4 left-6 bg-background px-4 py-1.5 border border-primary/30 rounded-full flex items-center gap-3 shadow-lg shadow-primary/10">
                    <SiDigitalocean className="text-[#0080FF] text-xl"/>
                    <div className="h-4 w-[1px] bg-muted-foreground/20"></div>
                    <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
                        <SiUbuntu className="text-orange-500"/>
                        <span>VPS (Docker)</span>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-4">

                    {/* 👇 STACK API ENGINE */}
                    <ShuffleStack activeId={activeBackend}>
                        {apiCards.map(card => (
                            <StackBox
                                key={card.id}
                                {...card}
                            />
                        ))}
                    </ShuffleStack>

                    <DataFlow label="" width="w-20"/>
                    <VerticalDataFlow label="Query & Hydrate" height="h-7"/>

                    {/* 👇 STACK DATABASE */}
                    <ShuffleStack activeId={activeBackend}>
                        {dbCards.map(card => (
                            <StackBox
                                key={card.id}
                                {...card}
                            />
                        ))}
                    </ShuffleStack>

                </div>
            </div>
        </div>
    );
}