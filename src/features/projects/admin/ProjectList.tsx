import {useState} from "react";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table.tsx";
import {Button} from "@/components/ui/button.tsx";
// Tambahkan HiArrowUp dan HiArrowDown
import {HiArrowDown, HiArrowUp, HiOutlineCube, HiPencil, HiPlus, HiTrash,} from "react-icons/hi2";
import {Project} from "@/types";
import ProjectDialog from "./components/ProjectDialog.tsx";
import {useProjects} from "../hooks/useProjects.ts";
import apiClient from "@/api/axios.ts";

export default function ProjectList() {
    const { data: projects = [], isLoading, refetch } = useProjects();

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [projectToEdit, setProjectToEdit] = useState<Project | null>(null);

    // --- FUNGSI REORDER ---
    // Anda perlu menghubungkan ini ke API backend Anda nantinya
    const handleReorder = async (id: number, direction: "up" | "down") => {
        console.log(`Memindahkan project ${id} ke arah ${direction}`);

        // Contoh Logika API (Sesuaikan dengan endpoint backend Anda):
        try {
            await apiClient.post(`/projects/${id}/reorder`, { direction });
            refetch(); // Refresh data agar urutan baru tampil
        } catch (error) {
            console.error("Gagal mengubah urutan", error);
        }
    };

    const handleEdit = (project: Project) => {
        setProjectToEdit(project);
        setIsDialogOpen(true);
    };

    const handleCreate = () => {
        setProjectToEdit(null);
        setIsDialogOpen(true);
    };

    const handleDelete = async (project: Project) => {
        if (!confirm("Are you sure?")) return;
        try {
            await apiClient.delete(`/projects/${project.id}`);
            refetch();
        } catch (error) {
            console.error("Delete error:", error);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h2 className="text-3xl font-heading font-bold text-foreground tracking-tight">
                        Projects
                    </h2>
                    <p className="text-slate-400 text-sm">
                        Manage your portfolio showcase here.
                    </p>
                </div>
                <Button
                    onClick={handleCreate}
                    className="bg-primary hover:bg-blue-600 text-foreground gap-2"
                >
                    <HiPlus className="w-4 h-4" />
                    Add New Project
                </Button>
            </div>

            <div className="rounded-xl border border-white/10 bg-[#0a101f]/50 overflow-hidden">
                <Table>
                    <TableHeader className="bg-white/5">
                        <TableRow className="border-white/5 hover:bg-transparent">
                            <TableHead className="text-slate-300 w-[50px]">
                                ID
                            </TableHead>
                            {/* TAMBAHAN: Header Order */}
                            <TableHead className="text-slate-300 w-[80px] text-center">
                                Order
                            </TableHead>
                            <TableHead className="text-slate-300">
                                Project Info
                            </TableHead>
                            <TableHead className="text-slate-300">
                                Category
                            </TableHead>
                            <TableHead className="text-slate-300">
                                Tech Stack
                            </TableHead>
                            <TableHead className="text-slate-300">
                                Tags
                            </TableHead>
                            <TableHead className="text-right text-slate-300">
                                Actions
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isLoading ? (
                            <TableRow>
                                <TableCell
                                    colSpan={7}
                                    className="h-24 text-center text-slate-500 animate-pulse"
                                >
                                    Loading projects data...
                                </TableCell>
                            </TableRow>
                        ) : projects.length === 0 ? (
                            <TableRow>
                                <TableCell
                                    colSpan={7}
                                    className="h-32 text-center text-slate-500"
                                >
                                    <div className="flex flex-col items-center justify-center gap-2">
                                        <HiOutlineCube className="w-8 h-8 opacity-50" />
                                        <p>
                                            No projects found. Start by creating
                                            one!
                                        </p>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ) : (
                            // Tambahkan parameter index di sini untuk logika disable tombol
                            projects.map((project, index) => (
                                <TableRow
                                    key={project.id}
                                    className="border-white/5 hover:bg-white/5 transition-colors"
                                >
                                    <TableCell className="font-mono text-slate-500">
                                        #{project.id}
                                    </TableCell>

                                    {/* --- TAMBAHAN: Kolom Tombol Order --- */}
                                    <TableCell>
                                        <div className="flex flex-col items-center gap-1">
                                            {/* Tombol NAIK */}
                                            <Button
                                                size="icon"
                                                variant="ghost"
                                                className="h-6 w-6 text-lara-text-muted hover:text-foreground hover:bg-white/10 disabled:opacity-30"
                                                onClick={() =>
                                                    handleReorder(
                                                        project.id,
                                                        "up"
                                                    )
                                                }
                                                disabled={index === 0} // Disable jika item pertama
                                            >
                                                <HiArrowUp className="w-3 h-3" />
                                            </Button>

                                            {/* Tombol TURUN */}
                                            <Button
                                                size="icon"
                                                variant="ghost"
                                                className="h-6 w-6 text-lara-text-muted hover:text-foreground hover:bg-white/10 disabled:opacity-30"
                                                onClick={() =>
                                                    handleReorder(
                                                        project.id,
                                                        "down"
                                                    )
                                                }
                                                disabled={
                                                    index ===
                                                    projects.length - 1
                                                } // Disable jika item terakhir
                                            >
                                                <HiArrowDown className="w-3 h-3" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                    {/* ----------------------------------- */}

                                    <TableCell>
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-lg bg-slate-800 overflow-hidden shrink-0 border border-white/10">
                                                <img
                                                    src={`${
                                                        import.meta.env
                                                            .VITE_FILE_URL
                                                    }${project.thumbnail}`}
                                                    alt={project.title}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <div>
                                                <div className="font-bold text-foreground">
                                                    {project.title}
                                                </div>
                                                <div className="text-xs text-slate-400 truncate max-w-[200px]">
                                                    {project.content}
                                                </div>
                                            </div>
                                        </div>
                                    </TableCell>

                                    <TableCell>
                                        <div className="flex flex-wrap gap-1.5">
                                            <span
                                                className="px-2 py-0.5 rounded text-[10px] font-medium bg-blue-500/10 text-lara-accent-blue-light border border-blue-500/20">
                                                {project.category?.name}
                                            </span>
                                        </div>
                                    </TableCell>

                                    <TableCell>
                                        <div className="flex flex-wrap gap-1.5">
                                            {project.tech_stack
                                                ?.slice(0, 3)
                                                .map((stack) => (
                                                    <span
                                                        key={stack.id}
                                                        className="px-2 py-0.5 rounded text-[10px] font-medium bg-blue-500/10 text-lara-accent-blue-light border border-blue-500/20"
                                                    >
                                                        {stack.name}
                                                    </span>
                                                ))}
                                            {project.tech_stack &&
                                                project.tech_stack.length >
                                                    3 && (
                                                    <span className="text-[10px] text-slate-500">
                                                        +
                                                        {project.tech_stack
                                                            .length - 3}
                                                    </span>
                                                )}
                                        </div>
                                    </TableCell>

                                    <TableCell>
                                        <div className="flex flex-wrap gap-1.5">
                                            {project.tags?.map((tag) => (
                                                <span
                                                    key={tag.id}
                                                    className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-white/5 text-slate-300 border border-white/10"
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
                                                    handleEdit(project)
                                                }
                                                className="h-8 w-8 text-lara-text-muted hover:text-foreground hover:bg-white/10"
                                            >
                                                <HiPencil className="w-4 h-4" />
                                            </Button>
                                            <Button
                                                size="icon"
                                                variant="ghost"
                                                onClick={() =>
                                                    handleDelete(project)
                                                }
                                                className="h-8 w-8 text-slate-400 hover:text-red-400 hover:bg-red-500/10"
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
                <ProjectDialog
                    open={isDialogOpen}
                    onOpenChange={setIsDialogOpen}
                    projectToEdit={projectToEdit}
                    onSuccess={refetch}
                />
            </div>
        </div>
    );
}
