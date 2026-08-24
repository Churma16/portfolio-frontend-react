import { useMutation } from "@tanstack/react-query";
import { authService } from "../api/authService.ts";

export const useChangePassword = () => {
    return useMutation({
        mutationFn: (data: { old_password: string; new_password: string }) =>
            authService.changePassword(data),
    });
};
