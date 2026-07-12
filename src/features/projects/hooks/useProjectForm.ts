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

        // When updating, always use FormData to ensure server receives multipart/form-data
        // This prevents "request Content-Type isn't multipart/form-data" errors
        if (projectToEdit) {
            const formDataPayload = new FormData();

            // Add all form fields
            Object.entries(payload).forEach(([key, value]) => {
                if (value === null || value === undefined) {
                    return;
                }

                if (Array.isArray(value)) {
                    formDataPayload.append(key, JSON.stringify(value));
                } else if (value instanceof File) {
                    formDataPayload.append(key, value);
                } else {
                    formDataPayload.append(key, String(value));
                }
            });

            // Add thumbnail if a new one was selected
            if (thumbnailFile) {
                formDataPayload.append('thumbnail', thumbnailFile);
            }

            // For Laravel, add _method field
            if (activeBackend === 'laravel') {
                formDataPayload.append('_method', 'PUT');
            }

            console.log("Payload before mutation (UPDATE):", {
                hasThumbnailFile: !!thumbnailFile,
                title: payload.title,
                content: payload.content,
                repo_url: payload.repo_url,
                demo_url: payload.demo_url,
                activeBackend,
                formDataEntries: Array.from(formDataPayload.entries()).map(([k, v]) => [k, v instanceof File ? `[File: ${(v as File).name}]` : v]),
            });

            payload.__formDataPayload = formDataPayload;
        } else {
            // For creating, only use FormData if there's a file
            if (thumbnailFile) {
                payload.thumbnail = thumbnailFile;
            }

            console.log("Payload before mutation (CREATE):", {
                hasThumbnailFile: !!thumbnailFile,
                title: payload.title,
                content: payload.content,
                repo_url: payload.repo_url,
                demo_url: payload.demo_url,
                activeBackend,
                hasThumbnailPayload: !!payload.thumbnail,
                allKeys: Object.keys(payload),
            });
        }

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
            // Use the FormData payload we prepared
            const dataToSend = payload.__formDataPayload || payload;
            updateMutation.mutate(
                {id: projectToEdit.id, data: dataToSend},
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
