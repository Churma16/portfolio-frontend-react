import {useQuery} from "@tanstack/react-query";
import apiClient from "@/api/axios.ts";

interface HealthResponse {
    status: string;
    redis_alive: boolean;
    server_time: number;
    redis_processing_time: number; // <--- Field baru dari backend
}

export default function useHealth() {
    const {data, isLoading, isError} = useQuery({
        queryKey: ["health-check"],
        queryFn: async () => {
            const start = Date.now();
            const response = await apiClient.get<HealthResponse>("/health");
            const end = Date.now();
            const latency = end - start;

            return {
                ping: latency, // Latency Jaringan (Gede)
                redis: response.data.redis_alive,
                // Ambil waktu proses asli dari server (Kecil banget)
                redisTime: response.data.redis_processing_time,
            };
        },
        refetchInterval: 3000, // Cek tiap 3 detik biar seru
        refetchOnWindowFocus: false,
    });

    const ping = data?.ping ?? 0;
    const redisTime = data?.redisTime ?? 0; // Default 0
    const isRedisAlive = data?.redis ?? false;

    return {ping, redisTime, isRedisAlive, isLoading, isError};
}