import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Tag } from "@/types";
import { tagService } from "../api/tagService.ts";

export const useTags = () => {
    return useQuery({
        queryKey: ["tags"],
        queryFn: () => tagService.fetchTags(),
        staleTime: 1000 * 60 * 5,
    });
};

export const useCreateTag = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: Partial<Tag> | Record<string, unknown>) =>
            tagService.createTag(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tags"] });
        },
    });
};

export const useUpdateTag = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: { id: number; data: Partial<Tag> | Record<string, unknown> }) =>
            tagService.updateTag(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tags"] });
        },
    });
};

export const useDeleteTag = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: number) => tagService.deleteTag(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tags"] });
        },
    });
};
