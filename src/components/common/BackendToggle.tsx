import {useApi} from "@/contexts/useApi.ts";
import {motion} from "framer-motion";
import TechIcon from "@/components/common/TechIcon.tsx";

const backends = [
    { id: "laravel", icon: "SiLaravel", color: "bg-blue-600", shadow: "shadow-blue-600/50" },
    { id: "go", icon: "SiGo", color: "bg-[#00ADD8]", shadow: "shadow-[#00ADD8]/50" },
    { id: "express", icon: "SiExpress", color: "bg-[#68A063]", shadow: "shadow-[#68A063]/50" }
] as const;

// Each button is w-9 (36px) + gap-0.5 (2px) = 38px step
const BUTTON_WIDTH = 36;
const GAP = 2;

export const BackendToggle = () => {
    const {activeBackend, switchBackend} = useApi();

    const activeIndex = backends.findIndex(b => b.id === activeBackend);
    const activeBackendDef = backends[activeIndex];

    return (
        <div className="flex items-center p-1 rounded-full bg-background/60 backdrop-blur-xl border border-border/50 shadow-inner relative gap-0.5">
            {/* Single sliding indicator — animates x only, no DOM position tracking */}
            <motion.div
                className={`absolute top-1 left-1 w-9 h-8 rounded-full ${activeBackendDef.color} ${activeBackendDef.shadow} shadow-[0_0_12px_var(--tw-shadow-color)]`}
                animate={{ x: activeIndex * (BUTTON_WIDTH + GAP) }}
                transition={{ type: "spring", stiffness: 500, damping: 35 }}
            />

            {backends.map((backend) => {
                const isActive = activeBackend === backend.id;

                return (
                    <button
                        key={backend.id}
                        onClick={() => switchBackend(backend.id as any)}
                        className={`relative w-9 h-8 flex items-center justify-center rounded-full transition-colors duration-300 z-10 group ${
                            isActive ? "text-white" : "text-muted-foreground hover:text-foreground"
                        }`}
                        aria-label={`Switch to ${backend.id}`}
                    >
                        <TechIcon
                            name={backend.id}
                            icon={backend.icon}
                            className={`w-4 h-4 transition-all duration-300 relative z-10 ${
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