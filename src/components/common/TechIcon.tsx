import React, { useState, useEffect } from "react";
import * as SiIcons from "react-icons/si";

interface TechIconProps {
    name: string;
    icon?: string; // Dari DB (opsional) - format: "SiReact", "SiLaravel", dll
    className?: string;
}

// Cache untuk avoid re-import yang sama
const iconCache: Record<string, React.ComponentType<any>> = {};

// Pre-populate cache dengan icons yang tersedia
const initializeCache = () => {
    const commonIcons = [
        "SiPython",
        "SiPhp",
        "SiMysql",
        "SiNodedotjs",
        "SiJavascript",
        "SiTypescript",
        "SiReact",
        "SiVuedotjs",
        "SiAngular",
    ];

    commonIcons.forEach((iconName) => {
        const Icon = (SiIcons as any)[iconName];
        if (Icon) {
            iconCache[iconName] = Icon;
        }
    });
};

initializeCache();

// Mapping manual untuk tech yang nama icon-nya berbeda
const iconNameMap: Record<string, string> = {
    Php: "SiPhp",
    PHP: "SiPhp",
    Mysql: "SiMysql",
    MySQL: "SiMysql",
    MySql: "SiMysql",
    Python: "SiPython",
    python: "SiPython",
    PYTHON: "SiPython",
    Node: "SiNodedotjs",
    NodeJS: "SiNodedotjs",
    Javascript: "SiJavascript",
    JavaScript: "SiJavascript",
    JS: "SiJavascript",
    Typescript: "SiTypescript",
    TypeScript: "SiTypescript",
    TS: "SiTypescript",
    "Node.js": "SiNodedotjs",
    // Bahasa yang mungkin dipelajari lagi
    Java: "SiJava",
    "C#": "SiCsharp",
    CSharp: "SiCsharp",
    "C++": "SiCplusplus",
    Cplusplus: "SiCplusplus",
    C: "SiC",
    Go: "SiGo",
    Golang: "SiGo",
    Rust: "SiRust",
    Ruby: "SiRuby",
    Kotlin: "SiKotlin",
    Swift: "SiSwift",
    Dart: "SiDart",
    R: "SiR",
    Lua: "SiLua",
    Bash: "SiBash",
    Shell: "SiBash",
    Docker: "SiDocker",
    Kubernetes: "SiKubernetes",
    React: "SiReact",
    Vue: "SiVuedotjs",
    Angular: "SiAngular",
    GraphQL: "SiGraphql",
    PostgreSQL: "SiPostgresql",
    MongoDB: "SiMongodb",
    Redis: "SiRedis",
    AWS: "SiAmazonaws",
    Firebase: "SiFirebase",
};

export default function TechIcon({ name, icon, className }: TechIconProps) {
    const [IconComponent, setIconComponent] =
        useState<React.ComponentType<any> | null>(null);

    useEffect(() => {
        const loadIcon = async () => {
            try {
                // Priority: icon dari DB > mapping manual > concat Si + name
                const iconName =
                    icon?.trim() || iconNameMap[name] || `Si${name}`;

                // Cek cache dulu
                if (iconCache[iconName]) {
                    setIconComponent(() => iconCache[iconName]);
                    return;
                }

                // Coba dari SiIcons yang sudah di-import
                const Icon = (SiIcons as any)[iconName];
                if (Icon) {
                    iconCache[iconName] = Icon; // Store ke cache
                    setIconComponent(() => Icon);
                    return;
                }

                // Fallback: dynamic import jika belum di cache
                const lib = await import("react-icons/si");
                const DynamicIcon = (lib as any)[iconName];

                if (DynamicIcon) {
                    iconCache[iconName] = DynamicIcon;
                    setIconComponent(() => DynamicIcon);
                } else {
                    console.warn(
                        `Icon "${iconName}" not found in react-icons/si`
                    );
                    setIconComponent(null);
                }
            } catch (err) {
                console.error("Failed to load icon:", err);
                setIconComponent(null);
            }
        };

        loadIcon();
    }, [icon, name]);

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
