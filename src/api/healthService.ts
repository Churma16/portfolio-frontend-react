import apiClient from "./axios";

export interface HealthResponse {
    status: string;
    redis_alive: boolean;
    server_time: number;
    redis_processing_time: number;
}

export interface HealthCheckResult {
    ping: number;
    redis: boolean;
    redisTime: number;
}

export const healthService = {
    async checkHealth(): Promise<HealthCheckResult> {
        const start = Date.now();
        const response = await apiClient.get<HealthResponse>("/health");
        const end = Date.now();
        const latency = end - start;

        return {
            ping: latency,
            redis: response.data.redis_alive !== undefined ? Boolean(response.data.redis_alive) : response.data.status === "UP",
            redisTime: response.data.redis_processing_time ?? 0,
        };
    },
};
