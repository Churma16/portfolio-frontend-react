import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../api/axios";
import { ApiResponse, Message } from "../types";

const fetchMessage = async (): Promise<Message> => {
    const response = await apiClient.get<ApiResponse<Message>>("/messages");

    console.log("Message response:", response.data);
    return response.data.data;
};

interface CreateMessagePayload {
    name: string;
    email: string;
    content: string;
}

export const useMessage = () => {
    return useQuery({
        queryKey: ["message"],
        queryFn: fetchMessage,
        staleTime: 1000 * 60 * 5,
    });
};

export const useCreateMessage = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (payload: CreateMessagePayload) => {
            const response = await apiClient.post<ApiResponse<Message>>(
                "/messages",
                payload
            );
            return response.data.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["message"] });
        },
        onError: (err: any) => {
            console.error("Error sending message:", err);
        },
    });
};
