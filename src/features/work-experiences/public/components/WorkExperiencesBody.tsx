import {useState} from "react";
import {motion} from "framer-motion";
import {TechStack, WorkExperience} from "@/types";
import TechIcon from "@/components/common/TechIcon.tsx";

export default function WorkExperiencesBody({workExperiences}: { workExperiences: WorkExperience[] }) {
    // Ambil data real

    // State hover
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    // Fungsi Helper: Menghitung tinggi garis berdasarkan index
    const calculateHeight = (index: number) => {
        const total = workExperiences.length;
        if (total === 0) return "0%";

        // Logika:
        // Index 0 (Paling atas) = (3-0)/3 * 100 = 100%
        // Index 2 (Paling bawah) = (3-2)/3 * 100 = 33%
        const percentage = ((total - index) / total) * 100;
        return `${percentage}%`;
    };
    return (
        <motion.div
            key="body"
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{duration: 0.3}}
        >
            <div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px]  rounded-full pointer-events-none opacity-50"></div>

            <div className="container mx-auto lg:px-6 relative z-10 max-w-4xl">

                <div className="relative space-y-12">

                    {/* === SISTEM GARIS TIMELINE === */}
                    <div
                        className="absolute left-[19px] top-2 bottom-0 w-[2px] bg-slate-800 rounded-full md:left-[27px] overflow-hidden">

                        {/* GARIS LASER BIRU */}
                        <motion.div
                            className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-blue-600 via-cyan-400 to-blue-300 shadow-[0_0_15px_rgba(59,130,246,1)]"
                            initial={{height: "0%"}}
                            animate={{
                                // PERBAIKAN DISINI: Gunakan fungsi calculateHeight
                                height: hoveredIndex !== null ? calculateHeight(hoveredIndex) : "0%"
                            }}
                            transition={{type: "spring", stiffness: 60, damping: 15}}
                        />
                    </div>

                    {workExperiences.map((workExperience: WorkExperience, index: number) => (
                        <div
                            key={workExperience.id}
                            className="relative pl-12 md:pl-20 group"
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                        >
                            {/* DOT PENANDA */}
                            <motion.div
                                initial={{scale: 0}}
                                whileInView={{scale: 1}}
                                viewport={{once: true}}
                                transition={{duration: 0.4, delay: index * 0.1}}
                                className={`
                                    absolute left-0 top-1 w-10 h-10 md:w-14 md:h-14 
                                    rounded-full flex items-center justify-center z-10 
                                    border-4 transition-colors duration-300
                                    ${hoveredIndex !== null && index >= hoveredIndex
                                    ? "bg-slate-950 border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.5)]"
                                    : "bg-slate-950 border-slate-800"
                                }
                                `}
                            >
                                <div className={`
                                    w-3 h-3 md:w-4 md:h-4 rounded-full transition-colors duration-300
                                    ${hoveredIndex !== null && index >= hoveredIndex ? "bg-cyan-400 shadow-[0_0_10px_#22d3ee]" : "bg-slate-600"}
                                `}></div>
                            </motion.div>

                            {/* KARTU VISUAL */}
                            <motion.div
                                initial={{opacity: 0, y: 20}}
                                whileInView={{opacity: 1, y: 0}}
                                viewport={{once: true, margin: "-50px"}}
                                transition={{duration: 0.5, delay: index * 0.2}}
                                className={`
                                    relative p-6 md:p-8 rounded-3xl border transition-all duration-300 ease-out
                                    ${hoveredIndex === index
                                    ? "bg-slate-900 border-blue-500/50 shadow-2xl shadow-blue-500/10 -translate-y-2"
                                    : "bg-slate-900/50 border-slate-800 hover:border-slate-700"
                                }
                                `}
                            >
                                {/* Header Card */}
                                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4 gap-3">
                                    <div>
                                        <h3 className={`text-xl md:text-2xl font-bold transition-colors break-all ${hoveredIndex === index ? "text-lara-accent-blue-light" : "text-foreground"}`}>
                                            {workExperience.position}
                                        </h3>

                                        <div
                                            className="text-lara-text-muted font-medium mt-1 flex items-center gap-2 text-sm md:text-base">
                                            <span>{workExperience.company}</span>
                                            <span className="w-1 h-1 rounded-full bg-slate-600"></span>
                                            <span
                                                className="text-lara-text-muted-dark text-xs">{workExperience?.location || "Full-time"}</span>
                                        </div>
                                    </div>

                                    <span className={`
                                        inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border transition-colors
                                        ${hoveredIndex === index
                                        ? "bg-blue-500/10 text-lara-accent-blue-lighter border-blue-500/30"
                                        : "bg-slate-800 text-lara-text-tertiary border-slate-700"}
                                    `}>
                                        {workExperience.start_date}{" "} — {" "}{workExperience.end_date || "Present"}
                                    </span>
                                </div>

                                <p className="text-lara-text-muted mb-6 leading-relaxed text-sm md:text-base">
                                    {workExperience.description}
                                </p>

                                {/* Tech Stack Tags */}
                                <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-800/50">
                                    {/* Gunakan Optional Chaining (?.) untuk jaga-jaga kalau stacks kosong */}
                                    {workExperience.tech_stack?.map((stack: TechStack, i) => (
                                        <div
                                            key={stack.id}
                                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-primary/10 border border-primary/20 text-primary transition-colors hover:bg-primary/20"
                                        >
                                            {/* 1. Icon Kecil */}
                                            <TechIcon
                                                name={stack.name}
                                                icon={stack.icon}
                                                className="w-3.5 h-3.5"
                                            />

                                            {/* 2. Teks Nama (Jelas & Terbaca) */}
                                            <span className="text-[11px] font-medium leading-none pb-[1px]">
                                    {stack.name}
                                </span>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        </div>
                    ))}
                </div>
            </div>
        </motion.div>
    )
}