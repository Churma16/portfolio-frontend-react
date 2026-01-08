import { useEffect, useState, FormEvent } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Textarea } from "@/components/ui/textarea.tsx";
import { Label } from "@/components/ui/label.tsx";
import { CgSpinner } from "react-icons/cg";
import { Project } from "@/types";
import TechIcon from "../../../../components/common/TechIcon.tsx";
import { useTechStacks } from "@/features/tech-stacks/hooks/useTechStacks.ts";
import { useTags } from "@/features/tags/hooks/useTags.ts";
import { useCategories } from "@/features/categories/hooks/useCategories.ts";
import { useProjectMutation } from "@/features/projects/hooks/useProjects.ts";
import apiClient from "@/api/axios.ts";

interface ProjectDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    projectToEdit?: Project | null;
    onSuccess: () => void;
}

export default function ProjectDialog({
    open,
    onOpenChange,
    projectToEdit,
    onSuccess,
}: ProjectDialogProps) {
    // Use custom hooks for master data
    const { data: availableStacks = [], isLoading: stacksLoading } =
        useTechStacks();
    const { data: availableTags = [], isLoading: tagsLoading } = useTags();
    const { data: availableCategories = [], isLoading: categoriesLoading } =
        useCategories();

    // Use mutation hook with projectId parameter
    const mutation = useProjectMutation(projectToEdit?.id);

    // Form State
    const [formData, setFormData] = useState({
        title: "",
        content: "",
        thumbnail: "",
        repo_url: "",
        demo_url: "",
    });

    // File upload state
    const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
    const [thumbnailPreview, setThumbnailPreview] = useState<string>("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Category State (Single selection)
    const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
        null
    );

    // Toggle State (Array ID yang dipilih)
    const [selectedStackIds, setSelectedStackIds] = useState<number[]>([]);
    const [selectedTagIds, setSelectedTagIds] = useState<number[]>([]);

    // Reset atau Isi Form saat Modal Dibuka
    useEffect(() => {
        if (open) {
            if (projectToEdit) {
                setFormData({
                    title: projectToEdit.title,
                    content: projectToEdit.content,
                    thumbnail: projectToEdit.thumbnail,
                    repo_url: projectToEdit.repo_url || "",
                    demo_url: projectToEdit.demo_url || "",
                });
                setThumbnailPreview(
                    `${import.meta.env.VITE_FILE_URL}${projectToEdit.thumbnail}`
                );
                setThumbnailFile(null);
                // Set selected category
                setSelectedCategoryId(projectToEdit.category?.id || null);
                // Isi toggle yang sudah terpilih
                setSelectedStackIds(
                    projectToEdit.tech_stack?.map((s) => s.id) || []
                );
                setSelectedTagIds(projectToEdit.tags?.map((t) => t.id) || []);
            } else {
                // Reset Form (Mode Create)
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
        }
    }, [open, projectToEdit]);

    // 2. Logic Toggle (Klik untuk Pilih/Hapus)
    const toggleStack = (id: number) => {
        setSelectedStackIds((prev) =>
            prev.includes(id)
                ? prev.filter((item) => item !== id)
                : [...prev, id]
        );
    };

    const toggleTag = (id: number) => {
        setSelectedTagIds((prev) =>
            prev.includes(id)
                ? prev.filter((item) => item !== id)
                : [...prev, id]
        );
    };

    // Handle Thumbnail File Upload
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

    // Handle Submit
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            if (thumbnailFile) {
                // Jika ada file thumbnail, gunakan FormData
                const formDataToSend = new FormData();
                formDataToSend.append("title", formData.title);
                formDataToSend.append("content", formData.content);
                formDataToSend.append("repo_url", formData.repo_url);
                formDataToSend.append("demo_url", formData.demo_url);
                formDataToSend.append("thumbnail", thumbnailFile);
                formDataToSend.append(
                    "tech_stack_ids",
                    JSON.stringify(selectedStackIds)
                );
                formDataToSend.append(
                    "tag_ids",
                    JSON.stringify(selectedTagIds)
                );
                if (selectedCategoryId) {
                    formDataToSend.append(
                        "category_id",
                        selectedCategoryId.toString()
                    );
                }

                // Hit /projects endpoint (create atau update)
                if (projectToEdit) {
                    // PUT request untuk update
                    formDataToSend.append("_method", "PUT");
                    await apiClient.post(
                        `/projects/${projectToEdit.id}`,
                        formDataToSend
                    );
                } else {
                    // POST request untuk create
                    await apiClient.post("/projects", formDataToSend);
                }

                onSuccess();
                onOpenChange(false);
            } else {
                // Jika tidak ada file, gunakan JSON payload biasa
                const payload: any = {
                    title: formData.title,
                    content: formData.content,
                    repo_url: formData.repo_url,
                    demo_url: formData.demo_url,
                    tech_stack_ids: selectedStackIds,
                    tag_ids: selectedTagIds,
                    category_id: selectedCategoryId,
                };

                // Jangan include thumbnail jika tidak ada file baru

                mutation.mutate(payload, {
                    onSuccess: () => {
                        onSuccess();
                        onOpenChange(false);
                    },
                    onError: () => {
                        alert("Gagal menyimpan project!");
                    },
                });
            }
        } catch (error) {
            console.error("Error submitting project:", error);
            alert("Gagal menyimpan project!");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-3xl bg-[#0f172a] border border-white/10 text-white max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>
                        {projectToEdit ? "Edit Project" : "Add New Project"}
                    </DialogTitle>
                    <DialogDescription>
                        Fill in the details below. Click on Tech Stacks and Tags
                        to toggle them.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-6 mt-4">
                    {/* Row 1: Title & Thumbnail */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Project Title</Label>
                            <Input
                                value={formData.title}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        title: e.target.value,
                                    })
                                }
                                placeholder="E.g. E-Commerce App"
                                className="bg-black/20 border-white/10"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Thumbnail Image</Label>
                            <div className="space-y-2">
                                <div className="relative border-2 border-dashed border-white/20 rounded-lg p-4 text-center hover:border-white/40 transition-colors cursor-pointer group">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleThumbnailChange}
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    />
                                    {thumbnailPreview ? (
                                        <div className="space-y-2">
                                            <img
                                                src={thumbnailPreview}
                                                alt="Preview"
                                                className="w-full h-32 object-cover rounded"
                                            />
                                            <p className="text-xs text-slate-400">
                                                Click to change
                                            </p>
                                        </div>
                                    ) : (
                                        <div className="py-6 space-y-2">
                                            <p className="text-sm text-slate-400 group-hover:text-slate-300">
                                                Click to upload image
                                            </p>
                                            <p className="text-xs text-slate-500">
                                                PNG, JPG or GIF
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Repo URL (GitHub)</Label>
                            <Input
                                value={formData.repo_url}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        repo_url: e.target.value,
                                    })
                                }
                                placeholder="https://github.com/..."
                                className="bg-black/20 border-white/10"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Live Demo URL</Label>
                            <Input
                                value={formData.demo_url}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        demo_url: e.target.value,
                                    })
                                }
                                placeholder="https://..."
                                className="bg-black/20 border-white/10"
                            />
                        </div>
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                        <Label>Description</Label>
                        <Textarea
                            value={formData.content}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    content: e.target.value,
                                })
                            }
                            placeholder="Tell a story about this project..."
                            className="bg-black/20 border-white/10"
                            rows={4}
                        />
                    </div>

                    {/* --- CATEGORY SELECTOR (Single Selection) --- */}
                    <div className="space-y-3">
                        <Label className="text-purple-400 font-bold uppercase tracking-wider text-xs">
                            Select Category
                        </Label>
                        <div className="flex flex-wrap gap-2 p-4 rounded-xl bg-black/20 border border-white/5">
                            {availableCategories.map((category) => {
                                const isSelected =
                                    selectedCategoryId === category.id;
                                return (
                                    <div
                                        key={category.id}
                                        onClick={() =>
                                            setSelectedCategoryId(category.id)
                                        }
                                        className={`cursor-pointer px-4 py-2 rounded-lg border transition-all duration-200 select-none
                                            ${
                                                isSelected
                                                    ? "bg-purple-500/20 border-purple-500 text-white shadow-[0_0_10px_rgba(168,85,247,0.3)]"
                                                    : "bg-white/5 border-transparent text-slate-400 hover:bg-white/10 hover:border-white/20"
                                            }
                                        `}
                                    >
                                        <span className="text-sm font-medium">
                                            {category.name}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* --- TOGGLE AREA: TECH STACKS --- */}
                    <div className="space-y-3">
                        <Label className="text-lara-blue font-bold uppercase tracking-wider text-xs">
                            Select Tech Stacks
                        </Label>
                        <div className="flex flex-wrap gap-2 p-4 rounded-xl bg-black/20 border border-white/5">
                            {availableStacks.map((stack) => {
                                const isSelected = selectedStackIds.includes(
                                    stack.id
                                );
                                return (
                                    <div
                                        key={stack.id}
                                        onClick={() => toggleStack(stack.id)}
                                        className={`cursor-pointer flex items-center gap-2 px-3 py-2 rounded-lg border transition-all duration-200 select-none
                                            ${
                                                isSelected
                                                    ? "bg-lara-blue/20 border-lara-blue text-white shadow-[0_0_10px_rgba(59,130,246,0.3)]"
                                                    : "bg-white/5 border-transparent text-slate-400 hover:bg-white/10 hover:border-white/20"
                                            }
                                        `}
                                    >
                                        <TechIcon
                                            name={stack.name}
                                            icon={stack.icon}
                                            className={`w-4 h-4 ${
                                                isSelected
                                                    ? "text-lara-blue"
                                                    : "text-slate-500"
                                            }`}
                                        />
                                        <span className="text-xs font-medium">
                                            {stack.name}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* --- TOGGLE AREA: TAGS --- */}
                    <div className="space-y-3">
                        <Label className="text-green-400 font-bold uppercase tracking-wider text-xs">
                            Select Tags
                        </Label>
                        <div className="flex flex-wrap gap-2 p-4 rounded-xl bg-black/20 border border-white/5">
                            {availableTags.map((tag) => {
                                const isSelected = selectedTagIds.includes(
                                    tag.id
                                );
                                return (
                                    <div
                                        key={tag.id}
                                        onClick={() => toggleTag(tag.id)}
                                        className={`cursor-pointer px-3 py-1.5 rounded-full border text-[11px] font-bold uppercase tracking-wide transition-all duration-200 select-none
                                            ${
                                                isSelected
                                                    ? "bg-green-500/20 border-green-500 text-green-400"
                                                    : "bg-white/5 border-transparent text-slate-500 hover:bg-white/10"
                                            }
                                        `}
                                    >
                                        #{tag.name}
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <DialogFooter>
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={() => onOpenChange(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            className="bg-lara-blue hover:bg-blue-600 min-w-[120px]"
                            disabled={mutation.isPending || isSubmitting}
                        >
                            {mutation.isPending || isSubmitting ? (
                                <CgSpinner className="animate-spin mr-2" />
                            ) : null}
                            {projectToEdit
                                ? "Update Project"
                                : "Create Project"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
