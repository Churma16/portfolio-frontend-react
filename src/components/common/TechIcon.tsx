import {
    SiLaravel,
    SiReact,
    SiTailwindcss,
    SiPhp,
    SiMysql,
    SiTypescript,
    SiJavascript,
    SiFramer,
    SiVite,
    SiDocker,
} from "react-icons/si";

interface TechIconProps {
    name: string;
    className?: string;
}

export default function TechIcon({ name, className }: TechIconProps) {
    // Normalisasi teks biar tidak sensitif huruf besar/kecil (misal: "Laravel" == "laravel")
    const normalizedName = name.toLowerCase().replace(/\s+/g, "");

    // --- KAMUS ICON ---
    // Tambahkan daftar teknologimu di sini
    switch (normalizedName) {
        case "laravel":
            return <SiLaravel className={className} />;
        case "react":
            return <SiReact className={className} />;
        case "vue":
        case "vuejs":
            return <SiReact className={className} />; // Ganti SiVue jika install
        case "tailwind":
        case "tailwindcss":
            return <SiTailwindcss className={className} />;
        case "php":
            return <SiPhp className={className} />;
        case "mysql":
            return <SiMysql className={className} />;
        case "typescript":
        case "ts":
            return <SiTypescript className={className} />;
        case "javascript":
        case "js":
            return <SiJavascript className={className} />;
        case "framer":
        case "framermotion":
            return <SiFramer className={className} />;
        case "vite":
            return <SiVite className={className} />;
        case "docker":
            return <SiDocker className={className} />;

        // Default jika icon tidak ditemukan (Munculkan inisial huruf pertama)
        default:
            return (
                <span className="font-bold text-[10px]">
                    {name.substring(0, 2).toUpperCase()}
                </span>
            );
    }
}
