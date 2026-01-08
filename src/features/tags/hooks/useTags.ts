import { useQuery } from "@tanstack/react-query";
import apiClient from "../../../api/axios.ts";
import { ApiResponse, Tag } from "@/types";

const fetchTags= async (): Promise<Tag[]> => {
    // Ambil response dari Axios
    const response = await apiClient.get<ApiResponse<Tag[]>>(
        "/tags"
    );

    console.log("Tag response:", response.data);
    return response.data.data;
};

export const useTags = () => {
    return useQuery({
        queryKey: ["tags"],
        queryFn: fetchTags,
        staleTime: 1000 * 60 * 5,
    });
};
