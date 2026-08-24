import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { TechStackCategory } from "@/types";
import { techStackService } from "../api/techStackService.ts";

export const useTechStackCategories = () => {
    return useQuery({
        queryKey: ["tech-stack-categories"],
        queryFn: () => techStackService.fetchTechStackCategories(),
        staleTime: 1000 * 60 * 5,
    });
};

export const useCreateTechStackCategory = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: Partial<TechStackCategory> | Record<string, unknown>) =>
            techStackService.createTechStackCategory(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tech-stack-categories"] });
        },
    });
};

export const useUpdateTechStackCategory = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            id,
            data,
        }: {
            id: number;
            data: Partial<TechStackCategory> | Record<string, unknown>;
        }) => techStackService.updateTechStackCategory(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tech-stack-categories"] });
        },
    });
};

export const useDeleteTechStackCategory = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: number) => techStackService.deleteTechStackCategory(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tech-stack-categories"] });
        },
    });
};
