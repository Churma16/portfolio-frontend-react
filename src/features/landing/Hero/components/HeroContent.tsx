import { motion, AnimatePresence } from "framer-motion";
import HeroBadge from "./HeroBadge.tsx";
import HeroButtons from "./HeroButtons.tsx";

interface HeroContentProps {
    name?: string;
    bioShort?: string;
    isHireable?: boolean;
    cvFileUrl?: string;
    isLoading?: boolean;
}

export default function HeroContent({
    name,
    bioShort,
    isHireable,
    cvFileUrl,
    isLoading,
}: HeroContentProps) {
    return (
        <div className="flex-1 text-center lg:text-left space-y-6">
            <HeroBadge isHireable={isHireable} />

            <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-4xl sm:text-5xl lg:text-7xl font-heading font-extrabold text-white leading-tight"
            >
                Ready to Build <br className="hidden lg:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-hero-start to-hero-end">
                    Scalable Apps.
                </span>
            </motion.h1>

            <AnimatePresence mode="wait">
                {isLoading ? (
                    <motion.div
                        key="profile-skeleton"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="text-lg text-slate-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed space-y-2 flex flex-col items-center lg:items-start"
                    >
                        <div className="h-4 bg-slate-700/50 rounded animate-pulse w-40"></div>
                        <div className="h-4 bg-slate-700/50 rounded animate-pulse w-48"></div>
                    </motion.div>
                ) : (
                    <motion.p
                        key="profile-text"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-lg text-slate-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed"
                    >
                        Hi, I'm{" "}
                        <span className="text-white font-bold">{name}</span>.{" "}
                        <span
                            dangerouslySetInnerHTML={{
                                __html: bioShort || "",
                            }}
                        />
                    </motion.p>
                )}
            </AnimatePresence>

            <HeroButtons cvFileUrl={cvFileUrl} />
        </div>
    );
}
