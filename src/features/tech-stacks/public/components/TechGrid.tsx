import { TechStack } from "@/types";
import TechIcon from "../../../../components/common/TechIcon.tsx";
import { motion } from "framer-motion";
import { useTechStackCategories } from "@/features/tech-stacks/hooks/useTechStackCategories.ts";

interface TechGridProps {
    techStacks: TechStack[];
}

export default function TechGrid({ techStacks }: TechGridProps) {
    const { data: categories = [], isLoading } = useTechStackCategories();

    if (isLoading) {
        return (
            <div className="hidden md:block w-full max-w-6xl mx-auto py-12 px-4 relative z-10 text-center text-muted-foreground">
                Loading categories...
            </div>
        );
    }

    const categoriesArray = Array.isArray(categories) ? categories : [];
    const techStacksArray = Array.isArray(techStacks) ? techStacks : [];

    // Group tech stacks by tech_stack_category_id
    const groupedTechStacks = techStacksArray.reduce((acc, tech) => {
        const catId = tech.tech_stack_category_id ? Number(tech.tech_stack_category_id) : 0;
        if (!acc[catId]) {
            acc[catId] = [];
        }
        acc[catId].push(tech);
        return acc;
    }, {} as Record<number, TechStack[]>);

    // Filter categories that actually have stacks, or are fallback
    const activeCategories = categoriesArray.filter(cat => (groupedTechStacks[cat.id] || []).length > 0);
    const uncategorizedStacks = groupedTechStacks[0] || [];

    return (
        <div className="hidden md:block w-full max-w-6xl mx-auto py-12 px-4 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {activeCategories.map((category) => {
                    const stacks = groupedTechStacks[category.id] || [];

                    return (
                        <motion.div 
                            key={category.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.5 }}
                            className="flex flex-col gap-4"
                        >
                            <h3 
                                className="text-xl font-heading font-semibold border-b pb-2 transition-colors"
                                style={category.color ? { color: category.color, borderColor: `${category.color}30` } : { borderColor: "hsl(var(--border))" }}
                            >
                                {category.name}
                            </h3>
                            <div className="flex flex-col gap-3">
                                {stacks.map((tech) => (
                                    <div 
                                        key={tech.id} 
                                        className="flex items-center gap-3 p-3 rounded-lg bg-card/50 border border-transparent hover:border-border hover:bg-card transition-all group"
                                    >
                                        <TechIcon
                                            name={tech.name}
                                            icon={tech.icon}
                                            className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors"
                                        />
                                        <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                                            {tech.name}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    );
                })}

                {uncategorizedStacks.length > 0 && (
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.5 }}
                        className="flex flex-col gap-4"
                    >
                        <h3 className="text-xl font-heading font-semibold text-foreground border-b border-border pb-2">
                            Tools & Others
                        </h3>
                        <div className="flex flex-col gap-3">
                            {uncategorizedStacks.map((tech) => (
                                <div 
                                    key={tech.id} 
                                    className="flex items-center gap-3 p-3 rounded-lg bg-card/50 border border-transparent hover:border-border hover:bg-card transition-all group"
                                >
                                    <TechIcon
                                        name={tech.name}
                                        icon={tech.icon}
                                        className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors"
                                    />
                                    <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                                        {tech.name}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
}
