import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import apiClient from "../../../api/axios.ts";
import {ApiResponse, TechStackCategory} from "@/types";

const fetchTechStackCategories = async (): Promise<TechStackCategory[]> => {
    const response = await apiClient.get<ApiResponse<any>>(
        "/tech-stack-categories"
    );
    const data = response.data.data;
    if (data && typeof data === "object" && !Array.isArray(data) && Array.isArray((data as any).data)) {
        return (data as any).data;
    }
    return Array.isArray(data) ? data : [];
};

export const useTechStackCategories = () => {
    return useQuery({
        queryKey: ["tech-stack-categories"],
        queryFn: fetchTechStackCategories,
        staleTime: 1000 * 60 * 5,
    });
};

export const useCreateTechStackCategory = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (newData: any) => {
            return await apiClient.post("/tech-stack-categories", newData);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["tech-stack-categories"]});
        },
    });
};

export const useUpdateTechStackCategory = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({id, data}: { id: number; data: any }) => {
            return await apiClient.put(`/tech-stack-categories/${id}`, data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["tech-stack-categories"]});
        }
    });
};

export const useDeleteTechStackCategory = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: number) => {
            return await apiClient.delete(`/tech-stack-categories/${id}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["tech-stack-categories"]});
        }
    });
};
