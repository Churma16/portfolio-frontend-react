import {AnimatePresence, motion} from "framer-motion";
import ProjectsSkeletonGrid from "@/features/projects/public/components/ProjectsSkeletonGrid.tsx";
import ProjectError from "@/features/projects/public/components/ProjectError.tsx";
import ProjectShowcase from "@/features/projects/public/components/ProjectShowcase.tsx";
import {useProjects} from "@/features/projects/hooks/useProjects.ts";

export default function ProjectBody() {
    const {data: projects, isLoading, isError, error} = useProjects();

    return (
        <AnimatePresence mode="wait">
            {isError && <ProjectError error={error as Error}/>}
            {isLoading && <ProjectsSkeletonGrid/>}
            {projects && (
                <motion.div
                    key="projects"
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    exit={{opacity: 0}}
                    transition={{duration: 0.3}}
                >
                    <ProjectShowcase projects={projects}/>
                </motion.div>
            )}
        </AnimatePresence>
    )
}