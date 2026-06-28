import {useCreateTechStackCategory, useUpdateTechStackCategory} from "@/features/tech-stacks/hooks/useTechStackCategories.ts";
import {TechStackCategory} from "@/types";
import {FormEvent, useEffect, useState} from "react";

interface useTechStackCategoryFormProps {
    categoryToEdit?: TechStackCategory | null;
    open: boolean;
    onSuccess: () => void;
    onClose: () => void;
}

export const useTechStackCategoryForm = ({
                                            categoryToEdit,
                                            open,
                                            onSuccess,
                                            onClose
                                        }: useTechStackCategoryFormProps) => {

    const createMutation = useCreateTechStackCategory();
    const updateMutation = useUpdateTechStackCategory();

    const isSubmitting = createMutation.isPending || updateMutation.isPending;

    const [formData, setFormData] = useState({
        name: "",
        color: "",
    });

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
        };

        const callbacks = {
            onSuccess: () => {
                onSuccess();
                onClose();
            },
            onError: (err: unknown) => console.error("Error submit", err),
        };

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
    };

    return {
        formData,
        handleInputChange,
        handleSubmit,
        isSubmitting,
    };
};
