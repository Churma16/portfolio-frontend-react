import apiClient from "./axios";
import { ApiResponse, Message } from "@/types";

export interface CreateMessagePayload {
    name: string;
    email: string;
    content: string;
}

export const messageService = {
    async fetchMessages(): Promise<Message> {
        const response = await apiClient.get<ApiResponse<Message>>("/messages");
        return response.data.data;
    },

    async createMessage(payload: CreateMessagePayload): Promise<Message> {
        const response = await apiClient.post<ApiResponse<Message>>("/messages", payload);
        return response.data.data;
    },
};
