import {FormEvent, useState} from "react";
import {useChangePassword} from "@/features/auth/hooks/useChangePassword.ts";
import {toast} from "sonner";
import {AxiosError} from "axios";

export const useChangePasswordForm = () => {
    const [formData, setFormData] = useState({
        old_password: '',
        new_password: ''
    });

    const updateMutation = useChangePassword();

    const handleInputChange = (field: keyof typeof formData, value: string) => {
        setFormData((prev) => ({...prev, [field]: value}));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        // Validate form data
        if (!formData.old_password || !formData.new_password) {
            toast.error("Please fill in all fields");
            return;
        }

        // Trigger mutation with error handling
        updateMutation.mutate(formData, {
            onSuccess: () => {
                toast.success("Password updated successfully!");
                // Reset form after successful password change
                setFormData({
                    old_password: '',
                    new_password: ''
                });
            },
            onError: (error: unknown) => {
                const axiosError = error as AxiosError<{
                    meta?: { message?: string; code?: number };
                    errors?: Record<string, string[]>
                }>;

                // Check if response has meta.message (your API structure)
                if (axiosError.response?.data?.meta?.message) {
                    toast.error(axiosError.response.data.meta.message);
                }
                // Check for validation errors (422)
                else if (axiosError.response?.status === 422 && axiosError.response?.data?.errors) {
                    const validationErrors = axiosError.response.data.errors;
                    Object.entries(validationErrors).forEach(([field, messages]) => {
                        toast.error(`${field}: ${messages.join(", ")}`);
                    });
                }
                // Fallback error message
                else {
                    const message = "Something went wrong. Please try again.";
                    toast.error(message);
                }
            }
        });
    };

    return {
        formData,
        handleInputChange,
        handleSubmit,
        isLoading: updateMutation.isPending,
        error: updateMutation.error,
        isSuccess: updateMutation.isSuccess,
    };
};
