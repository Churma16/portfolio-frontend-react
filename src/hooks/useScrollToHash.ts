import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function useScrollToHash() {
    const { hash } = useLocation();

    useEffect(() => {
        if (hash) {
            // Give the DOM a moment to render before scrolling
            const timer = setTimeout(() => {
                const element = document.querySelector(hash);
                if (element) {
                    element.scrollIntoView({ behavior: "smooth" });
                }
            }, 100);
            return () => clearTimeout(timer);
        } else {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    }, [hash]);
}
