import {useEffect, useRef, useState} from "react";
import { useLocation } from "react-router-dom";

interface UnderlineStyle {
    left: number;
    width: number;
    opacity: number;
}

export function useNavbarState() {
    const location = useLocation();
    const isHomePage = location.pathname === "/";
    const [activeHash, setActiveHash] = useState(location.hash || "#home");
    const [underlineStyle, setUnderlineStyle] = useState<UnderlineStyle>({
        left: 0,
        width: 0,
        opacity: 0,
    });
    const navRef = useRef<HTMLDivElement>(null);
    const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const isManualNavigation = useRef(false);
    const manualTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const updateUnderline = () => {
        if (!navRef.current) return;

        const activeLink = navRef.current.querySelector(
            ".active"
        ) as HTMLElement;

        if (activeLink) {
            setUnderlineStyle({
                left: activeLink.offsetLeft,
                width: activeLink.offsetWidth,
                opacity: 1,
            });
        } else {
            setUnderlineStyle((prev) => ({
                ...prev,
                width: 0,
                opacity: 0,
            }));
        }
    };

    // Optimistic update when hash changes via click
    useEffect(() => {
        if (location.hash) {
            setActiveHash(location.hash);
            
            // Pause scroll listener during smooth scroll
            isManualNavigation.current = true;
            if (manualTimeoutRef.current) clearTimeout(manualTimeoutRef.current);
            manualTimeoutRef.current = setTimeout(() => {
                isManualNavigation.current = false;
            }, 1000); // 1s is enough for smooth scroll to finish
        }
    }, [location.hash]);

    useEffect(() => {
        updateUnderline();

        const handleHashChange = () => {
            if (!isManualNavigation.current) {
                setActiveHash(window.location.hash || "#home");
            }
        };

        const handleScroll = () => {
            if (isManualNavigation.current) return;

            if (scrollTimeoutRef.current) {
                clearTimeout(scrollTimeoutRef.current);
            }

            scrollTimeoutRef.current = setTimeout(() => {
                const sections = document.querySelectorAll("section");
                let currentSection = "#home";

                sections.forEach((section) => {
                    const sectionTop = section.offsetTop;
                    if (window.scrollY >= sectionTop - 100) {
                        currentSection = `#${section.id}`;
                    }
                });

                setActiveHash(currentSection);
            }, 50);
        };

        window.addEventListener("hashchange", handleHashChange);
        window.addEventListener("scroll", handleScroll, {passive: true});
        window.addEventListener("resize", updateUnderline);

        return () => {
            window.removeEventListener("hashchange", handleHashChange);
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", updateUnderline);
            if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
            if (manualTimeoutRef.current) clearTimeout(manualTimeoutRef.current);
        };
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            updateUnderline();
        }, 0);

        return () => clearTimeout(timer);
    }, [activeHash, isHomePage]);

    const isActive = (href: string) => {
        if (!isHomePage) return false;
        const normalizedHref = href.startsWith("/") ? href.slice(1) : href;
        return activeHash === normalizedHref || (activeHash === "" && normalizedHref === "#home");
    };

    return { activeHash, underlineStyle, navRef, isActive };
}
