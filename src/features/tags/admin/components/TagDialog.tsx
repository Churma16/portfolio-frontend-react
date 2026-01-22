import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle,} from "@/components/ui/dialog.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Label} from "@/components/ui/label.tsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue,} from "@/components/ui/select.tsx";
import {CgSpinner} from "react-icons/cg";
import {Tag} from "@/types";
import {useTagForm} from "@/features/tags/hooks/useTagForm.ts";

interface TagProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    dataToEdit?: Tag | null;
    onSuccess: () => void;
}

export default function TagDialog({
                                      open,
                                      onOpenChange,
                                      dataToEdit,
                                      onSuccess,
                                  }: TagProps) {
    const {
        formData,
        handleInputChange,
        handleSubmit,
        isSubmitting,
        availableCategories
    } = useTagForm({
        tagToEdit: dataToEdit,
        open,
        onSuccess,
        onClose: () => onOpenChange(false),
    });

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="bg-admin-card w-[95vw] border-white/10 text-foreground">
                <DialogHeader>
                    <DialogTitle>
                        {dataToEdit ? "Edit Tag" : "Add Tag"}
                    </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label>Tag Name</Label>
                        <Input
                            value={formData.name}
                            onChange={(e) =>
                                handleInputChange("name", e.target.value)}
                            placeholder="e.g. Mobile"
                            className="bg-black/20 border-white/10"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Color Theme</Label>
                        <Select
                            value={formData.color}
                            onValueChange={(value) => handleInputChange("color", value)}
                        >
                            <SelectTrigger className="bg-black/20 border-white/10 text-foreground">
                                <SelectValue placeholder="Select color"/>
                            </SelectTrigger>
                            <SelectContent className="bg-admin-card border-white/10 text-foreground">
                                <SelectItem value="blue">Blue</SelectItem>
                                <SelectItem value="green">Green</SelectItem>
                                <SelectItem value="red">Red</SelectItem>
                                <SelectItem value="yellow">Yellow</SelectItem>
                                <SelectItem value="purple">Purple</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label>Category</Label>
                        <Select
                            value={formData.category_id ? String(formData.category_id) : undefined}
                            onValueChange={(value) => handleInputChange("category_id", value)}
                        >
                            <SelectTrigger className="bg-black/20 border-white/10 text-foreground">
                                <SelectValue placeholder="Select a category"/>
                            </SelectTrigger>
                            <SelectContent className="bg-admin-card border-white/10 text-foreground">
                                {availableCategories && availableCategories.length > 0 &&
                                    availableCategories.map((category, index) => (
                                        <SelectItem key={index} value={String(category.id)}>
                                            {category.name}
                                        </SelectItem>
                                    ))
                                }
                            </SelectContent>
                        </Select>
                    </div>

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
