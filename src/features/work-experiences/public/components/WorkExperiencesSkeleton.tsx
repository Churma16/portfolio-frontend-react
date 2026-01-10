import {motion} from "framer-motion";

export default function WorkExperiencesSkeleton() {
    const containerVariants = {
        hidden: {opacity: 0},
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: {opacity: 0, y: 20},
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
            },
        },
    };

    return (
        <motion.div
            key="skeleton"
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{duration: 0.3}}
        >
            <div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px]  rounded-full pointer-events-none opacity-50"></div>
            <div className="container mx-auto px-6 relative z-10 max-w-4xl">
                <motion.div
                    className="relative space-y-12"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {/* === SISTEM GARIS TIMELINE === */}
                    <div
                        className="absolute left-[19px] top-2 bottom-0 w-[2px] bg-slate-800 rounded-full md:left-[27px] overflow-hidden"></div>

                    {/* Skeleton Items */}
                    {[...Array(5)].map((_, index) => (
                        <motion.div key={index} className="relative pl-12 md:pl-20 group" variants={itemVariants}>
                            {/* Dot Skeleton */}
                            <motion.div
                                initial={{scale: 0}}
                                animate={{scale: 1}}
                                transition={{duration: 0.4, delay: index * 0.1}}
                                className="absolute left-0 top-1 w-10 h-10 md:w-14 md:h-14 bg-slate-800 rounded-full border-4 border-slate-700"
                            ></motion.div>

                            {/* Card Skeleton */}
                            <motion.div
                                className="relative p-6 md:p-8 rounded-3xl border border-slate-700 bg-slate-900/50"
                                variants={itemVariants}
                            >
                                <motion.div className="h-6 bg-slate-700 rounded w-1/2 mb-4 animate-pulse"></motion.div>
                                <motion.div className="h-4 bg-slate-700 rounded w-1/3 mb-2 animate-pulse"></motion.div>
                                <motion.div className="h-4 bg-slate-700 rounded w-1/4 mb-6 animate-pulse"></motion.div>
                                <motion.div className="h-4 bg-slate-700 rounded w-full mb-2 animate-pulse"></motion.div>
                                <motion.div className="h-4 bg-slate-700 rounded w-5/6 mb-2 animate-pulse"></motion.div>
                                <motion.div className="h-4 bg-slate-700 rounded w-3/4 animate-pulse"></motion.div>
                            </motion.div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </motion.div>

    );
}
