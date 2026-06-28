import {TechStack} from "@/types";
import {useCreateTechStack, useUpdateTechStack} from "@/features/tech-stacks/hooks/useTechStacks.ts";
import {FormEvent, useEffect, useState} from "react";

interface UseTechStackFormProps {
    techStackToEdit?: TechStack | null;
    open: boolean;
    onSuccess: () => void;
    onClose: () => void;
}

export const useTechStackForm = ({
                                     techStackToEdit,
                                     open,
                                     onSuccess,
                                     onClose
                                 }: UseTechStackFormProps) => {
    const createMutation = useCreateTechStack();
    const updateMutation = useUpdateTechStack();
    const isSubmitting = createMutation.isPending || updateMutation.isPending;


    const [formData, setFormData] = useState({
        name: "",
        icon: "",
        tech_stack_category_id: "" as string | number,
    })

    const handleInputChange = (field: keyof typeof formData, value: string | boolean | number) => {
        setFormData((prev) => ({...prev, [field]: value}));
    };

    useEffect(() => {
        if (open) {
            setTimeout(() => {
                if (techStackToEdit) {
                    setFormData({
                        name: techStackToEdit.name,
                        icon: techStackToEdit.icon || "",
                        tech_stack_category_id: techStackToEdit.tech_stack_category_id || "",
                    });
                } else {
                    setFormData({
                        name: "",
                        icon: "",
                        tech_stack_category_id: "",
                    });
                }
            }, 0);
        }
    }, [open, techStackToEdit]);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        const payload = {
            name: formData.name,
            icon: formData.icon,
            tech_stack_category_id: formData.tech_stack_category_id === "" ? null : Number(formData.tech_stack_category_id)
        };

        const callbacks = {
            onSuccess: () => {
                onSuccess();
                onClose();
            },
            onError: (err: unknown) => console.error("Error submit", err),
        }

        if (techStackToEdit) {
            updateMutation.mutate(
                {id: techStackToEdit.id, data: payload},
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
    }
}
