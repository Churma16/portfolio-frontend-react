import {useState} from "react";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table.tsx";
import {Button} from "@/components/ui/button.tsx";
import {HiArrowDown, HiArrowUp, HiOutlineCube, HiPencil, HiPlus, HiTrash,} from "react-icons/hi2";
import {WorkExperience} from "@/types";
import WorkExperiencesDialog from "@/features/work-experiences/admin/components/WorkExperiencesDialog.tsx";
import {useWorkExperiences} from "@/features/work-experiences/hooks/useWorkExperiences.ts";
import apiClient from "@/api/axios.ts";

export default function WorkExperiencesList() {
    const { data: experiences = [], isLoading, refetch } =
        useWorkExperiences();

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [experienceToEdit, setExperienceToEdit] =
        useState<WorkExperience | null>(null);

    // --- FUNGSI REORDER ---
    const handleReorder = async (id: number, direction: "up" | "down") => {
        console.log(`Memindahkan experience ${id} ke arah ${direction}`);

        try {
            await apiClient.post(`/work-experiences/${id}/reorder`, {
                direction,
            });
            refetch(); // Refresh data agar urutan baru tampil
        } catch (error) {
            console.error("Gagal mengubah urutan", error);
        }
    };

    const handleEdit = (experience: WorkExperience) => {
        setExperienceToEdit(experience);
        setIsDialogOpen(true);
    };

    const handleCreate = () => {
        setExperienceToEdit(null);
        setIsDialogOpen(true);
    };

    const handleDelete = async (experience: WorkExperience) => {
        if (!confirm("Are you sure?")) return;
        try {
            await apiClient.delete(`/work-experiences/${experience.id}`);
            refetch();
        } catch (error) {
            console.error("Delete error:", error);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h2 className="text-3xl font-heading font-bold text-lara-text-primary tracking-tight">
                        Work Experiences
                    </h2>
                    <p className="text-lara-text-muted text-sm">
                        Manage your professional experience history here.
                    </p>
                </div>
                <Button
                    onClick={handleCreate}
                    className="bg-lara-blue hover:bg-blue-600 text-lara-text-primary gap-2"
                >
                    <HiPlus className="w-4 h-4" />
                    Add New Experience
                </Button>
            </div>

            <div className="rounded-xl border border-white/10 bg-lara-dark-blue/50 overflow-hidden">
                <Table>
                    <TableHeader className="bg-white/5">
                        <TableRow className="border-white/5 hover:bg-transparent">
                            <TableHead className="text-lara-text-tertiary w-[50px]">
                                ID
                            </TableHead>
                            {/* Header Order */}
                            <TableHead className="text-lara-text-tertiary w-[80px] text-center">
                                Order
                            </TableHead>
                            <TableHead className="text-lara-text-tertiary">
                                Experience Info
                            </TableHead>
                            <TableHead className="text-lara-text-tertiary">
                                Dates
                            </TableHead>
                            <TableHead className="text-lara-text-tertiary">
                                Tech Stack
                            </TableHead>
                            <TableHead className="text-lara-text-tertiary">
                                Tags
                            </TableHead>
                            <TableHead className="text-right text-lara-text-tertiary">
                                Actions
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isLoading ? (
                            <TableRow>
                                <TableCell
                                    colSpan={7}
                                    className="h-24 text-center text-lara-text-muted-dark animate-pulse"
                                >
                                    Loading experiences data...
                                </TableCell>
                            </TableRow>
                        ) : experiences.length === 0 ? (
                            <TableRow>
                                <TableCell
                                    colSpan={7}
                                    className="h-32 text-center text-lara-text-muted-dark"
                                >
                                    <div className="flex flex-col items-center justify-center gap-2">
                                        <HiOutlineCube className="w-8 h-8 opacity-50" />
                                        <p>
                                            No work experiences found. Start by
                                            creating one!
                                        </p>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ) : (
                            experiences.map((experience, index) => (
                                <TableRow
                                    key={experience.id}
                                    className="border-white/5 hover:bg-white/5 transition-colors"
                                >
                                    <TableCell className="font-mono text-lara-text-muted-dark">
                                        #{experience.id}
                                    </TableCell>

                                    {/* Kolom Tombol Order */}
                                    <TableCell>
                                        <div className="flex flex-col items-center gap-1">
                                            {/* Tombol NAIK */}
                                            <Button
                                                size="icon"
                                                variant="ghost"
                                                className="h-6 w-6 text-lara-text-muted hover:text-lara-text-primary hover:bg-white/10 disabled:opacity-30"
                                                onClick={() =>
                                                    handleReorder(
                                                        experience.id,
                                                        "up"
                                                    )
                                                }
                                                disabled={index === 0}
                                            >
                                                <HiArrowUp className="w-3 h-3" />
                                            </Button>

                                            {/* Tombol TURUN */}
                                            <Button
                                                size="icon"
                                                variant="ghost"
                                                className="h-6 w-6 text-lara-text-muted hover:text-lara-text-primary hover:bg-white/10 disabled:opacity-30"
                                                onClick={() =>
                                                    handleReorder(
                                                        experience.id,
                                                        "down"
                                                    )
                                                }
                                                disabled={
                                                    index ===
                                                    experiences.length - 1
                                                }
                                            >
                                                <HiArrowDown className="w-3 h-3" />
                                            </Button>
                                        </div>
                                    </TableCell>

                                    <TableCell>
                                        <div className="flex flex-col gap-1">
                                            <div className="font-bold text-lara-text-primary">
                                                {experience.position}
                                            </div>
                                            <div className="text-xs text-lara-text-muted">
                                                {experience.company}
                                            </div>
                                            <div className="text-xs text-lara-text-muted-dark">
                                                📍 {experience.location}
                                            </div>
                                        </div>
                                    </TableCell>

                                    <TableCell>
                                        <div className="flex flex-col gap-1 text-sm">
                                            <span className="text-lara-text-tertiary">
                                                {experience.start_date}
                                            </span>
                                            <span className="text-lara-text-muted-dark">
                                                {experience.is_current ? (
                                                    <span className="text-lara-accent-green font-semibold">
                                                        Present
                                                    </span>
                                                ) : (
                                                    experience.end_date
                                                )}
                                            </span>
                                        </div>
                                    </TableCell>

                                    <TableCell>
                                        <div className="flex flex-wrap gap-1.5">
                                            {experience.tech_stack
                                                ?.slice(0, 3)
                                                .map((stack) => (
                                                    <span
                                                        key={stack.id}
                                                        className="px-2 py-0.5 rounded text-[10px] font-medium bg-blue-500/10 text-lara-accent-blue-light border border-blue-500/20"
                                                    >
                                                        {stack.name}
                                                    </span>
                                                ))}
                                            {experience.tech_stack &&
                                                experience.tech_stack.length >
                                                    3 && (
                                                    <span className="text-[10px] text-lara-text-muted-dark">
                                                        +
                                                        {experience.tech_stack
                                                            .length - 3}
                                                    </span>
                                                )}
                                        </div>
                                    </TableCell>

                                    <TableCell>
                                        <div className="flex flex-wrap gap-1.5">
                                            {experience.tags?.map((tag) => (
                                                <span
                                                    key={tag.id}
                                                    className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-white/5 text-lara-text-tertiary border border-white/10"
                                                >
                                                    {tag.name}
                                                </span>
                                            ))}
                                        </div>
                                    </TableCell>

                                    <TableCell className="text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <Button
                                                size="icon"
                                                variant="ghost"
                                                onClick={() =>
                                                    handleEdit(experience)
                                                }
                                                className="h-8 w-8 text-lara-text-muted hover:text-lara-text-primary hover:bg-white/10"
                                            >
                                                <HiPencil className="w-4 h-4" />
                                            </Button>
                                            <Button
                                                size="icon"
                                                variant="ghost"
                                                onClick={() =>
                                                    handleDelete(experience)
                                                }
                                                className="h-8 w-8 text-lara-text-muted hover:text-lara-accent-red-light hover:bg-red-500/10"
                                            >
                                                <HiTrash className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
                <WorkExperiencesDialog
                    open={isDialogOpen}
                    onOpenChange={setIsDialogOpen}
                    experienceToEdit={experienceToEdit}
                    onSuccess={refetch}
                />
            </div>
        </div>
    );
}

