import {FormEvent, useEffect, useState} from "react";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle,} from "@/components/ui/dialog.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Label} from "@/components/ui/label.tsx";
import {CgSpinner} from "react-icons/cg";
import apiClient from "@/api/axios.ts";
import {ApiResponse, Category} from "@/types";
import axios from "axios";

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    dataToEdit?: Category | null;
    onSuccess: () => void;
}

interface CategoryFormData {
    name: string;
    color: string;
}

export default function CategoryDialog({
                                           open,
                                           onOpenChange,
                                           dataToEdit,
                                           onSuccess,
                                       }: Props) {
    const queryClient = useQueryClient();
    const [formData, setFormData] = useState<CategoryFormData>({name: "", color: ""});
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        if (open) {
            setFormData({
                name: dataToEdit?.name || "",
                color: dataToEdit?.color || "",
            });
            setErrorMessage("");
        }
    }, [open, dataToEdit]);

    // --- TANSTACK QUERY MUTATION ---
    const mutation = useMutation({
        mutationFn: async (data: CategoryFormData) => {
            const url = dataToEdit ? `/categories/${dataToEdit.id}` : "/categories";
            if (dataToEdit) {
                return await apiClient.put<ApiResponse<Category>>(url, data);
            } else {
                return await apiClient.post<ApiResponse<Category>>(url, data);
            }
        },
        onSuccess: () => {
            // Invalidate categories query untuk refresh data
            queryClient.invalidateQueries({queryKey: ["categories"]});
            onSuccess();
            onOpenChange(false);
        },
        onError: (error) => {
            // Type-safe error handling
            if (axios.isAxiosError(error)) {
                const message = error.response?.data?.message || "Gagal menyimpan category";
                setErrorMessage(message);
                console.error("Category save error:", error.response?.data);
            } else {
                setErrorMessage("Terjadi kesalahan yang tidak terduga");
                console.error("Unexpected error:", error);
            }
        },
    });

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        mutation.mutate(formData);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className=" w-[90vw] bg-admin-card border-white/10 text-foreground">
                <DialogHeader>
                    <DialogTitle>
                        {dataToEdit ? "Edit Category" : "Add Category"}
                    </DialogTitle>
                </DialogHeader>

                {/* Error Message */}
                {errorMessage && (
                    <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
                        {errorMessage}
                    </div>
                )}

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
                        <Label>Color</Label>
                        <Input
                            type="input"
                            value={formData.color}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    color: e.target.value,
                                })
                            }
                            className="bg-black/20 border-white/10 h-10 cursor-pointer"
                        />
                    </div>
                    <DialogFooter>
                        <Button
                            type="submit"
                            className="bg-primary"
                            disabled={mutation.isPending}
                        >
                            {mutation.isPending && (
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
