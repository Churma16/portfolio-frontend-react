// src/hooks/useGlitchEffect.ts
import { useState, useEffect } from "react";

export const useGlitchEffect = () => {
    const [isGlitch, setIsGlitch] = useState(false);

    useEffect(() => {
        const triggerGlitch = () => {
            setIsGlitch(true);
            setTimeout(() => {
                setIsGlitch(false);
                const nextGlitchTime = Math.random() * 7000 + 8000;
                setTimeout(triggerGlitch, nextGlitchTime);
            }, 300);
        };
        const initialTimeout = setTimeout(triggerGlitch, 5000);
        return () => clearTimeout(initialTimeout);
    }, []);

    return isGlitch;
};