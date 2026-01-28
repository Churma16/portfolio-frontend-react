import useHealth from "@/hooks/useHealth.ts";
import {AnimatePresence, motion} from "framer-motion";

export default function FooterStatus() {
    const {isError, isLoading} = useHealth();

    const statusVariants = {
        hidden: {opacity: 0, scale: 0.95},
        visible: {opacity: 1, scale: 1},
        exit: {opacity: 0, scale: 0.95},
    };

    const dotVariants = {
        hidden: {opacity: 0},
        visible: {opacity: 1},
    };

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={isError ? "error" : isLoading ? "loading" : "success"}
                className="flex items-center gap-2 bg-green-500/10 border border-green-500/20 px-3 py-1 rounded-full"
                variants={statusVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{duration: 0.3}}
            >
                {isError && (
                    <>
                        <motion.span
                            className="relative flex h-2 w-2"
                            variants={dotVariants}
                            transition={{delay: 0.1}}
                        >
                            <span
                                className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                        </motion.span>
                        <motion.span
                            className="text-xs font-mono text-red-400"
                            variants={dotVariants}
                            transition={{delay: 0.15}}
                        >
                            System: Offline (SGP1)
                        </motion.span>
                    </>
                )}

                {isLoading && (
                    <>
                        <motion.span
                            className="relative flex h-2 w-2"
                            variants={dotVariants}
                            transition={{delay: 0.1}}
                        >
                            <span
                                className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-500"></span>
                        </motion.span>
                        <motion.span
                            className="text-xs font-mono text-yellow-400"
                            variants={dotVariants}
                            transition={{delay: 0.15}}
                        >
                            System: Loading...
                        </motion.span>
                    </>
                )}

                {!isError && !isLoading && (
                    <>
                        <motion.span
                            className="relative flex h-2 w-2"
                            variants={dotVariants}
                            transition={{delay: 0.1}}
                        >
                            <span
                                className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </motion.span>
                        <motion.span
                            className="text-xs font-mono text-green-400"
                            variants={dotVariants}
                            transition={{delay: 0.15}}
                        >
                            System: Online (SGP1)
                        </motion.span>
                    </>
                )}
            </motion.div>
        </AnimatePresence>
    );

}
