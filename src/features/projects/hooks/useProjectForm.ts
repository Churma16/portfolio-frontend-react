import { FormEvent, useEffect, useState } from "react";
import { useCreateProject, useUpdateProject } from "@/features/projects/hooks/useProjects.ts";
import { useApi } from "@/contexts/useApi.ts";
import { Project } from "@/types";
import { useStoragePath } from "@/hooks/useStoragePath.ts";
import { useThumbnailUpload } from "@/hooks/useThumbnailUpload.ts";
import { buildFormData } from "@/lib/formDataUtils.ts";

// ============================================================================
// Types
// ============================================================================

interface UseProjectFormProps {
    projectToEdit?: Project | null;
    open: boolean;
    onSuccess: () => void;
    onClose: () => void;
}

// ============================================================================
// Hook
// ============================================================================

export const useProjectForm = ({
    projectToEdit,
    open,
    onSuccess,
    onClose,
}: UseProjectFormProps) => {
    const { activeBackend } = useApi();
    const storagePath = useStoragePath();

    // --- Mutations ---
    const createMutation = useCreateProject();
    const updateMutation = useUpdateProject();
    const isSubmitting = createMutation.isPending || updateMutation.isPending;

    // --- Thumbnail Upload Hook ---
    const {
        thumbnailFile,
        thumbnailPreview,
        handleThumbnailChange,
        resetThumbnail,
        setThumbnailFile,
        setThumbnailPreview,
    } = useThumbnailUpload();

    // --- Form Data State ---
    const [formData, setFormData] = useState({
        title: "",
        content: "",
        thumbnail: "",
        repo_url: "",
        demo_url: "",
    });
    const [selectedStackIds, setSelectedStackIds] = useState<number[]>([]);
    const [selectedTagIds, setSelectedTagIds] = useState<number[]>([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);

    // --- Helper Functions ---
    const handleInputChange = (field: keyof typeof formData, value: string | boolean) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const toggleStack = (id: number) => {
        setSelectedStackIds((prev) =>
            prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
        );
    };

    const toggleTag = (id: number) => {
        setSelectedTagIds((prev) =>
            prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
        );
    };

    const resetForm = () => {
        setFormData({
            title: "",
            content: "",
            thumbnail: "",
            repo_url: "",
            demo_url: "",
        });
        resetThumbnail();
        setSelectedCategoryId(null);
        setSelectedStackIds([]);
        setSelectedTagIds([]);
    };

    // --- Effects ---
    useEffect(() => {
        if (!open) return;

        setTimeout(() => {
            if (projectToEdit) {
                // Populate form with project data
                setFormData({
                    title: projectToEdit.title,
                    content: projectToEdit.content,
                    thumbnail: projectToEdit.thumbnail,
                    repo_url: projectToEdit.repo_url || "",
                    demo_url: projectToEdit.demo_url || "",
                });
                setThumbnailPreview(`${storagePath}${projectToEdit.thumbnail}`);
                setThumbnailFile(null);
                setSelectedCategoryId(projectToEdit.category?.id || null);
                setSelectedStackIds(projectToEdit.tech_stack?.map((stack) => stack.id) || []);
                setSelectedTagIds(projectToEdit.tags?.map((tag) => tag.id) || []);
            } else {
                resetForm();
            }
        }, 0);
    }, [open, projectToEdit, storagePath]);

    // --- Submit Handler ---
    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();

        // Explicitly exclude existing thumbnail string, file is handled separately
        const { thumbnail: _existingThumbnail, ...formDataWithoutThumbnail } = formData;

        const payload: Record<string, unknown> = {
            ...formDataWithoutThumbnail,
            tech_stack_ids: selectedStackIds,
            tag_ids: selectedTagIds,
            category_id: selectedCategoryId,
        };

        const callbacks = {
            onSuccess: () => {
                onSuccess();
                onClose();
            },
            onError: (error: unknown) => {
                console.error("Error submitting project:", error);
                alert("Failed to save project. Please try again.");
            },
        };

        if (projectToEdit) {
            // When updating, build clean FormData
            const updatePayload = buildFormData(payload, {
                activeBackend,
                isUpdate: true,
                customFiles: thumbnailFile ? { thumbnail: thumbnailFile } : undefined,
            });

            updateMutation.mutate(
                { id: projectToEdit.id, data: updatePayload },
                callbacks
            );
        } else {
            // For creating: send FormData if file is included, otherwise plain payload
            const createPayload = thumbnailFile
                ? buildFormData(payload, {
                      activeBackend,
                      isUpdate: false,
                      customFiles: { thumbnail: thumbnailFile },
                  })
                : payload;

            createMutation.mutate(createPayload, callbacks);
        }
    };

    // --- Return ---
    return {
        formData,
        handleInputChange,
        thumbnailPreview,
        handleThumbnailChange,
        selectedStackIds,
        toggleStack,
        selectedTagIds,
        toggleTag,
        selectedCategoryId,
        setSelectedCategoryId,
        handleSubmit,
        isSubmitting,
    };
};
