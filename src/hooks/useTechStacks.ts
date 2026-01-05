import { useQuery } from "@tanstack/react-query";
import apiClient from "../api/axios";
import { ApiResponse, TechStack } from "../types";

const fetchProjects = async (): Promise<TechStack[]> => {
    // Ambil response dari Axios
    const response = await apiClient.get<ApiResponse<TechStack[]>>(
        "/tech-stacks"
    );

    // 🔍 PERHATIKAN BARIS INI:
    // response.data = Body JSON dari Laravel ({ data: [...] })
    // response.data.data = Array Projects asli ([...])
    console.log("Tech Stacks response:", response.data);
    return response.data.data;
};

export const useTechStacks = () => {
    return useQuery({
        queryKey: ["tech-stacks"],
        queryFn: fetchProjects,
        staleTime: 1000 * 60 * 5,
    });
};
