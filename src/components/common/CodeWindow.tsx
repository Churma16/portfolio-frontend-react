import {motion} from "framer-motion";
import {Profile} from "@/types";

export default function CodeWindow({profile}: { profile?: Profile }) {
    // Data JSON sesuai ASCII Art kamu
    const codeString = [
        {line: 1, text: "{"},
        {line: 2, text: `  "name": "${profile?.name || "Fathan"}",`, indent: true},
        {line: 3, text: `  "role": "${profile?.role || "Backend-Focused Software Engineer"}",`, indent: true},
        {
            line: 4,
            text: `  "location": "${profile?.location || "Jakarta, Indonesia"}",`,
            indent: true,
        },
        {
            line: 5,
            text: '  "education": "Universitas Diponegoro",',
            indent: true,
        },
        {line: 6, text: '  "hobbies": [', indent: true},
        {line: 7, text: '    "Gaming",', indent: true, subIndent: true},
        {
            line: 8,
            text: '    "Cooking",',
            indent: true,
            subIndent: true,
        },
        {line: 9, text: '    "Coding"', indent: true, subIndent: true},
        {line: 10, text: "  ],", indent: true},
        {line: 11, text: '  "currently_exploring": "Go, AWS"', indent: true},
        {line: 12, text: "}"},
    ];

    return (
        <motion.div
            initial={{opacity: 0, scale: 0.95}}
            whileInView={{opacity: 1, scale: 1}}
            transition={{duration: 0.5, delay: 0.2}}
            viewport={{once: true}}
            className="relative rounded-xl overflow-hidden bg-[#1e1e1e] border border-white/10 shadow-2xl shadow-black/50 font-mono text-sm sm:text-base w-full max-w-lg mx-auto"
        >
            {/* 1. Header Bar (Mac Style) */}
            <div className="flex items-center gap-2 px-4 py-3 bg-[#252526] border-b border-white/5">
                <div className="w-3 h-3 rounded-full bg-[#ff5f56]"/>
                {" "}
                {/* Merah */}
                <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"/>
                {" "}
                {/* Kuning */}
                <div className="w-3 h-3 rounded-full bg-[#27c93f]"/>
                {" "}
                {/* Hijau */}
                {/* Nama File */}
                <div className="ml-4 text-xs text-slate-400 font-sans flex items-center gap-1.5">
                    <span className="text-yellow-400">{`{}`}</span>
                    about_me.json
                </div>
            </div>

            {/* 2. Code Area */}
            <div className="p-4 sm:p-6 overflow-x-auto">
                <table className="w-full">
                    <tbody>
                    {codeString.map((item) => (
                        <tr key={item.line}>
                            {/* Line Numbers */}
                            <td className="pr-4 text-right select-none text-slate-600 w-8 border-r border-white/5 mr-4">
                                {item.line}
                            </td>

                            {/* Code Content (Syntax Highlighting Manual) */}
                            <td className="pl-4 whitespace-nowrap">
                                <code className="block">
                                    {/* Indentasi */}
                                    <span
                                        className={
                                            item.indent ? "ml-4" : ""
                                        }
                                    />
                                    <span
                                        className={
                                            item.subIndent ? "ml-4" : ""
                                        }
                                    />

                                    {/* Logic Pewarnaan JSON */}
                                    {formatJSON(item.text)}
                                </code>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </motion.div>
    );
}

// Helper function untuk mewarnai teks JSON
const formatJSON = (text: string) => {
    // Regex sederhana untuk memisahkan Key dan Value
    const parts = text.split(/(".+?":)/g).filter(Boolean);

    return parts.map((part, index) => {
        // Jika Key ("name":) -> Warna Biru Langit
        if (part.match(/".+?":/)) {
            return (
                <span key={index} className="text-sky-400">
                    {part}
                </span>
            );
        }
        // Jika String Value ("Aditya") -> Warna Orange/Coklat Muda
        if (part.match(/".+?"/)) {
            return (
                <span key={index} className="text-[#ce9178]">
                    {part}
                </span>
            );
        }
        // Jika Boolean (true/false) -> Warna Biru Gelap
        if (part.match(/true|false/)) {
            return (
                <span key={index} className="text-[#569cd6] font-bold">
                    {part}
                </span>
            );
        }
        // Kurung siku/kurawal -> Warna Kuning/Emas
        if (part.match(/[\[\]{}]/)) {
            return (
                <span key={index} className="text-[#ffd700]">
                    {part}
                </span>
            );
        }
        // Default (Koma, dll) -> Putih
        return (
            <span key={index} className="text-[#d4d4d4]">
                {part}
            </span>
        );
    });
};
