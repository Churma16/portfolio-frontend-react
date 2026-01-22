import {Tag} from "@/types";
import {useCreateTag, useUpdateTag} from "@/features/tags/hooks/useTags.ts";
import {FormEvent, useEffect, useState} from "react";
import {useCategories} from "@/features/categories/hooks/useCategories.ts";

interface UseTagFormProps {
    tagToEdit?: Tag | null;
    open: boolean;
    onSuccess: () => void;
    onClose: () => void;
}

export const useTagForm = ({
                               tagToEdit,
                               open,
                               onSuccess,
                               onClose
                           }: UseTagFormProps) => {

    const {data: availableCategories} = useCategories();
    const createMutation = useCreateTag();
    const updateMutation = useUpdateTag();

    const isSubmitting = createMutation.isPending || updateMutation.isPending;

    const [formData, setFormData] = useState({
        name: "",
        color: "blue",
        category_id: null as number | null,
    })

    const handleInputChange = (field: keyof typeof formData, value: string | boolean) => {
        setFormData((prev) => ({...prev, [field]: value}));
    };

    useEffect(() => {
        if (open) {
            setTimeout(() => {
                if (tagToEdit) {
                    setFormData({
                        name: tagToEdit.name,
                        color: tagToEdit.color || "",
                        category_id: tagToEdit.category_id || null,
                    });
                } else {
                    setFormData({
                        name: "",
                        color: "",
                        category_id: null,
                    });
                }
            }, 0);
        }
    }, [open, tagToEdit]);

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
        }

        if (tagToEdit) {
            updateMutation.mutate(
                {
                    id: tagToEdit.id,
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
        availableCategories
    }
}