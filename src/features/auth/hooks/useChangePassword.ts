import {useMutation} from "@tanstack/react-query";
import apiClient from "@/api/axios.ts";

export const useChangePassword = () => {
    return useMutation({
        mutationFn: async (data: { old_password: string; new_password: string }) => {
            return await apiClient.post("change-password", data);
        }
    });
};
