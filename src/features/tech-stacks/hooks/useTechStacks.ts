import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { TechStack } from "@/types";
import { useApi } from "@/contexts/useApi.ts";
import { techStackService } from "../api/techStackService.ts";

export const useTechStacks = () => {
    const { activeBackend } = useApi();

    return useQuery({
        queryKey: ["tech-stacks", activeBackend],
        queryFn: () => techStackService.fetchTechStacks(),
        staleTime: 1000 * 60 * 5,
    });
};

export const useCreateTechStack = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: Partial<TechStack> | Record<string, unknown>) =>
            techStackService.createTechStack(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tech-stacks"] });
        },
    });
};

export const useUpdateTechStack = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            id,
            data,
        }: {
            id: number;
            data: Partial<TechStack> | Record<string, unknown>;
        }) => techStackService.updateTechStack(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tech-stacks"] });
        },
    });
};

export const useDeleteTechStack = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: number) => techStackService.deleteTechStack(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tech-stacks"] });
        },
    });
};

export const useReorderTechStack = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, direction }: { id: number; direction: "up" | "down" }) =>
            techStackService.reorderTechStack(id, direction),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tech-stacks"] });
        },
    });
};
