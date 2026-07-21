import {useState} from "react";
import {useTechStackCategories, useDeleteTechStackCategory} from "@/features/tech-stacks/hooks/useTechStackCategories.ts";
import TechStackCategoryDialog from "./components/TechStackCategoryDialog.tsx";
import {Button} from "@/components/ui/button.tsx";
import {HiOutlinePencil, HiOutlinePlus, HiOutlineTrash} from "react-icons/hi2";
import {TechStackCategory} from "@/types";
import AdminHeader from "@/components/common/AdminHeader.tsx";
import DataTable, {ColumnDef} from "@/components/common/DataTable.tsx";

export default function TechStackCategoryList() {
    const {data: categories = [], isLoading, refetch} = useTechStackCategories();
    const {mutate: deleteCategory} = useDeleteTechStackCategory();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [categoryToEdit, setCategoryToEdit] = useState<TechStackCategory | null>(null);

    const handleEdit = (category: TechStackCategory) => {
        setCategoryToEdit(category);
        setIsDialogOpen(true);
    };

    const handleCreate = () => {
        setCategoryToEdit(null);
        setIsDialogOpen(true);
    };

    const handleDelete = (id: number) => {
        if (!window.confirm("Are you sure you want to delete this category?")) return;

        deleteCategory(id, {
            onSuccess: () => {
                refetch();
            },
            onError: (err) => {
                console.error(err);
                alert("Failed to delete category");
            },
        });
    };

    const columns: ColumnDef<TechStackCategory>[] = [
        {
            header: "Name",
            cellClassName: "font-medium text-foreground",
            cell: (category) => category.name,
        },
        {
            header: "Color",
            cell: (category) => (
                <span
                    className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border border-white/20 bg-white/5"
                    style={category.color ? { borderColor: category.color, color: category.color } : {}}
                >
                    {category.color || "None"}
                </span>
            ),
        },
        {
            header: "Actions",
            headerClassName: "text-right",
            cellClassName: "text-right space-x-2",
            cell: (category) => (
                <>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(category)}
                        className="text-primary hover:bg-primary/10"
                    >
                        <HiOutlinePencil className="w-4 h-4"/>
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(category.id)}
                        className="text-cat-framework hover:bg-cat-framework/10"
                    >
                        <HiOutlineTrash className="w-4 h-4"/>
                    </Button>
                </>
            ),
        },
    ];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-start">
                <div>
                    <AdminHeader title={"Tech Stack Categories"} subtitle={"Manage your tech stack categories"}/>
                </div>
                <Button
                    onClick={handleCreate}
                    className="bg-primary hover:bg-primary/90"
                >
                    <HiOutlinePlus className="w-5 h-5 mr-2"/> Add Tech Stack Category
                </Button>
            </div>

            {/* Table */}
            <DataTable
                data={categories}
                columns={columns}
                isLoading={isLoading}
                dataName="tech stack categories"
                containerClassName="rounded-lg border border-white/10 overflow-hidden bg-black/20"
            />

            {/* Dialog */}
            <TechStackCategoryDialog
                open={isDialogOpen}
                onOpenChange={setIsDialogOpen}
                dataToEdit={categoryToEdit}
                onSuccess={refetch}
            />
        </div>
    );
}
