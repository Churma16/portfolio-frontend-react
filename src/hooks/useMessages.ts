import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { messageService, CreateMessagePayload } from "@/api/messageService";

export type { CreateMessagePayload };

export const useMessages = () => {
    return useQuery({
        queryKey: ["messages"],
        queryFn: () => messageService.fetchMessages(),
        staleTime: 1000 * 60 * 5,
    });
};

export const useCreateMessage = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: CreateMessagePayload) => messageService.createMessage(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["messages"] });
        },
        onError: (error: unknown) => {
            console.error("Error sending message:", error);
        },
    });
};
