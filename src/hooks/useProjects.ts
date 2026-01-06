import { useQuery } from "@tanstack/react-query";
import apiClient from "../api/axios";
import { Project, ApiResponse } from "../types";

const fetchProjects = async (): Promise<Project[]> => {
    // Ambil response dari Axios
    const response = await apiClient.get<ApiResponse<Project[]>>(
        "/projects?with=techStacks,tags,category"
    );

    console.log("Projects response:", response.data);
    return response.data.data;
};

export const useProjects = () => {
    return useQuery({
        queryKey: ["projects"],
        queryFn: fetchProjects,
        staleTime: 1000 * 60 * 5,
    });
};
