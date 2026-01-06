import { useEffect, useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { HiPlus, HiPencil, HiTrash } from "react-icons/hi2";
import { Tag } from "../../../types";
import TagDialog from "./TagDialog";

export default function TagList() {
    const [data, setData] = useState<Tag[]>([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editItem, setEditItem] = useState<Tag | null>(null);

    const fetchData = async () => {
        const token = localStorage.getItem("token");
        const res = await fetch("http://127.0.0.1:8000/api/tags", {
            headers: { Authorization: `Bearer ${token}` },
        });
        const json = await res.json();
        setData(json.data || []);
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Are you sure?")) return;
        const token = localStorage.getItem("token");
        await fetch(`http://127.0.0.1:8000/api/tags/${id}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` },
        });
        fetchData();
    };

    useEffect(() => {
        fetchData();
    }, []);

    // Helper warna (bisa dipindah ke utils)
    const getColorClass = (color: string) => {
        const map: any = {
            blue: "bg-blue-500/20 text-blue-400 border-blue-500/30",
            green: "bg-green-500/20 text-green-400 border-green-500/30",
            red: "bg-red-500/20 text-red-400 border-red-500/30",
            purple: "bg-purple-500/20 text-purple-400 border-purple-500/30",
            yellow: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
        };
        return map[color] || map.blue;
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white">Tags</h2>
                <Button
                    onClick={() => {
                        setEditItem(null);
                        setIsDialogOpen(true);
                    }}
                    className="bg-lara-blue gap-2"
                >
                    <HiPlus /> Add New
                </Button>
            </div>

            <div className="rounded-xl border border-white/10 bg-[#0a101f]/50 overflow-hidden">
                <Table>
                    <TableHeader className="bg-white/5">
                        <TableRow className="border-white/5">
                            <TableHead>Preview</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead className="text-right">
                                Actions
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.map((item) => (
                            <TableRow
                                key={item.id}
                                className="border-white/5 hover:bg-white/5"
                            >
                                <TableCell>
                                    <span
                                        className={`px-2 py-1 rounded text-xs font-bold uppercase border ${getColorClass(
                                            item.color ?? "blue"
                                        )}`}
                                    >
                                        #{item.name}
                                    </span>
                                </TableCell>
                                <TableCell className="font-medium text-white">
                                    {item.name}
                                </TableCell>
                                <TableCell className="text-right space-x-2">
                                    <Button
                                        size="icon"
                                        variant="ghost"
                                        onClick={() => {
                                            setEditItem(item);
                                            setIsDialogOpen(true);
                                        }}
                                    >
                                        <HiPencil className="w-4 h-4 text-slate-400" />
                                    </Button>
                                    <Button
                                        size="icon"
                                        variant="ghost"
                                        onClick={() => handleDelete(item.id)}
                                    >
                                        <HiTrash className="w-4 h-4 text-red-400" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            <TagDialog
                open={isDialogOpen}
                onOpenChange={setIsDialogOpen}
                dataToEdit={editItem}
                onSuccess={fetchData}
            />
        </div>
    );
}
