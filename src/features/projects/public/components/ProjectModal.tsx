import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { HiOutlineGlobeAlt, HiOutlineMagnifyingGlassPlus, HiXMark } from "react-icons/hi2";
import { SiGithub } from "react-icons/si";
import TechIcon from "@/components/common/TechIcon.tsx";
import { Project } from "@/types";

interface ProjectModalProps {
    selectedId: number | null;
    selectedProject: Project | undefined;
    setSelectedId: (id: number | null) => void;
    storagePath?: string;
}

const getFormattedUrl = (demoUrl?: string, projectSlug?: string): string => {
    if (demoUrl) {
        try {
            const parsedUrl = new URL(demoUrl.startsWith("http") ? demoUrl : `https://${demoUrl}`);
            return parsedUrl.hostname;
        } catch {
            return demoUrl.replace(/^https?:\/\//, "").split("/")[0];
        }
    }
    return `${projectSlug || "project"}.churma.codes`;
};

export default function ProjectModal({
                                         selectedId,
                                         selectedProject,
                                         setSelectedId,
                                         storagePath,
                                     }: ProjectModalProps) {
    const [isImageZoomed, setIsImageZoomed] = useState<boolean>(false);

    useEffect(() => {
        const handleKeyDown = (keyboardEvent: KeyboardEvent) => {
            if (keyboardEvent.key === "Escape") {
                setIsImageZoomed(false);
            }
        };

        if (isImageZoomed) {
            document.addEventListener("keydown", handleKeyDown);
        }

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [isImageZoomed]);

    if (!selectedId || !selectedProject) return null;

    const addressBarUrl = getFormattedUrl(selectedProject.demo_url, selectedProject.slug);

    return createPortal(
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
                <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-6 pointer-events-none">
                    <motion.div
                        initial={{opacity: 0, scale: 0.95, y: 20}}
                        animate={{opacity: 1, scale: 1, y: 0}}
                        exit={{opacity: 0, scale: 0.95, y: 20}}
                        transition={{type: "spring", damping: 25, stiffness: 300}}
                        className="w-full max-w-xl lg:max-w-5xl bg-admin-card border border-white/10 rounded-2xl overflow-hidden shadow-2xl pointer-events-auto flex flex-col lg:flex-row max-h-[85dvh]"
                    >
                        {/* Mobile Header Image (< lg) */}
                        <div className="relative h-55 shrink-0 bg-slate-900 group block lg:hidden">
                            <img
                                src={`${storagePath}${selectedProject.thumbnail}`}
                                alt={selectedProject.title}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
                            
                            {/* Close Button Mobile */}
                            <button
                                type="button"
                                onClick={() => setSelectedId(null)}
                                aria-label="Close modal"
                                className="absolute top-3 right-3 p-2 bg-black/40 text-foreground rounded-full hover:bg-red-500 hover:text-foreground transition-all backdrop-blur-md border border-white/10 active:scale-95"
                            >
                                <HiXMark className="w-6 h-6"/>
                            </button>
                        </div>

                        {/* Desktop Browser Showcase Panel (>= lg) */}
                        <div className="hidden lg:flex lg:w-1/2 p-6 lg:p-8 bg-black/20 flex-col items-center justify-center gap-5 border-r border-white/10 shrink-0 overflow-y-auto">
                            <div className="w-full rounded-xl overflow-hidden border border-white/15 shadow-2xl bg-slate-950/80 ring-1 ring-white/5 group">
                                {/* Browser Top Bar */}
                                <div className="h-8 bg-white/5 border-b border-white/10 flex items-center px-3 gap-2 shrink-0">
                                    {/* Traffic Light Dots */}
                                    <div className="flex items-center gap-1.5 shrink-0">
                                        <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]/90 border border-[#e0443e]/50" />
                                        <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]/90 border border-[#dea123]/50" />
                                        <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]/90 border border-[#1aab29]/50" />
                                    </div>

                                    {/* Address Bar */}
                                    <div className="flex-1 max-w-[220px] mx-auto h-5 bg-white/10 rounded-md px-2 flex items-center justify-center gap-1 text-[10px] text-muted-foreground font-mono truncate">
                                        <HiOutlineGlobeAlt className="w-3 h-3 shrink-0 opacity-70" />
                                        <span className="truncate">{addressBarUrl}</span>
                                    </div>
                                    
                                    {/* Spacer for visual symmetry */}
                                    <div className="w-9 shrink-0" />
                                </div>

                                {/* Viewport Image 16:9 (Click to Zoom) */}
                                <div
                                    onClick={() => setIsImageZoomed(true)}
                                    className="relative aspect-video w-full bg-slate-900 overflow-hidden cursor-zoom-in group/image"
                                    title="Klik untuk memperbesar gambar"
                                >
                                    <img
                                        src={`${storagePath}${selectedProject.thumbnail}`}
                                        alt={selectedProject.title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover/image:scale-105"
                                    />
                                    {/* Zoom Hint Icon */}
                                    <div className="absolute bottom-2.5 right-2.5 p-1.5 bg-black/60 rounded-md opacity-0 group-hover/image:opacity-100 transition-opacity duration-200 backdrop-blur-sm border border-white/10 pointer-events-none flex items-center gap-1">
                                        <HiOutlineMagnifyingGlassPlus className="w-3.5 h-3.5 text-white" />
                                        <span className="text-[10px] text-white/90 font-medium pr-0.5">Zoom</span>
                                    </div>
                                </div>
                            </div>

                            {/* Built With (Desktop - Di bawah Mockup) */}
                            {selectedProject.tech_stack && selectedProject.tech_stack.length > 0 && (
                                <div className="w-full border-t border-white/10 pt-5">
                                    <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2.5">
                                        Built With
                                    </h4>
                                    <div className="flex flex-wrap gap-1.5">
                                        {selectedProject.tech_stack.map((stack, stackIndex) => (
                                            <div
                                                key={stackIndex}
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
                            )}
                        </div>

                        {/* Scrollable Content (Panel Kanan) */}
                        <div className="flex-1 overflow-y-auto p-5 sm:p-6 lg:p-8 bg-admin-card overscroll-contain relative lg:w-1/2">
                            {/* Close Button Desktop */}
                            <button
                                type="button"
                                onClick={() => setSelectedId(null)}
                                aria-label="Close modal"
                                className="hidden lg:block absolute top-4 right-4 p-2 bg-black/40 text-foreground rounded-full hover:bg-red-500 hover:text-foreground transition-all backdrop-blur-md border border-white/10 active:scale-95 z-10"
                            >
                                <HiXMark className="w-6 h-6"/>
                            </button>

                            <div className="flex flex-wrap justify-between items-start gap-4 mb-5 lg:pr-10">
                                <h3 className="text-xl sm:text-2xl lg:text-3xl font-heading font-bold text-foreground leading-tight flex-1 min-w-[200px]">
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
                                className="prose prose-invert prose-sm max-w-none mb-6 text-slate-300 leading-relaxed text-sm lg:text-base">
                                <p>{selectedProject.content}</p>
                            </div>

                            {/* Technologies Used (Mobile Only) */}
                            {selectedProject.tech_stack && selectedProject.tech_stack.length > 0 && (
                                <div className="pt-4 border-t border-white/10 lg:hidden">
                                    <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">
                                        Technologies Used
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                        {selectedProject.tech_stack.map((stack, stackIndex) => (
                                            <div
                                                key={stackIndex}
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
                            )}
                        </div>
                    </motion.div>
                </div>

                {/* Lightbox Overlay (Desktop Only) */}
                {isImageZoomed && (
                    <>
                        {/* Lightbox Backdrop */}
                        <motion.div
                            key="lightbox-backdrop"
                            initial={{opacity: 0}}
                            animate={{opacity: 1}}
                            exit={{opacity: 0}}
                            transition={{duration: 0.2}}
                            onClick={() => setIsImageZoomed(false)}
                            className="fixed inset-0 bg-black/95 z-[80] cursor-zoom-out"
                        />

                        {/* Lightbox Image Container */}
                        <motion.div
                            key="lightbox-image"
                            initial={{opacity: 0, scale: 0.9}}
                            animate={{opacity: 1, scale: 1}}
                            exit={{opacity: 0, scale: 0.9}}
                            transition={{type: "spring", damping: 25, stiffness: 300}}
                            className="fixed inset-0 z-[90] flex items-center justify-center p-6 md:p-12 pointer-events-none"
                        >
                            <div className="relative pointer-events-auto max-h-full max-w-full flex items-center justify-center">
                                <img
                                    src={`${storagePath}${selectedProject.thumbnail}`}
                                    alt={selectedProject.title}
                                    className="max-h-[85vh] max-w-[90vw] object-contain rounded-xl shadow-2xl ring-1 ring-white/15"
                                />

                                {/* Close Button Lightbox */}
                                <button
                                    type="button"
                                    onClick={() => setIsImageZoomed(false)}
                                    aria-label="Tutup zoom gambar"
                                    className="absolute -top-3 -right-3 md:top-2 md:right-2 p-2.5 bg-black/70 text-foreground rounded-full hover:bg-red-500 hover:text-white transition-all backdrop-blur-md border border-white/15 shadow-lg active:scale-95 z-10"
                                >
                                    <HiXMark className="w-6 h-6"/>
                                </button>
                            </div>
                        </motion.div>
                    </>
                )}
            </>
        </AnimatePresence>,
        document.body
    );
}
