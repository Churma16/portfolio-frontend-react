import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiXMark, HiOutlineGlobeAlt } from "react-icons/hi2";
import { SiGithub } from "react-icons/si";
import TechIcon from "../../../../components/common/TechIcon.tsx";
import { Project } from "@/types";
import ProjectCard from "./ProjectCard.tsx";

interface ProjectShowcaseProps {
    projects: Project[];
}

export default function ProjectShowcase({ projects }: ProjectShowcaseProps) {
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const selectedProject = projects.find((p) => p.id === selectedId);

    useEffect(() => {
        if (selectedId) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [selectedId]);

    return (
        <div className="container mx-auto px-4">
            {/* GRID PROJECT */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project, index) => (
                    <ProjectCard
                        key={project.id}
                        index={index}
                        project={project}
                        onClick={() => setSelectedId(project.id)}
                    />
                ))}
            </div>

            {/* --- MODAL POP-UP --- */}
            <AnimatePresence>
                {selectedId && selectedProject && (
                    <>
                        {/* 1. Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            onClick={() => setSelectedId(null)}
                            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60]" // Z-index tinggiin biar aman
                        />

                        {/* 2. Modal Wrapper */}
                        {/* PENTING: Gunakan p-4 atau p-6 agar modal tidak nempel tepi layar HP */}
                        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 pointer-events-none">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                                transition={{ type: "spring", damping: 25, stiffness: 300 }}

                                // --- PERBAIKAN UTAMA DI SINI ---
                                // 1. max-h-[80dvh]: Menggunakan Dynamic Viewport Height agar aman dari address bar HP.
                                // 2. w-full max-w-xl: Membatasi lebar agar tidak terlalu lebar di tablet.
                                // 3. my-auto: Memastikan posisi vertikal di tengah.
                                className="w-full max-w-xl bg-[#0f172a] border border-white/10 rounded-2xl overflow-hidden shadow-2xl pointer-events-auto flex flex-col max-h-[80dvh]"
                            >
                                {/* --- HEADER IMAGE --- */}
                                {/* PERBAIKAN: Tinggi gambar dikurangi jadi h-40 (160px) di HP biar teks muat banyak */}
                                <div className="relative h-55 sm:h-55 shrink-0 bg-slate-900 group">
                                    <img
                                        src={`${import.meta.env.VITE_FILE_URL}${selectedProject.thumbnail}`}
                                        alt={selectedProject.title}
                                        className="w-full h-full object-cover"
                                    />

                                    {/* Gradient overlay biar tombol close makin jelas */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />

                                    {/* Tombol Close - Diperbesar area kliknya biar gampang dipencet di HP */}
                                    <button
                                        onClick={() => setSelectedId(null)}
                                        className="absolute top-3 right-3 p-2 bg-black/40 text-white rounded-full hover:bg-red-500 hover:text-white transition-all backdrop-blur-md border border-white/10 active:scale-95"
                                    >
                                        <HiXMark className="w-6 h-6" />
                                    </button>
                                </div>

                                {/* --- SCROLLABLE CONTENT --- */}
                                {/* overscroll-contain: Mencegah body belakang ikut scroll saat modal mentok */}
                                <div className="flex-1 overflow-y-auto p-5 sm:p-6 bg-[#0f172a] overscroll-contain">

                                    {/* Title & Buttons */}
                                    <div className="flex flex-wrap justify-between items-start gap-4 mb-5">
                                        <h3 className="text-xl sm:text-2xl font-heading font-bold text-white leading-tight flex-1 min-w-[200px]">
                                            {selectedProject.title}
                                        </h3>

                                        <div className="flex items-center gap-2 shrink-0">
                                            {selectedProject.repo_url && (
                                                <a
                                                    href={selectedProject.repo_url}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="flex items-center gap-2 px-3 py-1.5 bg-slate-800 text-white rounded-lg font-bold text-xs hover:bg-slate-700 transition-colors border border-white/10"
                                                >
                                                    <SiGithub className="w-4 h-4" />
                                                    GitHub
                                                </a>
                                            )}
                                            {selectedProject.demo_url && (
                                                <a
                                                    href={selectedProject.demo_url}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="flex items-center gap-2 px-3 py-1.5 bg-lara-blue text-white rounded-lg font-bold text-xs hover:bg-blue-600 transition-colors shadow-lg shadow-blue-500/20"
                                                >
                                                    <HiOutlineGlobeAlt className="w-4 h-4" />
                                                    Demo
                                                </a>
                                            )}
                                        </div>
                                    </div>

                                    {/* Description */}
                                    <div className="prose prose-invert prose-sm max-w-none mb-6 text-slate-300 leading-relaxed text-sm">
                                        <p>{selectedProject.content}</p>
                                    </div>

                                    {/* Tech Stack - Sticky Bottom (Opsional, tapi bagus biar selalu kelihatan) */}
                                    <div className="pt-4 border-t border-white/10">
                                        <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">
                                            Technologies Used
                                        </h4>
                                        <div className="flex flex-wrap gap-2">
                                            {selectedProject.tech_stack?.map((stack, idx) => (
                                                <div
                                                    key={idx}
                                                    className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-2.5 py-1 rounded-full"
                                                >
                                                    <TechIcon
                                                        name={stack.name}
                                                        icon={stack.icon}
                                                        className="w-3.5 h-3.5 text-lara-blue"
                                                    />
                                                    <span className="text-[11px] sm:text-xs text-slate-300 font-medium">
                                                        {stack.name}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}