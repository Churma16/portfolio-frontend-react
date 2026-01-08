import {useQuery} from "@tanstack/react-query";
import apiClient from "@/api/axios.ts";

interface HealthResponse {
    redis_alive: boolean;
    redis_processing_time: number;
}

export default function FooterStatus() {
    const {isError, isSuccess} = useQuery({
        queryKey: ["health-check"],
        queryFn: async () => {
            const response = await apiClient.get<HealthResponse>("/health");
            return {
                redis: response.data.redis_alive,
            };
        },
        refetchOnWindowFocus: false,
    });

    return (
        <div className="flex items-center gap-2 bg-green-500/10 border border-green-500/20 px-3 py-1 rounded-full">
            {isError && (<><span className="relative flex h-2 w-2">
                <span
                    className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span><span className="text-xs font-mono text-red-400">
                System: Offline (SGP1)
                </span></>)}
            {isSuccess && (<><span className="relative flex h-2 w-2">
                <span
                    className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span><span className="text-xs font-mono text-green-400">
                System: Online (SGP1)
                </span></>)}
        </div>
    );

}
