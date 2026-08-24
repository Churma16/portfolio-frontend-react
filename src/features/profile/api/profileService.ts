import apiClient from "@/api/axios";
import { ApiResponse, Profile } from "@/types";
import { hasFilePayload } from "@/lib/formDataUtils";

export const profileService = {
    async fetchProfile(): Promise<Profile> {
        const response = await apiClient.get<ApiResponse<Profile>>("/profiles");
        return response.data.data;
    },

    async updateProfile(
        id: number,
        data: FormData | Record<string, unknown>,
        activeBackend: string
    ) {
        const isFormData = data instanceof FormData;

        if (isFormData) {
            // When it's FormData, use POST for Laravel (has _method: PUT), PUT for Go/Express/Spring
            if (activeBackend !== "laravel") {
                return await apiClient.put(`/profiles/${id}`, data);
            }
            return await apiClient.post(`/profiles/${id}`, data);
        }

        const containsFile = hasFilePayload(data);

        if (containsFile) {
            if (activeBackend !== "laravel") {
                return await apiClient.put(`/profiles/${id}`, data);
            }
            return await apiClient.post(`/profiles/${id}`, data);
        }

        return await apiClient.put(`/profiles/${id}`, data);
    },
};
