import { useQuery } from "@tanstack/react-query";
import apiClient from "../api/axios";
import type { Project, ApiResponse } from "../types"; // Import dari file index.ts yang baru kamu buat

// Function fetcher
const fetchProjects = async (): Promise<Project[]> => {
    const response = await apiClient.get<ApiResponse<Project[]>>("/projects");
    return response.data.data;
};

export const useProjects = () => {
    return useQuery({
        queryKey: ["projects"], // Key unik biar React Query tau ini data apa
        queryFn: fetchProjects,
        staleTime: 1000 * 60 * 5, // Data dianggap segar selama 5 menit (Cache)
        retry: 1, // Kalau gagal, coba 1x lagi sebelum error
    });
};
