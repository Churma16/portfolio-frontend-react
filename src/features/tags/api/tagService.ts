import apiClient from "@/api/axios";
import { ApiResponse, Tag } from "@/types";

export const tagService = {
    async fetchTags(): Promise<Tag[]> {
        const response = await apiClient.get<ApiResponse<Tag[]>>("/tags");
        return response.data.data;
    },

    async createTag(payload: Partial<Tag> | Record<string, unknown>) {
        return await apiClient.post<ApiResponse<Tag>>("/tags", payload);
    },

    async updateTag(id: number, payload: Partial<Tag> | Record<string, unknown>) {
        return await apiClient.put<ApiResponse<Tag>>(`/tags/${id}`, payload);
    },

    async deleteTag(id: number) {
        return await apiClient.delete(`/tags/${id}`);
    },
};
