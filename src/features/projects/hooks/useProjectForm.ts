import {FormEvent, useEffect, useState} from "react";
import {useCreateProject, useUpdateProject} from "@/features/projects/hooks/useProjects.ts";
import {useApi} from "@/contexts/useApi.ts";
import {Project} from "@/types";
import {useStoragePath} from "@/hooks/useStoragePath.ts";
import {useThumbnailUpload} from "@/hooks/useThumbnailUpload.ts";

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
    const {activeBackend} = useApi(); // Get 'laravel' or 'go'
    const StoragePath = useStoragePath();

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
        setFormData((prev) => ({...prev, [field]: value}));
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
                setThumbnailPreview(`${StoragePath}${projectToEdit.thumbnail}`);
                setThumbnailFile(null);
                setSelectedCategoryId(projectToEdit.category?.id || null);
                setSelectedStackIds(projectToEdit.tech_stack?.map((s) => s.id) || []);
                setSelectedTagIds(projectToEdit.tags?.map((t) => t.id) || []);
            } else {
                resetForm();
            }
        }, 0);
    }, [open, projectToEdit]);

    // --- Submit Handler ---
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        // Explicitly exclude thumbnail from spread, we'll add it conditionally below
        const {thumbnail: _, ...formDataWithoutThumbnail} = formData;

        const payload: any = {
            ...formDataWithoutThumbnail,
            tech_stack_ids: selectedStackIds,
            tag_ids: selectedTagIds,
            category_id: selectedCategoryId,
        };

        // Only include thumbnail if:
        // 1. There's an actual File object selected (thumbnailFile is not null)
        if (thumbnailFile) {
            payload.thumbnail = thumbnailFile;

            // For Laravel PUT requests with FormData, add _method field
            // Go API doesn't need this because it supports PUT with FormData directly
            if (projectToEdit && activeBackend === 'laravel') {
                payload._method = "PUT";
            }
        }

        console.log("📝 Payload before mutation:", {
            hasThumbnailFile: !!thumbnailFile,
            title: payload.title,
            content: payload.content,
            repo_url: payload.repo_url,
            demo_url: payload.demo_url,
            activeBackend,
            hasThumbnailPayload: !!payload.thumbnail,
            allKeys: Object.keys(payload),
        });

        const callbacks = {
            onSuccess: () => {
                onSuccess();
                onClose();
            },
            onError: (err: unknown) => {
                console.error("Error submit", err);
                alert("Failed to save project. Please try again.");
            },
        };

        if (projectToEdit) {
            updateMutation.mutate(
                {id: projectToEdit.id, data: payload},
                callbacks
            );
        } else {
            createMutation.mutate(payload, callbacks);
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
