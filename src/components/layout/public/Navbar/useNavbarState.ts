import {useEffect, useRef, useState} from "react";

interface UnderlineStyle {
    left: number;
    width: number;
}

export function useNavbarState() {
    const [activeHash, setActiveHash] = useState("#home");
    const [underlineStyle, setUnderlineStyle] = useState<UnderlineStyle>({
        left: 0,
        width: 0,
    });
    const navRef = useRef<HTMLDivElement>(null);
    const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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
        updateUnderline();

        const handleHashChange = () => {
            setActiveHash(window.location.hash || "#home");
        };

        const handleScroll = () => {
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
            if (scrollTimeoutRef.current) {
                clearTimeout(scrollTimeoutRef.current);
            }
        };
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            updateUnderline();
        }, 0);

        return () => clearTimeout(timer);
    }, [activeHash]);

    const isActive = (href: string) => {
        return activeHash === href || (activeHash === "" && href === "#home");
    };

    return { activeHash, underlineStyle, navRef, isActive };
}
