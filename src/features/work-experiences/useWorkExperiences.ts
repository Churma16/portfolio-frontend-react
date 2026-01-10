import {useQuery} from "@tanstack/react-query";
import apiClient from "@/api/axios.ts";
import {ApiResponse, WorkExperience} from "@/types";

const fetchWorkExperiences = async (): Promise<WorkExperience[]> => {
    const response = await apiClient.get<ApiResponse<WorkExperience[]>>(
        "/work-experiences"
    );

    console.log("Work Experiences response:", response.data);
    return response.data.data;
};


export const useWorkExperiences = () => {
    return useQuery({
        queryKey: ["work-experiences"],
        queryFn: fetchWorkExperiences,
        staleTime: 1000 * 60 * 5,
    });
}