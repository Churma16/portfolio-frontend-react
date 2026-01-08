import { useQuery } from "@tanstack/react-query";
import apiClient from "../../../api/axios.ts";
import { ApiResponse, TechStack } from "@/types";

const fetchTechStack = async (): Promise<TechStack[]> => {
    // Ambil response dari Axios
    const response = await apiClient.get<ApiResponse<TechStack[]>>(
        "/tech-stacks"
    );

    console.log("Tech Stacks response:", response.data);
    return response.data.data;
};

export const useTechStacks = () => {
    return useQuery({
        queryKey: ["tech-stacks"],
        queryFn: fetchTechStack,
        staleTime: 1000 * 60 * 5,
    });
};
