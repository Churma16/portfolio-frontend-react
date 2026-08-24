import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { WorkExperience } from "@/types";
import { workExperienceService } from "../api/workExperienceService.ts";

export const useWorkExperiences = () => {
    return useQuery({
        queryKey: ["work-experiences"],
        queryFn: () => workExperienceService.fetchWorkExperiences(),
        staleTime: 1000 * 60 * 5,
    });
};

export const useCreateWorkExperience = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: Partial<WorkExperience> | Record<string, unknown>) =>
            workExperienceService.createWorkExperience(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["work-experiences"] });
        },
    });
};

export const useUpdateWorkExperience = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            id,
            data,
        }: {
            id: number;
            data: Partial<WorkExperience> | Record<string, unknown>;
        }) => workExperienceService.updateWorkExperience(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["work-experiences"] });
        },
    });
};

export const useDeleteWorkExperience = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: number) => workExperienceService.deleteWorkExperience(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["work-experiences"] });
        },
    });
};
