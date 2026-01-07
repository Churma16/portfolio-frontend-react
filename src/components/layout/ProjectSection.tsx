import { motion, AnimatePresence } from "framer-motion";
import { useProjects } from "../../hooks/useProjects";
import ProjectShowcase from "../projects/ProjectShowcase";

export default function ProjectSection() {
    const { data: projects, isLoading, isError, error } = useProjects();

    return (
        <section id="projects" className="py-24 bg-lara-dark relative">
            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
                    <h2 className="text-3xl md:text-4xl font-heading font-bold text-white">
                        Featured{" "}
                        <span className="text-lara-blue">Projects</span>.
                    </h2>
                    <p className="text-slate-400 text-lg">
                        <span className="text-white font-medium">
                            Solving problems
                        </span>{" "}
                        through code. Here are some of the highlights from my
                        journey as a developer.
                    </p>
                </div>

                {/* Loading & Error State */}
                <AnimatePresence mode="wait">
                    {isLoading && (
                        <motion.div
                            key="loading"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        >
                            {[...Array(6)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{
                                        duration: 0.4,
                                        delay: i * 0.1,
                                    }}
                                    className="flex flex-col overflow-hidden rounded-2xl bg-[#0a101f] border border-lara-border h-full"
                                >
                                    {/* Thumbnail Skeleton */}
                                    <div className="aspect-video bg-slate-800 animate-pulse" />

                                    {/* Content Skeleton */}
                                    <div className="flex flex-1 flex-col p-5 space-y-4">
                                        {/* Tags Skeleton */}
                                        <div className="flex gap-2">
                                            <div className="h-5 bg-slate-700 rounded animate-pulse w-12" />
                                            <div className="h-5 bg-slate-700 rounded animate-pulse w-16" />
                                        </div>

                                        {/* Title Skeleton */}
                                        <div className="space-y-2">
                                            <div className="h-6 bg-slate-700 rounded animate-pulse w-3/4" />
                                            <div className="h-6 bg-slate-700 rounded animate-pulse w-1/2" />
                                        </div>

                                        {/* Description Skeleton */}
                                        <div className="space-y-2">
                                            <div className="h-4 bg-slate-700 rounded animate-pulse w-full" />
                                            <div className="h-4 bg-slate-700 rounded animate-pulse w-5/6" />
                                        </div>

                                        {/* Footer Skeleton */}
                                        <div className="mt-auto pt-4 border-t border-white/5 space-y-3">
                                            <div className="h-3 bg-slate-700 rounded animate-pulse w-20" />
                                            <div className="flex gap-2">
                                                <div className="h-7 bg-slate-700 rounded animate-pulse w-16" />
                                                <div className="h-7 bg-slate-700 rounded animate-pulse w-20" />
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    )}
                    {isError && (
                        <motion.div
                            key="error"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="text-center py-20 text-red-400"
                        >
                            Error: {(error as Error).message}
                        </motion.div>
                    )}
                    {projects && (
                        <motion.div
                            key="projects"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <ProjectShowcase projects={projects} />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
}
