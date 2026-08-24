import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useApi } from "@/contexts/useApi.ts";
import { profileService } from "../api/profileService.ts";

export const useProfile = () => {
    return useQuery({
        queryKey: ["profile"],
        queryFn: () => profileService.fetchProfile(),
        staleTime: 1000 * 60 * 5,
    });
};

export function useUpdateProfile() {
    const queryClient = useQueryClient();
    const { activeBackend } = useApi();

    return useMutation({
        mutationFn: ({ id, data }: { id: number; data: FormData | Record<string, unknown> }) =>
            profileService.updateProfile(id, data, activeBackend),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["profile"] });
        },
    });
}
