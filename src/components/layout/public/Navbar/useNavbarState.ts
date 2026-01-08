import { useState, useEffect, useRef } from "react";

interface UnderlineStyle {
    left: number;
    width: number;
}

export function useNavbarState() {
    const [activeHash, setActiveHash] = useState("");
    const [underlineStyle, setUnderlineStyle] = useState<UnderlineStyle>({
        left: 0,
        width: 0,
    });
    const navRef = useRef<HTMLDivElement>(null);

    const updateUnderline = () => {
        if (!navRef.current) return;

        const activeLink = navRef.current.querySelector(
            ".active"
        ) as HTMLElement;

        if (activeLink) {
            setUnderlineStyle({
                left: activeLink.offsetLeft,
                width: activeLink.offsetWidth,
            });
        }
    };

    useEffect(() => {
        setActiveHash(window.location.hash || "#home");
        updateUnderline();

        const handleHashChange = () => {
            setActiveHash(window.location.hash || "#home");
        };

        window.addEventListener("hashchange", handleHashChange);
        window.addEventListener("resize", updateUnderline);

        return () => {
            window.removeEventListener("hashchange", handleHashChange);
            window.removeEventListener("resize", updateUnderline);
        };
    }, []);

    useEffect(() => {
        updateUnderline();
    }, [activeHash]);

    const isActive = (href: string) => {
        return activeHash === href || (activeHash === "" && href === "#home");
    };

    return { activeHash, underlineStyle, navRef, isActive };
}
