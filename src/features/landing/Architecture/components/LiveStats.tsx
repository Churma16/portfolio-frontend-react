import {motion} from "framer-motion";
import {SiRedis} from "react-icons/si";
import useHealth from "@/hooks/useHealth.ts";


export default function LiveStats() {

    const {ping, redisTime, isRedisAlive, isLoading, isError} = useHealth();

    return (
        <>
            <div
                className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 mt-12 font-mono text-xs sm:text-sm text-accent/70">
                {/* 1. NETWORK LATENCY (Tetap ada buat info) */}
                <div
                    className="flex items-center gap-2 bg-background/50 border border-white/5 px-4 py-2 rounded-full backdrop-blur-sm opacity-60">
                    <span>Network Latency:</span>
                    <span className="font-bold text-lara-text-muted">{ping}ms</span>
                </div>

                {/* 2. REDIS PERFORMANCE (SHOW OFF ITEM!) */}
                <div
                    className="flex items-center gap-2 bg-background/50 border border-green-500/30 px-4 py-2 rounded-full backdrop-blur-sm shadow-[0_0_15px_rgba(34,197,94,0.2)]">
                    <SiRedis
                        className={
                            isRedisAlive ? "text-red-500" : "text-lara-text-muted-dark"
                        }
                    />
                    <span className="text-foreground font-medium">
                        Redis Response:
                    </span>

                    {/* Angka ini harusnya super kecil */}
                    <motion.span
                        key={redisTime}
                        initial={{scale: 1.2, color: "#fff"}}
                        animate={{scale: 1, color: "#4ade80"}}
                        className="font-bold text-lara-accent-green text-base"
                    >
                        {isLoading ? "..." : `${redisTime} ms`} ⚡
                    </motion.span>
                </div>
            </div>

            {isError && !isLoading && (
                <p className="text-center text-[10px] text-lara-text-muted-dark font-mono mt-12 uppercase tracking-widest opacity-50">
                    System Status: 🔴 Systems Offline
                </p>)
            }

            {isLoading &&
                <p className="text-center text-sm text-lara-text-muted-dark mt-4 animate-pulse">
                    Fetching live stats...
                </p>
            }

            {!isLoading && !isError &&
                <p className="text-center text-[10px] text-lara-text-muted-dark font-mono mt-12 uppercase tracking-widest opacity-50">
                    System Status: 🟢 All Systems Operational
                </p>
            }

        </>
    );
}
