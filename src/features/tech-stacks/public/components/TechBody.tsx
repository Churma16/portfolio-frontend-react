import {AnimatePresence, motion} from "framer-motion";
import {useTechStacks} from "@/features/tech-stacks/hooks/useTechStacks.ts";
import TechPhysicsBox from "./TechPhysicsBox.tsx";
import TechGrid from "./TechGrid.tsx";
import TechSkeletonLoader from "./TechSkeletonLoader.tsx";
import TechError from "@/features/tech-stacks/public/components/TechError.tsx";
import { TechStack } from "@/types";

const DUMMY_TECH_STACKS: TechStack[] = [
    { id: 1, name: "React", icon: "SiReact", created_at: "", updated_at: "" },
    { id: 2, name: "Laravel", icon: "SiLaravel", created_at: "", updated_at: "" },
    { id: 3, name: "Go", icon: "SiGo", created_at: "", updated_at: "" },
    { id: 4, name: "TypeScript", icon: "SiTypescript", created_at: "", updated_at: "" },
    { id: 5, name: "Tailwind CSS", icon: "SiTailwindcss", created_at: "", updated_at: "" },
    { id: 6, name: "Node.js", icon: "SiNode.js", created_at: "", updated_at: "" },
    { id: 7, name: "Express", icon: "SiExpress", created_at: "", updated_at: "" },
    { id: 8, name: "MySQL", icon: "SiMysql", created_at: "", updated_at: "" },
];

export default function TechBody() {
    const {data: techStacks = [], isLoading, isError} = useTechStacks();

    // Gunakan dummy data jika terjadi error DAN di mode development (VITE_PROD=false)
    const isDevFallback = isError && import.meta.env.VITE_PROD === "false";
    const displayStacks = isDevFallback ? DUMMY_TECH_STACKS : techStacks;

    return (
        <motion.section
            initial={{opacity: 0, y: 40}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true, margin: "-100px"}}
            transition={{duration: 0.8, ease: "easeOut"}}
            className="border-y border-border bg-background/50 relative"
        >
            <AnimatePresence mode="wait">
                {isError && !isDevFallback && <TechError/>}
                {isLoading && <TechSkeletonLoader/>}
                {(!isError || isDevFallback) && !isLoading && (
                    <>
                        {/* Mobile: Physics Playground */}
                        <TechPhysicsBox techStacks={displayStacks}/>

                        {/* Desktop: Categorized Grid */}
                        <TechGrid techStacks={displayStacks}/>
                    </>
                )}

            </AnimatePresence>
        </motion.section>
    );
}