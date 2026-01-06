import React, { useState, useEffect } from "react";
import * as SiIcons from "react-icons/si";

interface TechIconProps {
    name: string;
    icon?: string; // Dari DB - format: "SiReact", "SiLaravel", dll
    className?: string;
}

export default function TechIcon({ name, icon, className }: TechIconProps) {
    const [IconComponent, setIconComponent] =
        useState<React.ComponentType<any> | null>(null);

    useEffect(() => {
        if (!icon) {
            setIconComponent(null);
            return;
        }

        try {
            // Langsung ambil icon dari props (harus dari DB)
            const Icon = (SiIcons as any)[icon.trim()];
            if (Icon) {
                setIconComponent(() => Icon);
            } else {
                console.warn(`Icon "${icon}" not found in react-icons/si`);
                setIconComponent(null);
            }
        } catch (err) {
            console.error("Failed to load icon:", err);
            setIconComponent(null);
        }
    }, [icon]);

    if (IconComponent) {
        return <IconComponent className={className} />;
    }

    // Fallback: inisial nama
    return (
        <span className="font-bold text-[20px] text-slate-500 flex items-center justify-center bg-slate-800 rounded overflow-hidden w-8 h-8 p-2">
            {name.substring(0, 2).toUpperCase()}
        </span>
    );
}
