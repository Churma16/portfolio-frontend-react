import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import apiClient from "@/api/axios.ts";
import {ApiResponse, WorkExperience} from "@/types";

const fetchWorkExperiences = async (): Promise<WorkExperience[]> => {
    const response = await apiClient.get<ApiResponse<WorkExperience[]>>(
        "/work-experiences?with=tags,techStacks",
    );

    console.log("Work Experiences response:", response.data);
    return response.data.data;
};


export const useWorkExperiences = () => {
    return useQuery({
        queryKey: ["work-experiences"],
        queryFn: fetchWorkExperiences,
        staleTime: 1000 * 60 * 5,
    });
}

export const useCreateWorkExperience = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (newData: any) => {
            return await apiClient.post("/work-experiences", newData);
        },
        onSuccess: () => {
            // Setelah sukses, suruh mata-mata update data di papan tulis (Cache)
            queryClient.invalidateQueries({queryKey: ["work-experiences"]});
        },
    });
};

export const useUpdateWorkExperience = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({id, data}: { id: number; data: any }) => {
            return await apiClient.put(`/work-experiences/${id}`, data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["work-experiences"]});
        },
    });
};

