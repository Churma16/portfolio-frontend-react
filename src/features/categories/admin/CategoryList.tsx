import {useState} from "react";
import {useCategories} from "@/features/categories/hooks/useCategories.ts";
import apiClient from "@/api/axios.ts";
import CategoryDialog from "./components/CategoryDialog.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table.tsx";
import {HiOutlinePencil, HiOutlinePlus, HiOutlineTrash} from "react-icons/hi2";
import {CgSpinner} from "react-icons/cg";
import {Category} from "@/types";

export default function CategoryList() {
    const { data: categories = [], isLoading, refetch } = useCategories();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [categoryToEdit, setCategoryToEdit] = useState<Category | null>(null);

    const handleEdit = (category: Category) => {
        setCategoryToEdit(category);
        setIsDialogOpen(true);
    };

    const handleCreate = () => {
        setCategoryToEdit(null);
        setIsDialogOpen(true);
    };

    const handleDelete = async (id: number) => {
        if (
            !window.confirm(
                "Are you sure you want to delete this category?"
            )
        )
            return;

        try {
            await apiClient.delete(`/categories/${id}`);
            refetch();
        } catch (err) {
            console.error(err);
            alert("Failed to delete category");
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-start">
                <div>
                    <h1 className="text-3xl font-bold text-lara-text-primary mb-2">
                        Categories
                    </h1>
                    <p className="text-lara-sky/60">
                        Manage your project categories
                    </p>
                </div>
                <Button
                    onClick={handleCreate}
                    className="bg-lara-blue hover:bg-lara-blue/90"
                >
                    <HiOutlinePlus className="w-5 h-5 mr-2" /> Add Category
                </Button>
            </div>

            {/* Table */}
            <div className="rounded-lg border border-white/10 overflow-hidden bg-black/20">
                {isLoading ? (
                    <div className="flex items-center justify-center py-12">
                        <CgSpinner className="animate-spin w-8 h-8 text-lara-blue" />
                    </div>
                ) : categories.length === 0 ? (
                    <div className="flex items-center justify-center py-12 text-lara-sky/60">
                        No categories yet. Create one to get started!
                    </div>
                ) : (
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
                                    <TableCell className="font-medium text-lara-text-primary">
                                        {category.name}
                                    </TableCell>
                                    <TableCell className="text-lara-sky/80">
                                        {category.color || "-"}
                                    </TableCell>
                                    <TableCell className="text-right space-x-2">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => handleEdit(category)}
                                            className="text-lara-blue hover:bg-lara-blue/10"
                                        >
                                            <HiOutlinePencil className="w-4 h-4" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() =>
                                                handleDelete(category.id)
                                            }
                                            className="text-cat-framework hover:bg-cat-framework/10"
                                        >
                                            <HiOutlineTrash className="w-4 h-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}
            </div>

            {/* Dialog */}
            <CategoryDialog
                open={isDialogOpen}
                onOpenChange={setIsDialogOpen}
                dataToEdit={categoryToEdit}
                onSuccess={refetch}
            />
        </div>
    );
}