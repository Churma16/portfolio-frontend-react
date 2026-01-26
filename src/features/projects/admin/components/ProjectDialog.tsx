import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Textarea} from "@/components/ui/textarea.tsx";
import {Label} from "@/components/ui/label.tsx";
import {CgSpinner} from "react-icons/cg";
import {Project} from "@/types";
import TechIcon from "../../../../components/common/TechIcon.tsx";
import {useTechStacks} from "@/features/tech-stacks/hooks/useTechStacks.ts";
import {useTags} from "@/features/tags/hooks/useTags.ts";
import {useCategories} from "@/features/categories/hooks/useCategories.ts";
import {useProjectForm} from "@/features/projects/hooks/useProjectForm.ts";

interface ProjectDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    projectToEdit?: Project | null;
    onSuccess: () => void;
}

export default function ProjectDialog({
                                          open,
                                          onOpenChange,
                                          projectToEdit,
                                          onSuccess,
                                      }: ProjectDialogProps) {
    // Use custom hooks for master data
    const {data: availableStacks = []} = useTechStacks();
    const {data: availableTags = []} = useTags();
    const {data: availableCategories = []} = useCategories();

    const {
        formData,
        handleInputChange,
        thumbnailPreview,
        handleThumbnailChange,
        selectedStackIds,
        toggleStack,
        selectedTagIds,
        toggleTag,
        selectedCategoryId,
        setSelectedCategoryId,
        handleSubmit,
        isSubmitting,
    } = useProjectForm({
        projectToEdit,
        open,
        onSuccess,
        onClose: () => onOpenChange(false),
    });

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent
                className="max-w-3xl w-[95vw] bg-admin-card border border-white/10 text-foreground max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>
                        {projectToEdit ? "Edit Project" : "Add New Project"}
                    </DialogTitle>
                    <DialogDescription>
                        Fill in the details below. Click on Tech Stacks and Tags
                        to toggle them.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-6 mt-4">
                    {/* Row 1: Title & Thumbnail */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Project Title</Label>
                            <Input
                                value={formData.title}
                                onChange={(e) => handleInputChange("title", e.target.value)}
                                placeholder="E.g. E-Commerce App"
                                className="bg-black/20 border-white/10"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>Thumbnail Image</Label>
                            <div className="space-y-2">
                                <div
                                    className="relative border-2 border-dashed border-white/20 rounded-lg p-4 text-center hover:border-white/40 transition-colors cursor-pointer group">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleThumbnailChange}
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    />
                                    {thumbnailPreview ? (
                                        <div className="space-y-2">
                                            <img
                                                src={thumbnailPreview}
                                                alt="Preview"
                                                className="w-full h-32 object-cover rounded"
                                            />
                                            <p className="text-xs text-slate-400">
                                                Click to change
                                            </p>
                                        </div>
                                    ) : (
                                        <div className="py-6 space-y-2">
                                            <p className="text-sm text-slate-400 group-hover:text-slate-300">
                                                Click to upload image
                                            </p>
                                            <p className="text-xs text-slate-500">
                                                PNG, JPG or GIF
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Repo URL (GitHub)</Label>
                            <Input
                                value={formData.repo_url}
                                onChange={(e) => handleInputChange("repo_url", e.target.value)}
                                placeholder="https://github.com/..."
                                className="bg-black/20 border-white/10"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Live Demo URL</Label>
                            <Input
                                value={formData.demo_url}
                                onChange={(e) => handleInputChange("demo_url", e.target.value)}
                                placeholder="https://..."
                                className="bg-black/20 border-white/10"
                            />
                        </div>
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                        <Label>Description</Label>
                        <Textarea
                            value={formData.content}
                            onChange={(e) => handleInputChange("content", e.target.value)}
                            placeholder="Tell a story about this project..."
                            className="bg-black/20 border-white/10"
                            rows={4}
                        />
                    </div>

                    {/* --- CATEGORY SELECTOR (Single Selection) --- */}
                    <div className="space-y-3">
                        <Label className="text-lara-accent-purple font-bold uppercase tracking-wider text-xs">
                            Select Category
                        </Label>
                        <div className="flex flex-wrap gap-2 p-4 rounded-xl bg-black/20 border border-white/5">
                            {availableCategories.map((category) => {
                                const isSelected =
                                    selectedCategoryId === category.id;
                                return (
                                    <div
                                        key={category.id}
                                        onClick={() =>
                                            setSelectedCategoryId(category.id)
                                        }
                                        className={`cursor-pointer px-4 py-2 rounded-lg border transition-all duration-200 select-none
                                            ${
                                            isSelected
                                                ? "bg-purple-500/20 border-purple-500 text-foreground shadow-[0_0_10px_rgba(168,85,247,0.3)]"
                                                : "bg-white/5 border-transparent text-slate-400 hover:bg-white/10 hover:border-white/20"
                                        }
                                        `}
                                    >
                                        <span className="text-sm font-medium">
                                            {category.name}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* --- TOGGLE AREA: TECH STACKS --- */}
                    <div className="space-y-3">
                        <Label className="text-primary font-bold uppercase tracking-wider text-xs">
                            Select Tech Stacks
                        </Label>
                        <div className="flex flex-wrap gap-2 p-4 rounded-xl bg-black/20 border border-white/5">
                            {availableStacks.map((stack) => {
                                const isSelected = selectedStackIds.includes(
                                    stack.id
                                );
                                return (
                                    <div
                                        key={stack.id}
                                        onClick={() => toggleStack(stack.id)}
                                        className={`cursor-pointer flex items-center gap-2 px-3 py-2 rounded-lg border transition-all duration-200 select-none
                                            ${
                                            isSelected
                                                ? "bg-primary/20 border-primary text-foreground shadow-[0_0_10px_rgba(59,130,246,0.3)]"
                                                : "bg-white/5 border-transparent text-slate-400 hover:bg-white/10 hover:border-white/20"
                                        }
                                        `}
                                    >
                                        <TechIcon
                                            name={stack.name}
                                            icon={stack.icon}
                                            className={`w-4 h-4 ${
                                                isSelected
                                                    ? "text-primary"
                                                    : "text-slate-500"
                                            }`}
                                        />
                                        <span className="text-xs font-medium">
                                            {stack.name}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* --- TOGGLE AREA: TAGS --- */}
                    <div className="space-y-3">
                        <Label className="text-lara-accent-green font-bold uppercase tracking-wider text-xs">
                            Select Tags
                        </Label>
                        <div className="flex flex-wrap gap-2 p-4 rounded-xl bg-black/20 border border-white/5">
                            {availableTags.map((tag) => {
                                const isSelected = selectedTagIds.includes(
                                    tag.id
                                );
                                return (
                                    <div
                                        key={tag.id}
                                        onClick={() => toggleTag(tag.id)}
                                        className={`cursor-pointer px-3 py-1.5 rounded-full border text-[11px] font-bold uppercase tracking-wide transition-all duration-200 select-none
                                            ${
                                            isSelected
                                                ? "bg-green-500/20 border-green-500 text-green-400"
                                                : "bg-white/5 border-transparent text-slate-500 hover:bg-white/10"
                                        }
                                        `}
                                    >
                                        #{tag.name}
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <DialogFooter>
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={() => onOpenChange(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            className="bg-primary hover:bg-blue-600 min-w-[120px]"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (<CgSpinner className="animate-spin mr-2"/>) : null}
                            {projectToEdit
                                ? "Update Project"
                                : "Create Project"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
