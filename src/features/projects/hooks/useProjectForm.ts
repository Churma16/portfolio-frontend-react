import {useCreateProject, useUpdateProject} from "@/features/projects/hooks/useProjects.ts";
import {FormEvent, useEffect, useState} from "react";
import {Project} from "@/types";

interface UseWorkExperienceFormProps {
    projectToEdit?: Project | null;
    open: boolean;
    onSuccess: () => void;
    onClose: () => void;
}

export const useProjectForm = ({
                                   projectToEdit,
                                   open,
                                   onSuccess,
                                   onClose,
                               }: UseWorkExperienceFormProps) => {
    const createMutation = useCreateProject();
    const updateMutation = useUpdateProject();
    const isSubmitting = createMutation.isPending || updateMutation.isPending;

    const [formData, setFormData] = useState({
        title: "",
        content: "",
        thumbnail: "",
        repo_url: "",
        demo_url: "",
    });

    const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
    const [thumbnailPreview, setThumbnailPreview] = useState<string>("");

    const [selectedStackIds, setSelectedStackIds] = useState<number[]>([]);
    const [selectedTagIds, setSelectedTagIds] = useState<number[]>([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);

    const toggleStack = (id: number) => {
        setSelectedStackIds((prev) => prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]);
    };

    const toggleTag = (id: number) => {
        setSelectedTagIds((prev) => prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]);
    };

    const handleInputChange = (field: keyof typeof formData, value: string | boolean) => {
        setFormData((prev) => ({...prev, [field]: value}));
    };

    useEffect(() => {
        if (open) {
            setTimeout(() => {
                if (projectToEdit) {
                    setFormData({
                        title: projectToEdit.title,
                        content: projectToEdit.content,
                        thumbnail: projectToEdit.thumbnail,
                        repo_url: projectToEdit.repo_url || "",
                        demo_url: projectToEdit.demo_url || "",
                    });
                    setThumbnailPreview(`${import.meta.env.VITE_FILE_URL}${projectToEdit.thumbnail}`);
                    setThumbnailFile(null);
                    setSelectedCategoryId(projectToEdit.category?.id || null);
                    setSelectedStackIds(projectToEdit.tech_stack?.map((s) => s.id) || []);
                    setSelectedTagIds(projectToEdit.tags?.map((t) => t.id) || []);
                } else {
                    setFormData({
                        title: "",
                        content: "",
                        thumbnail: "",
                        repo_url: "",
                        demo_url: "",
                    });
                    setThumbnailFile(null);
                    setThumbnailPreview("");
                    setSelectedCategoryId(null);
                    setSelectedStackIds([]);
                    setSelectedTagIds([]);
                }
            }, 0);
        }
    }, [open, projectToEdit]);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        const payload = {
            ...formData,
            tech_stack_ids: selectedStackIds,
            tag_ids: selectedTagIds,
            category_id: selectedCategoryId,
        };

        const callbacks = {
            onSuccess: () => {
                onSuccess();
                onClose();
            },
            onError: (err: unknown) => console.error("Error submit", err),
        };

        if (projectToEdit) {
            updateMutation.mutate({
                id: projectToEdit.id,
                data: payload,
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
        selectedCategoryId,
        setSelectedCategoryId,
        handleSubmit,
        isSubmitting,
        thumbnailFile,
        setThumbnailFile,
        thumbnailPreview,
        setThumbnailPreview,
    };
};
