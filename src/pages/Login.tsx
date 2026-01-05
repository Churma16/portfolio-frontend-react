import { useState, useEffect, FormEvent } from "react";
import { motion } from "framer-motion";
import {
    HiOutlineEnvelope,
    HiOutlineLockClosed,
    HiArrowRight,
    HiQrCode,
    HiCommandLine,
} from "react-icons/hi2";
import { CgSpinner } from "react-icons/cg";
import Layout from "../components/layout/Layout";

export default function Login() {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [status, setStatus] = useState<
        "idle" | "loading" | "success" | "error"
    >("idle");
    const [isGlitch, setIsGlitch] = useState(false);

    // --- LOGIKA GLITCH LOOP ---
    useEffect(() => {
        const triggerGlitch = () => {
            setIsGlitch(true);
            setTimeout(() => {
                setIsGlitch(false);
                const nextGlitchTime = Math.random() * 7000 + 8000; // Lebih jarang: 8-15 detik
                setTimeout(triggerGlitch, nextGlitchTime);
            }, 300); // Durasi glitch lebih lama: 300ms
        };
        const initialTimeout = setTimeout(triggerGlitch, 5000); // Mulai glitch lebih lama
        return () => clearTimeout(initialTimeout);
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setStatus("loading");
        setTimeout(() => setStatus("success"), 2000);
    };

    return (
        <Layout>
            <style>{`
                @keyframes glitch-anim-1 {
                    0% { clip-path: inset(20% 0 80% 0); transform: translate(-2px, 1px); }
                    20% { clip-path: inset(60% 0 10% 0); transform: translate(2px, -1px); }
                    40% { clip-path: inset(40% 0 50% 0); transform: translate(-2px, 2px); }
                    60% { clip-path: inset(80% 0 5% 0); transform: translate(2px, -2px); }
                    80% { clip-path: inset(10% 0 70% 0); transform: translate(-1px, 1px); }
                    100% { clip-path: inset(30% 0 20% 0); transform: translate(1px, -1px); }
                }
                
                .hacked-effect {
                    animation: glitch-anim-1 0.6s infinite linear alternate-reverse;
                    background-color: #000 !important;
                    border: 1px solid #0f0 !important;
                    color: #0f0 !important;
                    text-shadow: 2px 0 red, -2px 0 blue;
                    box-shadow: 0 0 15px #0f0;
                    filter: contrast(200%) brightness(150%);
                }
                .hacked-effect input {
                    background-color: #000 !important;
                    color: #0f0 !important;
                    border-color: #0f0 !important;
                    font-family: monospace;
                }
                .hacked-effect button {
                    background-color: #0f0 !important;
                    color: #000 !important;
                    font-weight: 900;
                    text-transform: uppercase;
                }
            `}</style>

            <div className="min-h-screen flex items-center justify-center relative overflow-hidden py-20">
                {/* 1. LAYER BACKGROUND DOTS (NORMAL - TETAP ADA DI BELAKANG) */}
                <div className="absolute inset-0 z-0 pointer-events-none">
                    <div
                        className="absolute inset-0 opacity-[0.2]"
                        style={{
                            backgroundImage:
                                "radial-gradient(#94a3b8 1px, transparent 1px)",
                            backgroundSize: "32px 32px",
                            maskImage:
                                "radial-gradient(circle at center, black 40%, transparent 100%)",
                            WebkitMaskImage:
                                "radial-gradient(circle at center, black 40%, transparent 100%)",
                        }}
                    />
                </div>

                {/* 2. LAYER GLITCH (HACKER) - KITA MASKING DISINI */}
                <div
                    className={`absolute inset-0 z-0 pointer-events-none transition-opacity duration-75 ${
                        isGlitch ? "opacity-100" : "opacity-0"
                    }`}
                    style={{
                        // INI KUNCINYA: Masking diterapkan ke CONTAINER UTAMA glitch
                        // Jadi apapun di dalamnya (kotak hitam, garis hijau) akan terpotong membulat
                        maskImage:
                            "radial-gradient(circle at center, black 0%, black 30%, transparent 70%)",
                        WebkitMaskImage:
                            "radial-gradient(circle at center, black 0%, black 30%, transparent 70%)",
                    }}
                >
                    {/* A. Background Hitam Pekat (Biar teks scanlines hijau kelihatan jelas) */}
                    <div className="absolute inset-0 bg-black" />

                    {/* B. Noise Image */}
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-40 brightness-100 contrast-150" />

                    {/* C. Garis-garis Hijau (Matrix Scanlines) */}
                    <div
                        className="absolute inset-0 bg-green-900/50 mix-blend-screen"
                        style={{
                            backgroundImage: `
                                linear-gradient(rgba(0, 255, 0, 0.1) 50%, rgba(0, 0, 0, 0.25) 50%), 
                                linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))
                            `,
                            backgroundSize: "100% 3px, 3px 100%", // Garis horizontal
                        }}
                    />
                </div>

                {/* 3. GLOW EFFECT (BIAR CANTIK SAAT NORMAL) */}
                <div
                    className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-lara-blue/10 rounded-full blur-[100px] -z-10 transition-opacity duration-100 ${
                        isGlitch ? "opacity-0" : "opacity-100"
                    }`}
                />

                {/* Login Card Container */}
                <div className="relative mx-4">
                    {/* Ghost Element (Efek Bayangan Glitch) */}
                    {isGlitch && (
                        <>
                            <div className="absolute inset-0 bg-red-500/50 translate-x-2 translate-y-1 z-0 rounded-2xl blur-md" />
                            <div className="absolute inset-0 bg-blue-500/50 -translate-x-2 -translate-y-1 z-0 rounded-2xl blur-md" />
                        </>
                    )}

                    <motion.div
                        className={`w-full max-w-md p-8 rounded-2xl shadow-2xl relative z-10 transition-none
                            ${
                                isGlitch
                                    ? "hacked-effect font-mono"
                                    : "bg-[#0a101f]/80 backdrop-blur-md border border-white/10"
                            }
                        `}
                    >
                        {/* Header */}
                        <div className="text-center mb-8">
                            <h1
                                className={`text-3xl font-bold mb-2 ${
                                    !isGlitch && "font-heading text-white"
                                }`}
                            >
                                {isGlitch
                                    ? "⚠️ SYSTEM_BREACH ⚠️"
                                    : "Welcome Back."}
                            </h1>
                            <p
                                className={`text-sm ${
                                    !isGlitch && "text-slate-400"
                                }`}
                            >
                                {isGlitch
                                    ? "UNAUTHORIZED ACCESS DETECTED..."
                                    : "Enter your credentials to access the admin area."}
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-slate-500">
                                    {isGlitch ? "TARGET_ID" : "Email Address"}
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        {isGlitch ? (
                                            <HiCommandLine className="w-5 h-5 animate-pulse" />
                                        ) : (
                                            <HiOutlineEnvelope className="w-5 h-5 text-slate-500" />
                                        )}
                                    </div>
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        className={`w-full rounded-lg pl-10 pr-4 py-3 outline-none transition-none ${
                                            !isGlitch &&
                                            "bg-[#050914]/50 border border-white/10 focus:border-lara-blue text-white placeholder:text-slate-600"
                                        }`}
                                        placeholder={
                                            isGlitch
                                                ? "X_X_X_X"
                                                : "admin@churma.dev"
                                        }
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-slate-500">
                                    {isGlitch ? "DECRYPT_KEY" : "Password"}
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        {isGlitch ? (
                                            <HiQrCode className="w-5 h-5 animate-pulse" />
                                        ) : (
                                            <HiOutlineLockClosed className="w-5 h-5 text-slate-500" />
                                        )}
                                    </div>
                                    <input
                                        type="password"
                                        name="password"
                                        required
                                        value={formData.password}
                                        onChange={handleChange}
                                        className={`w-full rounded-lg pl-10 pr-4 py-3 outline-none transition-none ${
                                            !isGlitch &&
                                            "bg-[#050914]/50 border border-white/10 focus:border-lara-blue text-white placeholder:text-slate-600"
                                        }`}
                                        placeholder="••••••••"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={
                                    status === "loading" || status === "success"
                                }
                                className={`w-full py-3.5 rounded-lg font-bold transition-none flex items-center justify-center gap-2 mt-4 ${
                                    !isGlitch
                                        ? status === "success"
                                            ? "bg-green-500 text-white"
                                            : "bg-lara-blue text-white hover:bg-blue-600"
                                        : ""
                                }`}
                            >
                                {status === "loading" ? (
                                    <>
                                        {" "}
                                        <CgSpinner className="animate-spin w-5 h-5" />{" "}
                                        Processing...{" "}
                                    </>
                                ) : (
                                    <>
                                        {isGlitch
                                            ? "OVERRIDE_SECURITY"
                                            : "Sign In"}{" "}
                                        <HiArrowRight className="w-4 h-4" />
                                    </>
                                )}
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </Layout>
    );
}
