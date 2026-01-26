import {FormEvent, useEffect, useState} from "react";
import {useCreateProject, useUpdateProject} from "@/features/projects/hooks/useProjects.ts";
import {Project} from "@/types";
import {useStoragePath} from "@/hooks/useStoragePath.ts";

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

    const StoragePath = useStoragePath();

    // --- Mutations ---
    const createMutation = useCreateProject();
    const updateMutation = useUpdateProject();
    const isSubmitting = createMutation.isPending || updateMutation.isPending;

    // --- Form Data State ---
    const [formData, setFormData] = useState({
        title: "",
        content: "",
        thumbnail: "",
        repo_url: "",
        demo_url: "",
    });

    // --- Thumbnail State ---
    const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
    const [thumbnailPreview, setThumbnailPreview] = useState<string>("");

    // --- Selection State ---
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

    const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setThumbnailFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setThumbnailPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const resetForm = () => {
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

        const payload: any = {
            ...formData,
            tech_stack_ids: selectedStackIds,
            tag_ids: selectedTagIds,
            category_id: selectedCategoryId,
        };

        // Only include thumbnail if it's a new file (File object)
        // Not the string path from database
        if (thumbnailFile) {
            payload.thumbnail = thumbnailFile;

            // For Laravel PUT requests with FormData, add _method field
            if (projectToEdit) {
                payload._method = "PUT";
            }
        }

        console.log("📝 Payload before mutation:", {
            hasThumbnailFile: !!thumbnailFile,
            title: payload.title,
            content: payload.content,
            repo_url: payload.repo_url,
            demo_url: payload.demo_url,
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
