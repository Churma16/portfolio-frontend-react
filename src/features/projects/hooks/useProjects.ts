import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import apiClient, {requestBothBackends} from "../../../api/axios.ts";
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
            const method = projectId ? "put" : "post";
            return await requestBothBackends(method, url, payload);
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
            return await requestBothBackends("post", "/projects", newData);
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
            return await requestBothBackends("put", `/projects/${id}`, data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["projects"]});
        }
    });
}

export const useReorderProject = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({id, direction}: { id: number; direction: "up" | "down" }) => {
            return await requestBothBackends("post", `/projects/${id}/reorder`, {direction});
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["projects"]});
        },
    })
}