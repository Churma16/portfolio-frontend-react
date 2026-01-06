import { useQuery } from "@tanstack/react-query";
import apiClient from "../api/axios";
import { ApiResponse, Profile } from "../types";

const fetchProfile = async (): Promise<Profile> => {
    const response = await apiClient.get<ApiResponse<Profile>>("/profiles");

    console.log("Profile response:", response.data);
    return response.data.data;
};

export const useProfile = () => {
    return useQuery({
        queryKey: ["profile"],
        queryFn: fetchProfile,
        staleTime: 1000 * 60 * 5,
    });
};
