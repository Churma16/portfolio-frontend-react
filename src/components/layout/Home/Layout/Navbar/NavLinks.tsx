import { RefObject } from "react";

interface NavLink {
    href: string;
    label: string;
}

interface NavLinksProps {
    links: NavLink[];
    activeHash: string;
    underlineStyle: { left: number; width: number };
    navRef: RefObject<HTMLDivElement | null>;
    isActive: (href: string) => boolean;
}

const DEFAULT_LINKS: NavLink[] = [
    { href: "#home", label: "Home" },
    { href: "#projects", label: "Projects" },
    { href: "#about", label: "About Me" },
    { href: "#contact", label: "Contact Me" },
];

export default function NavLinks({
    links = DEFAULT_LINKS,
    underlineStyle,
    navRef,
    isActive,
}: NavLinksProps) {
    return (
        <div
            className="flex gap-8 text-sm font-medium text-lara-sky/80 relative"
            ref={navRef}
        >
            {/* Animated Underline */}
            <div
                className="absolute bottom-0 h-[2px] bg-lara-blue transition-all duration-300"
                style={{
                    left: `${underlineStyle.left}px`,
                    width: `${underlineStyle.width}px`,
                }}
            />

            {/* Navigation Links */}
            {links.map((link) => (
                <a
                    key={link.href}
                    href={link.href}
                    className={`hover:text-white transition-colors py-6 ${
                        isActive(link.href) ? "active text-lara-blue" : ""
                    }`}
                >
                    {link.label}
                </a>
            ))}
        </div>
    );
}
