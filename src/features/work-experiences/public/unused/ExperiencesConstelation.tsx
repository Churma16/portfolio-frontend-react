import { useCallback } from "react";
import Particles from "react-particles";
import { loadSlim } from "tsparticles-slim";
import type { Container, Engine } from "tsparticles-engine";
import { motion } from "framer-motion";

// --- DATA DUMMY ---
const EXPERIENCE_DATA = [
    {
        id: 1,
        role: "Senior Fullstack Engineer",
        company: "Tech Startups Inc.",
        period: "2024 - Present",
        desc: "1. I worked at a coffee shop during the summer to gain experience.\n" +
            "2. My responsibilities included taking orders, making drinks, and ensuring customer satisfaction every day.\n" +
            "3. I learned to work quickly and efficiently in a fast-paced environment.\n" +
            "4. Teamwork was crucial, as we often helped each other during busy rush hours.\n" +
            "5. This experience taught me valuable skills that I will use in my career.",
        tech: ["Laravel", "React", "AWS"],
        pos: { top: "20%", left: "20%" }
    },
    {
        id: 2,
        role: "Backend Developer",
        company: "Digital Solution Agency",
        period: "2022 - 2024",
        desc: "High-performance API design & Database optimization.",
        tech: ["PHP", "Redis", "Go"],
        pos: { top: "50%", left: "70%" }
    },
    {
        id: 3,
        role: "Web Developer",
        company: "Freelance",
        period: "2021 - 2022",
        desc: "UMKM Digitalization & Technical SEO.",
        tech: ["WordPress", "JS", "CSS"],
        pos: { top: "75%", left: "30%" }
    }
];

export default function ExperienceConstellation() {

    const particlesInit = useCallback(async (engine: Engine) => {
        await loadSlim(engine);
    }, []);

    const particlesLoaded = useCallback(async (container: Container | undefined) => {
        // console.log(container);
    }, []);

    return (
        // Pastikan parent ini relative agar partikel terkurung di sini
        <section className="relative w-full h-screen bg-[#050914] overflow-hidden">

            <Particles
                id="tsparticles"
                init={particlesInit}
                loaded={particlesLoaded}
                // Class absolute ini sekarang akan patuh pada parent karena fullScreen dimatikan
                className="absolute inset-0 z-0"
                options={{
                    // --- PERBAIKAN 1: BIAR GAK SELAYAR (Full Screen) ---
                    fullScreen: { enable: false },

                    background: { color: { value: "transparent" } },

                    // --- PERBAIKAN 2: BIAR GAK LAG ---
                    fpsLimit: 60, // Turunkan dari 120 ke 60 (Mata manusia cukup 60)
                    detectRetina: false, // Matikan retina detect biar GPU gak panas render 4K

                    interactivity: {
                        events: {
                            onClick: { enable: true, mode: "push" },
                            onHover: { enable: true, mode: "grab" },
                            resize: true,
                        },
                        modes: {
                            grab: { distance: 140, links: { opacity: 0.5 } }, // Kurangi jarak grab biar hitungan gak berat
                            push: { quantity: 4 },
                        },
                    },
                    particles: {
                        color: { value: "#3b82f6" },
                        links: {
                            color: "#3b82f6",
                            distance: 200,
                            enable: true,
                            opacity: 0.2,
                            width: 1,
                        },
                        move: {
                            direction: "none",
                            enable: true,
                            outModes: { default: "bounce" },
                            random: false,
                            speed: 1, // Perlambat gerakan biar makin smooth & less CPU
                            straight: false,
                        },
                        number: {
                            density: { enable: true, area: 800 },
                            value: 80, // Turunkan jumlah partikel dari 60 ke 40
                        },
                        opacity: { value: 0.5 },
                        shape: { type: "circle" },
                        size: { value: { min: 1, max: 3 } },
                    },
                }}
            />

            {/* --- UI NODES --- */}
            <div className="relative z-10 w-full h-full pointer-events-none">
                <div className="absolute top-10 left-10 pointer-events-auto">
                    <h2 className="text-3xl font-bold text-white mb-2">
                        <span className="text-lara-blue">Constellation</span> Network
                    </h2>
                    <p className="text-slate-400 text-sm">Hover node untuk melihat detail data.</p>
                </div>

                {EXPERIENCE_DATA.map((exp) => (
                    <NodeItem key={exp.id} data={exp} />
                ))}
            </div>
        </section>
    );
}

