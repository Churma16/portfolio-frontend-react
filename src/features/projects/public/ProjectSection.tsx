import {AnimatePresence, motion} from "framer-motion";
import {useProjects} from "../hooks/useProjects.ts";
import ProjectShowcase from "@/features/projects/public/components/ProjectShowcase.tsx";
import ProjectSectionHeader from "@/features/projects/public/components/ProjectSectionHeader.tsx";
import ProjectsSkeletonGrid from "@/features/projects/public/components/ProjectsSkeletonGrid.tsx";
import ProjectError from "@/features/projects/public/components/ProjectError.tsx";

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
