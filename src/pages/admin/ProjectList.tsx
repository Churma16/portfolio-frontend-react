import { useEffect, useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"; // Import dari Shadcn
import { Button } from "@/components/ui/button";
import { HiPlus, HiPencil, HiTrash, HiOutlineCube } from "react-icons/hi2";
import { Project } from "../../types"; // Pastikan type Project ada
// import { Badge } from "@/components/ui/badge"; // Kalau sudah install badge, pakai ini. Kalau belum, pakai span manual.
import ProjectDialog from "./ProjectDialog"; // Import komponen baru

export default function ProjectList() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // State untuk Modal
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [projectToEdit, setProjectToEdit] = useState<Project | null>(null);

    // Fungsi handle Edit
    const handleEdit = (project: Project) => {
        setProjectToEdit(project); // Set data yang mau diedit
        setIsDialogOpen(true); // Buka modal
    };

    // Fungsi handle Create
    const handleCreate = () => {
        setProjectToEdit(null); // Kosongkan data (Mode Create)
        setIsDialogOpen(true); // Buka modal
    };
    // Fetch Data
    const fetchProjects = async () => {
        setIsLoading(true);
        try {
            const token = localStorage.getItem("token");
            // Ganti URL sesuai API kamu
            const response = await fetch(
                "http://127.0.0.1:8000/api/projects?with=techStacks,tags",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: "application/json",
                    },
                }
            );
            const result = await response.json();

            if (response.ok) {
                setProjects(result.data);
            } else {
                console.error("Failed fetch:", result);
            }
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    return (
        <div className="space-y-6">
            {/* HEADER: Judul & Tombol Add */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h2 className="text-3xl font-heading font-bold text-white tracking-tight">
                        Projects
                    </h2>
                    <p className="text-slate-400 text-sm">
                        Manage your portfolio showcase here.
                    </p>
                </div>
                <Button
                    onClick={handleCreate}
                    className="bg-lara-blue hover:bg-blue-600 text-white gap-2"
                >
                    <HiPlus className="w-4 h-4" />
                    Add New Project
                </Button>
            </div>

            {/* TABEL DATA */}
            <div className="rounded-xl border border-white/10 bg-[#0a101f]/50 overflow-hidden">
                <Table>
                    <TableHeader className="bg-white/5">
                        <TableRow className="border-white/5 hover:bg-transparent">
                            <TableHead className="text-slate-300 w-[50px]">
                                ID
                            </TableHead>
                            <TableHead className="text-slate-300">
                                Project Info
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
                                    colSpan={5}
                                    className="h-24 text-center text-slate-500 animate-pulse"
                                >
                                    Loading projects data...
                                </TableCell>
                            </TableRow>
                        ) : projects.length === 0 ? (
                            <TableRow>
                                <TableCell
                                    colSpan={5}
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
                            projects.map((project) => (
                                <TableRow
                                    key={project.id}
                                    className="border-white/5 hover:bg-white/5 transition-colors"
                                >
                                    <TableCell className="font-mono text-slate-500">
                                        #{project.id}
                                    </TableCell>

                                    {/* Kolom Info: Gambar + Judul */}
                                    <TableCell>
                                        <div className="flex items-center gap-4">
                                            {/* Thumbnail Mini */}
                                            <div className="w-12 h-12 rounded-lg bg-slate-800 overflow-hidden shrink-0 border border-white/10">
                                                <img
                                                    src={project.thumbnail}
                                                    alt={project.title}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <div>
                                                <div className="font-bold text-white">
                                                    {project.title}
                                                </div>
                                                <div className="text-xs text-slate-400 truncate max-w-[200px]">
                                                    {project.content}
                                                </div>
                                            </div>
                                        </div>
                                    </TableCell>

                                    {/* Kolom Tech Stack (Badge) */}
                                    <TableCell>
                                        <div className="flex flex-wrap gap-1.5">
                                            {project.tech_stack
                                                ?.slice(0, 3)
                                                .map((stack) => (
                                                    <span
                                                        key={stack.id}
                                                        className="px-2 py-0.5 rounded text-[10px] font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20"
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

                                    {/* Kolom Tags */}
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

                                    {/* Kolom Actions */}
                                    <TableCell className="text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <Button
                                                size="icon"
                                                variant="ghost"
                                                onClick={() =>
                                                    handleEdit(project)
                                                } // <--- Pasang handler di sini
                                                className="h-8 w-8 text-slate-400 hover:text-white hover:bg-white/10"
                                            >
                                                <HiPencil className="w-4 h-4" />
                                            </Button>
                                            <Button
                                                size="icon"
                                                variant="ghost"
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
                    onSuccess={fetchProjects} // Refresh tabel kalau sukses simpan
                />
            </div>
        </div>
    );
}
