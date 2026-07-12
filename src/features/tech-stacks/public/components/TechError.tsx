import ErrorBoundary from "@/components/common/ErrorBoundary.tsx";
import {motion} from "framer-motion";
import { AlertOctagon, RefreshCcw } from "lucide-react";

export default function TechError() {
    return (
        <ErrorBoundary>
            <motion.div
                initial={{opacity: 0, y: 20}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.5, ease: "easeOut"}}
                className="flex flex-col items-center justify-center w-full h-[450px] md:h-[300px] border border-destructive/20 bg-destructive/5 rounded-2xl p-6 shadow-sm backdrop-blur-sm"
            >
                <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mb-6">
                    <AlertOctagon className="w-8 h-8 text-destructive" />
                </div>
                
                <h2 className="text-2xl font-heading font-bold text-foreground mb-2 text-center">
                    Gagal Memuat Teknologi
                </h2>
                
                <p className="text-muted-foreground text-center max-w-md mb-8">
                    Terjadi kesalahan saat mengambil data teknologi. Silakan coba beberapa saat lagi atau muat ulang halaman.
                </p>
                
                <button
                    onClick={() => window.location.reload()}
                    className="flex items-center gap-2 px-6 py-3 bg-background border border-border hover:bg-muted hover:border-primary/50 text-foreground rounded-full transition-all duration-300 group shadow-sm"
                >
                    <RefreshCcw className="w-4 h-4 group-hover:-rotate-180 transition-transform duration-500" />
                    <span>Muat Ulang Halaman</span>
                </button>
            </motion.div>
        </ErrorBoundary>
    );
}