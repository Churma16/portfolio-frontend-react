import {useState} from "react";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table.tsx";
import {Button} from "@/components/ui/button.tsx";
import {HiPencil, HiPlus, HiTrash} from "react-icons/hi2";
import {TechStack} from "@/types";
import TechStackDialog from "./components/TechStackDialog.tsx";
import TechIcon from "../../../components/common/TechIcon.tsx";
import {useTechStacks} from "@/features/tech-stacks/hooks/useTechStacks.ts";
import apiClient from "@/api/axios.ts";
import AdminHeader from "@/components/common/AdminHeader.tsx";

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

    const handleReorder = async (id: number, direction: "up" | "down") => {
        console.log(`Memindahkan project ${id} ke arah ${direction}`);

        // Contoh Logika API (Sesuaikan dengan endpoint backend Anda):
        try {
            await apiClient.post(`/tech-stacks/${id}/reorder`, {direction});
            refetch(); // Refresh data agar urutan baru tampil
        } catch (error) {
            console.error("Gagal mengubah urutan", error);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <AdminHeader title={"Tech Stacks"} subtitle={"Manage your technology stack here."}/>
                </div>
                <Button
                    onClick={handleCreate}
                    className="bg-primary hover:bg-blue-600 text-foreground gap-2"
                >
                    <HiPlus className="w-4 h-4" />
                    Add New Stack
                </Button>
            </div>

            <div className="rounded-xl border border-white/10 bg-background-blue/50 overflow-hidden">
                <Table>
                    <TableHeader className="bg-white/5">
                        <TableRow className="border-white/5 hover:bg-transparent">
                            <TableHead className="text-slate-300 w-[50px]">
                                ID
                            </TableHead>
                            <TableHead className="text-slate-300 w-[80px] text-center">
                                Order
                            </TableHead>
                            <TableHead className="text-lara-text-tertiary">
                                Icon
                            </TableHead>
                            <TableHead className="text-lara-text-tertiary">
                                Name
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
                                    colSpan={3}
                                    className="h-24 text-center text-lara-text-muted-dark animate-pulse"
                                >
                                    Loading tech stacks data...
                                </TableCell>
                            </TableRow>
                        ) : techStacks.length === 0 ? (
                            <TableRow>
                                <TableCell
                                    colSpan={3}
                                    className="h-32 text-center text-lara-text-muted-dark"
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
                                    <TableCell className="font-mono text-slate-500">
                                        #{item.id}
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex flex-col items-center gap-1">
                                            {/* Tombol NAIK */}
                                            <Button
                                                size="icon"
                                                variant="ghost"
                                                className="h-6 w-6 text-lara-text-muted hover:text-foreground hover:bg-white/10 disabled:opacity-30"
                                                onClick={() =>
                                                    handleReorder(
                                                        item.id,
                                                        "up"
                                                    )
                                                }
                                                disabled={index === 0} // Disable jika item pertama
                                            >
                                                <HiArrowUp className="w-3 h-3"/>
                                            </Button>

                                            {/* Tombol TURUN */}
                                            <Button
                                                size="icon"
                                                variant="ghost"
                                                className="h-6 w-6 text-lara-text-muted hover:text-foreground hover:bg-white/10 disabled:opacity-30"
                                                onClick={() =>
                                                    handleReorder(
                                                        item.id,
                                                        "down"
                                                    )
                                                }
                                                disabled={
                                                    index ===
                                                    techStacks.length - 1
                                                } // Disable jika item terakhir
                                            >
                                                <HiArrowDown className="w-3 h-3"/>
                                            </Button>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <TechIcon
                                            name={item.name}
                                            icon={item.icon}
                                            className="w-6 h-6 text-lara-text-tertiary"
                                        />
                                    </TableCell>
                                    <TableCell className="font-medium text-foreground">
                                        {item.name}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <Button
                                                size="icon"
                                                variant="ghost"
                                                onClick={() => handleEdit(item)}
                                                className="h-8 w-8 text-lara-text-muted hover:text-foreground hover:bg-white/10"
                                            >
                                                <HiPencil className="w-4 h-4" />
                                            </Button>
                                            <Button
                                                size="icon"
                                                variant="ghost"
                                                onClick={() =>
                                                    handleDelete(item.id)
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
