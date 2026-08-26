import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle,} from "@/components/ui/dialog.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Label} from "@/components/ui/label.tsx";
import {CgSpinner} from "react-icons/cg";
import {useTechStackCategoryForm} from "@/features/tech-stacks/hooks/useTechStackCategoryForm.ts";
import {TechStackCategory} from "@/types";

interface TechStackCategoryDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    dataToEdit?: TechStackCategory | null;
    onSuccess: () => void;
}

export default function TechStackCategoryDialog({
                                                    open,
                                                    onOpenChange,
                                                    dataToEdit,
                                                    onSuccess,
                                                }: TechStackCategoryDialogProps) {
    const {
        formData,
        handleInputChange,
        handleSubmit,
        isSubmitting,
    } = useTechStackCategoryForm({
        categoryToEdit: dataToEdit,
        open,
        onSuccess,
        onClose: () => onOpenChange(false),
    });

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="w-[95vw] max-w-md bg-admin-card border-admin-border/50 text-foreground p-4 sm:p-6 max-h-[92vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>
                        {dataToEdit ? "Edit Tech Stack Category" : "Add Tech Stack Category"}
                    </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label>Category Name</Label>
                        <Input
                            value={formData.name}
                            onChange={(e) =>
                                handleInputChange("name", e.target.value)}
                            placeholder="e.g. Backend"
                            className="bg-black/20 border-admin-border/30"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>Color (Optional)</Label>
                        <Input
                            type="input"
                            value={formData.color}
                            onChange={(e) =>
                                handleInputChange("color", e.target.value)}
                            placeholder="e.g. #3b82f6 or blue"
                            className="bg-black/20 border-admin-border/30 h-10"
                        />
                    </div>
                    <DialogFooter className="flex flex-col-reverse sm:flex-row gap-2 pt-2">
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={() => onOpenChange(false)}
                            className="w-full sm:w-auto"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            className="w-full sm:w-auto bg-primary hover:bg-primary-hover"
                            disabled={isSubmitting}
                        >
                            {isSubmitting && (
                                <CgSpinner className="animate-spin mr-2"/>
                            )}
                            {dataToEdit ? "Update" : "Create"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
