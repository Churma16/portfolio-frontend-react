import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle,} from "@/components/ui/dialog.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Label} from "@/components/ui/label.tsx";
import {CgSpinner} from "react-icons/cg";
import {TechStack} from "@/types";
import TechIcon from "@/components/common/TechIcon.tsx";
import {useTechStackForm} from "@/features/tech-stacks/hooks/UseTechStackForm.ts";

import {useTechStackCategories} from "@/features/tech-stacks/hooks/useTechStackCategories.ts";

interface TechStackDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    dataToEdit?: TechStack | null;
    onSuccess: () => void;
}

export default function TechStackDialog({
                                             open,
                                             onOpenChange,
                                             dataToEdit,
                                             onSuccess,
                                         }: TechStackDialogProps) {
    const {
        formData,
        handleInputChange,
        handleSubmit,
        isSubmitting
    } = useTechStackForm({
        techStackToEdit: dataToEdit,
        open,
        onSuccess,
        onClose: () => onOpenChange(false),
    });

    const {data: categories = []} = useTechStackCategories();

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="w-[95vw] bg-admin-card border-admin-border/50 text-foreground">
                <DialogHeader>
                    <DialogTitle>
                        {dataToEdit ? "Edit Tech Stack" : "Add Tech Stack"}
                    </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label>Name</Label>
                        <Input
                            value={formData.name}
                            onChange={(e) =>
                                handleInputChange("name", e.target.value)}
                            placeholder="e.g. Laravel"
                            className="bg-black/20 border-admin-border/30"
                            required
                        />
                    </div>
                    
                    <div className="space-y-2">
                        <Label>Tech Stack Category</Label>
                        <select
                            value={formData.tech_stack_category_id}
                            onChange={(e) => handleInputChange("tech_stack_category_id", e.target.value)}
                            className="w-full rounded-md border border-admin-border/30 bg-black/20 text-foreground h-10 px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        >
                            <option value="" className="bg-admin-card text-foreground">Select a Category</option>
                            {categories.map((cat) => (
                                <option key={cat.id} value={cat.id} className="bg-admin-card text-foreground">
                                    {cat.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="space-y-2">
                        <Label>Icon Name (React Icons)</Label>
                        <Input
                            value={formData.icon}
                            onChange={(e) =>
                                handleInputChange("icon", e.target.value)}
                            placeholder="e.g. SiLaravel"
                            className="bg-black/20 border-admin-border/30"
                        />
                        <p className="text-[10px] text-lara-text-muted-dark">
                            Use names from{" "}
                            <a
                                href="https://react-icons.github.io/react-icons/icons/si/"
                                target="_blank"
                                className="text-lara-accent-blue-light underline"
                            >
                                Simple Icons
                            </a>{" "}
                            or{" "}
                            <a
                                href="https://react-icons.github.io/react-icons/icons/hi2/"
                                target="_blank"
                                className="text-lara-accent-blue-light underline"
                            >
                                HeroIcons 2
                            </a>
                            .
                        </p>
                    </div>
                    {/* Preview Icon */}
                    {formData.icon && (
                        <div className="flex items-center gap-2 p-3 bg-white/5 rounded-lg">
                            <span className="text-xs text-lara-text-muted-dark">
                                Preview:
                            </span>
                            <TechIcon
                                name={formData.name}
                                icon={formData.icon}
                                className="w-6 h-6 text-foreground"
                            />
                        </div>
                    )}
                    <DialogFooter>
                        <Button
                            type="submit"
                            className="bg-primary"
                            disabled={isSubmitting}
                        >
                            {isSubmitting && (
                                <CgSpinner className="animate-spin mr-2"/>
                            )}{" "}
                            Save
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
