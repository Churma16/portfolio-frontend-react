import {motion} from "framer-motion";
import TechIcon from "../../../../components/common/TechIcon.tsx";
import {TechStack} from "@/types";

interface TechMarqueeDesktopProps {
    techStacks: TechStack[];
}

export default function TechMarquee({ techStacks }: TechMarqueeDesktopProps) {
    return (
        <motion.div
            initial={{ opacity: 0, filter: "blur(10px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.8 }}
            className="hidden md:flex overflow-hidden relative min-h-[120px] items-center"
        >
            {/* Gradient Masking */}
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-lara-dark to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-lara-dark to-transparent z-10 pointer-events-none" />

            {/* Marquee List 1 */}
            <div className="inline-flex animate-infinite-scroll gap-16 items-center pr-16">
                {techStacks.map((tech, index) => (
                    <div
                        key={`list1-${index}`}
                        className="flex items-center gap-3 shrink-0 group/item cursor-default"
                    >
                        <TechIcon
                            name={tech.name}
                            icon={tech.icon}
                            className="w-8 h-8 text-lara-text-muted transition-all duration-500 grayscale group-hover/item:grayscale-0 group-hover/item:scale-110 group-hover/item:text-lara-blue"
                        />
                        <span
                            className="text-xl font-heading font-bold text-lara-text-muted-dark transition-colors duration-300 group-hover/item:text-lara-text-secondary whitespace-nowrap">
                            {tech.name}
                        </span>
                    </div>
                ))}
            </div>

            {/* Marquee List 2 - Duplicate for seamless loop */}
            <div
                className="inline-flex animate-infinite-scroll gap-16 items-center pr-16"
                aria-hidden="true"
            >
                {techStacks.map((tech, index) => (
                    <div
                        key={`list2-${index}`}
                        className="flex items-center gap-3 shrink-0 group/item cursor-default"
                    >
                        <TechIcon
                            name={tech.name}
                            icon={tech.icon}
                            className="w-8 h-8 text-lara-text-muted transition-all duration-500 grayscale group-hover/item:grayscale-0 group-hover/item:scale-110 group-hover/item:text-lara-blue"
                        />
                        <span className="text-xl font-heading font-bold text-slate-700 transition-colors duration-300 group-hover/item:text-slate-200 whitespace-nowrap">
                            {tech.name}
                        </span>
                    </div>
                ))}
            </div>
        </motion.div>
    );
}

