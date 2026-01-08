import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../../../api/axios.ts";
import { Project, ApiResponse } from "@/types";

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
    return useQuery({
        queryKey: ["projects"],
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
            queryClient.invalidateQueries({ queryKey: ["projects"] });
        },
        onError: (err: any) => {
            console.error("Error submitting project:", err);
        },
    });
};
