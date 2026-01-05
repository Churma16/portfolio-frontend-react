import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { SiRedis } from "react-icons/si";

export default function LiveStats() {
    const [ping, setPing] = useState(45);
    const [isHit, setIsHit] = useState(true);

    // Simulasi Ping & Cache Status berubah tiap 2 detik
    useEffect(() => {
        const interval = setInterval(() => {
            // Random ping antara 20ms - 90ms
            setPing(Math.floor(Math.random() * (90 - 20 + 1) + 20));

            // Random Cache HIT (90% chance) vs MISS (10% chance)
            setIsHit(Math.random() > 0.1);
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 mt-12 font-mono text-xs sm:text-sm text-lara-sky/70">
            {/* Stat 1: Server Response */}
            <div className="flex items-center gap-2 bg-lara-dark/50 border border-white/5 px-4 py-2 rounded-full backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <span>Server Response:</span>
                <motion.span
                    key={ping} // Trigger animasi pas angka berubah
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`font-bold ${
                        ping < 50 ? "text-green-400" : "text-yellow-400"
                    }`}
                >
                    {ping}ms
                </motion.span>
            </div>

            {/* Stat 2: Redis Cache */}
            <div className="flex items-center gap-2 bg-lara-dark/50 border border-white/5 px-4 py-2 rounded-full backdrop-blur-sm">
                <SiRedis className="text-red-500" />
                <span>Cache Status:</span>
                <motion.span
                    key={isHit ? "HIT" : "MISS"}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className={`font-bold px-1.5 rounded ${
                        isHit
                            ? "bg-green-500/20 text-green-400"
                            : "bg-red-500/20 text-red-400"
                    }`}
                >
                    {isHit ? "HIT" : "MISS"}
                </motion.span>
            </div>
        </div>
    );
}
