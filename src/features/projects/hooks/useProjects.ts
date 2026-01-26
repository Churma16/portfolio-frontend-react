import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import apiClient from "../../../api/axios.ts";
import {ApiResponse, Project} from "@/types";
import {useApi} from "@/contexts/useApi.ts";

const fetchProjects = async (): Promise<Project[]> => {
    // Ambil response dari Axios
    const response = await apiClient.get<ApiResponse<Project[]>>(
        "/projects?with=techStacks,tags,category"
    );

    console.log("Projects response:", response.data);
    return response.data.data;
};

interface ProjectPayload {
    title: string;
    content: string;
    thumbnail?: string;
    repo_url: string;
    demo_url: string;
    tech_stack_ids: number[];
    tag_ids: number[];
}

export const useProjects = () => {
    const {activeBackend} = useApi(); // Get 'laravel' or 'go'

    return useQuery({
        // 👇 ADD activeBackend TO THE KEY
        queryKey: ["projects", activeBackend],
        queryFn: fetchProjects,
        staleTime: 1000 * 60 * 5,
    });
};

export const useProjectMutation = (projectId?: number) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (payload: ProjectPayload) => {
            const url = projectId ? `/projects/${projectId}` : "/projects";
            const method = projectId ? "PUT" : "POST";

            if (method === "POST") {
                return await apiClient.post(url, payload);
            } else {
                return await apiClient.put(url, payload);
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["projects"]});
        },
        onError: (err: any) => {
            console.error("Error submitting project:", err);
        },
    });
};

export const useCreateProject = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (newData: any) => {
            return await apiClient.post("/projects", newData);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["projects"]});
        }
    });
}

export const useUpdateProject = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({id, data}: { id: number; data: any }) => {
            // Check if data contains File object (will be converted to FormData by interceptor)
            const hasFile = Object.values(data).some(
                (value) => value instanceof File
            );

            if (hasFile) {
                // For FormData with Laravel, use POST with _method: PUT
                // The _method field is already in the payload
                return await apiClient.post(`/projects/${id}`, data);
            } else {
                // For regular JSON, use PUT
                return await apiClient.put(`/projects/${id}`, data);
            }
        }
        ,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["projects"]});
        }
    });
}