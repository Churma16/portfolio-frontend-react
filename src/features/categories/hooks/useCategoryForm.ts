import {useCreateCategory, useUpdateCategory} from "@/features/categories/hooks/useCategories.ts";
import {Category} from "@/types";
import {FormEvent, useEffect, useState} from "react";

interface useCategoryFormProps {
    categoryToEdit?: Category | null;
    open: boolean;
    onSuccess: () => void;
    onClose: () => void;
}

export const useCategoryForm = ({
                                    categoryToEdit,
                                    open,
                                    onSuccess,
                                    onClose
                                }: useCategoryFormProps) => {

    const createMutation = useCreateCategory();
    const updateMutation = useUpdateCategory();

    const isSubmitting = createMutation.isPending || updateMutation.isPending;

    const [formData, setFormData] = useState({
        name: "",
        color: "",
    })

    const handleInputChange = (field: keyof typeof formData, value: string | boolean) => {
        setFormData((prev) => ({...prev, [field]: value}));
    };

    useEffect(() => {
        if (open) {
            setTimeout(() => {
                if (categoryToEdit) {
                    setFormData({
                        name: categoryToEdit.name,
                        color: categoryToEdit.color || "",
                    });
                } else {
                    setFormData({
                        name: "",
                        color: "",
                    });
                }
            }, 0);
        }
    }, [open, categoryToEdit]);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        const payload = {
            ...formData
        }

        const callbacks = {
            onSuccess: () => {
                onSuccess();
                onClose();
            },
            onError: (err: unknown) => console.error("Error submit", err),
        }

        if (categoryToEdit) {
            updateMutation.mutate(
                {
                    id: categoryToEdit.id,
                    data: payload
                },
                callbacks
            );
        } else {
            createMutation.mutate(payload, callbacks);
        }
    }

    return {
        formData,
        handleInputChange,
        handleSubmit,
        isSubmitting,
    }
}