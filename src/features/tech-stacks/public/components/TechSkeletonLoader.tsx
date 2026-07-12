import { motion } from "framer-motion";

export default function TechSkeletonLoader() {
    return (
        <motion.div
            key="skeleton"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.5 } }}
            className="w-full relative"
        >
            {/* Mobile Skeleton: matches TechPhysicsBox height */}
            <div className="block md:hidden w-full h-[450px] bg-muted/20 animate-pulse rounded-lg flex items-center justify-center">
                <div className="w-16 h-16 rounded-full border-4 border-muted border-t-primary animate-spin" />
            </div>

            {/* Desktop Skeleton: matches TechGrid categorized layout */}
            <div className="hidden md:block w-full max-w-6xl mx-auto py-12 px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {[1, 2, 3, 4].map((col) => (
                        <div key={col} className="space-y-4">
                            {/* Category Header Skeleton */}
                            <div className="flex items-center gap-2 mb-6">
                                <div className="w-2 h-6 bg-muted rounded animate-pulse" />
                                <div className="w-24 h-6 bg-muted rounded animate-pulse" />
                            </div>
                            
                            {/* Tech Stack Items Skeleton */}
                            <div className="space-y-2">
                                {[1, 2, 3].map((item) => (
                                    <div key={item} className="w-full h-12 bg-muted/40 rounded-lg animate-pulse" />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}

