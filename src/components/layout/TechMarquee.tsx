import { useTechStacks } from "../../hooks/useTechStacks";
import TechIcon from "../common/TechIcon";
// 1. Import AnimatePresence
import { motion, AnimatePresence } from "framer-motion"; 

export default function TechMarquee() {
    const { data: techStacks = [], isLoading, isError } = useTechStacks();

    if (isError) return null;

    return (
        <motion.section 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="py-10 border-y border-lara-border bg-lara-dark/50 overflow-hidden relative min-h-[120px] flex items-center" // Tambah min-h biar ga lompat tinggi-nya
        >
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-lara-dark to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-lara-dark to-transparent z-10 pointer-events-none" />

            {/* 2. Bungkus Logika Loading dengan AnimatePresence */}
            {/* mode='wait': Pastikan elemen lama hilang FULL dulu, baru elemen baru masuk */}
            <AnimatePresence mode="wait">
                
                {isLoading ? (
                    // --- SKELETON (Akan Fade Out) ---
                    <motion.div 
                        key="skeleton"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, transition: { duration: 0.5 } }} // Menghilang pelan-pelan
                        className="flex justify-center gap-12 w-full px-4"
                    >
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div key={i} className="flex items-center gap-3 opacity-50">
                                <div className="w-8 h-8 bg-slate-700/50 rounded-lg animate-pulse" />
                                <div className="hidden md:block w-24 h-4 bg-slate-700/50 rounded animate-pulse" />
                            </div>
                        ))}
                    </motion.div>
                ) : (
                    // --- DATA ASLI (Akan Fade In) ---
                    <motion.div 
                        key="content"
                        initial={{ opacity: 0, filter: "blur(10px)" }} // Efek blur dikit biar makin smooth
                        animate={{ opacity: 1, filter: "blur(0px)" }}
                        transition={{ duration: 0.8 }} // Muncul pelan-pelan 0.8 detik
                        className="flex whitespace-nowrap overflow-hidden group select-none w-full"
                    >
                        {/* LIST 1 */}
                        <div className="inline-flex animate-infinite-scroll gap-16 items-center pr-16">
                            {techStacks.map((tech, index) => (
                                <div key={`list1-${index}`} className="flex items-center gap-3 shrink-0 group/item cursor-default">
                                    <TechIcon 
                                        name={tech.name} icon={tech.icon_url}
                                        className="w-8 h-8 text-slate-600 transition-all duration-500 grayscale group-hover/item:grayscale-0 group-hover/item:scale-110 group-hover/item:text-lara-blue" 
                                    />
                                    <span className="text-xl font-heading font-bold text-slate-700 transition-colors duration-300 group-hover/item:text-slate-200">
                                        {tech.name}
                                    </span>
                                </div>
                            ))}
                        </div>

                        {/* LIST 2 */}
                        <div className="inline-flex animate-infinite-scroll gap-16 items-center pr-16" aria-hidden="true">
                            {techStacks.map((tech, index) => (
                                <div key={`list2-${index}`} className="flex items-center gap-3 shrink-0 group/item cursor-default">
                                    <TechIcon 
                                        name={tech.name} icon={tech.icon_url}
                                        className="w-8 h-8 text-slate-600 transition-all duration-500 grayscale group-hover/item:grayscale-0 group-hover/item:scale-110 group-hover/item:text-lara-blue" 
                                    />
                                    <span className="text-xl font-heading font-bold text-slate-700 transition-colors duration-300 group-hover/item:text-slate-200">
                                        {tech.name}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}

            </AnimatePresence>
        </motion.section>
    );
}