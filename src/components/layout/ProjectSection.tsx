import { motion, AnimatePresence } from "framer-motion";
import { useProjects } from "../../hooks/useProjects";
import ProjectShowcase from "../projects/ProjectShowcase";
import ProjectSectionHeader from "../projects/ProjectSectionHeader";
import ProjectsSkeletonGrid from "../projects/ProjectsSkeletonGrid";
import ProjectError from "../projects/ProjectError";

export default function ProjectSection() {
    const { data: projects, isLoading, isError, error } = useProjects();

    return (
        <section id="projects" className="py-24 bg-lara-dark relative">
            <div className="container mx-auto px-4 relative z-10">
                <ProjectSectionHeader />

                {/* Loading & Error State */}
                <AnimatePresence mode="wait">
                    {isLoading && <ProjectsSkeletonGrid />}
                    {isError && <ProjectError error={error as Error} />}
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
