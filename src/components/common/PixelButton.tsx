import {ReactNode} from "react";
import {Link} from "react-router-dom";
import {cn} from "../../lib/utils";

interface PixelButtonProps {
    children: ReactNode;
    variant?: "primary" | "dark"; // Biru atau Gelap
    href?: string;
    to?: string;
    className?: string;
}

export default function PixelButton({
    children,
    variant = "primary",
    href,
    to,
    className,
}: PixelButtonProps) {
    // 1. Tentukan Warna
    const baseStyles =
        "inline-flex items-center gap-3 px-6 py-3 font-heading font-bold text-sm tracking-wide transition-transform active:translate-y-1";

    const variants = {
        // Style Utama (Primary)
        primary:
            "bg-primary text-primary-foreground shadow-[4px_4px_0_0_hsl(var(--primary-shadow))] hover:bg-primary-hover",

        // Style Gelap (Discover)
        dark: "bg-[#1e293b] text-white shadow-[4px_4px_0_0_#0f172a] hover:bg-[#334155]",
    };

    // 2. Trik "Pixelated Corners" (Opsional: Kalau mau sudutnya benar-benar bergerigi)
    // Kita pakai clip-path sederhana atau border style.
    // Untuk kemudahan dan performa, kita pakai 'rounded-sm' dengan shadow tajam di atas.
    const pixelShape = "rounded-none border-2 border-transparent";

    const combinedClassName = cn(
        baseStyles,
        variants[variant],
        pixelShape,
        className
    );

    // Render sebagai Link (Router), A (External), atau Button biasa
    if (to) {
        return (
            <Link to={to} className={combinedClassName}>
                {children}
            </Link>
        );
    }

    if (href) {
        return (
            <a href={href} className={combinedClassName}>
                {children}
            </a>
        );
    }

    return <button className={combinedClassName}>{children}</button>;
}
