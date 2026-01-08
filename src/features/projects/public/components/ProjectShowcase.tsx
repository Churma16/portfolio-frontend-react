import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    HiXMark,
    HiOutlineGlobeAlt,
    HiOutlineCodeBracket,
} from "react-icons/hi2";
import TechIcon from "../../../../components/common/TechIcon.tsx";
import { Project } from "../../../../types";
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
            {/* Kita tidak perlu layoutId lagi di sini, cukup onClick */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project, index) => (
                    <ProjectCard
                        key={project.id}
                        index={index}
                        project={project}
                        onClick={() => setSelectedId(project.id)}
                        // layoutId tidak wajib lagi, tapi boleh dibiarkan untuk animasi loading awal
                    />
                ))}
            </div>

            {/* --- MODAL POP-UP (Pop In -> Reverse Exit) --- */}
            <AnimatePresence>
                {selectedId && selectedProject && (
                    <>
                        {/* 1. Backdrop Fade In/Out */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            onClick={() => setSelectedId(null)}
                            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
                        />

                        {/* 2. Modal Card Animation */}
                        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
                            <motion.div
                                // --- REVISI TOTAL: HAPUS layoutId, GANTI JADI POP ANIMATION ---
                                initial={{ opacity: 0, scale: 0.9, y: 20 }} // Mulai: Agak kecil, Transparan, Turun dikit
                                animate={{ opacity: 1, scale: 1, y: 0 }} // Masuk: Ukuran normal, Jelas, Posisi pas
                                exit={{ opacity: 0, scale: 0.9, y: 20 }} // Keluar: Balik mengecil & turun (Reverse)
                                // Settingan Spring biar "Pop"-nya enak (kenyal dikit tapi stabil)
                                transition={{
                                    type: "spring",
                                    damping: 25,
                                    stiffness: 300,
                                }}
                                className="w-full max-w-2xl bg-[#0f172a] border border-white/10 rounded-2xl overflow-hidden shadow-2xl pointer-events-auto max-h-[90vh] flex flex-col"
                            >
                                {/* Header Image */}
                                <div className="relative h-64 sm:h-80 shrink-0">
                                    <img
                                        src={`${import.meta.env.VITE_FILE_URL}${
                                            selectedProject.thumbnail
                                        }`}
                                        alt={`${import.meta.env.VITE_FILE_URL}${
                                            selectedProject.thumbnail
                                        }`}
                                        className="w-full h-full object-cover"
                                    />
                                    <button
                                        onClick={() => setSelectedId(null)}
                                        className="absolute top-4 right-4 p-2 bg-black/50 text-white rounded-full hover:bg-red-500 transition-colors backdrop-blur-md"
                                    >
                                        <HiXMark className="w-6 h-6" />
                                    </button>
                                </div>

                                {/* Content */}
                                <div className="p-8 overflow-y-auto bg-[#0f172a]">
                                    <div className="flex justify-between items-start mb-4">
                                        <h3 className="text-3xl font-heading font-bold text-white">
                                            {selectedProject.title}
                                        </h3>

                                        <div className="flex gap-3">
                                            {selectedProject.repo_url && (
                                                <a
                                                    href={
                                                        selectedProject.repo_url
                                                    }
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="p-2 text-slate-400 hover:text-white bg-white/5 rounded-lg border border-white/5 hover:border-white/20 transition-all"
                                                >
                                                    <HiOutlineCodeBracket className="w-6 h-6" />
                                                </a>
                                            )}
                                            {selectedProject.demo_url && (
                                                <a
                                                    href={
                                                        selectedProject.demo_url
                                                    }
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="flex items-center gap-2 px-4 py-2 bg-lara-blue text-white rounded-lg font-bold text-sm hover:bg-blue-600 transition-colors shadow-[0_0_15px_rgba(59,130,246,0.4)]"
                                                >
                                                    <HiOutlineGlobeAlt className="w-5 h-5" />
                                                    Live Demo
                                                </a>
                                            )}
                                        </div>
                                    </div>

                                    <p className="text-slate-300 leading-relaxed mb-8">
                                        {selectedProject.content}
                                    </p>

                                    <div>
                                        <h4 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4">
                                            Tech Stack
                                        </h4>
                                        <div className="flex flex-wrap gap-3">
                                            {selectedProject.tech_stack?.map(
                                                (stack, idx) => (
                                                    <div
                                                        key={idx}
                                                        className="flex items-center gap-2 bg-white/5 border border-white/5 px-3 py-2 rounded-lg"
                                                    >
                                                        <TechIcon
                                                            name={stack.name}
                                                            icon={stack.icon}
                                                            className="w-5 h-5 text-lara-blue"
                                                        />
                                                        <span className="text-sm text-slate-300">
                                                            {stack.name}
                                                        </span>
                                                    </div>
                                                )
                                            )}
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
