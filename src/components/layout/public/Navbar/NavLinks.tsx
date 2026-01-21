// Ensure JSX.Element is recognized by importing React
import React, {JSX, RefObject, useState} from "react";
import {Sheet, SheetContent, SheetTrigger} from "@/components/ui/sheet";
import {AtSign, Fingerprint, FolderGit2, Layers, Menu, Network, Terminal, TrendingUp} from "lucide-react";
// 1. Import komponen BackendToggle
import {BackendToggle} from "@/components/common/BackendToggle.tsx";

interface NavLink {
    href: string;
    label: string;
    labelMobile: string; // New property for mobile label
    icon: JSX.Element; // Updated to accept JSX elements
}

interface NavLinksProps {
    links?: NavLink[];
    activeHash: string;
    underlineStyle: { left: number; width: number };
    navRef: RefObject<HTMLDivElement | null>;
    isActive: (href: string) => boolean;
}

const DEFAULT_LINKS: NavLink[] = [
    {href: "#home", label: "Home", labelMobile: "Home", icon: <Terminal/>},
    {href: "#tech-stacks", label: "Tech", labelMobile: "Tech Stacks", icon: <Layers/>},
    {href: "#projects", label: "Projects", labelMobile: "Projects", icon: <FolderGit2/>},
    {href: "#experiences", label: "Exp", labelMobile: "Experiences", icon: <TrendingUp/>},
    {href: "#about", label: "About", labelMobile: "About", icon: <Fingerprint/>},
    {href: "#architecture", label: "Arch", labelMobile: "Architecture", icon: <Network/>},
    {href: "#contact", label: "Contact", labelMobile: "Contact", icon: <AtSign/>},
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
                className="hidden md:flex gap-8 text-sm font-medium text-accent/80 relative items-center"
                ref={navRef}
            >
                <div
                    className="absolute bottom-0 h-[2px] bg-primary transition-all duration-300"
                    style={{
                        left: `${underlineStyle.left}px`,
                        width: `${underlineStyle.width}px`,
                    }}
                />

                {links.map((link) => (
                    <a
                        key={link.href}
                        href={link.href}
                        className={`hover:text-white transition-colors py-6 ${
                            isActive(link.href) ? "active text-primary" : ""
                        }`}
                    >
                        {link.label}
                    </a>
                ))}
            </div>

            {/* Mobile Navigation */}
            <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger asChild>
                    <button className="md:hidden p-2 hover:bg-primary/10 rounded-lg transition-colors">
                        <Menu size={24} className="text-accent"/>
                    </button>
                </SheetTrigger>

                {/* 2. Tambahkan flex flex-col dan h-full pada konten utama Sheet */}
                <SheetContent side="right" className="w-72 bg-background border-border flex flex-col h-full">

                    {/* Judul Menu (Opsional, agar tidak kosong di atas) */}
                    <div className="mt-6 mb-2 px-2 text-lg font-bold text-white tracking-tight">
                        Menu
                    </div>

                    {/* Container Links */}
                    <nav className="flex flex-col gap-2">
                        {links.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                onClick={handleLinkClick}
                                className={`px-4 py-3 text-base font-medium rounded-lg transition-all ${
                                    isActive(link.href)
                                        ? "bg-primary/20 text-primary border border-primary/50"
                                        : "text-accent/80 hover:text-white hover:bg-primary/10"
                                }`}
                            >
                                <span className="flex items-center gap-2">
                                    {link.icon}
                                    {link.labelMobile}
                                </span>
                            </a>
                        ))}
                    </nav>

                    {/* 3. Footer Section (Backend Toggle) */}
                    {/* mt-auto akan mendorong div ini ke paling bawah layar */}
                    <div className="mt-auto mb-6 pt-6 border-t border-border/40">
                        <div className="flex items-center justify-between px-2">
                            <span className="text-sm font-medium text-accent/80">
                                Switch Api
                            </span>
                            <BackendToggle/>
                        </div>
                    </div>

                </SheetContent>
            </Sheet>
        </>
    );
}