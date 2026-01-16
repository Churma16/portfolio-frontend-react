import {useState} from "react";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table.tsx";
import {Button} from "@/components/ui/button.tsx";
import {HiPencil, HiPlus, HiTrash} from "react-icons/hi2";
import {Tag} from "@/types";
import TagDialog from "./components/TagDialog.tsx";
import {useTags} from "@/features/tags/hooks/useTags.ts";
import apiClient from "@/api/axios.ts";

export default function TagList() {
    const { data: tags = [], isLoading, refetch } = useTags();

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [tagToEdit, setTagToEdit] = useState<Tag | null>(null);

    const handleEdit = (tag: Tag) => {
        setTagToEdit(tag);
        setIsDialogOpen(true);
    };

    const handleCreate = () => {
        setTagToEdit(null);
        setIsDialogOpen(true);
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Are you sure?")) return;
        try {
            await apiClient.delete(`/tags/${id}`);
            refetch();
        } catch (error) {
            console.error("Delete error:", error);
        }
    };

    // Helper warna (bisa dipindah ke utils)
    const getColorClass = (color: string) => {
        const map: any = {
            blue: "bg-blue-500/20 text-lara-accent-blue-light border-blue-500/30",
            green: "bg-green-500/20 text-green-400 border-green-500/30",
            red: "bg-red-500/20 text-red-400 border-red-500/30",
            purple: "bg-purple-500/20 text-purple-400 border-purple-500/30",
            yellow: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
        };
        return map[color] || map.blue;
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h2 className="text-3xl font-heading font-bold text-foreground tracking-tight">
                        Tags
                    </h2>
                    <p className="text-lara-text-muted text-sm">
                        Manage your project tags here.
                    </p>
                </div>
                <Button
                    onClick={handleCreate}
                    className="bg-primary hover:bg-blue-600 text-foreground gap-2"
                >
                    <HiPlus className="w-4 h-4" />
                    Add New Tag
                </Button>
            </div>

            <div className="rounded-xl border border-white/10 bg-background-blue/50 overflow-hidden">
                <Table>
                    <TableHeader className="bg-white/5">
                        <TableRow className="border-white/5 hover:bg-transparent">
                            <TableHead className="text-lara-text-tertiary">
                                Name
                            </TableHead>
                            <TableHead className="text-lara-text-tertiary">
                                Category
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
                                    Loading tags...
                                </TableCell>
                            </TableRow>
                        ) : tags.length === 0 ? (
                            <TableRow>
                                <TableCell
                                    colSpan={3}
                                    className="h-32 text-center text-slate-500"
                                >
                                    <div className="flex flex-col items-center justify-center gap-2">
                                        <p>
                                            No tags found. Start by creating
                                            one!
                                        </p>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ) : (
                            tags.map((item) => (
                                <TableRow
                                    key={item.id}
                                    className="border-white/5 hover:bg-white/5 transition-colors"
                                >
                                    <TableCell>
                                        <span
                                            className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${getColorClass(
                                                item.color ?? "blue"
                                            )}`}
                                        >
                                            {item.name}
                                        </span>
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
            <TagDialog
                open={isDialogOpen}
                onOpenChange={setIsDialogOpen}
                dataToEdit={tagToEdit}
                onSuccess={refetch}
            />
        </div>
    );
}
