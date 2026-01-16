import {AnimatePresence, motion} from "framer-motion";

interface HeroBadgeProps {
    isHireable?: boolean;
}

export default function HeroBadge({ isHireable }: HeroBadgeProps) {
    return (
        <AnimatePresence mode="wait">
            {isHireable ? (
                <motion.div
                    key="available"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.5 }}
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider mx-auto lg:mx-0"
                >
                    <span className="relative flex h-2 w-2">
                        <span
                            className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                    </span>
                    Available for Hire
                </motion.div>
            ) : (
                <motion.div
                    key="not-available"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.5 }}
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-500/10 border border-slate-500/20 text-slate-400 text-xs font-bold uppercase tracking-wider mx-auto lg:mx-0"
                >
                    <span className="relative flex h-2 w-2">
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-slate-400"></span>
                    </span>
                    Not Available
                </motion.div>
            )}
        </AnimatePresence>
    );
}
