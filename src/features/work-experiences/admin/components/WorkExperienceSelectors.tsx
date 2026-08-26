import {Label} from "@/components/ui/label.tsx";
import TechIcon from "@/components/common/TechIcon.tsx";
import {Tag, TechStack} from "@/types"; // Sesuaikan import type kamu

// --- COMPONENT 1: TECH STACK SELECTOR ---
interface TechStackSelectorProps {
    options: TechStack[];
    selectedIds: number[];
    onToggle: (id: number) => void;
}

export const TechStackSelector = ({options, selectedIds, onToggle}: TechStackSelectorProps) => {
    return (
        <div className="space-y-3">
            <Label className="text-primary font-bold uppercase tracking-wider text-xs">
                Select Tech Stacks
            </Label>
            <div className="flex flex-wrap gap-2 p-3 sm:p-4 rounded-xl bg-black/20 border border-white/5 max-h-48 overflow-y-auto">
                {options.map((stack) => {
                    const isSelected = selectedIds.includes(stack.id);
                    return (
                        <button
                            type="button"
                            key={stack.id}
                            onClick={() => onToggle(stack.id)}
                            className={`cursor-pointer flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-all duration-200 select-none text-left
                                ${isSelected
                                ? "bg-primary/20 border-primary text-foreground shadow-[0_0_10px_rgba(59,130,246,0.3)]"
                                : "bg-white/5 border-transparent text-muted-foreground hover:bg-white/10 hover:border-white/20"
                            }`}
                        >
                            <TechIcon
                                name={stack.name}
                                icon={stack.icon}
                                className={`w-3.5 h-3.5 ${isSelected ? "text-primary" : "text-muted-foreground"}`}
                            />
                            <span className="text-xs font-medium">{stack.name}</span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

// --- COMPONENT 2: TAG SELECTOR ---
interface TagSelectorProps {
    options: Tag[];
    selectedIds: number[];
    onToggle: (id: number) => void;
}

export const TagSelector = ({options, selectedIds, onToggle}: TagSelectorProps) => {
    return (
        <div className="space-y-3">
            <Label className="text-lara-accent-green font-bold uppercase tracking-wider text-xs">
                Select Tags
            </Label>
            <div className="flex flex-wrap gap-2 p-3 sm:p-4 rounded-xl bg-black/20 border border-white/5 max-h-36 overflow-y-auto">
                {options.map((tag) => {
                    const isSelected = selectedIds.includes(tag.id);
                    return (
                        <button
                            type="button"
                            key={tag.id}
                            onClick={() => onToggle(tag.id)}
                            className={`cursor-pointer px-3 py-1.5 rounded-full border text-[11px] font-bold uppercase tracking-wide transition-all duration-200 select-none
                                ${isSelected
                                ? "bg-green-500/20 border-green-500 text-green-400"
                                : "bg-white/5 border-transparent text-muted-foreground hover:bg-white/10"
                            }`}
                        >
                            #{tag.name}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};