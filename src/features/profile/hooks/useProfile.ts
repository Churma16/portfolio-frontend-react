import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import apiClient from "../../../api/axios.ts";
import {ApiResponse, Profile} from "@/types";
import {useApi} from "@/contexts/useApi.ts";

const fetchProfile = async (): Promise<Profile> => {
    const response = await apiClient.get<ApiResponse<Profile>>("/profiles");

    console.log("Profile response:", response.data);
    return response.data.data;
};

export const useProfile = () => {
    return useQuery({
        queryKey: ["profile"],
        queryFn: fetchProfile,
        staleTime: 1000 * 60 * 5,
    });
};

export function useUpdateProfile() {
    const queryClient = useQueryClient();
    const {activeBackend} = useApi(); // Get 'laravel' or 'go'

    return useMutation({
        mutationFn: async ({id, data}: { id: number; data: any }) => {
            // Check if data contains File object (will be converted to FormData by interceptor)
            const hasFile = Object.values(data).some(
                (value) => value instanceof File
            );

            if (hasFile) {
                // When there's a file, we need different approaches for different backends
                if (activeBackend === 'go') {
                    // Go API supports PUT with FormData directly
                    return await apiClient.put(`/profiles/${id}`, data);
                } else {
                    // Laravel requires POST with _method: PUT for FormData
                    // The _method field is already in the payload from useProjectForm
                    return await apiClient.post(`/profiles/${id}`, data);
                }
            } else {
                // For regular JSON (no file), always use PUT
                return await apiClient.put(`/profiles/${id}`, data);
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["profiles"]});
        }
    });
}
