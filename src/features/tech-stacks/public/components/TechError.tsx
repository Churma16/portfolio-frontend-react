import ErrorBoundary from "@/components/common/ErrorBoundary.tsx";
import {motion} from "framer-motion";

export default function TechError() {
    return (
        <ErrorBoundary>
            <motion.div
                initial={{opacity: 0, scale: 0.8}}
                animate={{opacity: 1, scale: 1}}
                transition={{duration: 0.5, ease: "easeOut"}}
                className="flex flex-col items-center justify-center h-full bg-red-100 p-6 rounded-lg shadow-lg"
            >
                <h2 className="text-2xl font-bold text-red-600 mb-4">Oops! Something went wrong!</h2>
                <p className="text-base text-gray-700 mb-6">
                    We couldn't load the tech stacks. Please try again later.
                </p>
                <button
                    onClick={() => window.location.reload()}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                >
                    Retry
                </button>
            </motion.div>
        </ErrorBoundary>
    );
}