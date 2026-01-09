import { RefObject, useState } from "react";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";

interface NavLink {
    href: string;
    label: string;
}

interface NavLinksProps {
    links?: NavLink[];
    activeHash: string;
    underlineStyle: { left: number; width: number };
    navRef: RefObject<HTMLDivElement | null>;
    isActive: (href: string) => boolean;
}

const DEFAULT_LINKS: NavLink[] = [
    { href: "#home", label: "Home" },
    { href: "#tech-stacks", label: "Tech Stacks" },
    { href: "#projects", label: "Projects" },
    { href: "#about", label: "About Me" },
    { href: "#architecture", label: "Architecture" },
    { href: "#contact", label: "Contact Me" },
];

export default function NavLinks({
    links = DEFAULT_LINKS,
    underlineStyle,
    navRef,
    isActive,
}: NavLinksProps) {
    const [open, setOpen] = useState(false);

    const handleLinkClick = () => {
        setOpen(false);
    };

    return (
        <>
            {/* Desktop Navigation */}
            <div
                className="hidden md:flex gap-8 text-sm font-medium text-lara-sky/80 relative"
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

            {/* Mobile Navigation */}
            <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger asChild>
                    <button className="md:hidden p-2 hover:bg-lara-blue/10 rounded-lg transition-colors">
                        <Menu size={24} className="text-lara-sky" />
                    </button>
                </SheetTrigger>
                <SheetContent side="right" className="w-72 bg-lara-dark border-lara-border">
                    <nav className="flex flex-col gap-4 mt-8">
                        {links.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                onClick={handleLinkClick}
                                className={`px-4 py-3 text-base font-medium rounded-lg transition-all ${
                                    isActive(link.href)
                                        ? "bg-lara-blue/20 text-lara-blue border border-lara-blue/50"
                                        : "text-lara-sky/80 hover:text-white hover:bg-lara-blue/10"
                                }`}
                            >
                                {link.label}
                            </a>
                        ))}
                    </nav>
                </SheetContent>
            </Sheet>
        </>
    );
}
