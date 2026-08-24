import apiClient, { requestBothBackends } from "@/api/axios";
import { ApiResponse, WorkExperience } from "@/types";

export const workExperienceService = {
    async fetchWorkExperiences(): Promise<WorkExperience[]> {
        const response = await apiClient.get<ApiResponse<WorkExperience[]>>(
            "/work-experiences?with=tags,techStacks"
        );
        return response.data.data;
    },

    async createWorkExperience(payload: Partial<WorkExperience> | Record<string, unknown>) {
        return await requestBothBackends("post", "/work-experiences", payload);
    },

    async updateWorkExperience(
        id: number,
        payload: Partial<WorkExperience> | Record<string, unknown>
    ) {
        return await requestBothBackends("put", `/work-experiences/${id}`, payload);
    },

    async deleteWorkExperience(id: number) {
        return await requestBothBackends("delete", `/work-experiences/${id}`);
    },
};
