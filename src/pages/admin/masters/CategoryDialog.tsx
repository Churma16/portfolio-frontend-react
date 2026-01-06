import { useEffect, useState, FormEvent } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CgSpinner } from "react-icons/cg";
import apiClient from "@/api/axios";
import { Category } from "@/types";

interface Props {
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
}: Props) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({ name: "", description: "" });

    useEffect(() => {
        if (open) {
            setFormData({
                name: dataToEdit?.name || "",
                description: dataToEdit?.description || "",
            });
        }
    }, [open, dataToEdit]);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        const url = dataToEdit ? `/categories/${dataToEdit.id}` : "/categories";

        try {
            if (dataToEdit) {
                await apiClient.put(url, formData);
            } else {
                await apiClient.post(url, formData);
            }
            onSuccess();
            onOpenChange(false);
        } catch (error) {
            console.error("Error saving category:", error);
            alert("Gagal menyimpan category!");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="bg-[#0f172a] border-white/10 text-white">
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
                                setFormData({
                                    ...formData,
                                    name: e.target.value,
                                })
                            }
                            placeholder="e.g. Web Development"
                            className="bg-black/20 border-white/10"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Description</Label>
                        <Textarea
                            value={formData.description}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    description: e.target.value,
                                })
                            }
                            placeholder="Describe this category..."
                            className="bg-black/20 border-white/10"
                            rows={4}
                        />
                    </div>
                    <DialogFooter>
                        <Button
                            type="submit"
                            className="bg-lara-blue"
                            disabled={isSubmitting}
                        >
                            {isSubmitting && (
                                <CgSpinner className="animate-spin mr-2" />
                            )}
                            Save
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
