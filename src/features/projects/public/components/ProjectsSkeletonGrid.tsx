import { motion } from "framer-motion";
import ProjectCardSkeleton from "./ProjectCardSkeleton.tsx";

interface ProjectsSkeletonGridProps {
    count?: number;
}

export default function ProjectsSkeletonGrid({
    count = 6,
}: ProjectsSkeletonGridProps) {
    return (
        <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
            {[...Array(count)].map((_, i) => (
                <ProjectCardSkeleton key={i} index={i} />
            ))}
        </motion.div>
    );
}
