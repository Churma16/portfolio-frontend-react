import { Project } from "@/types";
import { motion } from "framer-motion";
import TechIcon from "../../../../components/common/TechIcon.tsx";

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
                    src={`${import.meta.env.VITE_FILE_URL}${project.thumbnail}`}
                    alt={project.title}
                    onError={(e) => {
                        e.currentTarget.src =
                            "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2364748b' stroke-width='2'%3E%3Crect x='3' y='3' width='18' height='18' rx='2'/%3E%3Ccircle cx='8.5' cy='8.5' r='1.5'/%3E%3Cpath d='M21 15l-5-5L5 21'/%3E%3C/svg%3E";
                    }}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-lara-dark/90 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

                {/* Category Badge - Top Left */}
                {project.category && (
                    <div className="absolute top-4 left-4 z-10">
                        {project.category.color === "framework" && (
                            <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-cat-framework/20 text-cat-framework-light text-[11px] font-bold uppercase tracking-wider shadow-xl backdrop-blur-xl border border-cat-framework/40 group-hover:shadow-2xl group-hover:shadow-cat-framework/20 transition-all">
                                #{project.category.name}
                            </span>
                        )}
                        {project.category.color === "technique" && (
                            <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-cat-technique/20 text-cat-technique-light text-[11px] font-bold uppercase tracking-wider shadow-xl backdrop-blur-xl border border-cat-technique/40 group-hover:shadow-2xl group-hover:shadow-cat-technique/20 transition-all">
                                #{project.category.name}
                            </span>
                        )}
                        {project.category.color === "testing" && (
                            <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-cat-testing/20 text-cat-testing-light text-[11px] font-bold uppercase tracking-wider shadow-xl backdrop-blur-xl border border-cat-testing/40 group-hover:shadow-2xl group-hover:shadow-cat-testing/20 transition-all">
                                #{project.category.name}
                            </span>
                        )}
                        {project.category.color === "language" && (
                            <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-cat-language/20 text-cat-language-light text-[11px] font-bold uppercase tracking-wider shadow-xl backdrop-blur-xl border border-cat-language/40 group-hover:shadow-2xl group-hover:shadow-cat-language/20 transition-all">
                                #{project.category.name}
                            </span>
                        )}
                        {project.category.color === "tooling" && (
                            <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-cat-tooling/20 text-cat-tooling-light text-[11px] font-bold uppercase tracking-wider shadow-xl backdrop-blur-xl border border-cat-tooling/40 group-hover:shadow-2xl group-hover:shadow-cat-tooling/20 transition-all">
                                #{project.category.name}
                            </span>
                        )}
                        {project.category.color === "devops" && (
                            <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-cat-devops/20 text-cat-devops-light text-[11px] font-bold uppercase tracking-wider shadow-xl backdrop-blur-xl border border-cat-devops/40 group-hover:shadow-2xl group-hover:shadow-cat-devops/20 transition-all">
                                #{project.category.name}
                            </span>
                        )}
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="flex flex-1 flex-col p-5">
                {/* Tags Kategori (Optional: bisa ditaruh di atas gambar juga) */}
                {project.tags && project.tags.length > 0 && (
                    <div className="mb-4 flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                            <span
                                key={tag.id}
                                className="text-[9px] font-bold tracking-widest uppercase text-slate-500 bg-slate-900/40 px-2.5 py-1 rounded-md border border-slate-700/40 hover:border-slate-600/60 transition-colors"
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
