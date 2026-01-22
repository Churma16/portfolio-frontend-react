import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import apiClient from "../../../api/axios.ts";
import {ApiResponse, TechStack} from "@/types";
import {useApi} from "@/contexts/useApi.ts";

const fetchTechStack = async (): Promise<TechStack[]> => {
    // Ambil response dari Axios
    const response = await apiClient.get<ApiResponse<TechStack[]>>(
        "/tech-stacks"
    );

    console.log("Tech Stacks response:", response.data);
    return response.data.data;
};

export const useTechStacks = () => {
    const {activeBackend} = useApi(); // Get 'laravel' or 'go'

    return useQuery({
        queryKey: ["tech-stacks", activeBackend],
        queryFn: fetchTechStack,
        staleTime: 1000 * 60 * 5,
    });
};

export const useCreateTechStack = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (newData: any) => {
            return await apiClient.post("/tech-stacks", newData);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["tech-stacks"]});
        },
    })
}

export const useUpdateTechStack = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({id, data}: { id: number; data: any }) => {
            return await apiClient.put(`/tech-stacks/${id}`, data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["tech-stacks"]});
        }
    })
}
