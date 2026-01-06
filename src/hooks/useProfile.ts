import { useQuery } from "@tanstack/react-query";
import apiClient from "../api/axios";
import { Project, ApiResponse, Profile } from "../types";

const fetchProfiles = async (): Promise<Profile> => {
    // Ambil response dari Axios
    const response = await apiClient.get<ApiResponse<Profile>>("/profiles");
    
    console.log("Profiles response:", response.data);
    return response.data.data;
};

export const useProfiles = () => {
    return useQuery({
        queryKey: ["profiles"],
        queryFn: fetchProfiles,
        staleTime: 1000 * 60 * 5,
    });
};
