import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useApi } from "@/contexts/useApi.ts";
import { projectService, ProjectPayload } from "../api/projectService.ts";

export type { ProjectPayload };

export const useProjects = () => {
    const { activeBackend } = useApi();

    return useQuery({
        queryKey: ["projects", activeBackend],
        queryFn: () => projectService.fetchProjects(),
        staleTime: 1000 * 60 * 5,
    });
};

export const useCreateProject = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: FormData | ProjectPayload | Record<string, unknown>) =>
            projectService.createProject(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["projects"] });
        },
    });
};

export const useUpdateProject = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            id,
            data,
        }: {
            id: number;
            data: FormData | Partial<ProjectPayload> | Record<string, unknown>;
        }) => projectService.updateProject(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["projects"] });
        },
    });
};

export const useDeleteProject = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: number) => projectService.deleteProject(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["projects"] });
        },
        onError: (error: unknown) => {
            console.error("Error deleting project:", error);
        },
    });
};

export const useReorderProject = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, direction }: { id: number; direction: "up" | "down" }) =>
            projectService.reorderProject(id, direction),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["projects"] });
        },
    });
};