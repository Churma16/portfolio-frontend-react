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
import { TechStack } from "../../../types";
import TechStackDialog from "./TechStackDialog";
import TechIcon from "../../../components/common/TechIcon";

export default function TechStackList() {
    const [data, setData] = useState<TechStack[]>([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editItem, setEditItem] = useState<TechStack | null>(null);

    const fetchData = async () => {
        const token = localStorage.getItem("token");
        const res = await fetch("http://127.0.0.1:8000/api/tech-stacks", {
            headers: { Authorization: `Bearer ${token}` },
        });
        const json = await res.json();
        setData(json.data || []);
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Are you sure?")) return;
        const token = localStorage.getItem("token");
        await fetch(`http://127.0.0.1:8000/api/tech-stacks/${id}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` },
        });
        fetchData();
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white">Tech Stacks</h2>
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
                            <TableHead>Icon</TableHead>
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
                                    <TechIcon
                                        name={item.name}
                                        icon={item.icon}
                                        className="w-6 h-6 text-slate-300"
                                    />
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

            <TechStackDialog
                open={isDialogOpen}
                onOpenChange={setIsDialogOpen}
                dataToEdit={editItem}
                onSuccess={fetchData}
            />
        </div>
    );
}
