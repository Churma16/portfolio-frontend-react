import { useEffect, useState } from "react";
import { HiArrowUp } from "react-icons/hi2";
import { SiApacherocketmq } from "react-icons/si";
import { motion } from "framer-motion";

export default function ReturnToTopButton() {
    const [isVisible, setIsVisible] = useState(false);
    const [isRocketActive, setIsRocketActive] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollPosition = window.scrollY;
            setIsVisible(currentScrollPosition > 300);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleScrollToTop = () => {
        setIsRocketActive(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
        setTimeout(() => setIsRocketActive(false), 1000);
    };

    if (!isVisible) {
        return null;
    }

    return (
        <motion.button
            onClick={handleScrollToTop}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.3 }}
            className="return-to-top fixed bottom-8 right-8 z-50 p-3 rounded-full bg-primary text-primary-foreground hover:bg-primary-hover shadow-lg shadow-primary/50 border border-primary/20 backdrop-blur-sm transition-all duration-300 hover:shadow-primary/70 hover:-translate-y-1"
            aria-label="Return to top"
        >
            <motion.div
                animate={
                    isRocketActive
                        ? { x: [0, -3, 3, -3, 3, 0], y: [0, -3, 0, 3, 0, 0] }
                        : { x: 0, y: 0 }
                }
                transition={{
                    duration: isRocketActive ? 0.4 : 0.3,
                    repeat: isRocketActive ? Infinity : 0,
                    ease: "easeInOut",
                }}
                className="flex items-center justify-center"
            >
                {isRocketActive ? <SiApacherocketmq /> : <HiArrowUp className="w-6 h-6" />}
            </motion.div>
        </motion.button>
    );
}
