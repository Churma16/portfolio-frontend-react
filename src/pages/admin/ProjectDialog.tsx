import { useEffect, useState, FormEvent } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { CgSpinner } from "react-icons/cg";
import { Project, TechStack, Tag } from "../../types";
import TechIcon from "../../components/common/TechIcon";
import { useTechStacks } from "@/hooks/useTechStacks";
import { useTags } from "@/hooks/useTags";
import apiClient from "@/api/axios";

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
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Use custom hooks for master data
    const { data: availableStacks = [], isLoading: stacksLoading } =
        useTechStacks();
    const { data: availableTags = [], isLoading: tagsLoading } = useTags();

    // Form State
    const [formData, setFormData] = useState({
        title: "",
        content: "",
        thumbnail: "",
        repo_url: "",
        demo_url: "",
    });

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

    // Handle Submit
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const url = projectToEdit
                ? `/projects/${projectToEdit.id}` // Edit
                : "/projects"; // Create

            const method = projectToEdit ? "PUT" : "POST";

            // Payload yang dikirim ke Laravel
            const payload = {
                ...formData,
                tech_stack_ids: selectedStackIds,
                tag_ids: selectedTagIds,
            };

            if (method === "POST") {
                await apiClient.post(url, payload);
            } else {
                await apiClient.put(url, payload);
            }

            onSuccess(); // Refresh tabel di parent
            onOpenChange(false); // Tutup modal
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
                    {/* Row 1: Title & Links */}
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
                            <Label>Thumbnail URL</Label>
                            <Input
                                value={formData.thumbnail}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        thumbnail: e.target.value,
                                    })
                                }
                                placeholder="https://..."
                                className="bg-black/20 border-white/10"
                            />
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
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
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
