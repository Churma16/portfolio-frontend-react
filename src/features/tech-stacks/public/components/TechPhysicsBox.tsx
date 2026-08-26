import { motion } from "framer-motion";
import TechIcon from "../../../../components/common/TechIcon.tsx";
import { TechStack } from "@/types";
import { useTechPhysics } from "../../hooks/useTechPhysics.ts";

interface TechPhysicsBoxProps {
    techStacks: TechStack[];
}

export default function TechPhysicsBox({ techStacks }: TechPhysicsBoxProps) {
    const { sceneRef, boxRefs } = useTechPhysics(techStacks);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="md:hidden relative w-full h-[450px] bg-transparent overflow-hidden touch-none select-none"
        >
            <div
                ref={sceneRef}
                className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing"
            >
                {techStacks.map((tech, index) => (
                    <div
                        key={tech.id || index}
                        ref={(el) => {
                            boxRefs.current[index] = el;
                        }}
                        className="absolute top-0 left-0 w-[60px] h-[60px] bg-card border border-border/50 rounded-xl flex flex-col items-center justify-center select-none will-change-transform z-10"
                        style={{ transform: "translate(-999px, -999px)" }}
                    >
                        <TechIcon
                            name={tech.name}
                            icon={tech.icon}
                            className="w-8 h-8 text-foreground pointer-events-none"
                        />
                        <span className="text-[8px] text-muted-foreground mt-1 pointer-events-none">
                            {tech.name}
                        </span>
                    </div>
                ))}
            </div>

            <div
                className="absolute inset-0 pointer-events-none opacity-20"
                style={{
                    backgroundImage:
                        "radial-gradient(circle at 50% 50%, #1e293b 1px, transparent 1px)",
                    backgroundSize: "20px 20px",
                }}
            />

            <div
                className="absolute top-4 w-full text-center pointer-events-none text-[10px] text-muted-foreground font-mono tracking-widest uppercase animate-pulse z-0">
                Physics Playground: Move The Box!
            </div>
        </motion.div>
    );
}