import {FormEvent, useEffect, useState} from "react";
import dayjs from "dayjs";
import {WorkExperience} from "@/types";
import {useCreateWorkExperience, useUpdateWorkExperience} from "@/features/work-experiences/hooks/useWorkExperiences";

interface UseWorkExperienceFormProps {
    experienceToEdit?: WorkExperience | null;
    open: boolean;
    onSuccess: () => void;
    onClose: () => void;
}

export const useWorkExperienceForm = ({
                                          experienceToEdit,
                                          open,
                                          onSuccess,
                                          onClose,
                                      }: UseWorkExperienceFormProps) => {
    // 1. Setup Mutations
    const createMutation = useCreateWorkExperience();
    const updateMutation = useUpdateWorkExperience();
    const isSubmitting = createMutation.isPending || updateMutation.isPending;

    // 2. Setup State
    const [formData, setFormData] = useState({
        company: "",
        position: "",
        location: "",
        start_date: "",
        end_date: "",
        description: "",
        is_current: false,
    });
    const [selectedStackIds, setSelectedStackIds] = useState<number[]>([]);
    const [selectedTagIds, setSelectedTagIds] = useState<number[]>([]);

    // 3. Helper Functions
    const formatDateToYYYYMM = (dateStr: string) => dayjs(dateStr, "MMM YYYY").format("YYYY-MM");

    const toggleStack = (id: number) => {
        setSelectedStackIds((prev) => prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]);
    };

    const toggleTag = (id: number) => {
        setSelectedTagIds((prev) => prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]);
    };

    const handleInputChange = (field: keyof typeof formData, value: string | boolean) => {
        setFormData((prev) => ({...prev, [field]: value}));
    };

    // 4. Reset / Populate Logic
    useEffect(() => {
        if (open) {
            setTimeout(() => {
                if (experienceToEdit) {
                    setFormData({
                        company: experienceToEdit.company,
                        position: experienceToEdit.position,
                        location: experienceToEdit.location,
                        start_date: experienceToEdit.start_date ? formatDateToYYYYMM(experienceToEdit.start_date) : "",
                        end_date: experienceToEdit.end_date ? formatDateToYYYYMM(experienceToEdit.end_date) : "",
                        description: experienceToEdit.description,
                        is_current: experienceToEdit.is_current,
                    });
                    setSelectedStackIds(experienceToEdit.tech_stack?.map((s) => s.id) || []);
                    setSelectedTagIds(experienceToEdit.tags?.map((t) => t.id) || []);
                } else {
                    setFormData({
                        company: "",
                        position: "",
                        location: "",
                        start_date: "",
                        end_date: "",
                        description: "",
                        is_current: false,
                    });
                    setSelectedStackIds([]);
                    setSelectedTagIds([]);
                }
            }, 0);
        }
    }, [open, experienceToEdit]);

    // 5. Submit Logic
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        const payload = {
            ...formData,
            end_date: formData.end_date || null,
            tech_stack_ids: selectedStackIds,
            tag_ids: selectedTagIds,
        };

        const callbacks = {
            onSuccess: () => {
                onSuccess();
                onClose();
            },
            onError: (err: unknown) => console.error("Error submit", err),
        };

        if (experienceToEdit) {
            updateMutation.mutate({
                id: experienceToEdit.id,
                data: payload
            }, callbacks);
        } else {
            createMutation.mutate(payload, callbacks);
        }
    };

    return {
        formData,
        handleInputChange,
        selectedStackIds,
        toggleStack,
        selectedTagIds,
        toggleTag,
        handleSubmit,
        isSubmitting
    };
};