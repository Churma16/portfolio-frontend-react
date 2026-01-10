import { motion, AnimatePresence } from "framer-motion";
import { useTechStacks } from "@/features/tech-stacks/hooks/useTechStacks.ts";
import TechPhysicsBox from "./TechPhysicsBox.tsx";
import TechMarquee from "./TechMarquee.tsx";
import TechSkeletonLoader from "./TechSkeletonLoader.tsx";

export default function TechList() {
    const { data: techStacks = [], isLoading, isError } = useTechStacks();

    if (isError) return null;

    return (
        <motion.section
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className=" border-y border-lara-border bg-lara-dark/50 relative"
        >
            <AnimatePresence mode="wait">
                {isLoading ? (
                    <TechSkeletonLoader />
                ) : (
                    <>
                        {/* Mobile: Physics Playground */}
                        <TechPhysicsBox techStacks={techStacks} />

                        {/* Desktop: Infinite Marquee */}
                        <TechMarquee techStacks={techStacks} />
                    </>
                )}
            </AnimatePresence>
        </motion.section>
    );
}