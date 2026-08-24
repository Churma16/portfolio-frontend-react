import apiClient, { requestBothBackends } from "@/api/axios";
import { ApiResponse, Project } from "@/types";

export interface ProjectPayload {
    title: string;
    content: string;
    thumbnail?: string;
    repo_url: string;
    demo_url: string;
    tech_stack_ids: number[];
    tag_ids: number[];
    category_id?: number | null;
}

export const projectService = {
    async fetchProjects(): Promise<Project[]> {
        const response = await apiClient.get<ApiResponse<Project[]>>(
            "/projects?with=techStacks,tags,category"
        );
        return response.data.data;
    },

    async createProject(payload: FormData | ProjectPayload | Record<string, unknown>) {
        return await requestBothBackends("post", "/projects", payload);
    },

    async updateProject(
        id: number,
        payload: FormData | Partial<ProjectPayload> | Record<string, unknown>
    ) {
        return await requestBothBackends("put", `/projects/${id}`, payload);
    },

    async deleteProject(id: number) {
        return await requestBothBackends("delete", `/projects/${id}`);
    },

    async reorderProject(id: number, direction: "up" | "down") {
        return await requestBothBackends("post", `/projects/${id}/reorder`, { direction });
    },
};
