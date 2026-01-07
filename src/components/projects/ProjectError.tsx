import { motion } from "framer-motion";

interface ProjectErrorProps {
    error: Error;
}

export default function ProjectError({ error }: ProjectErrorProps) {
    return (
        <motion.div
            key="error"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center py-20 text-red-400 space-y-4"
        >
            <p className="text-lg font-medium">Oops! Something went wrong</p>
            <p className="text-sm text-red-300">{error.message}</p>
        </motion.div>
    );
}
