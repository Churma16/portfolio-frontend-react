import {useState} from "react";
import {useTechStackCategories, useDeleteTechStackCategory} from "@/features/tech-stacks/hooks/useTechStackCategories.ts";
import TechStackCategoryDialog from "./components/TechStackCategoryDialog.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table.tsx";
import {HiOutlinePencil, HiOutlinePlus, HiOutlineTrash} from "react-icons/hi2";
import {TechStackCategory} from "@/types";
import AdminHeader from "@/components/common/AdminHeader.tsx";
import TableDataLoading from "@/components/common/TableDataLoading.tsx";
import TableNoData from "@/components/common/TableNoData.tsx";

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
            <div className="rounded-lg border border-white/10 overflow-hidden bg-black/20">
                {isLoading && <TableDataLoading data="tech stack categories"/>}

                {!isLoading && !categories.length && <TableNoData data="tech stack categories"/>}

                {!isLoading && categories.length > 0 &&
                    <Table>
                        <TableHeader>
                            <TableRow className="border-white/10">
                                <TableHead>Name</TableHead>
                                <TableHead>Color</TableHead>
                                <TableHead className="text-right">
                                    Actions
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {categories.map((category) => (
                                <TableRow
                                    key={category.id}
                                    className="border-white/5 hover:bg-white/5"
                                >
                                    <TableCell className="font-medium text-foreground">
                                        {category.name}
                                    </TableCell>
                                    <TableCell className="text-lara-text-primary">
                                        <span
                                            className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border border-white/20 bg-white/5"
                                            style={category.color ? { borderColor: category.color, color: category.color } : {}}
                                        >
                                            {category.color || "None"}
                                        </span>
                                    </TableCell>
                                    <TableCell className="text-right space-x-2">
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
                                            onClick={() =>
                                                handleDelete(category.id)
                                            }
                                            className="text-cat-framework hover:bg-cat-framework/10"
                                        >
                                            <HiOutlineTrash className="w-4 h-4"/>
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                }
            </div>

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
