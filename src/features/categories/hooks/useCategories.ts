import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Category } from "@/types";
import { categoryService } from "../api/categoryService.ts";

export const useCategories = () => {
    return useQuery({
        queryKey: ["categories"],
        queryFn: () => categoryService.fetchCategories(),
        staleTime: 1000 * 60 * 5,
    });
};

export const useCreateCategory = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: Partial<Category> | Record<string, unknown>) =>
            categoryService.createCategory(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["categories"] });
        },
    });
};

export const useUpdateCategory = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            id,
            data,
        }: {
            id: number;
            data: Partial<Category> | Record<string, unknown>;
        }) => categoryService.updateCategory(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["categories"] });
        },
    });
};

export const useDeleteCategory = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: number) => categoryService.deleteCategory(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["categories"] });
        },
    });
};
