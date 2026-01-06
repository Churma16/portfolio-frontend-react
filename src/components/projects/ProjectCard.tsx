import { Project } from "../../types";
import { motion } from "framer-motion";
import TechIcon from "../common/TechIcon";

interface ProjectCardProps {
    project: Project;
    index: number;
    onClick?: () => void;
    layoutId?: string;
}

export default function ProjectCard({
    project,
    index,
    onClick, // <--- Terima prop
    layoutId, // <--- Terima prop
}: ProjectCardProps) {
    return (
        <motion.div
            // Pasang layoutId dari props (Penting buat animasi expand)
            layoutId={layoutId}
            // Pasang onClick handler
            onClick={onClick}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            // Tambahkan cursor-pointer agar terlihat bisa diklik
            className="group flex flex-col overflow-hidden rounded-2xl bg-[#0a101f] border border-lara-border transition-all duration-300 hover:border-lara-blue/50 hover:shadow-2xl hover:shadow-lara-blue/5 h-full cursor-pointer"
        >
            {/* Thumbnail */}
            <div className="relative aspect-video overflow-hidden bg-slate-800">
                <img
                    src={project.thumbnail}
                    alt={project.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-lara-dark/90 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

                {/* Category Badge - Top Left (Glassmorphism with Blue Tint) */}
                {project.tags && project.tags.length > 0 && (
                    <div className="absolute top-3 left-3 z-10">
                        <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-lara-blue/15 backdrop-blur-md text-white text-xs font-bold uppercase tracking-wide shadow-xl border border-lara-blue/30 hover:bg-lara-blue/25 hover:border-lara-blue/50 transition-all duration-300 group-hover:shadow-2xl group-hover:shadow-lara-blue/40">
                            #{project.tags[0].name}
                        </span>
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="flex flex-1 flex-col p-5">
                {/* Tags Kategori (Optional: bisa ditaruh di atas gambar juga) */}
                {project.tags && project.tags.length > 0 && (
                    <div className="mb-3 flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                            <span
                                key={tag.id}
                                className="text-[10px] font-bold tracking-wider uppercase text-slate-400"
                            >
                                #{tag.name}
                            </span>
                        ))}
                    </div>
                )}

                {/* Judul */}
                <h3 className="font-heading text-xl font-bold text-white group-hover:text-lara-blue transition-colors leading-tight mb-2">
                    {project.title}
                </h3>

                {/* Deskripsi */}
                <p className="font-body text-sm leading-relaxed text-slate-400 line-clamp-2 mb-4">
                    {project.content}
                </p>

                {/* Footer: Tech Stack & Link */}
                <div className="mt-auto pt-4 border-t border-white/5">
                    {/* LABEL: Biar HRD tau ini apa */}
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">
                        Built With
                    </p>

                    {/* --- TECH STACK (CHIP STYLE) --- */}
                    <div className="flex flex-wrap gap-2 mb-4">
                        {project.tech_stack?.map((stack) => (
                            <div
                                key={stack.id}
                                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-lara-blue/10 border border-lara-blue/20 text-lara-blue transition-colors hover:bg-lara-blue/20"
                            >
                                {/* 1. Icon Kecil */}
                                <TechIcon
                                    name={stack.name}
                                    icon={stack.icon}
                                    className="w-3.5 h-3.5"
                                />

                                {/* 2. Teks Nama (Jelas & Terbaca) */}
                                <span className="text-[11px] font-medium leading-none pb-[1px]">
                                    {stack.name}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* View Details Button */}
                    <div className="flex items-center text-white font-medium text-sm group/link cursor-pointer hover:text-lara-blue transition-colors">
                        View Project Details
                        <svg
                            className="ml-2 w-4 h-4 transition-transform group-hover/link:translate-x-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17 8l4 4m0 0l-4 4m4-4H3"
                            />
                        </svg>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
