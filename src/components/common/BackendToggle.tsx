import {useApi} from "@/contexts/ApiContext";
import {Button} from "@/components/ui/button"; // If using Shadcn
// import { cn } from "@/lib/utils"; // Optional: for cleaner class merging

export const BackendToggle = () => {
    const {activeBackend, switchBackend} = useApi();

    return (
        <div className="flex items-center p-1 border rounded-lg bg-secondary/30 border-border">
            {/* LARAVEL BUTTON */}
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
                Laravel (PHP)
            </Button>

            {/* GO BUTTON */}
            <Button
                variant="ghost"
                size="sm"
                onClick={() => switchBackend("go")}
                className={`relative z-10 text-xs font-bold transition-all duration-300 ${
                    activeBackend === "go"
                        ? "bg-[#00ADD8] text-black hover:bg-[#00A29C] shadow-md" // Official Go Colors
                        : "text-muted-foreground hover:text-foreground"
                }`}
            >
                Go (Golang)
            </Button>
        </div>
    );
};