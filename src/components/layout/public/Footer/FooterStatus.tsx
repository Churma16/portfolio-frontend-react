import {useQuery} from "@tanstack/react-query";
import apiClient from "@/api/axios.ts";


interface HealthResponse {
    status: string;
    redis_alive: boolean;
    server_time: number;
    redis_processing_time: number; // <--- Field baru dari backend
}

export default function FooterStatus() {
    const {isError} = useQuery({
        queryKey: ["health-check"],
        queryFn: async () => {
            const start = Date.now();
            const response = await apiClient.get<HealthResponse>("/health");
            const end = Date.now();
            const latency = end - start;

            return {
                ping: latency, // Latency Jaringan (Gede)
                redis: response.data.redis_alive,
                redisTime: response.data.redis_processing_time,
            };
        },
        refetchInterval: 3000, // Cek tiap 3 detik biar seru
        refetchOnWindowFocus: false,
    });

    return (
        <div className="flex items-center gap-2 bg-green-500/10 border border-green-500/20 px-3 py-1 rounded-full">
              <span className="relative flex h-2 w-2">
                <span
                    className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
            {isError && (<span className="text-xs font-mono text-red-400">
                System: Offline (SGP1)
              </span>)}
            <span className="text-xs font-mono text-green-400">
                System: Online (SGP1)
              </span>
        </div>
    );


}
