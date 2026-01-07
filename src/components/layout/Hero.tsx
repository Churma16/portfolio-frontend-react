import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import PixelButton from "../common/PixelButton";
import { PixelChat, PixelDownload, PixelPlay } from "../common/PixelIcon";
import { useProfile } from "../../hooks/useProfile";

export default function Hero() {
    const { data: profile, isLoading, isError } = useProfile();

    return (
        <section className="relative overflow-hidden pt-10 pb-20 lg:pt-20 lg:pb-32">
            {/* 1. Background Glow Effect (Opsional: biar ada aura birunya) */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-lara-blue/20 rounded-full blur-[120px] -z-10 opacity-50" />

            <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12">
                {/* --- KIRI: Teks & CTA --- */}
                <div className="flex-1 text-center lg:text-left space-y-6">
                    {/* Badge 'Available for work' */}
                    <AnimatePresence mode="wait">
                        {profile?.is_hireable ? (
                            <motion.div
                                key="available"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.5 }}
                                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-lara-blue/10 border border-lara-blue/20 text-lara-blue text-xs font-bold uppercase tracking-wider mx-auto lg:mx-0"
                            >
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lara-blue opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-lara-blue"></span>
                                </span>
                                Available for Hire
                            </motion.div>
                        ) : (
                            <motion.div
                                key="not-available"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.5 }}
                                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-500/10 border border-slate-500/20 text-slate-400 text-xs font-bold uppercase tracking-wider mx-auto lg:mx-0"
                            >
                                <span className="relative flex h-2 w-2">
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-slate-400"></span>
                                </span>
                                Not Available
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Headline Utama */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-4xl sm:text-5xl lg:text-7xl font-heading font-extrabold text-white leading-tight"
                    >
                        Ready to Build {""}
                        <br className="hidden lg:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-lara-blue to-cat-technique-light">
                            Scalable Apps.
                        </span>
                    </motion.h1>

                    {/* Deskripsi Diri */}
                    <AnimatePresence mode="wait">
                        {profile ? (
                            <motion.p
                                key="profile-text"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                className="text-lg text-slate-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed"
                            >
                                Hi, I'm{" "}
                                <span className="text-white font-bold">
                                    {profile.name}
                                </span>
                                .{" "}
                                <span
                                    dangerouslySetInnerHTML={{
                                        __html: profile.bio_short || "",
                                    }}
                                />
                            </motion.p>
                        ) : (
                            <motion.div
                                key="profile-skeleton"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                                className="text-lg text-slate-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed space-y-2"
                            >
                                <div className="h-4 bg-slate-700 rounded animate-pulse w-40"></div>
                                <div className="h-4 bg-slate-700 rounded animate-pulse w-48"></div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Tombol CTA (Call to Action) */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        // Gunakan 'flex-wrap' agar tombol turun ke bawah jika layar terlalu sempit
                        className="flex flex-wrap items-center gap-4 pt-6 justify-center lg:justify-start"
                    >
                        {/* 1. Discover (Projects) */}
                        <PixelButton variant="dark" href="#projects">
                            <PixelPlay className="w-5 h-5" />
                            Discover
                        </PixelButton>
                        <a
                            href={`${import.meta.env.VITE_FILE_URL}${
                                profile?.cv_files
                            }`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <PixelButton variant="primary">
                                <PixelDownload className="w-5 h-5" />
                                Resume
                            </PixelButton>
                        </a>

                        {/* 3. Let's Talk (Contact) */}
                        {/* Kita buat variant 'outline' atau 'ghost' opsional, 
                tapi pakai dark/primary juga oke. Disini kita pakai dark biar seimbang. */}
                        <PixelButton variant="dark" href="#contact">
                            <PixelChat className="w-5 h-5" />
                            Contact
                        </PixelButton>
                    </motion.div>
                </div>

                {/* --- KANAN: Foto / Ilustrasi --- */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="flex-1 relative"
                >
                    {/* Lingkaran Dekorasi */}
                    <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-[400px] lg:h-[400px] mx-auto">
                        <div className="absolute inset-0 bg-gradient-to-tr from-lara-blue to-purple-500 rounded-full blur-2xl opacity-20 animate-pulse"></div>

                        {/* GANTI SRC INI DENGAN FOTO KAMU NANTI */}
                        {/* Sementara pakai placeholder kotak rounded */}
                        <div className="relative w-full h-full rounded-3xl bg-slate-800 border border-white/10 overflow-hidden shadow-2xl rotate-3 hover:rotate-0 transition-all duration-500">
                            <AnimatePresence mode="wait">
                                {profile?.avatar ? (
                                    <motion.img
                                        key="avatar-loaded"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.6 }}
                                        src={`${import.meta.env.VITE_FILE_URL}${
                                            profile.avatar
                                        }`}
                                        alt="Fathan Profile"
                                        className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity"
                                    />
                                ) : (
                                    <motion.div
                                        key="avatar-skeleton"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="w-full h-full bg-gradient-to-br from-slate-700 to-slate-800 animate-pulse"
                                    />
                                )}
                            </AnimatePresence>

                            {/* Overlay Code Snippet style (Hiasan) */}
                            <div className="absolute bottom-0 left-0 right-0 p-4 bg-black/60 backdrop-blur-md border-t border-white/10">
                                <div className="flex gap-2 mb-2">
                                    <div className="w-2 h-2 rounded-full bg-red-500" />
                                    <div className="w-2 h-2 rounded-full bg-yellow-500" />
                                    <div className="w-2 h-2 rounded-full bg-green-500" />
                                </div>
                                <p className="text-[10px] font-mono text-green-400">
                                    $ git commit -m "Initial Commit"
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
