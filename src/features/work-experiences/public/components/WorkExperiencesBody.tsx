import {useState} from "react";
import {motion} from "framer-motion";
import {TechStack, WorkExperience} from "@/types";
import TechIcon from "@/components/common/TechIcon.tsx";

export default function WorkExperiencesBody({workExperiences}: { workExperiences: WorkExperience[] }) {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [clickedIndex, setClickedIndex] = useState<number | null>(null);

    const calculateHeight = (index: number) => {
        const total = workExperiences.length;
        if (total === 0) return "0%";
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
                className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] rounded-full pointer-events-none opacity-50"></div>

            <div className="container mx-auto lg:px-6 relative z-10 max-w-4xl">
                <div className="relative space-y-12">
                    {/* === SISTEM GARIS TIMELINE === */}
                    <div
                        className="absolute left-[19px] top-2 bottom-0 w-[2px] bg-border rounded-full md:left-[27px] overflow-hidden">
                        <motion.div
                            className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-primary via-accent to-primary shadow-lg shadow-primary/50"
                            initial={{height: "0%"}}
                            animate={{
                                height: hoveredIndex !== null ? calculateHeight(hoveredIndex) : "0%"
                            }}
                            transition={{type: "spring", stiffness: 60, damping: 15}}
                        />
                    </div>

                    {workExperiences.map((workExperience: WorkExperience, index: number) => (
                        <div
                            key={workExperience.id}
                            className="relative pl-12 md:pl-20 group cursor-pointer"
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                            onClick={() => setClickedIndex(clickedIndex === index ? null : index)}
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
                                    ? "bg-background border-primary shadow-lg shadow-primary/30"
                                    : "bg-background border-border"
                                }
                                `}
                            >
                                <div className={`
                                    w-3 h-3 md:w-4 md:h-4 rounded-full transition-colors duration-300
                                    ${hoveredIndex !== null && index >= hoveredIndex ? "bg-primary shadow-[0_0_10px_theme(colors.primary.DEFAULT)]" : "bg-muted-foreground"}
                                `}></div>
                            </motion.div>

                            {/* KARTU VISUAL */}
                            <motion.div
                                initial={{opacity: 0, y: 20}}
                                whileInView={{opacity: 1, y: 0}}
                                viewport={{once: true, margin: "-50px"}}
                                transition={{duration: 0.5, delay: index * 0.2}}
                                className={`
                                    relative p-6 md:p-8 rounded-3xl border transition-all duration-300 ease-out backdrop-blur-sm
                                    ${clickedIndex === index
                                    ? "bg-card border-primary/60 shadow-2xl shadow-primary/20 -translate-y-3 scale-[1.02]"
                                    : hoveredIndex === index
                                        ? "bg-card border-primary/50 shadow-2xl shadow-primary/15 -translate-y-2"
                                        : "bg-card border-border/60 shadow-lg shadow-black/30 hover:border-border"
                                }
                                `}
                            >
                                {/* Header Card */}
                                {/* PERUBAHAN 1: Tambahkan 'items-start' agar anak elemen tidak stretch full width di mobile */}
                                <div
                                    className="flex flex-col items-start md:flex-row md:justify-between md:items-start mb-4 gap-3">
                                    <div className="flex-1">
                                        <h3 className={`text-xl md:text-2xl font-bold transition-colors break-words ${clickedIndex === index ? "text-primary drop-shadow-[0_0_8px_theme(colors.primary.DEFAULT)]" : hoveredIndex === index ? "text-primary" : "text-foreground"}`}>
                                            {workExperience.position}
                                        </h3>

                                        <div
                                            className="text-muted-foreground font-medium mt-1 flex items-center gap-2 text-sm md:text-base">
                                            <span>{workExperience.company}</span>
                                            <span className="w-1 h-1 rounded-full bg-muted-foreground"></span>
                                            <span
                                                className="text-muted-foreground/80 text-xs">{workExperience?.location || "Full-time"}</span>
                                        </div>
                                    </div>

                                    {/* PERUBAHAN 2: Tambahkan 'w-fit' agar badge menyesuaikan konten */}
                                    <span className={`
                                        w-fit inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border transition-colors whitespace-nowrap flex-shrink-0
                                        ${clickedIndex === index
                                        ? "bg-primary/20 text-primary border-primary/50"
                                        : hoveredIndex === index
                                            ? "bg-primary/10 text-primary border-primary/30"
                                            : "bg-muted text-muted-foreground border-border"}
                                    `}>
                                        {workExperience.start_date}{" "} — {" "}{workExperience.end_date || "Present"}
                                    </span>
                                </div>

                                <p className="text-muted-foreground mb-4 leading-relaxed text-sm md:text-base italic border-l-2 border-border pl-3">
                                    {workExperience.description}
                                </p>

                                {/* Achievements List */}
                                {workExperience.achievements && (() => {
                                    let parsed: string[] = [];
                                    try {
                                        parsed = typeof workExperience.achievements === 'string'
                                            ? JSON.parse(workExperience.achievements)
                                            : workExperience.achievements;
                                    } catch (e) {
                                        console.error("Failed to parse achievements:", e);
                                    }
                                    if (!Array.isArray(parsed) || parsed.length === 0) return null;
                                    return (
                                        <ul className="space-y-3 mb-6">
                                            {parsed.map((ach, idx) => (
                                                <li key={idx} className="flex items-start gap-3 text-sm md:text-base text-foreground/80">
                                                    <span className="flex-shrink-0 text-primary mt-0.5">
                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                                        </svg>
                                                    </span>
                                                    <span>{ach}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    );
                                })()}

                                {/* Tech Stack Tags */}
                                <div className="flex flex-wrap gap-2 pt-4 border-t border-border/50">
                                    {workExperience.tech_stack?.map((stack: TechStack, i) => (
                                        <div
                                            key={stack.id}
                                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-primary/[0.08] border border-primary/20 text-primary transition-all duration-300 hover:bg-primary/20 hover:border-primary/50 hover:shadow-md hover:shadow-primary/20"
                                        >
                                            <TechIcon
                                                name={stack.name}
                                                icon={stack.icon}
                                                className="w-3.5 h-3.5"
                                            />
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