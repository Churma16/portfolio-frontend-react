import { useQuery } from "@tanstack/react-query";
import { healthService, HealthCheckResult } from "@/api/healthService";

export type { HealthCheckResult };

export default function useHealth() {
    const { data, isLoading, isError } = useQuery({
        queryKey: ["health-check"],
        queryFn: () => healthService.checkHealth(),
        refetchInterval: 3000,
        refetchOnWindowFocus: false,
    });

    const ping = data?.ping ?? 0;
    const redisTime = data?.redisTime ?? 0;
    const isRedisAlive = data?.redis ?? false;

    return { ping, redisTime, isRedisAlive, isLoading, isError };
}