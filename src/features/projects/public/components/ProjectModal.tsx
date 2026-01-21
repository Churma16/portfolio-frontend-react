import React from "react";
import {AnimatePresence, motion} from "framer-motion";
import {HiOutlineGlobeAlt, HiXMark} from "react-icons/hi2";
import {SiGithub} from "react-icons/si";
import TechIcon from "@/components/common/TechIcon.tsx";
import {Project} from "@/types";

interface ProjectModalProps {
    selectedId: number | null;
    selectedProject: Project | undefined; // Replace `any` with the appropriate type for `selectedProject`
    setSelectedId: (id: number | null) => void;
    storagePath?: string;
}

export default function ProjectModal({
                                         selectedId,
                                         selectedProject,
                                         setSelectedId,
                                         storagePath,
                                     }: ProjectModalProps) {
    if (!selectedId || !selectedProject) return null;

    return (
        <AnimatePresence>
            <>
                {/* Backdrop */}
                <motion.div
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    exit={{opacity: 0}}
                    transition={{duration: 0.3}}
                    onClick={() => setSelectedId(null)}
                    className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60]"
                />

                {/* Modal Wrapper */}
                <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 pointer-events-none">
                    <motion.div
                        initial={{opacity: 0, scale: 0.95, y: 20}}
                        animate={{opacity: 1, scale: 1, y: 0}}
                        exit={{opacity: 0, scale: 0.95, y: 20}}
                        transition={{type: "spring", damping: 25, stiffness: 300}}
                        className="w-full max-w-xl bg-admin-card border border-white/10 rounded-2xl overflow-hidden shadow-2xl pointer-events-auto flex flex-col max-h-[80dvh]"
                    >
                        {/* Header Image */}
                        <div className="relative h-55 sm:h-55 shrink-0 bg-slate-900 group">
                            <img
                                src={`${storagePath}${selectedProject.thumbnail}`}
                                alt={selectedProject.title}
                                className="w-full h-full object-cover"
                            />
                            <div
                                className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60"/>
                            <button
                                onClick={() => setSelectedId(null)}
                                className="absolute top-3 right-3 p-2 bg-black/40 text-foreground rounded-full hover:bg-red-500 hover:text-foreground transition-all backdrop-blur-md border border-white/10 active:scale-95"
                            >
                                <HiXMark className="w-6 h-6"/>
                            </button>
                        </div>

                        {/* Scrollable Content */}
                        <div className="flex-1 overflow-y-auto p-5 sm:p-6 bg-admin-card overscroll-contain">
                            <div className="flex flex-wrap justify-between items-start gap-4 mb-5">
                                <h3 className="text-xl sm:text-2xl font-heading font-bold text-foreground leading-tight flex-1 min-w-[200px]">
                                    {selectedProject.title}
                                </h3>
                                <div className="flex items-center gap-2 shrink-0">
                                    {selectedProject.repo_url && (
                                        <a
                                            href={selectedProject.repo_url}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="flex items-center gap-2 px-3 py-1.5 bg-slate-800 text-foreground rounded-lg font-bold text-xs hover:bg-slate-700 transition-colors border border-white/10"
                                        >
                                            <SiGithub className="w-4 h-4"/>
                                            GitHub
                                        </a>
                                    )}
                                    {selectedProject.demo_url && (
                                        <a
                                            href={selectedProject.demo_url}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="flex items-center gap-2 px-3 py-1.5 bg-primary text-foreground rounded-lg font-bold text-xs hover:bg-blue-600 transition-colors shadow-lg shadow-blue-500/20"
                                        >
                                            <HiOutlineGlobeAlt className="w-4 h-4"/>
                                            Demo
                                        </a>
                                    )}
                                </div>
                            </div>

                            <div
                                className="prose prose-invert prose-sm max-w-none mb-6 text-slate-300 leading-relaxed text-sm">
                                <p>{selectedProject.content}</p>
                            </div>

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
                                                className="w-3.5 h-3.5 text-primary"
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
        </AnimatePresence>
    );
}
