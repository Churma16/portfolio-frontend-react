import {useState} from "react";
import {useCategories, useDeleteCategory} from "@/features/categories/hooks/useCategories.ts";
import CategoryDialog from "./components/CategoryDialog.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table.tsx";
import {HiOutlinePencil, HiOutlinePlus, HiOutlineTrash} from "react-icons/hi2";
import {Category} from "@/types";
import LoadingSpinner from "@/components/common/LoadingSpinner.tsx";
import EmptyData from "@/components/common/EmptyData.tsx";

export default function CategoryList() {
    const {data: categories = [], isLoading, refetch} = useCategories();
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
                    <h1 className="text-3xl font-bold text-foreground mb-2">
                        Categories
                    </h1>
                    <p className="text-accent/60">
                        Manage your project categories
                    </p>
                </div>
                <Button
                    onClick={handleCreate}
                    className="bg-primary hover:bg-primary/90"
                >
                    <HiOutlinePlus className="w-5 h-5 mr-2"/> Add Category
                </Button>
            </div>

            {/* Table */}
            <div className="rounded-lg border border-white/10 overflow-hidden bg-black/20">
                {isLoading && <LoadingSpinner/>}

                {!isLoading && !categories.length && <EmptyData itemName={"categories"}/>}

                {!isLoading &&
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
                                            className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border bg-cat-${category.color || "-"}`}
                                        >
                                            {category.color || "-"}
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
            <CategoryDialog
                open={isDialogOpen}
                onOpenChange={setIsDialogOpen}
                dataToEdit={categoryToEdit}
                onSuccess={refetch}
            />
        </div>
    );
}