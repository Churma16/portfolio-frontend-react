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
    const groupedTechStacks = techStacksArray.reduce((accumulatedStacks, techItem) => {
        const categoryId = techItem.tech_stack_category_id ? Number(techItem.tech_stack_category_id) : 0;
        if (!accumulatedStacks[categoryId]) {
            accumulatedStacks[categoryId] = [];
        }
        accumulatedStacks[categoryId].push(techItem);
        return accumulatedStacks;
    }, {} as Record<number, TechStack[]>);

    // Filter categories that actually have stacks, or are fallback
    const activeCategories = categoriesArray.filter((categoryItem) => (groupedTechStacks[categoryItem.id] || []).length > 0);
    const uncategorizedStacks = groupedTechStacks[0] || [];

    const renderTechItem = (techItem: TechStack, isCompactLayout: boolean = false) => {
        if (isCompactLayout) {
            return (
                <div 
                    key={techItem.id} 
                    className="flex items-center gap-2 p-2 rounded-lg bg-card/50 border border-transparent hover:border-border hover:bg-card transition-all group"
                >
                    <TechIcon
                        name={techItem.name}
                        icon={techItem.icon}
                        className="w-5 h-5 flex-shrink-0 text-muted-foreground group-hover:text-primary transition-colors"
                    />
                    <span 
                        className="text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors truncate"
                        title={techItem.name}
                    >
                        {techItem.name}
                    </span>
                </div>
            );
        }

        return (
            <div 
                key={techItem.id} 
                className="flex items-center gap-3 p-3 rounded-lg bg-card/50 border border-transparent hover:border-border hover:bg-card transition-all group"
            >
                <TechIcon
                    name={techItem.name}
                    icon={techItem.icon}
                    className="w-6 h-6 flex-shrink-0 text-muted-foreground group-hover:text-primary transition-colors"
                />
                <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                    {techItem.name}
                </span>
            </div>
        );
    };

    return (
        <div className="hidden md:block w-full max-w-6xl mx-auto py-12 px-4 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {activeCategories.map((categoryItem) => {
                    const categoryStacks = groupedTechStacks[categoryItem.id] || [];
                    const isToolsCategory = 
                        categoryItem.name.toLowerCase().includes("tool") || 
                        categoryItem.name.toLowerCase().includes("other") || 
                        categoryStacks.length > 5;

                    return (
                        <motion.div 
                            key={categoryItem.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.5 }}
                            className="flex flex-col gap-4"
                        >
                            <h3 
                                className="text-xl font-heading font-semibold border-b pb-2 transition-colors"
                                style={categoryItem.color ? { color: categoryItem.color, borderColor: `${categoryItem.color}30` } : { borderColor: "hsl(var(--border))" }}
                            >
                                {categoryItem.name}
                            </h3>
                            <div className={isToolsCategory ? "grid grid-cols-2 gap-2" : "flex flex-col gap-3"}>
                                {categoryStacks.map((techItem) => renderTechItem(techItem, isToolsCategory))}
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
                        <div className="grid grid-cols-2 gap-2">
                            {uncategorizedStacks.map((techItem) => renderTechItem(techItem, true))}
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
}
