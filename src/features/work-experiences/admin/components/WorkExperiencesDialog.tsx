import {useEffect, useState, FormEvent} from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Textarea} from "@/components/ui/textarea.tsx";
import {Label} from "@/components/ui/label.tsx";
import {CgSpinner} from "react-icons/cg";
import {WorkExperience} from "@/types";
import TechIcon from "@/components/common/TechIcon.tsx";
import {useTechStacks} from "@/features/tech-stacks/hooks/useTechStacks.ts";
import {useTags} from "@/features/tags/hooks/useTags.ts";
import {useWorkExperiencesMutation} from "@/features/work-experiences/hooks/useWorkExperiences.ts";
import apiClient from "@/api/axios.ts";
import dayjs from "dayjs";

interface WorkExperiencesDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    experienceToEdit?: WorkExperience | null;
    onSuccess: () => void;
}

export default function WorkExperiencesDialog({
                                                  open,
                                                  onOpenChange,
                                                  experienceToEdit,
                                                  onSuccess,
                                              }: WorkExperiencesDialogProps) {
    // Use custom hooks for master data
    const {data: availableStacks = [], isLoading: stacksLoading} =
        useTechStacks();
    const {data: availableTags = [], isLoading: tagsLoading} = useTags();

    // Use mutation hook
    const mutation = useWorkExperiencesMutation();

    // Form State
    const [formData, setFormData] = useState({
        company: "",
        position: "",
        location: "",
        start_date: "",
        end_date: "",
        description: "",
        is_current: false,
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    // Toggle State (Array ID yang dipilih)
    const [selectedStackIds, setSelectedStackIds] = useState<number[]>([]);
    const [selectedTagIds, setSelectedTagIds] = useState<number[]>([]);

    // Format Date Helper
    const formatDateToYYYYMM = (dateStr: string) => {
        return dayjs(dateStr, "MMM YYYY").format("YYYY-MM");
    };

    // Reset atau Isi Form saat Modal Dibuka
    useEffect(() => {
        if (open) {
            if (experienceToEdit) {
                setFormData({
                    company: experienceToEdit.company,
                    position: experienceToEdit.position,
                    location: experienceToEdit.location,
                    start_date: experienceToEdit.start_date
                        ? formatDateToYYYYMM(experienceToEdit.start_date)
                        : "",
                    end_date: experienceToEdit.end_date
                        ? formatDateToYYYYMM(experienceToEdit.end_date)
                        : "",
                    description: experienceToEdit.description,
                    is_current: experienceToEdit.is_current,
                });
                // Isi toggle yang sudah terpilih
                setSelectedStackIds(
                    experienceToEdit.tech_stack?.map((s) => s.id) || []
                );
                setSelectedTagIds(experienceToEdit.tags?.map((t) => t.id) || []);
            } else {
                // Reset Form (Mode Create)
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
        }
    }, [open, experienceToEdit]);

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
            const payload: any = {
                company: formData.company,
                position: formData.position,
                location: formData.location,
                start_date: formData.start_date,
                end_date: formData.end_date || null,
                description: formData.description,
                is_current: formData.is_current,
                tech_stack_ids: selectedStackIds,
                tag_ids: selectedTagIds,
            };

            if (experienceToEdit) {
                // PUT request untuk update
                await apiClient.put(
                    `/work-experiences/${experienceToEdit.id}`,
                    payload
                );
            } else {
                // POST request untuk create
                await apiClient.post("/work-experiences", payload);
            }

            onSuccess();
            onOpenChange(false);
        } catch (error) {
            console.error("Error submitting work experience:", error);
            alert("Gagal menyimpan pengalaman kerja!");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent
                className="max-w-3xl w-[95vw] bg-[#0f172a] border border-white/10 text-white max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>
                        {experienceToEdit
                            ? "Edit Work Experience"
                            : "Add New Work Experience"}
                    </DialogTitle>
                    <DialogDescription>
                        Fill in the details below. Click on Tech Stacks and Tags
                        to toggle them.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-6 mt-4">
                    {/* Row 1: Company & Position */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Company Name</Label>
                            <Input
                                value={formData.company}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        company: e.target.value,
                                    })
                                }
                                placeholder="E.g. Tech Company Inc."
                                className="bg-black/20 border-white/10"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Position</Label>
                            <Input
                                value={formData.position}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        position: e.target.value,
                                    })
                                }
                                placeholder="E.g. Senior Developer"
                                className="bg-black/20 border-white/10"
                                required
                            />
                        </div>
                    </div>

                    {/* Row 2: Location & Current */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Location</Label>
                            <Input
                                value={formData.location}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        location: e.target.value,
                                    })
                                }
                                placeholder="E.g. Jakarta, Indonesia"
                                className="bg-black/20 border-white/10"
                            />
                        </div>
                        <div className="space-y-2 flex items-end">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={formData.is_current}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            is_current: e.target.checked,
                                        })
                                    }
                                    className="w-4 h-4 rounded border-white/10 bg-black/20 text-lara-blue cursor-pointer"
                                />
                                <span className="text-sm text-slate-300">
                                    Currently Working Here
                                </span>
                            </label>
                        </div>
                    </div>

                    {/* Row 3: Dates */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Start Date</Label>
                            <Input
                                type="month"
                                value={formData.start_date}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        start_date: e.target.value,
                                    })
                                }
                                className="bg-black/20 border-white/10"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>
                                End Date
                                {formData.is_current && (
                                    <span className="text-xs text-slate-500 ml-2">
                                        (Disabled)
                                    </span>
                                )}
                            </Label>
                            <Input
                                type="month"
                                value={formData.end_date}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        end_date: e.target.value,
                                    })
                                }
                                className="bg-black/20 border-white/10"
                                disabled={formData.is_current}
                            />
                        </div>
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                        <Label>Description</Label>
                        <Textarea
                            value={formData.description}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    description: e.target.value,
                                })
                            }
                            placeholder="Tell a story about this experience..."
                            className="bg-black/20 border-white/10"
                            rows={4}
                            required
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
                                <CgSpinner className="animate-spin mr-2"/>
                            ) : null}
                            {experienceToEdit
                                ? "Update Experience"
                                : "Create Experience"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}

