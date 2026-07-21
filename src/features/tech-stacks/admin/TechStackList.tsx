import {useState} from "react";
import {Button} from "@/components/ui/button.tsx";
import {HiArrowDown, HiArrowUp, HiPencil, HiPlus, HiTrash} from "react-icons/hi2";
import {TechStack} from "@/types";
import TechStackDialog from "./components/TechStackDialog.tsx";
import TechIcon from "../../../components/common/TechIcon.tsx";
import {requestBothBackends} from "@/api/axios.ts";
import {useReorderTechStack, useTechStacks} from "@/features/tech-stacks/hooks/useTechStacks.ts";
import AdminHeader from "@/components/common/AdminHeader.tsx";
import {useTechStackCategories} from "@/features/tech-stacks/hooks/useTechStackCategories.ts";
import DataTable, {ColumnDef} from "@/components/common/DataTable.tsx";

export default function TechStackList() {
    const {data: techStacks = [], isLoading, refetch} = useTechStacks();
    const {data: categories = []} = useTechStackCategories();
    const reorderMutation = useReorderTechStack();

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
            await requestBothBackends("delete", `/tech-stacks/${id}`);
            refetch();
        } catch (error) {
            console.error("Delete error:", error);
        }
    };

    const handleReorder = (id: number, direction: "up" | "down") => {
        reorderMutation.mutate({id, direction});
    };

    const columns: ColumnDef<TechStack>[] = [
        {
            header: "ID",
            headerClassName: "text-slate-300 w-[50px]",
            cellClassName: "font-mono text-slate-500",
            cell: (item) => `#${item.id}`,
        },
        {
            header: "Order",
            headerClassName: "text-slate-300 w-[80px] text-center",
            cellClassName: "text-center",
            cell: (item, index) => (
                <div className="flex flex-col items-center gap-1">
                    <Button
                        size="icon"
                        variant="ghost"
                        className="h-6 w-6 text-lara-text-muted hover:text-foreground hover:bg-white/10 disabled:opacity-30"
                        onClick={() => handleReorder(item.id, "up")}
                        disabled={index === 0}
                    >
                        <HiArrowUp className="w-3 h-3"/>
                    </Button>
                    <Button
                        size="icon"
                        variant="ghost"
                        className="h-6 w-6 text-lara-text-muted hover:text-foreground hover:bg-white/10 disabled:opacity-30"
                        onClick={() => handleReorder(item.id, "down")}
                        disabled={index === techStacks.length - 1}
                    >
                        <HiArrowDown className="w-3 h-3"/>
                    </Button>
                </div>
            ),
        },
        {
            header: "Icon",
            headerClassName: "text-lara-text-tertiary",
            cell: (item) => (
                <TechIcon
                    name={item.name}
                    icon={item.icon}
                    className="w-6 h-6 text-lara-text-tertiary mx-auto"
                />
            ),
        },
        {
            header: "Name",
            headerClassName: "text-lara-text-tertiary",
            cellClassName: "font-medium text-foreground",
            cell: (item) => item.name,
        },
        {
            header: "Category",
            headerClassName: "text-lara-text-tertiary",
            cellClassName: "text-foreground",
            cell: (item) => categories.find(c => c.id === item.tech_stack_category_id)?.name || "-",
        },
        {
            header: "Actions",
            headerClassName: "text-right text-lara-text-tertiary",
            cellClassName: "text-right",
            cell: (item) => (
                <div className="flex items-center justify-end gap-2">
                    <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => handleEdit(item)}
                        className="h-8 w-8 text-lara-text-muted hover:text-foreground hover:bg-white/10"
                    >
                        <HiPencil className="w-4 h-4"/>
                    </Button>
                    <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => handleDelete(item.id)}
                        className="h-8 w-8 text-lara-text-muted hover:text-lara-accent-red-light hover:bg-red-500/10"
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
                    <AdminHeader title={"Tech Stacks"} subtitle={"Manage your technology stack here."}/>
                </div>
                <Button
                    onClick={handleCreate}
                    className="bg-primary hover:bg-blue-600 text-foreground gap-2"
                >
                    <HiPlus className="w-4 h-4"/>
                    Add New Stack
                </Button>
            </div>

            <DataTable
                data={techStacks}
                columns={columns}
                isLoading={isLoading}
                dataName="tech stacks"
            />

            <TechStackDialog
                open={isDialogOpen}
                onOpenChange={setIsDialogOpen}
                dataToEdit={techStackToEdit}
                onSuccess={refetch}
            />
        </div>
    );
}
