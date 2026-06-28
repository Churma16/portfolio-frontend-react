import {AnimatePresence, motion} from "framer-motion";

interface HeroAvatarProps {
    avatarUrl?: string;
    isLoading?: boolean;
}

export default function HeroAvatar({ avatarUrl, isLoading }: HeroAvatarProps) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex-1 relative"
        >
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-[400px] lg:h-[400px] mx-auto">


                <div className="relative w-full h-full rounded-3xl bg-slate-800 border border-white/10 overflow-hidden shadow-2xl rotate-3 hover:rotate-0 transition-all duration-500">
                    <AnimatePresence mode="wait">
                        {isLoading ? (
                            <motion.div
                                key="avatar-skeleton"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="w-full h-full rounded-3xl bg-gradient-to-br from-slate-700/50 to-slate-800/50 animate-pulse"
                            />
                        ) : avatarUrl ? (
                            <motion.img
                                key="avatar-loaded"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.6 }}
                                src={avatarUrl}
                                alt="Profile"
                                className="w-full h-full object-cover rounded-3xl opacity-80 hover:opacity-100 transition-opacity"
                            />
                        ) : null}
                    </AnimatePresence>

                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-black/60 backdrop-blur-md border-t border-white/10">
                        <div className="flex gap-2 mb-2">
                            <div className="w-2 h-2 rounded-full bg-red-500" />
                            <div className="w-2 h-2 rounded-full bg-yellow-500" />
                            <div className="w-2 h-2 rounded-full bg-green-500" />
                        </div>
                        <p className="text-[10px] font-mono text-green-500">
                            $ git commit -m "Initial Commit"
                        </p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
