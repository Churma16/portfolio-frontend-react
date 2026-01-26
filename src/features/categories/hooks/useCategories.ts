import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import apiClient from "../../../api/axios.ts";
import {ApiResponse, Category} from "@/types";

const fetchCategories = async (): Promise<Category[]> => {
    const response = await apiClient.get<ApiResponse<Category[]>>(
        "/categories"
    );
    console.log("Categories response:", response.data);
    return response.data.data;
};

export const useCategories = () => {
    return useQuery({
        queryKey: ["categories"],
        queryFn: fetchCategories,
        staleTime: 1000 * 60 * 5,
    });
};

export const useCreateCategory = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (newData: any) => {
            return await apiClient.post("/categories", newData);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["categories"]});
        },
    })
}

export const useUpdateCategory = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({id, data}: { id: number; data: any }) => {
            return await apiClient.put(`/categories/${id}`, data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["categories"]});
        }
    });
}

export const useDeleteCategory = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: number) => {
            return await apiClient.delete(`/categories/${id}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["categories"]});
        }
    });
}
