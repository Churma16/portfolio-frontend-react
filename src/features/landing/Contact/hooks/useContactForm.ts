import { FormEvent, useState } from "react";
import { useCreateMessage } from "@/hooks/useMessages.ts";

export interface ContactFormData {
    name: string;
    email: string;
    content: string;
    gotcha: string;
}

export function useContactForm() {
    const createMessageMutation = useCreateMessage();

    const [formData, setFormData] = useState<ContactFormData>({
        name: "",
        email: "",
        content: "",
        gotcha: "",
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = event.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: "" }));
        }
    };

    const validate = (): boolean => {
        // Honeypot bot detection: silently ignore submission if gotcha is filled
        if (formData.gotcha) {
            return false;
        }

        const validationErrors: Record<string, string> = {};
        if (!formData.name.trim()) {
            validationErrors.name = "Name is required.";
        }
        if (!formData.email.trim()) {
            validationErrors.email = "Email is required.";
        } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email)) {
            validationErrors.email = "Email is invalid.";
        }
        if (!formData.content.trim()) {
            validationErrors.content = "Message cannot be empty.";
        }

        setErrors(validationErrors);
        return Object.keys(validationErrors).length === 0;
    };

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();

        // Bot trapped in honeypot
        if (formData.gotcha) {
            setFormData({ name: "", email: "", content: "", gotcha: "" });
            return;
        }

        if (!validate()) {
            return;
        }

        createMessageMutation.mutate(
            {
                name: formData.name.trim(),
                email: formData.email.trim(),
                content: formData.content.trim(),
            },
            {
                onSuccess: () => {
                    setFormData({ name: "", email: "", content: "", gotcha: "" });
                    setTimeout(() => {
                        createMessageMutation.reset();
                    }, 3000);
                },
            }
        );
    };

    return {
        formData,
        errors,
        handleChange,
        handleSubmit,
        isPending: createMessageMutation.isPending,
        isSuccess: createMessageMutation.isSuccess,
    };
}
