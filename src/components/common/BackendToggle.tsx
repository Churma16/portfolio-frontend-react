import {useApi} from "@/contexts/useApi.ts";
import {motion} from "framer-motion";
import TechIcon from "@/components/common/TechIcon.tsx";

const backends = [
    { id: "laravel", icon: "SiLaravel", color: "bg-blue-600", shadow: "shadow-blue-600/50" },
    { id: "go", icon: "SiGo", color: "bg-[#00ADD8]", shadow: "shadow-[#00ADD8]/50" },
    { id: "express", icon: "SiExpress", color: "bg-[#68A063]", shadow: "shadow-[#68A063]/50" }
] as const;

export const BackendToggle = () => {
    const {activeBackend, switchBackend} = useApi();

    return (
        <div className="flex items-center p-1.5 rounded-full bg-background/60 backdrop-blur-xl border border-border/50 shadow-inner relative gap-1">
            {backends.map((backend) => {
                const isActive = activeBackend === backend.id;
                
                return (
                    <button
                        key={backend.id}
                        onClick={() => switchBackend(backend.id as any)}
                        className={`relative w-12 h-10 flex items-center justify-center rounded-full transition-colors duration-300 z-10 group ${
                            isActive ? "text-white" : "text-muted-foreground hover:text-foreground"
                        }`}
                        aria-label={`Switch to ${backend.id}`}
                    >
                        {isActive && (
                            <motion.div
                                layoutId="activeBackendIndicator"
                                className={`absolute inset-0 rounded-full shadow-lg ${backend.shadow} -z-10 ${backend.color}`}
                                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                            >
                                {/* Inner glow effect for premium feel */}
                                <div className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </motion.div>
                        )}
                        <TechIcon
                            name={backend.id}
                            icon={backend.icon}
                            className={`w-5 h-5 transition-all duration-300 relative z-10 ${
                                isActive 
                                    ? "text-white grayscale-0 opacity-100 drop-shadow-md" 
                                    : "grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110"
                            }`}
                        />
                    </button>
                );
            })}
        </div>
    );
};