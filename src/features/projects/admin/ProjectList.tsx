import {useState} from "react";
import {Button} from "@/components/ui/button.tsx";
import {HiArrowDown, HiArrowUp, HiPencil, HiPlus, HiTrash,} from "react-icons/hi2";
import {Project} from "@/types";
import ProjectDialog from "./components/ProjectDialog.tsx";
import {useDeleteProject, useProjects, useReorderProject} from "../hooks/useProjects.ts";
import {useStoragePath} from "@/hooks/useStoragePath.ts";
import AdminHeader from "@/components/common/AdminHeader.tsx";
import DataTable, {ColumnDef} from "@/components/common/DataTable.tsx";

export default function ProjectList() {
    const {data: projects = [], isLoading, refetch} = useProjects();
    const reorderMutation = useReorderProject();
    const deleteMutation = useDeleteProject();

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [projectToEdit, setProjectToEdit] = useState<Project | null>(null);
    const storagePath = useStoragePath();

    const handleReorder = async (id: number, direction: "up" | "down") => {
        reorderMutation.mutate({id, direction});
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
        deleteMutation.mutate(project.id);
    };

    const columns: ColumnDef<Project>[] = [
        {
            header: "ID",
            headerClassName: "text-slate-300 w-[50px]",
            cellClassName: "font-mono text-slate-500",
            cell: (project) => `#${project.id}`,
        },
        {
            header: "Order",
            headerClassName: "text-slate-300 w-[80px] text-center",
            cellClassName: "text-center",
            cell: (project, index) => (
                <div className="flex flex-col items-center gap-1">
                    <Button
                        size="icon"
                        variant="ghost"
                        className="h-6 w-6 text-lara-text-muted hover:text-foreground hover:bg-white/10 disabled:opacity-30"
                        onClick={() => handleReorder(project.id, "up")}
                        disabled={index === 0}
                    >
                        <HiArrowUp className="w-3 h-3"/>
                    </Button>
                    <Button
                        size="icon"
                        variant="ghost"
                        className="h-6 w-6 text-lara-text-muted hover:text-foreground hover:bg-white/10 disabled:opacity-30"
                        onClick={() => handleReorder(project.id, "down")}
                        disabled={index === projects.length - 1}
                    >
                        <HiArrowDown className="w-3 h-3"/>
                    </Button>
                </div>
            ),
        },
        {
            header: "Project Info",
            headerClassName: "text-slate-300",
            cell: (project) => (
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-slate-800 overflow-hidden shrink-0 border border-white/10 flex items-center justify-center">
                        {project.thumbnail ? (
                            <img
                                src={
                                    project.thumbnail.startsWith("http://") || project.thumbnail.startsWith("https://")
                                        ? project.thumbnail
                                        : `${storagePath}${project.thumbnail}`
                                }
                                alt={project.title}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    (e.currentTarget as HTMLElement).style.opacity = '0.3';
                                }}
                            />
                        ) : (
                            <div className="text-[10px] text-slate-500 font-mono">
                                NO IMG
                            </div>
                        )}
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
            ),
        },
        {
            header: "Category",
            headerClassName: "text-slate-300",
            cell: (project) => (
                <div className="flex flex-wrap gap-1.5">
                    <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-blue-500/10 text-lara-accent-blue-light border border-blue-500/20">
                        {project.category?.name}
                    </span>
                </div>
            ),
        },
        {
            header: "Tech Stack",
            headerClassName: "text-slate-300",
            cell: (project) => (
                <div className="flex flex-wrap gap-1.5">
                    {project.tech_stack?.slice(0, 3).map((stack) => (
                        <span
                            key={stack.id}
                            className="px-2 py-0.5 rounded text-[10px] font-medium bg-blue-500/10 text-lara-accent-blue-light border border-blue-500/20"
                        >
                            {stack.name}
                        </span>
                    ))}
                    {project.tech_stack && project.tech_stack.length > 3 && (
                        <span className="text-[10px] text-slate-500">
                            +{project.tech_stack.length - 3}
                        </span>
                    )}
                </div>
            ),
        },
        {
            header: "Tags",
            headerClassName: "text-slate-300",
            cell: (project) => (
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
            ),
        },
        {
            header: "Actions",
            headerClassName: "text-right text-slate-300",
            cellClassName: "text-right",
            cell: (project) => (
                <div className="flex items-center justify-end gap-2">
                    <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => handleEdit(project)}
                        className="h-8 w-8 text-lara-text-muted hover:text-foreground hover:bg-white/10"
                    >
                        <HiPencil className="w-4 h-4"/>
                    </Button>
                    <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => handleDelete(project)}
                        className="h-8 w-8 text-slate-400 hover:text-red-400 hover:bg-red-500/10"
                    >
                        <HiTrash className="w-4 h-4"/>
                    </Button>
                </div>
            ),
        },
    ];

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <AdminHeader title={"Projects"} subtitle={"Manage your portfolio showcase here."}/>
                </div>
                <Button
                    onClick={handleCreate}
                    className="bg-primary hover:bg-blue-600 text-foreground gap-2"
                >
                    <HiPlus className="w-4 h-4"/>
                    Add New Project
                </Button>
            </div>

            <DataTable
                data={projects}
                columns={columns}
                isLoading={isLoading}
                dataName="projects"
            />

            <ProjectDialog
                open={isDialogOpen}
                onOpenChange={setIsDialogOpen}
                projectToEdit={projectToEdit}
                onSuccess={refetch}
            />
        </div>
    );
}
