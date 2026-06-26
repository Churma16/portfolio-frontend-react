import { motion } from "framer-motion";

export default function TechSkeletonLoader() {
    return (
        <motion.div
            key="skeleton"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.5 } }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 sm:gap-6 md:gap-8 px-4 sm:px-6 md:px-8 h-[450px] md:h-[120px] place-items-center"
        >
            {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="flex flex-col items-center gap-3 opacity-50">
                    <div className="w-8 sm:w-10 md:w-12 h-8 sm:h-10 md:h-12 bg-muted rounded-lg animate-pulse" />
                    <div className="w-12 h-3 bg-muted rounded animate-pulse" />
                </div>
            ))}
        </motion.div>
    );
}

