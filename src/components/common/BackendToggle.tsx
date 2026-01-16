import {useApi} from "@/contexts/ApiContext";
import {Button} from "@/components/ui/button";
import TechIcon from "@/components/common/TechIcon.tsx";

export const BackendToggle = () => {
    const {activeBackend, switchBackend} = useApi();

    return (
        <div className="flex items-center p-1 border rounded-lg bg-secondary/30 border-border">
            {/* Laravel Button */}
            <Button
                variant="ghost"
                size="sm"
                onClick={() => switchBackend("laravel")}
                className={`relative z-10 text-xs font-bold transition-all duration-300 ${
                    activeBackend === "laravel"
                        ? "bg-blue-600 text-white hover:bg-blue-700 shadow-md"
                        : "text-muted-foreground hover:text-foreground"
                }`}
            >
                <TechIcon
                    name="laravel"
                    icon="SiLaravel"
                    className="w-8 h-8 text-white transition-all duration-500 grayscale group-hover/item:grayscale-0 group-hover/item:scale-110 group-hover/item:text-primary"
                />
            </Button>

            {/* Go Button */}
            <Button
                variant="ghost"
                size="sm"
                onClick={() => switchBackend("go")}
                className={`relative z-10 text-xs font-bold transition-all duration-300 ${
                    activeBackend === "go"
                        ? "bg-[#00ADD8] text-black hover:bg-[#00A29C] shadow-md"
                        : "text-muted-foreground hover:text-foreground"
                }`}
            >
                <TechIcon
                    name="go"
                    icon="SiGo"
                    className="w-8 h-8 text-white transition-all duration-500 grayscale group-hover/item:grayscale-0 group-hover/item:scale-110 group-hover/item:text-primary"
                />
            </Button>
        </div>
    );
};