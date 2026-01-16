import {useState} from "react";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table.tsx";
import {Button} from "@/components/ui/button.tsx";
import {HiPencil, HiPlus, HiTrash} from "react-icons/hi2";
import {TechStack} from "@/types";
import TechStackDialog from "./components/TechStackDialog.tsx";
import TechIcon from "../../../components/common/TechIcon.tsx";
import {useTechStacks} from "@/features/tech-stacks/hooks/useTechStacks.ts";
import apiClient from "@/api/axios.ts";

export default function TechStackList() {
    const { data: techStacks = [], isLoading, refetch } = useTechStacks();

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [techStackToEdit, setTechStackToEdit] = useState<TechStack | null>(
        null
    );

    const handleEdit = (techStack: TechStack) => {
        setTechStackToEdit(techStack);
        setIsDialogOpen(true);
    };

    const handleCreate = () => {
        setTechStackToEdit(null);
        setIsDialogOpen(true);
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Are you sure?")) return;
        try {
            await apiClient.delete(`/tech-stacks/${id}`);
            refetch();
        } catch (error) {
            console.error("Delete error:", error);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h2 className="text-3xl font-heading font-bold text-white tracking-tight">
                        Tech Stacks
                    </h2>
                    <p className="text-slate-400 text-sm">
                        Manage your technology stack here.
                    </p>
                </div>
                <Button
                    onClick={handleCreate}
                    className="bg-lara-blue hover:bg-blue-600 text-white gap-2"
                >
                    <HiPlus className="w-4 h-4" />
                    Add New Stack
                </Button>
            </div>

            <div className="rounded-xl border border-white/10 bg-lara-dark-blue/50 overflow-hidden">
                <Table>
                    <TableHeader className="bg-white/5">
                        <TableRow className="border-white/5 hover:bg-transparent">
                            <TableHead className="text-slate-300">
                                Icon
                            </TableHead>
                            <TableHead className="text-slate-300">
                                Name
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
                                    colSpan={3}
                                    className="h-24 text-center text-slate-500 animate-pulse"
                                >
                                    Loading tech stacks...
                                </TableCell>
                            </TableRow>
                        ) : techStacks.length === 0 ? (
                            <TableRow>
                                <TableCell
                                    colSpan={3}
                                    className="h-32 text-center text-slate-500"
                                >
                                    <div className="flex flex-col items-center justify-center gap-2">
                                        <p>
                                            No tech stacks found. Start by
                                            creating one!
                                        </p>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ) : (
                            techStacks.map((item) => (
                                <TableRow
                                    key={item.id}
                                    className="border-white/5 hover:bg-white/5 transition-colors"
                                >
                                    <TableCell>
                                        <TechIcon
                                            name={item.name}
                                            icon={item.icon}
                                            className="w-6 h-6 text-slate-300"
                                        />
                                    </TableCell>
                                    <TableCell className="font-medium text-white">
                                        {item.name}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <Button
                                                size="icon"
                                                variant="ghost"
                                                onClick={() => handleEdit(item)}
                                                className="h-8 w-8 text-slate-400 hover:text-white hover:bg-white/10"
                                            >
                                                <HiPencil className="w-4 h-4" />
                                            </Button>
                                            <Button
                                                size="icon"
                                                variant="ghost"
                                                onClick={() =>
                                                    handleDelete(item.id)
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
            </div>

            <TechStackDialog
                open={isDialogOpen}
                onOpenChange={setIsDialogOpen}
                dataToEdit={techStackToEdit}
                onSuccess={refetch}
            />
        </div>
    );
}
