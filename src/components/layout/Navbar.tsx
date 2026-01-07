import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

export default function Navbar() {
    const [activeHash, setActiveHash] = useState("");
    const [underlineStyle, setUnderlineStyle] = useState({ left: 0, width: 0 });
    const navRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setActiveHash(window.location.hash);
        updateUnderline();

        const handleHashChange = () => {
            setActiveHash(window.location.hash);
            updateUnderline();
        };

        window.addEventListener("hashchange", handleHashChange);
        return () => window.removeEventListener("hashchange", handleHashChange);
    }, []);

    const updateUnderline = () => {
        if (!navRef.current) return;

        // Cari elemen yang punya class active
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
        const handleHashChange = () =>
            setActiveHash(window.location.hash || "#home");

        window.addEventListener("hashchange", handleHashChange);
        window.addEventListener("resize", updateUnderline); // Tambahkan ini

        return () => {
            window.removeEventListener("hashchange", handleHashChange);
            window.removeEventListener("resize", updateUnderline);
        };
    }, []);

    // Trigger underline saat hash berubah
    useEffect(() => {
        updateUnderline();
    }, [activeHash]);

    const isActive = (href: string) => {
        return activeHash === href || (activeHash === "" && href === "#home");
    };
    return (
        // bg-lara-dark: Background #010618
        // border-lara-border: Border #1b293d
        <nav className="border-b border-lara-border bg-lara-dark sticky top-0 z-50">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-[74px] items-center justify-between relative">
                    {/* Logo dengan Font Hanken Grotesk (font-heading) */}
                    <Link
                        to="/"
                        className="text-2xl font-heading font-bold text-white tracking-tight"
                    >
                        Churma<span className="text-lara-blue">.codes</span>
                    </Link>

                    {/* Menu dengan Font Kanit (font-body) */}
                    <div
                        className="flex gap-8 text-sm font-medium text-lara-sky/80 relative"
                        ref={navRef}
                    >
                        {/* Animated Underline di bawah navbar */}
                        <div
                            className="absolute bottom-0 h-[2px] bg-lara-blue transition-all duration-300"
                            style={{
                                left: `${underlineStyle.left}px`,
                                width: `${underlineStyle.width}px`,
                            }}
                        />

                        <a
                            href="#home"
                            className={`hover:text-white transition-colors py-6 ${
                                isActive("#home") ? "active text-lara-blue" : ""
                            }`}
                        >
                            Home
                        </a>
                        <a
                            href="#projects"
                            className={`hover:text-white transition-colors py-6 ${
                                isActive("#projects")
                                    ? "active text-lara-blue"
                                    : ""
                            }`}
                        >
                            Projects
                        </a>
                        <a
                            href="#about"
                            className={`hover:text-white transition-colors py-6 ${
                                isActive("#about")
                                    ? "active text-lara-blue"
                                    : ""
                            }`}
                        >
                            About Me
                        </a>
                        <a
                            href="#contact"
                            className={`hover:text-white transition-colors py-6 ${
                                isActive("#contact")
                                    ? "active text-lara-blue"
                                    : ""
                            }`}
                        >
                            Contact Me
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    );
}
