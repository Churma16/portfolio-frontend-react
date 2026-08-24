import apiClient from "@/api/axios";
import { ApiResponse, Category } from "@/types";

export const categoryService = {
    async fetchCategories(): Promise<Category[]> {
        const response = await apiClient.get<ApiResponse<Category[]>>("/categories");
        return response.data.data;
    },

    async createCategory(payload: Partial<Category> | Record<string, unknown>) {
        return await apiClient.post<ApiResponse<Category>>("/categories", payload);
    },

    async updateCategory(
        id: number,
        payload: Partial<Category> | Record<string, unknown>
    ) {
        return await apiClient.put<ApiResponse<Category>>(`/categories/${id}`, payload);
    },

    async deleteCategory(id: number) {
        return await apiClient.delete(`/categories/${id}`);
    },
};
