import { useQuery } from "@tanstack/react-query";
import apiClient from "../../../api/axios.ts";
import { Category, ApiResponse } from "@/types";

const fetchCategories = async (): Promise<Category[]> => {
    const response = await apiClient.get<ApiResponse<Category[]>>(
        "/categories"
    );
    console.log("Categories response:", response.data);
    return response.data.data;
};

export const useCategories = () => {
    return useQuery({
        queryKey: ["categories"],
        queryFn: fetchCategories,
        staleTime: 1000 * 60 * 5,
    });
};