// --- SUB-COMPONENT TIDAK BERUBAH ---
// --- SUB-COMPONENT: NODE ITEM (Titik Interaktif dengan Orbit Mini) ---
function NodeItem({ data }: any) {
    return (
        <motion.div
            initial="initial"
            whileHover="hover"
            // Tambahkan 'group' di sini untuk deteksi hover parent
            className="absolute pointer-events-auto cursor-pointer flex flex-col items-center justify-center group z-20"
            style={{
                top: data.pos.top,
                left: data.pos.left,
                transform: "translate(-50%, -50%)"
            }}
        >
            {/* === NEW: MINI ORBIT SYSTEM (Hiasan CSS Ringan) === */}
            {/* Container absolut agar posisinya di tengah-tengah titik utama */}
            <div className="absolute pointer-events-none flex items-center justify-center">

                {/* Orbit 1: Sedang, Putar Kanan */}
                <div className="absolute w-[80px] h-[80px] rounded-full border border-blue-500/20 animate-[spin_10s_linear_infinite] group-hover:border-blue-500/40 transition-colors">
                    {/* Satelit Kecil 1 */}
                    <div className="absolute -top-1 left-1/2 w-1.5 h-1.5 bg-blue-400 rounded-full shadow-[0_0_5px_#3b82f6]"></div>
                </div>

                {/* Orbit 2: Besar, Putar Kiri (Reverse), Lebih Lambat */}
                <div className="absolute w-[120px] h-[120px] rounded-full border border-blue-500/10 animate-[spin_25s_linear_infinite_reverse] group-hover:border-blue-500/30 transition-colors">
                    {/* Satelit Kecil 2 (Posisi di bawah) */}
                    <div className="absolute bottom-2 left-1/4 w-1 h-1 bg-blue-300 rounded-full opacity-70"></div>
                </div>

                {/* Orbit 3: Kecil Cepat (Hanya garis tipis miring) */}
                <div className="absolute w-[50px] h-[50px] rounded-full border-t border-r border-blue-400/30 animate-[spin_3s_linear_infinite]"></div>
            </div>
            {/* ================================================== */}


            {/* 1. THE CORE NODE (Titik Utama - Tidak Berubah) */}
            <motion.div
                className="w-4 h-4 rounded-full bg-lara-blue shadow-[0_0_20px_rgba(59,130,246,1)] z-20 relative"
                variants={{
                    initial: { scale: 1 },
                    hover: { scale: 1.5, boxShadow: "0 0 40px rgba(59,130,246,1)" }
                }}
                transition={{ type: "spring", stiffness: 300 }}
            >
                <div className="absolute inset-0 rounded-full border border-lara-blue animate-ping opacity-75"></div>
            </motion.div>

            {/* 2. THE LABEL (Judul & Tahun - Tidak Berubah) */}
            <motion.div
                className="absolute top-8 w-48 text-center z-30"
                variants={{
                    initial: { y: 0, opacity: 0.7 },
                    hover: { y: 5, opacity: 1, color: "#fff" }
                }}
            >
                <div className="text-sm font-bold text-white/80 font-mono tracking-wider">{data.period}</div>
                <div className="text-xs text-lara-blue font-bold uppercase">{data.role}</div>
            </motion.div>

            {/* 3. THE EXPLOSION CARD (Detail Data - Tidak Berubah) */}
            <motion.div
                className="absolute top-20 w-80 bg-[#0a101f]/90 backdrop-blur-md border border-lara-blue/30 p-5 rounded-xl shadow-2xl origin-top z-40"
                variants={{
                    initial: { opacity: 0, scale: 0, height: 0 },
                    hover: {
                        opacity: 1,
                        scale: 1,
                        height: "auto",
                        transition: { duration: 0.3, type: "spring" }
                    }
                }}
            >
                <div className="text-white font-bold text-lg mb-1">{data.company}</div>
                <p className="text-slate-300 text-xs leading-relaxed mb-3 border-l-2 border-lara-blue pl-2">
                    {data.desc}
                </p>
                <div className="flex flex-wrap gap-1">
                    {data.tech.map((t: string, i: number) => (
                        <span key={i} className="text-[10px] px-2 py-0.5 bg-blue-500/20 text-blue-300 rounded border border-blue-500/20">
                            {t}
                        </span>
                    ))}
                </div>
                <div className="absolute -top-4 left-1/2 w-[1px] h-4 bg-lara-blue/50"></div>
            </motion.div>
        </motion.div>
    );
}