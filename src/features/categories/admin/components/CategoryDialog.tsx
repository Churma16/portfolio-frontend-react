import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle,} from "@/components/ui/dialog.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Label} from "@/components/ui/label.tsx";
import {CgSpinner} from "react-icons/cg";
import {useCategoryForm} from "@/features/categories/hooks/useCategoryForm.ts";
import {Category} from "@/types";

interface CategoryProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    dataToEdit?: Category | null;
    onSuccess: () => void;
}


export default function CategoryDialog({
                                           open,
                                           onOpenChange,
                                           dataToEdit,
                                           onSuccess,
                                       }: CategoryProps) {
    const {
        formData,
        handleInputChange,
        handleSubmit,
        isSubmitting,
    } = useCategoryForm({
        categoryToEdit: dataToEdit,
        open,
        onSuccess,
        onClose: () => onOpenChange(false),
    });

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className=" w-[90vw] bg-admin-card border-admin-border/50 text-foreground">
                <DialogHeader>
                    <DialogTitle>
                        {dataToEdit ? "Edit Category" : "Add Category"}
                    </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label>Category Name</Label>
                        <Input
                            value={formData.name}
                            onChange={(e) =>
                                handleInputChange("name", e.target.value)}
                            placeholder="e.g. Web Development"
                            className="bg-black/20 border-admin-border/30"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>Color</Label>
                        <Input
                            type="input"
                            value={formData.color}
                            onChange={(e) =>
                                handleInputChange("color", e.target.value)}
                            className="bg-black/20 border-admin-border/30 h-10 cursor-pointer"
                        />
                    </div>
                    <DialogFooter>
                        <Button
                            type="submit"
                            className="bg-primary"
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
