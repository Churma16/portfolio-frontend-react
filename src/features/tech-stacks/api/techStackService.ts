import apiClient, { requestBothBackends } from "@/api/axios";
import { ApiResponse, TechStack, TechStackCategory } from "@/types";

export const techStackService = {
    async fetchTechStacks(): Promise<TechStack[]> {
        const response = await apiClient.get<ApiResponse<TechStack[] | { data: TechStack[] }>>(
            "/tech-stacks"
        );
        const data = response.data.data;
        if (data && typeof data === "object" && !Array.isArray(data) && Array.isArray((data as { data: TechStack[] }).data)) {
            return (data as { data: TechStack[] }).data;
        }
        return Array.isArray(data) ? data : [];
    },

    async createTechStack(payload: Partial<TechStack> | Record<string, unknown>) {
        return await requestBothBackends("post", "/tech-stacks", payload);
    },

    async updateTechStack(
        id: number,
        payload: Partial<TechStack> | Record<string, unknown>
    ) {
        return await requestBothBackends("put", `/tech-stacks/${id}`, payload);
    },

    async deleteTechStack(id: number) {
        return await requestBothBackends("delete", `/tech-stacks/${id}`);
    },

    async reorderTechStack(id: number, direction: "up" | "down") {
        return await requestBothBackends("post", `/tech-stacks/${id}/reorder`, { direction });
    },

    async fetchTechStackCategories(): Promise<TechStackCategory[]> {
        const response = await apiClient.get<
            ApiResponse<TechStackCategory[] | { data: TechStackCategory[] }>
        >("/tech-stack-categories");
        const data = response.data.data;
        if (data && typeof data === "object" && !Array.isArray(data) && Array.isArray((data as { data: TechStackCategory[] }).data)) {
            return (data as { data: TechStackCategory[] }).data;
        }
        return Array.isArray(data) ? data : [];
    },

    async createTechStackCategory(
        payload: Partial<TechStackCategory> | Record<string, unknown>
    ) {
        return await apiClient.post<ApiResponse<TechStackCategory>>(
            "/tech-stack-categories",
            payload
        );
    },

    async updateTechStackCategory(
        id: number,
        payload: Partial<TechStackCategory> | Record<string, unknown>
    ) {
        return await apiClient.put<ApiResponse<TechStackCategory>>(
            `/tech-stack-categories/${id}`,
            payload
        );
    },

    async deleteTechStackCategory(id: number) {
        return await apiClient.delete(`/tech-stack-categories/${id}`);
    },
};
